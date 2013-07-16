$(document).ready( function() {
    // STICKY NAV JAVASCRIPT
      
	       // PINNED
	      $(".top_nav").pinned({
	        bounds: 1,
	        scrolling:0,
	        mobile: true
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
         
         if(window.location.hash) {
         	setTimeout(function(){ 
			  $('html, body').animate({
		           'scrollTop':  $('#about_map').offset().top
		         }, 300);
		    }, 300 );
			} else {
			  // Fragment doesn't exist
			}
	      	      
	      
	      // SLIDE DOWN FILTERS FROM NAV
	      
	     $(".btn-slide").click(function(){
	  		$("#filters_panel").slideToggle("fast");
	  		$(this).toggleClass("arrow_top");
	  		$(this).toggleClass("active"); return false;
	  	});
	  	
	  	// DISPLAY ASTERIK ON HOVER
	      
	     $(".pb_map, .wy_map").hover(function(){
	  		$(this).children(".maps_legal").show("fast")
	  		},function() {
	  		$(this).children(".maps_legal").hide("fast");
			 return false;
	  	});
	  	
	  	// object that will keep track of options
          isotopeOptions = {},
          // defaults, used if not explicitly set in hash
          defaultOptions = {
            filter: '*',
            sortBy: 'original-order',
            sortAscending: true,
            layoutMode: 'masonry'
          };

      var setupOptions = $.extend( {}, defaultOptions, {
        itemSelector : '.map_item',
        masonry: {
		    columnWidth: 300
		  }

      });	

      // set up Isotope
      $('#container').isotope( setupOptions );
});
