define([
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
