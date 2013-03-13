Dodger
======

Naked nodejs example for eventsource.
Can be use behind an Nginx for the public side,
and listening secretly in the back side from some linear programing language.

In real world, you should use connect or express library.

Try it
------

    node app.js

in one terminal:

    curl http://127.0.0.1:1338/chan/beuha

in an other terminal:

    curl -XPOST http://127.0.0.1:1339/chan/beuha -d 'Hello world'


Licence
-------

BSD
