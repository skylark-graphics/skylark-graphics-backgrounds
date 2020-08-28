/**
 * skylark-graphics-backgrounds - The skylark background class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-graphics-backgrounds/backgrounds',[
	"skylark-langx/skylark"
],function(skylark){
	return skylark.attach("graphics.backgrounds",{});
});
define('skylark-graphics-brushes/LinearGradientBrush',[
	"skylark-langx/langx",
	"skylark-graphics-color",
	"./brushes",
	"./GradientBrush"

],function(langx,Color,brushes,GradientBrush) {
	
	var LinearGradientBrush = GradientBrush.inherit({
		"klassName"	:	"LinearGradientBrush",

	});

	LinearGradientBrush.fromString = function(s) {
		var p = CssUtils.parseBackgroundImage(s);
		if (p.type == "linear" ) {
			return new LinearGradientBrush({
				startPoint : p.webKitPosn1,
				endPoint   : p.webKitPosn2,
				fromColor  : p.stops[0].color,
				toColor    : p.stops[p.stops.length-1].color,
				stops      : p.stops.slice(1,p.stops.length-1).map(function(item){
					return {
						offset : item.pos,
						color : item.color
					}
				})

			});
		} else {
			return null;
		}
	};

	return brushes.LinearGradientBrush = LinearGradientBrush;
	
});	

define('skylark-graphics-backgrounds/BackgroundAttachment',[
	"skylark-langx/langx",
	"./backgrounds"
],function(langx,backgrounds) {

	var BackgroundAttachment = 	["fixed", "scroll"	];

	langx.mixin(BackgroundAttachment,{
		"fixed"  : 0, 
		"scroll" : 1
	});

	BackgroundAttachment.fromCss = function(css){
		return BackgroundAttachment.fromString(css.backgroundAttachment);
	};	

	BackgroundAttachment.toCss = function(ba,css) {
		if (!css) {
			css = {};
		}
		css.backgroundAttachment = ba.toString();
		
		return css;
	};
	
	return backgrounds.BackgroundAttachment = BackgroundAttachment;

});

define('skylark-graphics-backgrounds/BackgroundOrigin',[
	"skylark-langx/langx",
	"./backgrounds"
],function(langx,backgrounds) {

	var BackgroundOrigin = ["borderBox","contentBox", "paddingBox"	];

	langx.mixin(BackgroundOrigin,{
		"borderBox" : 0,
		"contentBox" : 1, 
		"paddingBox" : 2
	});

	BackgroundOrigin.fromCss = function(css) {
		var s = css.backgroundOrigin;
		switch (s) {
			case "border-box" : 
				return BackgroundOrigin.borderBox;
			case "content-box" : 
				return BackgroundOrigin.contentBox;
			case "padding-box" : 
				return BackgroundOrigin.paddingBox;
			default :
				return undefined;			
		}
	};
	
	BackgroundOrigin.toCss = function(origin,css) {
		if (!css) {
			css = {};
		}
		var s;
		switch (origin) {
			case BackgroundOrigin.borderBox : 
				s = "border-box";
				break;
			case BackgroundOrigin.contentBox : 
				s = "content-box";
				break;
			case BackgroundOrigin.paddingBox : 
				s=  "padding-box";
				break;
			default :
				return undefined;			
		}
		css.backgroundOrigin = s;

		return css;
	};

	return backgrounds.BackgroundOrigin = BackgroundOrigin;

});

define('skylark-graphics-backgrounds/BackgroundPosition',[
	"skylark-langx/langx",
	"./backgrounds"
],function(langx,backgrounds) {


	var BackgroundPosition = langx.klass({
		"klassName"	:	"BackgroundPosition",

		"x" : {
			get : function() {
				return this._.x;
			}
		},
		"y" : {
			get : function() {
				return this._.y;
			}
		},
		"clone"	: function(){
			var _ = this._;
			return new BackgroundPosition(_.x,_.y);
		
		},
		
		"notEqual"	:	function(/*BackgroundPosition*/bp) {
			return !bs || bs.type != this.type || bs.width && bs.width.notEqual(this.width) || bs.height && bs.height.notEqual(this.height);
		},
		
		"equal"	:	function(/*BackgroundPosition*/bp){
			return  !this.notEqual(bp);
		},

		"toString" : function(delimiter){
			delimiter = delimiter ? delimiter : " ";
			
			var xs,ys,x = this.x,y= this.y;

			xs = x.toString();
			if (xs == "min") {
				xs = "left";
			} else if (xs == "mid") {
				xs = "center";
			} else if (xs == "max") {
				xs = "right";
			}

			ys = y.toString();
			if (ys == "min") {
				ys = "top";
			} else if (xs == "mid") {
				ys = "center";
			} else if (xs == "max") {
				ys = "bottom";
			}

			return xs + delimiter + ys;

		},	
		
		"_construct" : function(x,y){
			var props = {};
			if (x != undefined) {
				if (Type.isString(x)) {
					if (x == "left") {
						x = "min";
					} else if (x == "center") {
						x = "mid";
					} else if (x == "right") {
						x = "max";
					}
				}
				props.x = x;
			}
			if (y != undefined) {
				if (Type.isString(y)) {
					if (y == "top") {
						y = "min";
					} else if (y == "center") {
						y = "mid";
					} else if (y == "bottom") {
						y = "max";
					}
				}
				props.y = y;
			}
			this._ = props;
		}
	});

	
	BackgroundPosition.fromString = function(s) {
		var a = s.split(" ");
        return BackgroundPosition.fromArray(a)
	};

	BackgroundPosition.fromPlain = function(o) {
		return new BackgroundPosition(o.x,o.y);
	};

	BackgroundPosition.fromArray = function(a) {
		return new BackgroundPosition(a[0],a.length>1?a[1]:"center");
	};

	BackgroundPosition.fromCss = function(css){
		if (css.backgroundPosition != undefined) {
			return BackgroundPosition.fromString(css.backgroundPosition);
		} else {
			return null;
		}
	};	

	BackgroundPosition.toCss = function(bp,css) {
		if (!css) {
			css = {};
		}
		if (bp) {
			css.backgroundPosition = bp.toString();
		}
		
		return css;
	};

	return backgrounds.BackgroundPosition = BackgroundPosition;
	
});	


