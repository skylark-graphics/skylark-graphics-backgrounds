define([
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

