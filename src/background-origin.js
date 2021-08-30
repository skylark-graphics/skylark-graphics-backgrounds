define([
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