define('skylark-graphics-backgrounds/BackgroundSizeType',[
	"skylark-langx/langx",
	"./backgrounds"
],function(langx,backgrounds) {

	var BackgroundSizeType =["auto","contain","cover","measure"];
	
	langx.mixin(BackgroundSizeType,{
		"auto" : 0,
		"contain" : 1,
		"cover" : 2,
		"measure" : 3
	});


	return backgrounds.BackgroundSizeType = BackgroundSizeType;

});

define('skylark-graphics-backgrounds/BackgroundSize',[
	"skylark-langx/langx",
	"./backgrounds",
	"./BackgroundSizeType"
],function(langx,backgrounds,BackgroundSizeType) {

	var BackgroundSize = langx.klass({
		"klassName"	:	"BackgroundSize",

		"type" : {
			get : function() {
				return this._.x;
			},
			set : function(t) {
				var _ = this._;
				_.type = t;
				switch (t) {
					case BackgroundSizeType.auto :
					case BackgroundSizeType.contain :
					case BackgroundSizeType.cover :
						_.width = null;
						_.height = null;
						break;
					default :
						break;
					
				}
			}
		},
		"height" : {
			get : function() {
				return this._.height;
			},
			set : function(w) {
				var _ = this._;
					t = _.type;
				switch (t) {
					case BackgroundSizeType.measure :
						_.width = w;
						break;
					default :
						break;
					
				}
			}
		},
		"width" : {
			get : function() {
				return this._.width;
			},
			set : function(w) {
				var _ = this._;
					t = _.type;
				switch (t) {
					case BackgroundSizeType.measure :
						_.width = w;
						break;
					default :
						break;
					
				}
			}
		},
		"clone"	: function(){
			var _ = this._;
			return new BackgroundSize(_.type,_.width,_height);
		
		},
		
		"notEqual"	:	function(/*BackgroundSize*/bs) {
			return !bs || bs.type != this.type || bs.width && bs.width.notEqual(this.width) || bs.height && bs.height.notEqual(this.height);
		},
		
		"equal"	:	function(/*BackgroundSize*/bs){
			return  !this.notEqual(bs);
		},

		"toString" : function(delimiter){
			delimiter = delimiter ? delimiter : " ";
			switch (this.type) {
				case BackgroundSizeType.measure :
					return this.width.toString()+delimiter + this.height.toString();
				default :
					return this.type.toString();
			}


		},	
		
		"-constructor-"	:	{		
			"initialize" : function(type,width,height){
				var props = {};
				if (type != undefined) {
					props.type = type;
				}
				if (width != undefined) {
					props.width = width;
				}
				if (height != undefined) {
					props.height = height;
				}
				this._setupAttributeValues(props);
			}
		}		
	});


	BackgroundSize.fromNumber = function(n) {
        return new BackgroundSize(MeasureType.unit,n,MeasureUnit.px);

	};

	BackgroundSize.fromString = function(s) {
		var type ;
		if (s=="auto"){
			type =  BackgroundSizeType.auto;
		} else if (s == "contain") {
			type =  BackgroundSizeType.contain;
		} else if (s == "cover") {
			type =  BackgroundSizeType.cover;
		}

		if (type) {
			return new BackgroundSize(type);
		}
		
		type = BackgroundSizeType.measure;

		var units = MeasureUnit.enumOptions().map(function(item){
				return item.getText();
			}).concat("%"),
			value,
			unit;
        for (var i = 0; i < units.length; i++) {
            if (s.indexOf(units[i]) != -1) {
                value = parseInt(s.substring(0, s.length - units[i].length),10);
                if (units[i] == "%") {
                	type = MeasureType.percent;
                } else {
                	type = MeasureType.unit;
                	unit = MeasureUnit.fromString(units[i]);
                }
                break;
            }
        }
        return new BackgroundSize(type,value,unit);
	};

	BackgroundSize.fromPlain = function(o) {
		return new Measure(o.type,o.value,o.unit);
	};

	BackgroundSize.fromArray = function(a) {
		return new BackgroundSize(a[0],a.length>1?a[1]:"undefined",a.length>1?a[2]:undefined);
	};

	BackgroundSize.fromCss = function(css){
		if (css.backgroundSize != undefined) {
			return BackgroundSize.fromString(css.backgroundSize);
		} else {
			return null;
		}
	};	

	BackgroundSize.toCss = function(bs,css) {
		if (!css) {
			css = {};
		}
		if (bs) {
			css.backgroundSize = bs.toString();
		}
		return css;
	};

	BackgroundSize.auto = new BackgroundSize(BackgroundSizeType.auto);
	

	return BackgroundSize;
	
});	


define('skylark-graphics-backgrounds/Background',[
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

define('skylark-graphics-backgrounds/main',[
	"./backgrounds",
	"./Background",
	"./BackgroundAttachment",
	"./BackgroundOrigin",
	"./BackgroundPosition",
	"./BackgroundSize",
	"./BackgroundSizeType"
],function(backgrounds){
	return backgrounds;
});
define('skylark-graphics-backgrounds', ['skylark-graphics-backgrounds/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-graphics-backgrounds.js.map
