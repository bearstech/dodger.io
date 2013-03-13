var http = require('http'),
    url = require('url'),
    EventEmitter = require('events').EventEmitter;
'use strict';

var source = new EventEmitter();
source.setMaxListeners(1024);

const chanpath = /^\/chan\/(\w+)/;
function server(handler) {
    return http.createServer(function(req, res) {
        var path = url.parse(req.url).pathname;
        var r = chanpath.exec(path);
        if (r == null) {
            res.writeHead(404);
            res.end('not found');
        } else {
            handler(r[1], req, res);
        }
    });
}

var front = server(function(chan, req, res) {
    var message_count = 0;
    req.socket.setTimeout(Infinity);
    res.statusCode = 200;
    //https://developer.mozilla.org/en-US/docs/Server-sent_events/Using_server-sent_events#Event_stream_format
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    source.on(chan, function(message) {
        res.write('id: ' + message_count + '\n');
        message.split('\n').forEach(function(line) {
            res.write('data: ' + line + '\n');
        });
        res.write('\n');
        message_count += 1;
    });
});

var back = server(function(chan, req, res) {
    if (req.method != 'POST') {
        res.writeHead(405);
        res.end('Method Not Allowed');
    } else {
        var length = parseInt(req.headers['content-length']);
        var body = new Buffer(length);
        var pos = 0;
        req.on('data', function(chunk) {
            chunk.copy(body, pos);
            pos += chunk.length;
        });
        req.on('end', function() {
            source.emit(chan, body.toString('utf8'));
            res.writeHead(200);
            res.end('ok');
        });
    }
});

front.listen(1338, '127.0.0.1');
back.listen(1339, '127.0.0.1');
