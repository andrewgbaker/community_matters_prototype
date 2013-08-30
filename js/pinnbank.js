(function(){
	app = function(){
		var self = this;
			self.templates = [];
			self._thumbs = thumbs.thumbs;
			self._details = details.details;
			self._container = $("#container");
			self.init = function(){
				// SETUP PINNED ELEMENTS
			      $(".top_nav").pinned({
			        bounds: 1,
			        scrolling:0,
			        mobile: false
			      },function(){
			        $(".top_nav").removeClass('nav_tall').addClass('nav_shadow small_nav');
			        $(".top_nav .main_logo").removeClass('logo_large').addClass('logo_small');
			      },function(){
			        $(".top_nav").removeClass('nav_shadow small_nav').addClass('nav_tall');
			        $(".top_nav .main_logo").removeClass('logo_small').addClass('logo_large');
			      });
			      
			      $(".right_cta").pinned({
			        bounds: 1,
			        scrolling:0,
			        mobile: true
			      });
			      			      
			      // FILTERS COLLAPSE JS
			      	      
				     $(".btn-slide").click(function(){
				  		$("#filters_panel").slideToggle("fast");
				  		$(this).toggleClass("arrow_top");
				  		$(this).toggleClass("active"); 
				  		return false;
				  	});
				  	
				  // PAGE LOADING ANIMATION
				  
				  function showContent() {
					    $('#loading').fadeOut();
					};
					
					$(function(){
					    showContent();
					});	
					
				  // ADD THIS RE-POSITION FOR IE
				  
				  $('.addthis_button').mousemove(function(e){
					    $('#at15s').css({
					        'top': e.pageY + 20 ,
					        'left': e.pageX - 20
					    });
					});
				  	
				  // HTML5 HEADER VIDEO
							
					videojs("header_video", {"height":"auto", "width":"auto"}).ready(function(){
					    var myPlayer = this;    // Store the video object
					    var aspectRatio = 16/47; // Make up an aspect ratio
					
					    function resizeVideoJS(){
					      // Get the parent element's actual width
					      var width = document.getElementById(myPlayer.id()).parentElement.offsetWidth;
					      // Set width to fill parent element, Set height
					      myPlayer.width(width).height( width * aspectRatio );
					    }
					
					    resizeVideoJS(); // Initialize the function
					    window.onresize = resizeVideoJS; // Call the function on resize
					  });
				
			self.init_data();
		      
			} 
				
				self.init_data = function(){
					// SETUP THUMBS
					var thumbs = self._thumbs;
					_.each(thumbs, function(thumbnail){
						var _id = thumbnail.id,
							_title = thumbnail.title,
							_filters = thumbnail.filters,
							_thumb = thumbnail.image
						
						var new_thumbnail = new thumb(_id,_title,_filters,_thumb);
						new_thumbnail.init();
					
					});
					self.init_display();
					
					  // FADE THUMBS IN ON LOAD 
					    
					    $(".thumb_content img").hide();
					    $(".thumb_content img").bind("load", function () { $(this).fadeIn(); });
				}
				
				// INIT NAV 
				
				self.init_nav = function(){
				
					// LISTEN TO NAV
					$('.option-set a').click(function(){
					_.delay(function() {
						$('html,body').animate({
							'scrollTop':$('#container').offset().top - 125
						});
						$('#filters_panel').slideToggle("fast");
						$('.btn-slide').toggleClass("arrow_top");
					}, 700);
					$('.active').removeClass('active');
					      // get href attr, remove leading #
					  var href = $(this).attr('href').replace( /^#/, '' ),
					      // convert href into object
					      // i.e. 'filter=.inner-transition' -> { filter: '.inner-transition' }
					      option = $.deparam( href, true );
					  // set hash, triggers hashchange on window
					  $.bbq.pushState( option );
					  						
					  return false;
					});
				      
				
					// LISTEN TO HASHCHANGE	
					$(window).bind( 'hashchange', function( event ){
					  // get options object from hash
					  var hashOptions = $.deparam.fragment();
					  
					  var active_nav = hashOptions.filter;
					  
					  if(active_nav){
					  _.delay(function() {
						  	$('html,body').animate({
								'scrollTop':$('#container').offset().top - 125
							});
						}, 700);
						
					  }
					  
					  $('.option-set a[href="#filter='+active_nav+'"]').addClass('active')
					  
					  // CHECK STORIES AND ACTIVATE IF NEEDED 
					  var url = hashOptions.story;
					  
					  if(url){
					  	if(self.active_detail){
					  		self.active_detail.swap(function(){
					  			_.find(self._details, function(list, iterator){
								  	if(list.id == url){
								  		var _id = list.id,
								  			_title = list.title,
								  			_copy = list.copy,
								  			_video = list.video,
								  			_images = list.images;
								  			
								  		var new_detail = new detail(_id,_title,_copy,_video,_images);
								  		new_detail.init();
								  		
								  		self.active_detail = new_detail;
								  		
								  	}
								});
								console.log('tester')
					  		});
					  	}
					  	else{
						  _.find(self._details, function(list, iterator){
						  	if(list.id == url){
						  		var _id = list.id,
						  			_title = list.title,
						  			_copy = list.copy,
						  			_video = list.video,
						  			_images = list.images;
						  			
						  		var new_detail = new detail(_id,_title,_copy,_video,_images);
						  		new_detail.init();
						  		
						  		self.active_detail = new_detail;
						  	}
						  });
						}
					  }
					  else{
					  	if(self.active_detail){
					  		self.active_detail.kill();
					  	}
					  }
					  // apply options from hash
					  self._container.isotope( hashOptions );
					}).trigger('hashchange');

					  
					// LISTEN TO THUMB LINKS
					$('.vid_link').click(function(){
						var state = {},
						url = $(this).attr('data-href');
						
						state['story'] = url;
						$.bbq.pushState( state );
												
						return false;
					});
				}
				
				// INIT DISPLAY 
				
				self.init_display = function(){
				
					// object that will keep track of options
			          isotopeOptions = {},
			          // defaults, used if not explicitly set in hash
			          defaultOptions = {
			            filter: '*',
			            sortBy: 'random',
			            sortAscending: true,
			            layoutMode: 'masonry',
			            transformsEnabled: false,
			            animationEngine : 'jquery'
			          };
		
			      var setupOptions = $.extend( {}, defaultOptions, {
			        itemSelector : '.element',
			        masonry: {
					    columnWidth: 320
					  }
		
			      });	
		
			      // set up Isotope
			      self._container.isotope( setupOptions );
			      
			      self.init_nav();
					
				}
			
		return self;
	}
})();