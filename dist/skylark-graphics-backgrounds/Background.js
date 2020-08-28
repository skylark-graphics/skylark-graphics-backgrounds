/**
 * skylark-graphics-backgrounds - The skylark background class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-graphics-brushes/Brush","skylark-graphics-brushes/SolidColorBrush","skylark-graphics-brushes/ImageBrush","skylark-graphics-brushes/LinearGradientBrush","skylark-graphics-brushes/RadialGradientBrush","skylark-graphics-brushes/TileRepeateMode","./backgrounds","./BackgroundAttachment","./BackgroundOrigin","./BackgroundPosition","./BackgroundSize"],function(t,r,n,i,e,o,a,s,g,u,c,l){var h=t.klass({klassName:"Background",attachment:{get:function(){return this._.attachment}},fillStyle:{get:function(){return this._.fillStyle}},origin:{get:function(){return this._.origin}},position:{get:function(){return this._.position}},repeat:{get:function(){return this._.repeat}},size:{get:function(){return this._.size}},toCss:function(t){return h.toCss(this,t)},_construct:function(t){this._={fillStyle:t.fillStyle,repeat:t.repeat,origin:t.origin,size:t.size,position:t.position,attachment:t.attachment}}});return h.fromPlain=function(t){var r=t.fillStyle,a=n.fromString(r);return a||(a=i.fromString(r)),a||(a=e.fromString(r)),a||(a=o.fromString(r)),a?new h({fillStyle:a,repeat:t.repeat,origin:t.origin,size:t.size,position:t.position,attachment:t.attachment}):null},h.fromCss=function(t){var r={fillStyle:t.backgroundColor||t.backgroundImage,position:t.backgroundPosition,repeat:t.backgroundRepeat,origin:t.backgroundOrigin,attachment:t.backgroundAttachment,size:t.backgroundSize};return h.fromPlain(r)},h.toCss=function(t,r){r||(r={});var i=t.fillStyle;return i&&(Type.isInstanceOf(i,n)?r.backgroundColor=i.toString():r.backgroundImage=i.toString()),t.position&&(r.backgroundPosition=t.position.toString()),t.repeat&&(r.backgroundRepeat=t.repeat.toString()),t.origin&&(r.backgroundOrigin=t.origin.toString()),t.attachment&&(r.backgroundAttachment=t.attachment.toString()),t.size&&(r.backgroundSize=t.size.toString()),r},s.Background=h});
//# sourceMappingURL=sourcemaps/Background.js.map
