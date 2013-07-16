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
			
			$('#loading').show();
			
			_.delay(function(){
				$('#loading').fadeOut();
			}, 1200);
			
			_.delay(function(){
				_app._container.isotope('reLayout');
			}, 700);
			
			_.delay(function(){
				var closestTitle = $('#story' + self.options.id).find('.story_title')
				
				$('html, body').animate({
					'scrollTop': (closestTitle.offset().top - 100)
				});
			}, 1100);
			
		
			$(".flexslider").fitVids().flexslider({
		      	animation: 'slide',
				slideshow: false
	      	});
	      	
	      	//KILL STORIES ON CLOSE BUTTON CLICK
	      	
	      	$('.close_btn').click(function() {
		        $("iframe").hide();
		        self.kill();
		    });
		    
		    //KILL STORIES ON WINDOW RESIZE
		    
		    var updateLayout = _.debounce(function(e) {

				self.kill();
				
			}, 500);
		    		    
		    window.addEventListener("resize", updateLayout, false);
		    
	      	 
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