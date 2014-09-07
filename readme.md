# nw-wrap

There are various open issues in node-webkit's github page regarging problems with [stdin][1],
[stdout][2], [stderr][3] and [argv][4]. This module wraps nw to work arroung this issues.

## Usage


There are two parts to it. `runner.js` is what you execute as the parent process:

```bash
npm install nw-wrap
ln -s node_modules/nw-wrap/runner.js # or copy it.
node runner.js args to node webkit and your app
```

The other part, `main.js`, is what you get when you `require('nw-wrap')` from inside your appliaction.
It returns an extended process object, with process.stdin connected to the runners process.stdin via TCP.
```javascript
nwwr = require('nw-wrap');
nwwr.stdin.pipe(nwwr.stdout);
```

For stdout and stderr the default behaviour is to pipe them to the parent process, but if stdout
isn't working for you, or you want to clear up stderr for your own use, you can set the STDOUT_PORT,
STDERR_PORT environment variables, and nw-wrap will connect the respective stream over TCP to the runners
corresponding standard stream.

For example, on linux stdout works just fine, but you might want to silence nw's stderr:
```bash
STDERR_PORT=7869 node runner.js args to node webkit and your app
```
## Note

Overriding the global.process with the return value of require('nw-wrap') breaks things,
I don't know why. Doing so is probably a bad idea anyway. At first I did this so I could
use an cli options parser like yargs pick process.argv up correctly. Fortunately, that's
not necessary, since you can feed yargs any object, so I just pass it `nwwr.argv`.

## Licence

MIT


[1]: https://github.com/rogerwang/node-webkit/issues/586
[2]: https://github.com/rogerwang/node-webkit/issues/343
[3]: https://github.com/rogerwang/node-webkit/issues/1929
[4]: https://github.com/rogerwang/node-webkit/issues/1643