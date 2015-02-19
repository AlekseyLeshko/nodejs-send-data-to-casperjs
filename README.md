# nodejs-send-data-to-casperjs

You use [CasperJS](http://casperjs.org/)?
But you also need to use [NodeJS](http://nodejs.org/)?
Do not worry. There is a solution!

## Example
Clone repo and build app
```
git clone git@github.com:AlekseyLeshko/nodejs-send-data-to-casperjs.git
cd nodejs-send-data-to-casperjs
make
```

and start server(NodeJS:Express) and client(CasperJS)
```
make start_server
make start_client
```

or
```
node server.js
casperjs client.js
```

## Solution
It is [Socket.io](http://socket.io/).
CasperJS inject socket.io in page.
Sends and receives data.
Start server that listens, receives and processes the data.
Server can use npm modules.
