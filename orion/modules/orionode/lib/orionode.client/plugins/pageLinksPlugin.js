!function(e,r){"function"==typeof define&&define.amd?define("orion/Deferred",r):"object"==typeof exports?module.exports=r():(e.orion=e.orion||{},e.orion.Deferred=r())}(this,function(){function e(){for(var e;e=i.shift();)e();s=!1}function r(e){i.push(e),s||(s=!0,a())}function t(e){return function(r){e(r)}}function n(e,r,n){try{var o=e(r),i=o&&("object"==typeof o||"function"==typeof o)&&o.then;if("function"==typeof i)if(o===n.promise)n.reject(new TypeError);else{var s=o.cancel;"function"==typeof s?n._parentCancel=s.bind(o):delete n._parentCancel,i.call(o,t(n.resolve),t(n.reject),t(n.progress))}else n.resolve(o)}catch(a){n.reject(a)}}function o(){function e(){for(var e;e=l.shift();){var r=e.deferred,t="fulfilled"===u?"resolve":"reject",o=e[t];"function"==typeof o?n(o,a,r):r[t](a)}}function t(t){delete c._parentCancel,u="rejected",a=t,l.length&&r(e)}function i(n){function s(e){return function(r){u&&"assumed"!==u||e(r)}}delete c._parentCancel;try{var f=n&&("object"==typeof n||"function"==typeof n)&&n.then;if("function"==typeof f)if(n===c)t(new TypeError);else{u="assumed";var p=n&&n.cancel;if("function"!=typeof p){var h=new o;n=h.promise;try{f(h.resolve,h.reject,h.progress)}catch(d){h.reject(d)}p=n.cancel,f=n.then}a=n,f.call(n,s(i),s(t)),c._parentCancel=p.bind(n)}else u="fulfilled",a=n,l.length&&r(e)}catch(g){s(t)(g)}}function s(){var e=c._parentCancel;if(e)delete c._parentCancel,e();else if(!u){var r=new Error("Cancel");r.name="Cancel",t(r)}}var a,u,l=[],c=this;this.resolve=function(e){return u||i(e),c},this.reject=function(e){return u||t(e),c},this.progress=function(e){return u||l.forEach(function(r){if(r.progress)try{r.progress(e)}catch(t){}}),c.promise},this.cancel=function(){return c._parentCancel?setTimeout(s,0):s(),c},this.then=function(t,n,i){var s=new o;return s._parentCancel=c.promise.cancel,l.push({resolve:t,reject:n,progress:i,deferred:s}),("fulfilled"===u||"rejected"===u)&&r(e),s.promise},this.promise={then:c.then,cancel:c.cancel}}var i=[],s=!1,a=function(){if("undefined"!=typeof process&&"function"==typeof process.nextTick){var r=process.nextTick;return function(){r(e)}}if("function"==typeof MutationObserver){var t=document.createElement("div"),n=new MutationObserver(e);return n.observe(t,{attributes:!0}),function(){t.setAttribute("class","_tick")}}return function(){setTimeout(e,0)}}();return o.all=function(e,r){function t(e,r){a||(s[e]=r,0===--i&&u.resolve(s))}function n(e,n){if(!a){if(r)try{return void t(e,r(n))}catch(o){n=o}u.reject(n)}}var i=e.length,s=[],a=!1,u=new o;return u.then(void 0,function(){a=!0,e.forEach(function(e){e.cancel&&e.cancel()})}),0===i?u.resolve(s):e.forEach(function(e,r){e.then(t.bind(void 0,r),n.bind(void 0,r))}),u.promise},o.when=function(e,r,t,n){var i,s;return e&&"function"==typeof e.then?i=e:(s=new o,s.resolve(e),i=s.promise),i.then(r,t,n)},o}),define("orion/PageUtil",[],function(){function e(){var e=window.location.href.split("#")[1];return e=e?"#"+e:""}function r(e){e=e||window.location.toString();var r={resource:""},t=e.indexOf("#");if(-1!==t){var n=e.substring(t+1);if(0!==n.length){var o=n.split(",");r.resource=decodeURIComponent(o[0]);for(var i=1;i<o.length;i++){var s=o[i],a=/([^=]*)(=?)(.*)/.exec(s),u=decodeURIComponent(a[1]||""),l=decodeURIComponent(a[3]||"");""!==u&&"resource"!==u&&(r[u]=l)}}}return r}function t(e,r){var t=e;if(-1===e.indexOf("://")){var o=document.createElement("a");o.href=e,t=o.href}var i=!1;return i=r?r.some(function(e){return new RegExp("^"+e+":","i").test(t)}):n.test(t),i?e:(console.log("Illegal URL Scheme: '"+e+"'"),"")}var n=new RegExp("^http[s]?","i");return{hash:e,matchResourceParameters:r,validateURLScheme:t}}),define("orion/URITemplate",[],function(){function e(e){this._text=e}function r(e){return e.replace("%25","%")}function t(e,t){if("U"===t)return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()});if("U+R"===t)return encodeURI(e).replace(/%5B/g,"[").replace(/%5D/g,"]").replace(f,r);if("U+R-,"===t)return encodeURI(e).replace(/%5B/g,"[").replace(/%5D/g,"]").replace(/,/g,"%2C");throw new Error("Unknown allowed character set: "+t)}function n(e,r,n){for(var o=[],i=0;i<e.length;i++)"undefined"!=typeof e[i]&&o.push(t(e[i],r));return o.join(n)}function o(e,r,n,o){for(var i=Object.keys(e),s=[],a=0;a<i.length;a++)"undefined"!=typeof e[i[a]]&&s.push(t(i[a],r)+n+t(e[i[a]],r));return s.join(o)}function i(e){for(var r=[],t=e.split(","),n=0;n<t.length;n++){var o=t[n].match(c);if(null===o)throw new Error("Bad VarSpec: "+e);r.push({name:o[1],explode:!!o[2],prefix:o[3]?parseInt(o[3],10):-1})}return r}function s(e){if(0===e.length)throw new Error("Invalid Expression: 0 length expression");this._operator=l[e[0]],this._operator?e=e.substring(1):this._operator=l.NUL,this._varSpecList=i(e)}function a(r){for(var t=[],n=0,o=r.indexOf("{",n);-1!==o;){t.push(new e(r.substring(n,o)));var i=r.indexOf("}",o+1);if(-1===i)throw new Error("Invalid template: "+r);t.push(new s(r.substring(o+1,i))),n=i+1,o=r.indexOf("{",n)}return t.push(new e(r.substring(n))),t}function u(e){this._templateComponents=a(e)}var l={NUL:{first:"",sep:",",named:!1,ifemp:"",allow:"U"},"+":{first:"",sep:",",named:!1,ifemp:"",allow:"U+R"},".":{first:".",sep:",",named:!1,ifemp:"",allow:"U"},"/":{first:"/",sep:"/",named:!1,ifemp:"",allow:"U"},";":{first:";",sep:";",named:!0,ifemp:"",allow:"U"},"?":{first:"?",sep:"&",named:!0,ifemp:"=",allow:"U"},"&":{first:"&",sep:"&",named:!0,ifemp:"=",allow:"U"},"#":{first:"#",sep:",",named:!1,ifemp:"",allow:"U+R"},",":{first:"",sep:",",named:!1,ifemp:"",allow:"U+R-,"}},c=/^((?:(?:[a-zA-Z0-9_])|(?:%[0-9A-F][0-9A-F]))(?:(?:[a-zA-Z0-9_.])|(?:%[0-9A-F][0-9A-F]))*)(?:(\*)|:([0-9]+))?$/,f=/%25[0-9A-F][0-9A-F]/g;return e.prototype={expand:function(){return encodeURI(this._text)}},s.prototype={expand:function(e){for(var r=[],i=0;i<this._varSpecList.length;i++){var s=this._varSpecList[i],a=s.name,u=e[a],l=typeof u;if("undefined"!==l&&null!==u){var c=0===r.length?this._operator.first:this._operator.sep;if("string"===l)this._operator.named&&(c+=t(a,"U+R"),c+=0===u.length?this._operator.ifemp:"="),-1!==s.prefix&&s.prefix<u.length&&(u=u.substring(0,s.prefix)),c+=t(u,this._operator.allow);else if(Array.isArray(u)){if(0===u.length)continue;if(s.explode)c+=n(u,this._operator.allow,this._operator.sep);else{var f=n(u,this._operator.allow,",");this._operator.named&&(c+=t(a,"U+R"),c+=0===f.length?this._operator.ifemp:"="),c+=f}}else{if("object"!==l)throw new Error("bad param type: "+a+" : "+l);if(0===Object.keys(u).length)continue;if(s.explode)c+=o(u,this._operator.allow,"=",this._operator.sep);else{var p=o(u,this._operator.allow,",",",");this._operator.named&&(c+=t(a,"U+R"),c+=0===p.length?this._operator.ifemp:"="),c+=p}}r.push(c)}}return r.join("")}},u.prototype={expand:function(e){for(var r=[],t=0;t<this._templateComponents.length;t++)r.push(this._templateComponents[t].expand(e));return r.join("")}},u}),define("orion/i18nUtil",["require","orion/Deferred"],function(e,r){function t(e){var r=arguments;return e.replace(/\$\{([^\}]+)\}/g,function(e,t){return r[(t<<0)+1]})}function n(e){var r=localStorage.getItem("orion/messageBundle/"+e);if(r){var t=JSON.parse(r);if(t._expires&&t._expires>(new Date).getTime())return delete t._expires,t}return null}function o(e,r){r._expires=(new Date).getTime()+9e5,localStorage.setItem("orion/messageBundle/"+e,JSON.stringify(r)),delete r._expires}function i(t){function i(r){r?e(["i18n!"+t],function(e){e&&o(t,e),u.resolve(e)}):a(new Error(t))}function a(e){u.reject(e)}if(s[t])return s[t];var u=new r;s[t]=u;var l=n(t);if(l)return u.resolve(l),u;try{e([t],i,a)}catch(c){e(["orion/i18n!"+t],i,a)}return u}var s={};return{getMessageBundle:i,formatMessage:t}}),define("orion/objects",[],function(){function e(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}return{clone:function(r){if(Array.isArray(r))return Array.prototype.slice.call(r);var t=Object.create(Object.getPrototypeOf(r));return e(t,r),t},mixin:e,toArray:function(e){return Array.isArray(e)?e:[e]}}}),function(){function e(e){if("string"!=typeof e)throw new TypeError}function r(e){return e?e.split("&"):[]}function t(e){return 0===e.length?"":e.join("&")}function n(e){var r=/([^=]*)(?:=?)(.*)/.exec(e),t=r[1]?decodeURIComponent(r[1]):"",n=r[2]?decodeURIComponent(r[2]):"";return[t,n]}function o(e){var r=encodeURIComponent(e[0]);return e[1]&&(r+="="+encodeURIComponent(e[1])),r}function i(e,t){var o="",i=[],s=0;return{next:function(){if(o!==e.query&&(o=e.query,i=r(o)),s<i.length){var a=n(i[s++]);switch(t){case"keys":return a[0];case"values":return a[1];case"keys+values":return[a[0],a[1]];default:throw new TypeError}}throw E}}}function s(e){Object.defineProperty(this,"_url",{get:function(){return e._url}})}function a(e,r){if(!e.scheme&&r&&(e.scheme=r.scheme,!e.host&&r.host&&(e.userinfo=r.userinfo,e.host=r.host,e.port=r.port,e.pathRelative=!0)),e.pathRelative)if(e.path){if("/"!==e.path[0]){var t=/^(.*\/)[^\/]*$/.exec(r.path)[1]||"/";e.path=t+e.path}}else e.path=r.path}function u(e){return e.toLowerCase()}function l(e){return e?/[1-9]\d*$/.exec(e)[0]:""}function c(e){var r=[];return e.split("/").forEach(function(e){".."===e?r.pop():"."!==e&&r.push(e)}),r.join("/")}function f(e){e.scheme&&(e.scheme=u(e.scheme)),e.port&&(e.port=l(e.port)),e.host&&e.path&&(e.path=c(e.path))}function p(e){return e.replace(/\s/g,function(e){return"%"+e.charCodeAt(0).toString(16)})}function h(e,r){if("string"!=typeof e)throw new TypeError;e=p(e);var t=y.exec(e);if(!t)return null;var n={};if(n.scheme=t[1]||"",n.scheme&&!b.test(n.scheme))return null;var o=t[2];if(o){var i=_.exec(o);if(n.userinfo=i[1],n.host=i[2],n.port=i[3],n.port&&!x.test(n.port))return null}return n.path=t[3],n.query=t[4],n.fragment=t[5],a(n,r),f(n),n}function d(e){var r=e.scheme?e.scheme+":":"";return e.host&&(r+="//",e.userinfo&&(r+=e.userinfo+"@"),r+=e.host,e.port&&(r+=":"+e.port)),r+=e.path,e.query&&(r+="?"+e.query),e.fragment&&(r+="#"+e.fragment),r}function g(e,r){var t;if(r){if(r=r.href||r,t=h(r),!t||!t.scheme)throw new SyntaxError;Object.defineProperty(this,"_baseURL",{value:t})}var n=h(e,t);if(!n)throw new SyntaxError;Object.defineProperty(this,"_input",{value:e,writable:!0}),Object.defineProperty(this,"_url",{value:n,writable:!0});var o=new s(this);Object.defineProperty(this,"query",{get:function(){return this._url?o:null},enumerable:!0})}try{var m;if("function"==typeof window.URL&&0!==window.URL.length&&"http:"===(m=new window.URL("http://www.w3.org?q")).protocol&&m.query)return}catch(v){}var y=/^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?$/,_=/^(?:(.*)@)?(\[[^\]]*\]|[^:]*)(?::(.*))?$/,w=/^\S*$/,b=/^([a-zA-Z](?:[a-zA-Z0-9+-.])*)$/,x=/^\d*$/,U=/^(\[[^\]\/?#\s]*\]|[^:\/?#\s]*)$/,j=/^(\[[^\]\/?#\s]*\]|[^:\/?#\s]*)(?::(\d*))?$/,S=/^([^?#\s]*)$/,C=/^([^\s]*)$/,L=w,R=/([^:]*):?(.*)/,E="undefined"!=typeof StopIteration?StopIteration:new Error("Stop Iteration"),O={"ftp:":"21","gopher:":"70","http:":"80","https:":"443","ws:":"80","wss:":"443"};Object.defineProperties(s.prototype,{get:{value:function(t){e(t);var o,i=r(this._url.query);return i.some(function(e){var r=n(e);return r[0]===t?(o=r[1],!0):void 0}),o},enumerable:!0},set:{value:function(i,s){e(i),e(s);var a=r(this._url.query),u=a.some(function(e,r){var t=n(e);return t[0]===i?(t[1]=s,a[r]=o(t),!0):void 0});u||a.push(o([i,s])),this._url.query=t(a)},enumerable:!0},has:{value:function(t){e(t);var o=r(this._url.query);return o.some(function(e){var r=n(e);return r[0]===t?!0:void 0})},enumerable:!0},"delete":{value:function(o){e(o);var i=r(this._url.query),s=i.filter(function(e){var r=n(e);return r[0]!==o});return s.length!==i.length?(this._url.query=t(s),!0):!1},enumerable:!0},clear:{value:function(){this._url.query=""},enumerable:!0},forEach:{value:function(e,r){if("function"!=typeof e)throw new TypeError;var t=i(this._url,"keys+values");try{for(;;){var n=t.next();e.call(r,n[1],n[0],this)}}catch(o){if(o!==E)throw o}},enumerable:!0},keys:{value:function(){return i(this._url,"keys")},enumerable:!0},values:{value:function(){return i(this._url,"values")},enumerable:!0},items:{value:function(){return i(this._url,"keys+values")}},size:{get:function(){return r(this._url.query).length},enumerable:!0},getAll:{value:function(t){e(t);var o=[],i=r(this._url.query);return i.forEach(function(e){var r=n(e);r[0]===t&&o.push(r[1])}),o},enumerable:!0},append:{value:function(n,i){e(n),e(i);var s=r(this._url.query);s.push(o([n,i])),this._url.query=t(s)},enumerable:!0}}),Object.defineProperties(g.prototype,{href:{get:function(){return this._url?d(this._url):this._input},set:function(r){e(r),this._input=r,this._url=h(this._input,this._baseURL)},enumerable:!0},origin:{get:function(){return this._url&&this._url.host?this.protocol+"//"+this.host:""},enumerable:!0},protocol:{get:function(){return this._url?this._url.scheme+":":":"},set:function(r){if(e(r),this._url){var t=":"===r.slice(-1)?r.substring(0,r.length-1):r;(""===t||b.test(t))&&(this._url.scheme=u(t))}},enumerable:!0},_userinfo:{get:function(){return this._url?this._url.userinfo:""},set:function(r){e(r),this._url&&(this._url.userinfo=r)}},username:{get:function(){if(!this._url)return"";var e=R.exec(this._userinfo),r=decodeURIComponent(e[1]||"");return r},set:function(r){if(e(r),this._url){var t=R.exec(this._userinfo),n=[encodeURIComponent(r||"")];t[2]&&n.push(t[2]),this._userinfo=n.join(":")}},enumerable:!0},password:{get:function(){if(!this._url)return"";var e=R.exec(this._userinfo),r=decodeURIComponent(e[2]||"");return r},set:function(r){if(e(r),this._url){var t=R.exec(this._userinfo),n=[t[1]||""];r&&n.push(encodeURIComponent(r)),this._userinfo=n.join(":")}},enumerable:!0},host:{get:function(){var e="";return this._url&&this._url.host&&(e+=this._url.host,this._url.port&&(e+=":"+this._url.port)),e},set:function(r){if(e(r),this._url){var t=j.exec(r);t&&(this._url.host=t[1],this._url.port=l(t[2]))}},enumerable:!0},hostname:{get:function(){return this._url?this._url.host:""},set:function(r){if(e(r),this._url){var t=U.exec(r);t&&(this._url.host=r)}},enumerable:!0},port:{get:function(){var e=this._url?this._url.port||"":"";return e&&e===O[this.protocol]&&(e=""),e},set:function(r){if(e(r),this._url){var t=x.exec(r);t&&(this._url.port=l(r))}},enumerable:!0},pathname:{get:function(){return this._url?this._url.path:""},set:function(r){if(e(r),this._url){var t=S.exec(r);t&&(this._url.host&&r&&"/"!==r[0]&&(r="/"+r),this._url.path=r?c(r):"")}},enumerable:!0},search:{get:function(){return this._url&&this._url.query?"?"+this._url.query:""},set:function(r){if(e(r),this._url){r&&"?"===r[0]&&(r=r.substring(1));var t=C.exec(r);t&&(this._url.query=r)}},enumerable:!0},hash:{get:function(){return this._url&&this._url.fragment?"#"+this._url.fragment:""},set:function(r){if(e(r),this._url){r&&"#"===r[0]&&(r=r.substring(1));var t=L.exec(r);t&&(this._url.fragment=r)}},enumerable:!0}});var k=window.URL||window.webkitURL;k&&k.createObjectURL&&(Object.defineProperty(g,"createObjectURL",{value:k.createObjectURL.bind(k),enumerable:!1}),Object.defineProperty(g,"revokeObjectURL",{value:k.revokeObjectURL.bind(k),enumerable:!1})),window.URL=g}(),define("orion/URL-shim",function(){}),define("orion/PageLinks",["require","orion/Deferred","orion/PageUtil","orion/URITemplate","orion/i18nUtil","orion/objects","orion/URL-shim"],function(e,r,t,n,o,i){function s(){return e.toUrl?new URL(e.toUrl("orion/../"),window.location.href).href.slice(0,-1):new URL("/",window.location.href).href.slice(0,-1)}function a(e,r){return c(e,r).then(function(e){return new h(e)})}function u(e){var r={};return e.getPropertyKeys().forEach(function(t){"objectClass"!==t&&"service.names"!==t&&"service.id"!==t&&"__plugin__"!==t&&(r[t]=e.getProperty(t))}),r}function l(e){return o.getMessageBundle(e.nls).then(function(r){return e.textContent=e.nameKey?r[e.nameKey]:e.name,e},function(){return e.textContent=e.nameKey||e.name,e})}function c(e,o){o=o||"orion.page.link";var i=e.getServiceReferences(o),a=t.matchResourceParameters(window.location.href),c=s(),f={OrionHome:c,Location:a.resource},p=[];return i.forEach(function(e){var o=u(e);if(o.uriTemplate&&(o.nls||o.name)){var i=new n(o.uriTemplate),s=i.expand(f);s=t.validateURLScheme(s),o.href=s,o.nls?p.push(l(o)):(o.textContent=o.name,p.push((new r).resolve(o)))}}),r.all(p)}function f(e){var t;if(!m){t=[];var n=e.getServiceReferences("orion.page.link.category");return n.forEach(function(e){var n=u(e);n.id&&(n.name||n.nameKey)&&(n.nls?t.push(l(n)):(n.textContent=n.name,t.push((new r).resolve(n))))}),r.all(t).then(function(e){return m=new p(e)})}return(new r).resolve(m)}function p(e){var r=this.categories=Object.create(null);e.forEach(function(e){r[e.id]=e})}function h(e){this.allPageLinks=e,this.allPageLinks.sort(d)}function d(e,r){var t=e.textContent&&e.textContent.toLowerCase(),n=r.textContent&&r.textContent.toLowerCase();return n>t?-1:t>n?1:0}function g(e,r,t){var n=document.createElement("a");return n.href=e,n.target=r,n.classList.add("targetSelector"),n.textContent=t,n}var m;return i.mixin(p.prototype,{getCategoryIDs:function(){return Object.keys(this.categories)},getCategory:function(e){return this.categories[e]||null}}),i.mixin(h.prototype,{createLinkElements:function(){return this.allPageLinks.map(function(e){return g(e.href,"_self",e.textContent)})},getAllLinks:function(){return this.allPageLinks}}),{getCategoriesInfo:f,getPageLinksInfo:a,getOrionHome:s}}),function(e,r){"function"==typeof define&&define.amd?define("orion/plugin",["orion/Deferred"],r):"object"==typeof exports?module.exports=r(require("orion/Deferred")):(e.orion=e.orion||{},e.orion.PluginProvider=r(e.orion.Deferred))}(this,function(e){function r(e,r){this.__objectId=e,this.__methods=r}function t(t){function n(e){h&&("undefined"==typeof ArrayBuffer&&(e=JSON.stringify(e)),h===self?h.postMessage(e):h.postMessage(e,"*"))}function o(){var e=[];return Object.keys(w).forEach(function(r){var t=w[r];e.push({serviceId:r,names:t.names,methods:t.methods,properties:t.properties})}),{headers:f||{},services:e}}function i(e,r){if(r&&r instanceof XMLHttpRequest){var t,n;try{t=r.status,n=r.statusText}catch(o){t=0,n=""}return{status:t||0,statusText:n}}return r}function s(e){var r=e?JSON.parse(JSON.stringify(e,i)):e;return e instanceof Error&&(r.__isError=!0,r.message=r.message||e.message,r.name=r.name||e.name),r}function a(t){if(!h)return(new e).reject(new Error("plugin not connected"));t.id=String(d++);var n=new e;y[t.id]=n,n.then(null,function(e){p&&e instanceof Error&&"Cancel"===e.name&&b({requestId:t.id,method:"cancel",params:e.message?[e.message]:[]})});var o=Object.prototype.toString;return t.params.forEach(function(e,i){if("[object Object]"===o.call(e)&&!(e instanceof r)){var s,a;for(s in e)"[object Function]"===o.call(e[s])&&(a=a||[],a.push(s));if(a){var u=g++;_[u]=e;var l=function(){delete _[u]};n.then(l,l),t.params[i]=new r(u,a)}}}),b(t),n.promise}function u(e,r){e||0===e?b({id:e,result:null,error:r}):console.log(r)}function l(e,r,t,n){n.forEach(function(e,r){if(e&&"undefined"!=typeof e.__objectId){var t={};e.__methods.forEach(function(r){t[r]=function(){return a({objectId:e.__objectId,method:r,params:Array.prototype.slice.call(arguments)})}}),n[r]=t}});var o=void 0===typeof e?null:{id:e,result:null,error:null};try{var i=t.apply(r,n);if(!o)return;i&&"function"==typeof i.then?(v[e]=i,i.then(function(r){delete v[e],o.result=r,b(o)},function(r){v[e]&&(delete v[e],o.error=s(r),b(o))},function(){b({responseId:e,method:"progress",params:Array.prototype.slice.call(arguments)})})):(o.result=i,b(o))}catch(u){o&&(o.error=s(u),b(o))}}function c(e){if(e.source===h||"undefined"==typeof window){var r="string"!=typeof e.data?e.data:JSON.parse(e.data);try{if(r.method){var t=r.method,n=r.params||[];if("serviceId"in r){var o=w[r.serviceId];o||u(r.id,"service not found"),o=o.implementation,t in o?l(r.id,o,o[t],n):u(r.id,"method not found")}else if("objectId"in r){var i=_[r.objectId];i||u(r.id,"object not found"),!t in i?l(r.id,i,i[t],n):u(r.id,"method not found")}else if("requestId"in r){var s=v[r.requestId];s&&"cancel"===t&&s.cancel&&s.cancel.apply(s,n)}else{if(!("responseId"in r))throw new Error("Bad method: "+r.method);var a=y[r.responseId];a&&"progress"===t&&a.progress&&a.progress.apply(a,n)}}else{var c=y[String(r.id)];delete y[String(r.id)],r.error?c.reject(r.error):c.resolve(r.result)}}catch(f){console.log("Plugin._messageHandler "+f)}}}var f=t,p=!1,h=null,d=0,g=0,m=0,v={},y={},_={},w={},b=n;this.updateHeaders=function(e){if(p)throw new Error("Cannot update headers. Plugin Provider is connected");f=e},this.registerService=function(e,r,t){if(p)throw new Error("Cannot register service. Plugin Provider is connected");"string"==typeof e?e=[e]:Array.isArray(e)||(e=[]);var n=null,o=[];for(n in r)"function"==typeof r[n]&&o.push(n);w[m++]={names:e,methods:o,implementation:r,properties:t||{},listeners:{}}},this.registerServiceProvider=this.registerService,this.connect=function(e,r){if(p)return void(e&&e());if("undefined"==typeof window)h=self;else if(window!==window.parent)h=window.parent;else{if(null===window.opener)return void(r&&r("No valid plugin target"));h=window.opener}addEventListener("message",c,!1);var t={method:"plugin",params:[o()]};n(t),p=!0,e&&e()},this.disconnect=function(){p&&(removeEventListener("message",c),h=null,p=!1)}}return t}),define("plugins/pageLinksPlugin",["require","orion/PageLinks","orion/plugin","orion/URITemplate"],function(e,r,t,n){var o={},i={name:"Orion Page Links",version:"1.0",description:"This plugin provides the top-level page links for Orion."},s=new t(i);s.registerService("orion.page.link.category",null,{id:"edit",nameKey:"Editor",nls:"orion/nls/messages",imageClass:"core-sprite-edit",order:10}),s.registerService("orion.page.link.category",null,{id:"search",nameKey:"Search",nls:"orion/nls/messages",imageClass:"core-sprite-search",order:30}),s.registerService("orion.page.link.category",null,{id:"shell",nameKey:"Shell",nls:"orion/nls/messages",imageClass:"core-sprite-shell",order:40}),s.registerService("orion.page.link.category",null,{id:"settings",nameKey:"Settings",nls:"orion/widgets/nls/messages",imageClass:"core-sprite-gear",order:60}),s.registerService("orion.page.link",null,{nameKey:"EditorLinkWorkspace",nls:"orion/nls/messages",tooltip:"Edit code",category:"edit","default":!0,uriTemplate:"{+OrionHome}/edit/edit.html"}),s.registerService("orion.page.link",o,{nameKey:"ShellLinkWorkspace",id:"orion.shell",nls:"orion/nls/messages",category:"shell","default":!0,uriTemplate:"{+OrionHome}/shell/shellPage.html"}),s.registerService("orion.page.link",o,{nameKey:"Search",id:"orion.Search",nls:"orion/nls/messages",category:"search","default":!0,order:10,uriTemplate:"{+OrionHome}/search/search.html"}),s.registerService("orion.page.link",null,{nameKey:"Settings",id:"orion.settings",nls:"orion/widgets/nls/messages",category:"settings","default":!0,uriTemplate:"{+OrionHome}/settings/settings.html"}),s.registerService("orion.page.link.related",null,{id:"orion.editFromMetadata",nameKey:"EditorRelatedLink",nls:"orion/nls/messages",tooltip:"Open Editor page",category:"edit",order:1,validationProperties:[{source:"ChildrenLocation|ContentLocation",variableName:"EditorLocation",replacements:[{pattern:"\\?depth=1$",replacement:""}]}],uriTemplate:"{+OrionHome}/edit/edit.html#{,EditorLocation}"}),s.registerService("orion.page.link.related",null,{id:"orion.editParent",nameKey:"EditorRelatedLinkParent",nls:"orion/nls/messages",category:"edit",order:3,validationProperties:[{source:"Parents[0]:Location",variableName:"EditorLocation",replacements:[{pattern:"\\?depth=1$",replacement:""}]}],uriTemplate:"{+OrionHome}/edit/edit.html#{,EditorLocation}"}),s.registerService("orion.page.link.related",null,{id:"orion.editProjectRoot",nameKey:"EditorRelatedLinkProj",nls:"orion/nls/messages",category:"edit",order:5,validationProperties:[{source:"Parents[-1]:Location",variableName:"EditorLocation",replacements:[{pattern:"\\?depth=1$",replacement:""}]}],uriTemplate:"{+OrionHome}/edit/edit.html#{,EditorLocation}"}),s.registerService("orion.page.link.user",null,{id:"orion.help",nameKey:"Help",nls:"orion/widgets/nls/messages",uriTemplate:e.toUrl("help/index.jsp"),category:"user.0"}),s.registerService("orion.page.link.user",null,{id:"orion.report.bug",nameKey:"Report a Bug",nls:"orion/widgets/nls/messages",uriTemplate:"https://bugs.eclipse.org/bugs/enter_bug.cgi?product=Orion&component=Client&version=5.0",category:"user.0"});var a=document.createElement("a");a.href="./contentTemplates/helloWorld.zip";var u=document.createElement("a");u.href="./contentTemplates/pluginHelloWorld.zip",s.registerService("orion.core.content",null,{id:"orion.content.html5",nameKey:"Sample HTML5 Site",nls:"orion/nls/messages",descriptionKey:"Generate an HTML5 'Hello World' website, including JavaScript, HTML, and CSS files.",contentURITemplate:a.href}),s.registerService("orion.core.content",null,{id:"orion.content.plugin",nameKey:"Sample Orion Plugin",nls:"orion/nls/messages",descriptionKey:"Generate a sample plugin for integrating with Orion.",contentURITemplate:u.href}),s.registerService("orion.core.setting",null,{settings:[{pid:"nav.config",nls:"orion/settings/nls/messages",nameKey:"Navigation",category:"general",categoryKey:"General",properties:[{id:"links.newtab",nameKey:"Links",type:"boolean",defaultValue:!1,options:[{value:!0,labelKey:"Open in new tab"},{value:!1,labelKey:"Open in same tab"}]}]}]});var l="http://orion-plugins.googlecode.com/git/index.html#?target={InstallTarget}&version={Version}&OrionHome={OrionHome}";s.registerService("orion.core.getplugins",null,{uri:decodeURIComponent(new n(l).expand({Version:"5.0",InstallTarget:r.getOrionHome()+"/settings/settings.html",OrionHome:r.getOrionHome()}))}),s.registerService("orion.page.getstarted",null,{data:[{label:"Add",image:"../images/add.png",secondaryImage:"../images/add-large-dulled.png",alt:"Add Content",media:"../media/Create.gif"},{label:"Modify",image:"../images/modify.png",secondaryImage:"../images/gear-large-dulled.png",alt:"Modify Content",media:"../media/Modify.gif"},{label:"Manage",image:"../images/manage.png",secondaryImage:"../images/hamburger-large-dulled.png",alt:"Manage Content",media:"../media/Manage.gif"}]}),s.connect()});