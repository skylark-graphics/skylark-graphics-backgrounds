define([
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
