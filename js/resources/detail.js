(function(){
	detail = function(_id,_title,_copy,_video,_images){
		var self = this;
		
		self.options = {
			id:_id,
			title:_title,
			copy:_copy,
			video:_video,
			images:_images,
			active: false
		}
		
		self.init = function(){
			
			var _detailPage = _app.templates.detail_template(self.options);
			self._detail = $(_detailPage);
			
			$('#story' + self.options.id).prepend(self._detail).addClass('story_width clearfix');
			
			$('#story' + self.options.id).children('.story-content').hide();
			
			_.delay(function(){
				_app._container.isotope('reLayout');
			}, 500);
			
			_.delay(function(){
				var closestTitle = $('#story' + self.options.id).find('.story_title')
				
				$('html, body').animate({
					'scrollTop': (closestTitle.offset().top - 100)
				});
			}, 800);
			
		
			$(".flexslider").fitVids().flexslider({
		      	animation: 'slide',
				slideshow: false,
				controlNav: false
	      	});
	      	
	      	$('.close_btn').click(self.kill);
	      	
	      	self.options.active = true;
		}
		
		self.kill = function(callback){
		
			var _pos = $(window).scrollTop();
		
			$('#story' + self.options.id).children('.story_wrapper').remove();
			$('#story' + self.options.id).children('.story-content').show();
			$('#story' + self.options.id).removeClass('story_width');
						
			var state = {};
			state['filter'] = $.deparam.fragment().filter;
			$.bbq.removeState('story');
			$.bbq.pushState(state);
			
			$(window).scrollTop(_pos);
			
			_app.active_detail = null;
			
			_.delay(function(){
				if(typeof(callback) == 'function'){
					callback();
					_app._container.isotope('reLayout');
				}
				else{
					_app._container.isotope('reLayout');
				}
			},1100);
		}
		
	return self;
	}
})();