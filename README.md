Dodger
======

You want to push information from the server to the webpage.

Polling is hugly, websocket is heavy.
You just need half duplex link, user subscribe to channel, and event are pushed on channel.
[EventSource](http://caniuse.com/#feat=eventsource) is an HTML5 feature, just a never ending connection.
Client side is provided by your browser, server slide is really simple if you are using async technology.

Here is a naked nodejs example. The application listen on two ports, one public, one private.
The public port can be exposed through nginx proxy.
The private port can be used by the application server : php, rails, anything that can speak http.
It's just a pubsub pattern, with private publisher, public subscribers.

This application is not bullet proof, it's here to explain how event source works.

In real world, this kind of application should use _connect_ or _express_ library.

Try it
------

    node app.js

in one terminal:

    curl http://127.0.0.1:1338/chan/beuha

in an other terminal:

    curl -XPOST http://127.0.0.1:1339/chan/beuha -d 'Hello world'


Licence
-------
3 clause BSD license © 2013 Mathieu Lecarme.
