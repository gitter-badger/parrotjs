/**
 * parrotjs - Client library to connect your frontend application with whatever API backend
 * @version v0.11.04
 * @link    http://github.com/sailor/parrotjs
 * @author  Kiko Beats (https://github.com/Kikobeats)
 * @license MIT
 */
(function(){"use strict";var e;e=this.parrot={version:"0.11.04",environment:"development",language:window.navigator.language.slice(0,2),initialize:{},endpoint:{},url:{},store:{local:{},session:{}},$:"undefined"!=typeof $$&&null!==$$?$$:$},function(){return e._DEFAULT={METHOD:"GET",PROTOCOL:"http",SEND:{},HEADERS:void 0},e._partial=function(e){var t;return t=Array.prototype.slice.call(arguments,1),function(){var r;return r=t.concat(Array.prototype.slice.call(arguments)),e.apply(this,r)}},e._createAjaxPromise=function(t){return new Promise(function(r){return function(n,s){return e.$.ajax({type:t.method||r._DEFAULT.METHOD,url:t.url,data:t.send||r._DEFAULT.SEND,dataType:"json",contentType:"application/x-www-form-urlencoded",beforeSend:function(e){var r,n,s,o,i;if(null!=t.headers){for(n=Object.keys(t.headers),i=[],s=0,o=n.length;o>s;s++)r=n[s],i.push(e.setRequestHeader(r,t.headers[r]));return i}},success:function(e){return 0===e.status?s({code:0,message:"Server Unavailable"}):n(e)},error:function(e){return s({code:e.status,message:e.responseJSON})}})}}(this))},e.ajax=function(t,r){var n;return n=""+e.endpoint[e.environment](),t.url?t.url!==n&&t.url!==""+n+"/"+t.path&&t.url!==""+n+"?"+t.query&&t.url!==""+n+"/"+t.path+"?"+t.query&&(null!=t.path&&(t.url=""+t.url+"/"+t.path),null!=t.query&&(t.url=""+t.url+"?"+t.query)):("string"==typeof arguments[0]&&(t=e.url._URLS[arguments[0]]||{url:arguments[0]}),t.query&&t.path?t.url=""+n+"/"+t.path+"?"+t.query:(t.query&&!t.path&&(t.url=""+n+"?"+t.query),t.path&&!t.query&&(t.url=""+n+"/"+t.path))),this._createAjaxPromise(t).then(function(e){return r(null,e)},function(e){return r(e,null)})}}(),function(t){return t.add=function(e){return this[e.name]=function(){return e.url},this},t.set=function(t){return e.environment=t,this},t.remove=function(e){return delete this[e],this}}(e.endpoint),function(t){return t._URLS={},t._getQuery=function(e){var t,r,n,s,o,i,u,l,a,c;for(c=new Url,a=["protocol","path","host","port","hash"],o=0,u=a.length;u>o;o++)r=a[o],c[r]="";for(t=i=0,l=e.length;l>i;t=i+=2)n=e[t],c.query[n]=e[t+1];return s=c.toString(),"?"===s.charAt(0)&&(s=s.substring(1)),s},t._bindAdd=function(e,t){return null!=t&&(null!=t.headers&&(this._URLS[e].headers=t.headers),null!=t.method&&(this._URLS[e].method=t.method),null!=t.protocol&&(this._URLS[e].protocol=t.protocol),null!=t.path&&(this._URLS[e].path=t.path),null!=t.query&&(this._URLS[e].query=this._getQuery(t.query)),null!=t.send&&(this._URLS[e].send=t.send)),this._URLS[e]},t.add=function(r){return this._URLS[r.name]={headers:null==r.headers?e._DEFAULT.HEADERS:r.headers,method:null==r.method?e._DEFAULT.METHOD:r.method,protocol:null==r.protocol?e._DEFAULT.PROTOCOL:r.protocol,query:null!=r.query?this._getQuery(r.query):void 0,path:r.path,send:r.send},this[r.name]=e._partial(this._bindAdd,r.name).bind(t),this},t.remove=function(e){return delete this[e],this}}(e.url),function(t){return t._init=function(){var r,n,s,o,i,u,l,a;for(u=Object.keys(localStorage),n=0,o=u.length;o>n;n++)r=u[n],this.local[r]=e._partial(this._get,"local",r).bind(t);for(l=Object.keys(sessionStorage),a=[],s=0,i=l.length;i>s;s++)r=l[s],a.push(this.session[r]=e._partial(this._get,"session",r).bind(t));return a},t._storage=function(e){return"local"===e?localStorage:sessionStorage},t._get=function(e,t){var r,n;r=this._storage(e).getItem(t);try{return r=JSON.parse(r)}catch(s){return n=s,r}},t._set=function(r,n,s){return"string"!=typeof s&&(s=JSON.stringify(s)),this._storage(r).setItem(n,s),this[r][n]=e._partial(this._get,r,n).bind(t)},t._clear=function(e,t){return delete this[e][t],this._storage(e).removeItem(t)},t._clearAll=function(e){var t,r,n,s;for(r=Object.keys(this._storage(e)),n=0,s=r.length;s>n;n++)t=r[n],delete this[e][t];return this._storage(e).clear()},t._size=function(e){return this._storage(e).length},t._is=function(e,t){return null!=this._storage(e)[t]?!0:!1},t.local.set=function(t,r){return e.store._set("local",t,r),this},t.local.clear=function(t){return e.store._clear("local",t),this},t.local.clearAll=function(){return e.store._clearAll("local"),this},t.local.size=function(){return e.store._size("local")},t.local.isAvailable=function(t){return e.store._is("local",t)},t.session.get=function(){return e.store._get("session","session")},t.session.set=function(){var t,r;return 1===arguments.length?(r="session",t=arguments[0]):(r=arguments[0],t=arguments[1]),e.store._set("session",r,t),this},t.session.clear=function(){var t;return t=0===arguments.length?"session":arguments[0],e.store._clear("session",t),this},t.session.clearAll=function(){return e.store._clearAll("session"),this},t.session.size=function(){return e.store._size("session")},t.session.isAvailable=function(){var t;return t=0===arguments.length?"session":arguments[0],e.store._is("session",t)},e.store._init()}(e.store)}).call(this);