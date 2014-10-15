var net = require('net');
var nwwr = module.exports = {};

for (var p in process)
  nwwr[p] = process[p];

nwwr.argv = JSON.parse(process.env.ARGS);

function setup (PORT, id) {
  if (PORT) {
    var c = net.createConnection({port: PORT}, function () {
      console.log('nw-wrap:', id + ' connected on port ', PORT);
    });

    c.on('error', function (err) {
      throw new Error('nw-wrap: Failed to connect ' + id + ' on port ' + PORT + '. '+ err.code);
    });
    return c;
  }
}

nwwr.stdin = setup(process.env.STDIN_PORT, 'stdin');
nwwr.stdout = setup(process.env.STDOUT_PORT, 'stdout') || nwwr.stdout;
nwwr.stderr = setup(process.env.STDERR_PORT, 'stderr') || nwwr.stderr;


