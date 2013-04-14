(function(){
	thumb = function(_id,_title,_filters,_thumb){
		var self = this;
			self.options = {
				id:_id,
				title:_title,
				filters:_filters,
				image:_thumb
			}
			self.init = function(){
				var _thumbnail = _app.templates.thumb_template(self.options);
				self._thumb = $(_thumbnail);
				
				_app._container.append(self._thumb);
			}
		return self;
	}
})();