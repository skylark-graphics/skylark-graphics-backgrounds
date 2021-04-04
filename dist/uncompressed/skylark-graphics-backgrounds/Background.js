define([
	"skylark-langx/langx",
	"skylark-graphics-brushes/Brush",
	"skylark-graphics-brushes/SolidColorBrush",
	"skylark-graphics-brushes/ImageBrush",
	"skylark-graphics-brushes/LinearGradientBrush",
	"skylark-graphics-brushes/RadialGradientBrush",
	"skylark-graphics-brushes/TileRepeateMode",
	"./backgrounds",
	"./BackgroundAttachment",
	"./BackgroundOrigin",
	"./BackgroundPosition",
	"./BackgroundSize"
],function(
	langx,
	Brush,
	SolidColorBrush,
	ImageBrush,
	LinearGradientBrush,
	RadialGradientBrush,
	TileRepeateMode,
	backgrounds,
	BackgroundAttachment,
	BackgroundOrigin,
	BackgroundPosition,
	BackgroundSize
) {
	var Background = langx.klass({
		
		"klassName"	:	"Background",

		"attachment"	:	{
			get : function() {
				return this._.attachment;
			}
		},
		"fillStyle"	:	{
			get : function() {
				return this._.fillStyle;
			}
		},
		"origin"	:	{
			get : function() {
				return this._.origin;
			}
		},
		"position"	:	{
			get : function() {
				return this._.position;
			}
		},
		"repeat"	:	{
			get : function() {
				return this._.repeat;
			}
		},
		"size" : {
			get : function() {
				return this._.size;
			}
		},
		toCss : function(css) {
			return Background.toCss(this,css);
		},
		"_construct" : function(params){
			this._ = {
				fillStyle : params.fillStyle,
				repeat 	  : params.repeat,
				origin 	  : params.origin,
				size 	  : params.size,
				position  : params.position,
				attachment: params.attachment

			};
		}
	});

	Background.fromPlain = function(o) {
		var fillStyle = o.fillStyle;
		var brush = SolidColorBrush.fromString(fillStyle)
		if (!brush) {
			brush = ImageBrush.fromString(fillStyle);
		}	
		if (!brush) {
			brush = LinearGradientBrush.fromString(fillStyle);
		}
		if (!brush) {
			brush = RadialGradientBrush.fromString(fillStyle);
		}
		if (brush) {
			return new Background({
				fillStyle : brush,
				repeat    : o.repeat,
				origin    : o.origin,
				size      : o.size,
				position  : o.position,
				attachment: o.attachment
			});
		} else {
			return null;
		}
	};

	Background.fromCss = function(css) {
        var props = {
            fillStyle : css.backgroundColor || css.backgroundImage,
            position : css.backgroundPosition,
            repeat : css.backgroundRepeat,
            origin : css.backgroundOrigin,
            attachment : css.backgroundAttachment,
            size : css.backgroundSize,

        }
        return Background.fromPlain(props);
	};

	Background.toCss = function(bg,css) {
        if (!css) {
        	css = {};
        }
        var fillStyle = bg.fillStyle;
        if (fillStyle) {
        	if (Type.isInstanceOf(fillStyle,SolidColorBrush)) {
        		css.backgroundColor = fillStyle.toString();
        	} else {
        		css.backgroundImage = fillStyle.toString();
        	}
    	}
    	if (bg.position) {
        	css.backgroundPosition = bg.position.toString();
    	}
    	if (bg.repeat) {
        	css.backgroundRepeat = bg.repeat.toString();
    	}
    	if (bg.origin) {
        	css.backgroundOrigin = bg.origin.toString();
    	}
    	if (bg.attachment) {
        	css.backgroundAttachment = bg.attachment.toString();
    	}
    	if (bg.size) {
        	css.backgroundSize = bg.size.toString();
    	}

        return css;
	};


	return backgrounds.Background = Background;
	
});	
