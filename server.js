var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 5000;

server.listen(port, function() {
  console.log("Listening on " + port);
});

app.get('/', function (req, res) {
  var str = 'NodeJS:Express';
  res.send(str);
});

io.on('connection', function (socket) {
  var dataFromNodeJS = {
    nodejs: '0.10.33',
    npm: '2.1.7'
  };
  socket.emit('nodejs-to-casperjs', dataFromNodeJS);

  socket.on('casperjs-to-nodejs', function (data) {
    console.log('NodeJS received data from CasperJS');
    console.log('data:');
    console.log(data);

    if (data.casper !== '1.1.0-beta3') {
      process.exit(1);
    }
  });
});
