/**
 * skylark-graphics-backgrounds - The skylark background class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./backgrounds"],function(n,t){var r=["fixed","scroll"];return n.mixin(r,{fixed:0,scroll:1}),r.fromCss=function(n){return r.fromString(n.backgroundAttachment)},r.toCss=function(n,t){return t||(t={}),t.backgroundAttachment=n.toString(),t},t.BackgroundAttachment=r});
//# sourceMappingURL=sourcemaps/background-attachment.js.map
