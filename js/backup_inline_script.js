<!--
  <script type="text/javascript">
  
// SET UP CENTERED MASONRY FUNCTION

  $.Isotope.prototype._getCenteredMasonryColumns = function() {
    this.width = this.element.width();
    
    var parentWidth = this.element.parent().width();
    
                  // i.e. options.masonry && options.masonry.columnWidth
    var colW = this.options.masonry && this.options.masonry.columnWidth ||
                  // or use the size of the first item
                  this.$filteredAtoms.outerWidth(true) ||
                  // if there's no items, use size of container
                  parentWidth;
    
    var cols = Math.floor( parentWidth / colW );
    cols = Math.max( cols, 1 );

    // i.e. this.masonry.cols = ....
    this.masonry.cols = cols;
    // i.e. this.masonry.columnWidth = ...
    this.masonry.columnWidth = colW;
  };
  
  $.Isotope.prototype._masonryReset = function() {
    // layout-specific props
    this.masonry = {};
    // FIXME shouldn't have to call this again
    this._getCenteredMasonryColumns();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
      this.masonry.colYs.push( 0 );
    }
  };

  $.Isotope.prototype._masonryResizeChanged = function() {
    var prevColCount = this.masonry.cols;
    // get updated colCount
    this._getCenteredMasonryColumns();
    return ( this.masonry.cols !== prevColCount );
  };
  
  $.Isotope.prototype._masonryGetContainerSize = function() {
    var unusedCols = 0,
        i = this.masonry.cols;
    // count unused columns
    while ( --i ) {
      if ( this.masonry.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    
    return {
          height : Math.max.apply( Math, this.masonry.colYs ),
          // fit container to columns that have been used;
          width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
        };
  };
  

// INITIATE JQUERY BBQ HASH HISTORY AND ISOTOPE
  
    $(function(){
    
    // For each .bbq widget, keep a data object containing a mapping of
  // url-to-container for caching purposes.
  $('.story').each(function(){
    $(this).data( 'story', {
      cache: {
        // If url is '' (no fragment), display this div's content.
        '': $(this).find('.story-default')
      }
    });
  });
  
  // For all links inside a .bbq widget, push the appropriate state onto the
  // history when clicked.
  $('.story a[href^=#]').on( 'click', function(e){
    var state = {},
      
      // Get the id of this .bbq widget.
      id = $(this).closest( '.story' ).attr( 'id' ),
      
      // Get the url from the link's href attribute, stripping any leading #.
      url = $(this).attr( 'href' ).replace( /^#/, '' );
    
    // Set the state!
    state[ id ] = url;
    $.bbq.pushState( state );
    
    // And finally, prevent the default link click behavior by returning false.
    return false;
  });
  
  // Bind an event to window.onhashchange that, when the history state changes,
  // iterates over all .bbq widgets, getting their appropriate url from the
  // current state. If that .bbq widget's url has changed, display either our
  // cached content or fetch new content to be displayed.
  $(window).bind( 'hashchange', function(e) {
    
    // Iterate over all .bbq widgets.
    $('.story').each(function(){
      var that = $(this),
        
        // Get the stored data for this .bbq widget.
        data = that.data( 'story' ),
        
        // Get the url for this .bbq widget from the hash, based on the
        // appropriate id property. In jQuery 1.4, you should use e.getState()
        // instead of $.bbq.getState().
        url = $.bbq.getState( that.attr( 'id' ) ) || '';
      
      // If the url hasn't changed, do nothing and skip to the next .bbq widget.
      if ( data.url === url ) { return; }
      
      // Store the url for the next time around.
      data.url = url;
      
      // Remove .bbq-current class from any previously "current" link(s).
      that.find( 'a.story-current' ).toggleClass( 'story-current' );
       
      // Hide any visible ajax content.
      that.find( '.story-content' ).children( ':visible' ).hide();
      
      // Add .bbq-current class to "current" nav link(s), only if url isn't empty.
      url && that.find( 'a[href="#' + url + '"]' ).toggleClass( 'story-current' );
      
      if ( data.cache[ url ] ) {
        // Since the widget is already in the cache, it doesn't need to be
        // created, so instead of creating it again, let's just show it!
        data.cache[ url ].show();
        
      } else {
        // Show "loading" content while AJAX content loads.
        that.find( '.story-loading' ).show();
        
        // Create container for this url's content and store a reference to it in
        // the cache.
        data.cache[ url ] = $( '<div class="story-item"/>' )
          
          // Append the content container to the parent container.
          .appendTo( that.find( '.story-content' ) )
          
          // Load external content via AJAX. Note that in order to keep this
          // example streamlined, only the content in .infobox is shown. You'll
          // want to change this based on your needs.
          .load( url, function(){
            // Content loaded, hide "loading" content.
            that.find( '.story-loading' ).hide();
          	that.find( '.story-content' ).parent('.element').toggleClass( 'story_width' );
            that.find( '.story-content' ).children( ':visible' ).toggleClass( 'expanded_item' );
	        setTimeout(function(){ 
		         $container.isotope('reLayout');
			}, 600 );
			$('html,body').animate({scrollTop:$('.title_and_close').offset().top}, 500);
          }); 
 
      }
    });
  })
  
  // Since the event is only triggered when the hash changes, we need to trigger
  // the event now, to handle the hash the page may have loaded with.
  $(window).trigger( 'hashchange' );
  
  
  // BEGIN ISOTOPE JS
  
  
      var $container = $('#container'),
          // object that will keep track of options
          isotopeOptions = {},
          // defaults, used if not explicitly set in hash
          defaultOptions = {
            filter: '*',
            sortBy: 'original-order',
            sortAscending: true,
            layoutMode: 'masonry'
          };
      
       // add randomish size classes
      $container.find('.element').each(function(){
        var $this = $(this),
            number = parseInt( $this.find('.number').text(), 10 );
        if ( number % 7 % 2 === 1 ) {
          $this.addClass('width2');
        }
        if ( number % 3 === 0 ) {
          $this.addClass('height2');
        }
      });
		        
      var setupOptions = $.extend( {}, defaultOptions, {
        itemSelector : '.element',
        masonry: {
		    columnWidth: 320
		  },
        getSortData : {
          selected: function ($item) {
                return ($item.hasClass('story_width') ? -1000 : 0) + $item.index();
          }
        },
        sortBy: 'selected' 
        
      });	    
	    
  
      // set up Isotope
      $container.isotope( setupOptions );
  
      var $optionSets = $('#options').find('.option-set'),
          isOptionLinkClicked = false;
  
      // switches selected class on buttons
      function changeSelectedLink( $elem ) {
        // remove selected class on previous item
        $elem.parents('.option-set').find('.selected').removeClass('selected');
        // set selected class on new item
        $elem.addClass('selected');
      }
  
  
      $optionSets.find('a').click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return;
        }
        changeSelectedLink( $this );
            // get href attr, remove leading #
        var href = $this.attr('href').replace( /^#/, '' ),
            // convert href into object
            // i.e. 'filter=.inner-transition' -> { filter: '.inner-transition' }
            option = $.deparam( href, true );
        // apply new option to previous
        $.extend( isotopeOptions, option );
        // set hash, triggers hashchange on window
        $.bbq.pushState( isotopeOptions );
        isOptionLinkClicked = true;
        return false;
      });

      var hashChanged = false;

      $(window).bind( 'hashchange', function( event ){
        // get options object from hash
        var hashOptions = window.location.hash ? $.deparam.fragment( window.location.hash, true ) : {},
            // do not animate first call
            aniEngine = hashChanged ? 'best-available' : 'none',
            // apply defaults where no option was specified
            options = $.extend( {}, defaultOptions, hashOptions, { animationEngine: aniEngine } );
        // apply options from hash
        $container.isotope( options );
        // save options
        isotopeOptions = hashOptions;
    
        // if option link was not clicked
        // then we'll need to update selected links
        if ( !isOptionLinkClicked ) {
          // iterate over options
          var hrefObj, hrefValue, $selectedLink;
          for ( var key in options ) {
            hrefObj = {};
            hrefObj[ key ] = options[ key ];
            // convert object into parameter string
            // i.e. { filter: '.inner-transition' } -> 'filter=.inner-transition'
            hrefValue = $.param( hrefObj );
            // get matching link
            $selectedLink = $optionSets.find('a[href="#' + hrefValue + '"]');
            changeSelectedLink( $selectedLink );
          }
        }
    
        isOptionLinkClicked = false;
        hashChanged = true;
      })
        // trigger hashchange to capture any hash data on init
        .trigger('hashchange');
        
        
        
        /* SHOW HIDE FULL STORY FUNCTIONS
      
	      $(".story-default").click(function(){
	      	      			
	            $(this).closest('.element').toggleClass('story_width');
	            $(this).hide();
	            $(this).closest('.story-content').show();
   				// $(this).height( $(this).height() + 5);
   				
   				setTimeout(function(){ 
		         $container.isotope('reLayout');
				  }, 500 ); 
				 
				 $.scrollTo('.story_copy', 500);
				 
				 $('.story-default').unbind('click');
		        
		    });

		    */
		    
		    
		    $(".element").on("click", ".vid_link", function(){
	      
		            $(this).closest('.element').toggleClass('story_width');
		            $(this).find( ".story-content" ).children( ':visible' ).hide();
			        $(this).closest(".story-default").show();
	   				
	   				setTimeout(function(){ 
			         $container.isotope('reLayout');
					  }, 500 ); 
					  
					  		        
		   });
		    
		      // CLOSE EXPANDED STORY ON CLICK
	      
	      $(".element").on("click", ".close_btn", function(){
	      
	      var home = "#home";
	      
		            $.bbq.pushState( home );
		            $(this).closest('.element').toggleClass('story_width');
		            $(this).find( ".story-content" ).children( ':visible' ).hide();
			        $(this).closest(".story-default").show();
	   				
	   				setTimeout(function(){ 
			         $container.isotope('reLayout');
					  }, 500 ); 
					  
					$('.close_btn').unbind('click');
					  		        
		   });
        
        
        
        
   });
   
   // END HASH HISTORY AND ISOTOPE FUNCTION
		   		    
	    
	 
	 /*  EXAMPLE WITH ELEMENT AS JQUERY SELECTOR
      
      $('.element').click(function () {
      
      	var home = "#home";
            
	        if ($(this).hasClass('story_width')) {
	            $(this).removeClass('story_width');
	            $.bbq.pushState( home );
	            $(this).find( '.bbq-content' ).children( ':visible' ).hide();
	            $(this).children('.bbq-default').show();
	        } else { 
	            $(this).addClass('story_width');
	            $(this).children('.bbq-default').hide();
	            $(this).closest('.bbq-content').show();
   				$(this).height( $(this).height() + 5);
   				
   				setTimeout(function(){ 
		         $container.isotope('reLayout');
				  }, 2500 ); 
				 
				 $.scrollTo('.story_copy', 1000, {offset:-90});
	       }
	        
	    });
	  
	  */
        
        
        
  </script>  
  
  -->