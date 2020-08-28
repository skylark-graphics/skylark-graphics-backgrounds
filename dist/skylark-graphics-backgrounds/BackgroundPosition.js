/**
 * skylark-graphics-backgrounds - The skylark background class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./backgrounds"],function(t,n){var i=t.klass({klassName:"BackgroundPosition",x:{get:function(){return this._.x}},y:{get:function(){return this._.y}},clone:function(){var t=this._;return new i(t.x,t.y)},notEqual:function(t){return!bs||bs.type!=this.type||bs.width&&bs.width.notEqual(this.width)||bs.height&&bs.height.notEqual(this.height)},equal:function(t){return!this.notEqual(t)},toString:function(t){t=t||" ";var n,i,r=this.x,o=this.y;return"min"==(n=r.toString())?n="left":"mid"==n?n="center":"max"==n&&(n="right"),"min"==(i=o.toString())?i="top":"mid"==n?i="center":"max"==n&&(i="bottom"),n+t+i},_construct:function(t,n){var i={};void 0!=t&&(Type.isString(t)&&("left"==t?t="min":"center"==t?t="mid":"right"==t&&(t="max")),i.x=t),void 0!=n&&(Type.isString(n)&&("top"==n?n="min":"center"==n?n="mid":"bottom"==n&&(n="max")),i.y=n),this._=i}});return i.fromString=function(t){var n=t.split(" ");return i.fromArray(n)},i.fromPlain=function(t){return new i(t.x,t.y)},i.fromArray=function(t){return new i(t[0],t.length>1?t[1]:"center")},i.fromCss=function(t){return void 0!=t.backgroundPosition?i.fromString(t.backgroundPosition):null},i.toCss=function(t,n){return n||(n={}),t&&(n.backgroundPosition=t.toString()),n},n.BackgroundPosition=i});
//# sourceMappingURL=sourcemaps/BackgroundPosition.js.map
