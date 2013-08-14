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
				_app._container.isotope('reLayout');
			}, 700);
			
			_.delay(function(){
				var closestTitle = $('#story' + self.options.id).find('.story_title')
				
				$('html, body').animate({
					'scrollTop': (closestTitle.offset().top - 100)
				});
			}, 1400);
			
			_.delay(function(){
				$('#loading').fadeOut();
			}, 1400);
			
			
			// FLEXSLIDER INIT WITH YOUTUBE API CALL FOR VIDEO CONTROL
				
				var tag = document.createElement('script');
				tag.src = "http://www.youtube.com/player_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
				
				if (Modernizr.postmessage) {
				
					function pauseStory(frame) {
						$('iframe.youtube').each(function() {
							var func = this === frame ? 'pauseVideo' : 'pauseVideo';
							this.contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
						});
					}
		      
			      	$(".flexslider").fitVids().flexslider({
				      	animation: 'slide',
						slideshow: false,
						useCSS: false,
						video: true,
						before: function(slider){
							
							// Stop all youtube videos in this slideshow
							if (slider.slides.eq(slider.currentSlide).find('iframe').length !== 0)
								pauseStory($('iframe.youtube')[0]);
				
						}
			      	});
		      	}
		      	
		      	if (!Modernizr.postmessage) {
		      		$(".flexslider").fitVids().flexslider({
				      	animation: 'slide',
						slideshow: false
			      	});
		      	}
	      	
	      	//KILL STORIES ON CLOSE BUTTON CLICK
	      	
	      	$('.close_btn').click(function() {
		        $("iframe").hide();
		        self.kill();
		    });
		    
		    //KILL STORIES ON WINDOW RESIZE
		    
		    
		    if (Modernizr.csstransforms) {
		    
			    var updateLayout = _.debounce(function(e) {
	
					self.kill();
					
				}, 500);
			    		    
			    window.addEventListener("resize", updateLayout, false);
			    window.addEventListener("orientationchange", updateLayout, false);
			    
			} 		    
	      	 
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
	
		self.swap = function(callback){
		
			var _pos = $(window).scrollTop();
		
			$('#story' + self.options.id).children('.story_wrapper').remove();
			$('#story' + self.options.id).children('.story-content').show();
			$('#story' + self.options.id).removeClass('story_width');
						
			var state = {};
			state['filter'] = $.deparam.fragment().filter;
			
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