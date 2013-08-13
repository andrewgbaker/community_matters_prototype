
var _app = new app(),
	_templates = ['thumb_template', 'detail_template'];

$(function(){
	_app.init();
	
});

_.each(_templates, function(template){
	$.ajax({
		url: "js/templates/" + template + ".jst",
		async: false,
		contentType: "application/json",
		dataType: "text",
		success: function(data){
			_app.templates[template] = _.template(data);
		}
	});
});