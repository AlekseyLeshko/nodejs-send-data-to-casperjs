var timeout = 5000;
var url = 'http://www.example.com';

var options = {
  logLevel: "info",
  verbose: true,
  waitTimeout: timeout
};

var casper = require('casper').create(options);

casper.start(url, function() {
  var path = './node_modules/socket.io-client/socket.io.js';
  this.page.injectJs(path);
});

casper.thenEvaluate(function() {
  var div = document.createElement('div');
  div.id = 'unique_name';

  var body = document.getElementsByTagName('body')[0];
  body.appendChild(div);

  var obj = {};
  div.textContent = JSON.stringify(obj);
});

casper.thenEvaluate(function() {
  var socket = io.connect('http://localhost:5000');
  socket.on('nodejs-to-casperjs', function (data) {
    var div = document.getElementById('unique_name');
    var obj = JSON.parse(div.textContent);
    obj.data = data;
    div.textContent = JSON.stringify(obj);

    data.casper = '1.1.0-beta3';
    socket.emit('casperjs-to-nodejs', data);
  });
});

casper.then(function() {
  var elInfo = this.getElementInfo('#unique_name');
  casper.echo('String:');
  casper.echo(elInfo.text);
  var obj = JSON.parse(elInfo.text);
  casper.echo('Main obj:');
  require('utils').dump(obj);
  casper.echo('Current obj:');
  require('utils').dump(obj.data);

  casper.captureSelector('example.png', 'body');
});

casper.run();
