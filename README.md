# Basic Dependency Manager
Basic dependency manager, this tool was made for a future basic dependency injector who serves as a base for a future
framework. Basic dependency manager can be modified with almost no effort for any purpose.

If you are looking for a dependency injector like requirejs but faster and lighter then you want to see my
[basic dependency injector](https://www.npmjs.com/package/basic-dependency-injector)

### Installation
```sh
$ npm install basic-dependency-manager
```

### Typical use
```
var arr = ["c", "b", "a", "d"];
var config = {
   a: {
      url: 'a.js'
   },
   e: {
      url: 'e.js'
   },
   b: {
      url: 'b.js',
      deps: ['a']
   },
   c: {
      url: 'c.js',
      deps: ['a', 'b']
   },
   d: {
      url: 'd.js',
      deps: ['a', 'b', 'c']
   }
};

var data = require("basicDependencyManager")(arr, config);
console.log(data);
```

The result its an ordered array like this:
```
[ { name: 'a', url: 'a.js', pos: 2 },
  { name: 'b', url: 'b.js', pos: 1 },
  { name: 'c', url: 'c.js', pos: 0 },
  { name: 'd', url: 'd.js', pos: 3 } ]
```

To modify this output you must change a bit the _execute function and adapt the calls to that function.