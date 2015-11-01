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

var data = require("../basicDependencyManager")(arr, config);
console.log(data);