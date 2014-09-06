var child = require('child_process');
var nw = child.spawn(process.env.NW_CMD || 'node-webkit', process.argv.slice(2));

process.on('exit', function () {
  nw.kill();
});

var net = require('net');

// nw stdout works fine, use it
nw.stdout.pipe(process.stdout);

var net = require('net');

// circumvent nw broken stdin by pipeing process.stdin to
// a socket that you can connect to from inside nw.
var STDIN_PORT = process.env.STDIN_PORT || 3784;
var stdin_server = net.createServer(function (socket) {
  process.stdin.pipe(socket);
}).listen(STDIN_PORT);



var STDERR_PORT = process.env.STDERR_PORT;
if (STDERR_PORT) {
  var stderr = net.createServer(function (socket) {
    socket.pipe(process.stderr);
  }).listen(STDERR_PORT);
} else {
  // set it to 0 to supress nw's stderr
  if (STDERR_PORT !== '0')
    nw.stderr.pipe(process.stderr);
}