module.exports = function(arr, config) {
   "use strict";
   var queue = {};
   var executed = [];
   var data = [];
   config = config || {};

   var _addCode = function(url, name, deps, pos) {
      if(!utils.isEmptyArray(deps)) {
         deps.forEach(function(v) {
            if(executed.indexOf(v) > -1) {
               deps.slice(deps.indexOf(v), 1);
            }
         });
      }
      !utils.isEmptyArray(deps) ? _enqueue(url, name, deps, pos) : _execute(url, name, pos);
   };

   var _enqueue = function(url, name, deps, pos) {
      if(!queue[name]) {
         queue[name] = {};
         queue[name].url = url;
         queue[name].pos = pos;
         queue[name].deps = deps;
      }
   };

   var _wasDependency = function(name) {
      for(var key in queue) {
         if(queue.hasOwnProperty(key)) {
            var value = queue[key];
            var num = value.deps.indexOf(name);
            if(num > -1) {
               queue[key].deps.splice(num, 1);
               if(!queue[key].deps.length) {
                  _execute(value.url, key, value.pos);
               }
            }
         }
      }
   };

   var _execute = function(url, name, pos) {
      var d = {};
      d.name = name;
      d.url = url;
      d.pos = pos;
      data.push(d);
      if(executed.indexOf(name) == -1) executed.push(name);
      _wasDependency(name);
   };

   var originalPos = 0;
   arr.forEach(function(name) {
      var url = name;
      var deps = [];
      if(config[name]) {
         url = config[name].url || url;
         deps = config[name].deps || deps;
      }
      _addCode(url, name, deps, originalPos);
      originalPos += 1;
   });

   if(!utils.isEmptyObject(queue)) {
      executed.forEach(function(name) {
         _wasDependency(name);
      });
   }

   return data;
};

/**
 * Basic utils
 * @type {{isArray: utils.isArray, isObject: utils.isObject, isString: utils.isString, isNumber: utils.isNumber, isFunction: utils.isFunction, isEmptyObject: utils.isEmptyObject, isEmptyArray: utils.isEmptyArray, objectLen: utils.objectLen}}
 */
var utils = {
   isArray: function(x) {
      return Object.prototype.toString.call(x) == "[object Array]";
   },
   isObject: function(x) {
      return Object.prototype.toString.call(x) == "[object Object]";
   },
   isString: function(x) {
      return Object.prototype.toString.call(x) == "[object String]";
   },
   isNumber: function(x) {
      return Object.prototype.toString.call(x) == "[object Number]";
   },
   isFunction: function(x) {
      return Object.prototype.toString.call(x) == "[object Function]";
   },
   isEmptyObject: function(x) {
      return !Object.keys(x).length;
   },
   isEmptyArray: function(x) {
      return !x.length;
   },
   objectLen: function(x) {
      return Object.keys(x).length;
   }
};