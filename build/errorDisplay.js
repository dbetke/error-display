(function ($) {
    "use strict";

    var errorDisplayHtml = (
        ''
            + '<div class="errorDisplay">'
            +   '<span class="errorDisplayOptions">'
            +     '<button class="errorDisplayDetailsButton">See Details</button>'
            +     '<a href="" class="errorDisplayXButton">&#10006;</a>'
            +   '</span>'
            +   '<span class="errorDisplaySummary"></span>'
            +   '<span class="errorDisplayOverflow">...</span>'
            + '</div>'
	    + '<div class="errorDisplayRetrieverOuter">'
	    +    '<span class="errorDisplayRetriever"></span>'
	    + '</div>'
    );
    
    var detailDisplayHtml = (
        ''  + '<div class="errorDisplayDetailsOuter">'
            +   '<a href="" class="errorDisplayDetailsXButton">&#10006;</a>'
            +     '<div class="errorDisplayDetails">'
            +       '<span class="errorDisplayFullMessageArea"></span>'
            +     '</div>'
            + '</div>'
    );
    
    var detailDisplayListHtml = (
        ''
            + '<ul class="errorDisplayFullMessageList">'
            + '</ul>'
    );

    
    /** templates **/
    


    var singleLineMessageTemplate = (
        ' <div class="errorDisplayDetailsListItem">' +
        '   <span class ="{{class}}">{{bullet}}</span><span> {{message}}</span>' + 
	' </div>'
    );

    
    var multiLineMessageOuterTemplate = (
       ' <div class="errorDisplayDetailsListItem">' +
       '   <div class="errorDisplayDetailsListItemCollapsed"></div>' +
       '   <div class="errorDisplayDetailsListItemExpanded"></div>' +
       ' </div>'
    );
    
    var multiLineMessageAdditionalLineTemplate = (
      ' <div class="errorDisplayDetailsListItem"><span class="additional">{{{bullet}}}</span><span>{{message}}</span></div>'
    );
   

    var multiLineMessageFirstLineTemplate = (
        ' <div class="errorDisplayDetailsListItem">' +
        '   <span class ={{class}}>{{{bullet}}}</span><span> {{message}}</span>' + 
	' </div>'
    );

    //span classes used: plain, collapsed, expanded, and additional
    //bullets used: -, +, o

    var methods = {
        init : function(options) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data('errorDisplay'),
                    settings = $.extend({
                        'displayFontColor' : '#ff0000',
                        'displayBackgroundColor' : '#ffffff',
                        'displayTime' : 1000,
                        'displayIndicatorColor' : '#ff0000',
                        'displayLocation' : 'bottom',
			'displayDetailsSize' : 200
                    }, options);
                

                if ( ! data ) {
                    
                    $this.append(errorDisplayHtml);
                    $this.find('.errorDisplay').width($this.width()-6);  
                    
                    var detailDisplay = $(detailDisplayHtml).appendTo($("body"));
                    var detailDisplayList = $(detailDisplayListHtml);
                    var errorDisplayFlag = 0;  //set error display flag to off (for mouseleave function)

                    $this.data('errorDisplay', {
                        'detailDisplay' : detailDisplay,
                        'detailDisplayList' : detailDisplayList,
                        'displayFontColor' : settings.displayFontColor,
                        'displayBackgroundColor' : settings.displayBackgroundColor,
                        'displayTime' : settings.displayTime,
                        'displayIndicatorColor' : settings.displayIndicatorColor,
			'displayLocation' : settings.displayLocation,
			'displayDetailsSize' : settings.displayDetailsSize 
		    });

                    $this.find('.errorDisplayXButton').click(function(event) {
                        event.preventDefault(); 
			$this.find('.errorDisplayOptions').hide();
			$this.find('.errorDisplay').hide(0, function(){
			   $this.find('.errorDisplayRetriever').show();
			});       
                    });         
                                     
                    $this.find('.errorDisplayDetailsButton').click(function(event) {
                        event.preventDefault(); 
                        $this.find('.errorDisplay').hide();           
                        $this.find('.errorDisplayRetriever').hide();
			$(detailDisplay).find('.errorDisplayFullMessageArea').append($(detailDisplayList));
			$(detailDisplay).show();                                            
                    });

                    $(detailDisplay).find('.errorDisplayDetailsXButton').click(function(event) {
                        event.preventDefault();
                        $(detailDisplay).hide();   
                        $this.find('.errorDisplayRetriever').show();
                    });         
                                
		    $this.find('.errorDisplayRetrieverOuter').hover(function(event){
			    event.preventDefault();
			    $this.find('.errorDisplayRetriever').hide();
			    $this.find('.errorDisplay').show(0, function(){
				$this.find('.errorDisplayOptions').show();
			        errorDisplayFlag = 1; //turn on error display flag after show function is complete (for mouseleave function)
			    });  
     		    });
		   
		    $this.find('.errorDisplay').mouseleave(function(event){
			    if(errorDisplayFlag){
				$this.find('.errorDisplay').hide();
			        if( $(detailDisplay).css("display") == 'none' ){
				   $this.find('.errorDisplayRetriever').show()
				}
				errorDisplayFlag = 0; //turn off error display flag after hide function is complete
			    }
		    });

                }
                return this;
            });
        }, // init() method
        
        displayError : function(message, summary, options) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data('errorDisplay'),
                    settings = $.extend({
                        'displayFontColor' : data.displayFontColor,
                        'displayBackgroundColor' : data.displayBackgroundColor,
                        'displayTime' : data.displayTime,
                        'displayIndicatorColor' : data.displayIndicatorColor,
                        'displayLocation' : data.displayLocation,
			'displayDetailsSize' : data.displayDetailsSize
                    }, options);                 
                
                //process for multi-line messages
                var splitMsg = message.split("\n"); 
		var errorDisplaySummary = (!summary) ? splitMsg[0] : summary;  //use first line of full message if short message does not 
                var errorDisplayTimestamp = new Date();
                errorDisplayTimestamp = (errorDisplayTimestamp.getMonth() + 1) + "/" + errorDisplayTimestamp.getDate() + "/" + errorDisplayTimestamp.getFullYear() + " " + errorDisplayTimestamp.toTimeString().substr(0,8);
          
                
                var obj;

		function setupClickHandlers(obj){
		   obj.find('span.expanded').click(function(){
		       obj.find('.errorDisplayDetailsListItemExpanded').hide();
		       obj.find('.errorDisplayDetailsListItemCollapsed').show();
		   });
		
		   obj.find('span.collapsed').click(function(){
		       obj.find('.errorDisplayDetailsListItemExpanded').show();
		       obj.find('.errorDisplayDetailsListItemCollapsed').hide();
	           });
	        }
		
		if (splitMsg.length == 1){
		    obj = $(Mustache.to_html(singleLineMessageTemplate, {'class' : 'plain', 'bullet' : 'o', 'message' : errorDisplayTimestamp + ' ' + splitMsg[0] })).css('color', settings.displayFontColor).appendTo($(data.detailDisplayList));
		}

		else{
		    obj = $(multiLineMessageOuterTemplate).appendTo($(data.detailDisplayList));
		    obj.find('.errorDisplayDetailsListItemCollapsed').append(Mustache.to_html(multiLineMessageFirstLineTemplate, {'class' : 'collapsed', 'bullet' : '+', 'message' : errorDisplayTimestamp + ' ' + errorDisplaySummary })).css('color', settings.displayFontColor);
		    obj.find('.errorDisplayDetailsListItemExpanded').append(Mustache.to_html(multiLineMessageFirstLineTemplate, {'class' : 'expanded', 'bullet' : '-', 'message' : errorDisplayTimestamp + ' ' + splitMsg[0] })).css('color', settings.displayFontColor);		    
		    for (var i=1; i<splitMsg.length; i++){
			obj.find('.errorDisplayDetailsListItemExpanded').append(Mustache.to_html(multiLineMessageAdditionalLineTemplate, {'message' : splitMsg[i], 'bullet' : '&nbsp;' })).css('color', settings.displayFontColor);
		    }
		    setupClickHandlers(obj);
		}
		
		$('.errorDisplayDetails').css('height',  settings.displayDetailsSize); //set details display size according to specifications
		$('.errorDisplayFullMessageList').css('height', settings.displayDetailsSize*.9); //set message list size to 90% of details display size


                if(settings.displayLocation == 'top'){
                  $this.find('.errorDisplay').removeClass('errorDisplayBottom').addClass('errorDisplayTop');
                  $this.find('.errorDisplayRetriever').removeClass('errorDisplayRetrieverBottom').addClass('errorDisplayRetrieverTop').css('background-color', settings.displayIndicatorColor);
		  //attributes for ease with mobile devices
		  $this.find('.errorDisplayRetrieverOuter').removeClass('errorDisplayRetrieverBottom').addClass('errorDisplayRetrieverTop');
		  $this.find('.errorDisplayRetrieverOuter').removeClass('errorDisplayBottom').addClass('errorDisplayTop');
                }
                
                else{ 
                  $this.find('.errorDisplay').removeClass('errorDisplayTop').addClass('errorDisplayBottom');
                  $this.find('.errorDisplayRetriever').removeClass('errorDisplayRetrieverTop').addClass('errorDisplayRetrieverBottom').css('background-color', settings.displayIndicatorColor);;
		  //attributes for ease with mobile devices 
		  $this.find('.errorDisplayRetrieverOuter').removeClass('errorDisplayTop').addClass('errorDisplayBottom');
		  $this.find('.errorDisplayRetrieverOuter').removeClass('errorDisplayRetrieverTop').addClass('errorDisplayRetrieverBottom');
                }
                
                $this.find('.errorDisplayRetriever').hide();
                $this.find('.errorDisplayOptions').hide();
                $this.find('.errorDisplaySummary').css('color', settings.displayFontColor).html(errorDisplaySummary); 
		
		//set background color as configured, also sets options div background color for space around button
		$this.find('.errorDisplayOptions').css('background-color', settings.displayBackgroundColor);
		$this.find('.errorDisplay').css('background-color', settings.displayBackgroundColor);

                if( $('.errorDisplayDetailsOuter').css("display") == 'none' ){  //only show error display div if details are not open

                    $this.find('.errorDisplay').show();  

                    //using height + 2 as a workaround due to inexplicable differences between scrollheight and height in some browsers
                    if(($('.errorDisplaySummary').height()+ 2) < $('.errorDisplaySummary')[0].scrollHeight){
                      $this.find('.errorDisplayOverflow').show();
                    }     

                    else{
                      $this.find('.errorDisplayOverflow').hide();
                    }     

                    if(settings.displayTime != -1){   
                      $this.find('.errorDisplay').slideUp(settings.displayTime, function(){
                        $this.find('.errorDisplayRetriever').show();
                      });                              
                    }

                    else{                   
                      $this.find('.errorDisplay').show(0, function(){
			 $this.find('.errorDisplayOptions').show();     
		      });
                    }
                } 
		
            });

        } // displayError() method
    };

    $.fn.errorDisplay = function( method ) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.errorDisplay' );
            return null;
        }    
    };

}(jQuery));
jQuery('head').append(jQuery('<style type="text/css">.errorDisplay { font-family: Helvetica, sans-serif; color: #32446B; background-color: white; text-align: left; font-size: 12px; line-height: 12px; height: 45px; left: 0px; width: inherit; width: expression(this.parentNode.currentStyle[\'width\']); border: 3px solid #4D68A3; display: none; border-radius: 10px; } .errorDisplayTop{ position: relative; } .errorDisplayBottom{ position: absolute; bottom: 0px; } .errorDisplayRetriever{ height: 8px; background-color: #ff0000; width: 8px; position: absolute; left: 0px; display: none; cursor: hand; cursor: pointer; //handles cross-browser } .errorDisplayRetrieverOuter{ height: 25px; width: 25px; } .errorDisplayRetrieverTop{ border-bottom-right-radius: 10px; } .errorDisplayRetrieverBottom{ bottom: 0px; border-top-right-radius: 10px;; } .errorDisplaySummary{ overflow-x: hidden; overflow-y: hidden; position: absolute; bottom: 0px; left: 0px; width: 90%; margin-top: 20px; margin-left: 10px; margin-bottom: 5px; display: inline; height: 13px; } .errorDisplayOverflow{ position: absolute; right: 7px; width: 5%; bottom: 0px; margin-bottom: 5px; display: none; } .errorDisplayXButton { width: 25px; height: 25px; text-align: right; text-decoration: none; font-size: 15px; margin-top: 2px; position: absolute; right: 2px; top: 0px; color: #4D68A3; cursor: hand; cursor: pointer; //handles cross-browser } .errorDisplayDetailsButton { margin-left: 10px; margin-right: 10px; position: relative; cursor: hand; cursor: pointer; //handles cross-browser } .errorDisplayDetailsOuter{ position: absolute; top: 25%; left: 25%; width: 630px; display: none; } .errorDisplayDetails{ width: 600px; border: 2px solid #4D68A3; border-radius: 10px; background-color: white; } .errorDisplayDetailsXButton { border: 2px solid #c2c2c2; position: absolute; right: 0px; top: 0px; padding: 1px 5px; background-color: #4D68A3; border-radius: 20px; text-decoration: none; font-size: 13px; color: white; } .errorDisplayFullMessageList { //overflow: auto; //removed to have horizontal wrapping //white-space: nowrap; padding-left: 5px; overflow-x: hidden; overflow-y: auto; margin-top: 5px; font-family: Helvetica, sans-serif; font-size: .833em; color: #32446B; width: inherit; width: expression(this.parentNode.currentStyle[\'width\']); } .errorDisplayOptions{ background-color: #FFFFFF; display: inline; } span.errorDisplayDetailsPlain{ margin-left: 2px; } errorDisplayDetailsListItemCollapsed, errorDisplayDetailsListItemExpanded{ display: inline-block; } .errorDisplayDetailsListItemExpanded{ display: none; } span.expanded, span.collapsed{ cursor: hand; cursor: pointer; //handles cross-browser } span.expanded, span.collapsed, span.plain, span.additional{ display: block; float: left; clear: left; width: 20px; list-style-type: none; }</style>'));
