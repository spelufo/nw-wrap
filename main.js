var net = require('net');
var nwwr = module.exports = {};

for (var p in process)
  nwwr[p] = process[p];

var STDIN_PORT = process.env.STDIN_PORT || 3784;
nwwr.stdin = net.createConnection({port: STDIN_PORT}, function () {
  console.log('stdin connected on port ', STDIN_PORT);
});
nwwr.stdin.on('error', function (err) {
  console.log('Failed to connect to stdin server on port ' + STDIN_PORT + '. '+ err.code);
});


var STDERR_PORT = process.env.STDERR_PORT;
if (STDERR_PORT) {
  nwwr.stderr = net.createConnection({port: STDERR_PORT}, function () {
    console.log('stderr connected on port ', STDERR_PORT);
  });
  nwwr.stderr.on('error', function (err) {
    console.log('Failed to connect to stderr server on port ' + STDERR_PORT + '. '+ err.code);
  });
}