var child = require('child_process');
var net = require('net');

// argv
var env = process.env;
env.ARGS = JSON.stringify(process.argv);
env.STDIN_PORT = process.env.STDIN_PORT || '3784';

var nw = child.spawn( process.env.NW_CMD || 'node-webkit',
                      process.argv.slice(2),
                      { env: env } );

// exit
process.on('exit', function () { nw.kill(); });
nw.on('close', function (code) { process.exit(code) });


// stdin
// circumvent nw broken stdin by pipeing process.stdin to
// a socket that you can connect to from inside nw.
net.createServer(function (socket) {
  process.stdin.pipe(socket);
}).listen(env.STDIN_PORT);


function setup (PORT, i, o) {
  if (PORT) {
    return net.createServer(function (socket) {
      socket.pipe(o);
    }).listen(PORT);
  } else {
    if (PORT !== '0') // set it to 0 to supress nw's stdout
      i.pipe(o);
  }
}

setup(env.STDOUT_PORT, nw.stdout, process.stdout);
setup(env.STDERR_PORT, nw.stderr, process.stderr);