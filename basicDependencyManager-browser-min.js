var DependencyManager=function(t,n){"use strict";var r={},e=[],i={};n=n||{};var c=function(t,n,r,i){utils.isEmptyArray(r)||r.forEach(function(t){e.indexOf(t)>-1&&r.slice(r.indexOf(t),1)}),utils.isEmptyArray(r)?s(t,n,i):o(t,n,r,i)},o=function(t,n,e,i){r[n]||(r[n]={},r[n].url=t,r[n].pos=i,r[n].deps=e)},u=function(t){for(var n in r)if(r.hasOwnProperty(n)){var e=r[n],i=e.deps.indexOf(t);i>-1&&(r[n].deps.splice(i,1),r[n].deps.length||s(e.url,n,e.pos))}},s=function(t,n,r){i[n]={},i[n].url=t,i[n].pos=r,-1==e.indexOf(n)&&e.push(n),u(n)},p=0;return t.forEach(function(t){var r=t,e=[];n[t]&&(r=n[t].url||r,e=n[t].deps||e),c(r,t,e,p),p+=1}),utils.isEmptyObject(r)||e.forEach(function(t){u(t)}),i},utils={isArray:function(t){return"[object Array]"==Object.prototype.toString.call(t)},isObject:function(t){return"[object Object]"==Object.prototype.toString.call(t)},isString:function(t){return"[object String]"==Object.prototype.toString.call(t)},isNumber:function(t){return"[object Number]"==Object.prototype.toString.call(t)},isFunction:function(t){return"[object Function]"==Object.prototype.toString.call(t)},isEmptyObject:function(t){return!Object.keys(t).length},isEmptyArray:function(t){return!t.length},objectLen:function(t){return Object.keys(t).length}};