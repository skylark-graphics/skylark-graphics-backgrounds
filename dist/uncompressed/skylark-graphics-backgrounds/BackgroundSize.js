define([
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

