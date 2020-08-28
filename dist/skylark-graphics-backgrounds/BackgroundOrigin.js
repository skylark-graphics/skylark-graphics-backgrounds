/**
 * skylark-graphics-backgrounds - The skylark background class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./backgrounds"],function(n,r){var o=["borderBox","contentBox","paddingBox"];return n.mixin(o,{borderBox:0,contentBox:1,paddingBox:2}),o.fromCss=function(n){switch(n.backgroundOrigin){case"border-box":return o.borderBox;case"content-box":return o.contentBox;case"padding-box":return o.paddingBox;default:return}},o.toCss=function(n,r){var e;switch(r||(r={}),n){case o.borderBox:e="border-box";break;case o.contentBox:e="content-box";break;case o.paddingBox:e="padding-box";break;default:return}return r.backgroundOrigin=e,r},r.BackgroundOrigin=o});
//# sourceMappingURL=sourcemaps/BackgroundOrigin.js.map
