(function ($) {
    "use strict";

    var errorDisplayHtml = (
        ''
            + '<div class="errorDisplay">'
            +   '<span class="errorDisplayOptions">'
            +     '<button class="errorDisplayDetailsButton">See Details</button>'
            +     '<a href="" class="errorDisplayXButton">&#10006;</a>'
            +   '</span>'
            +   '<span class="errorDisplayShortMessage"></span>'
            +   '<span class="errorDisplayOverflow">...</span>'
            + '</div>'
            + '<span class="errorDisplayRetriever"></span>'
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
        '   <span class ="{{class}}">&bull; {{message}}</span>' + 
	' </div>'
    );

    
    var multiLineMessageOuterTemplate = (
       ' <div class="errorDisplayDetailsListItem">' +
       '   <div class="errorDisplayDetailsListItemCollapsed"></div>' +
       '   <div class="errorDisplayDetailsListItemExpanded"></div>' +
       ' </div>'
    );
    
    var multiLineMessageAdditionalLineTemplate = (
      ' <span class="{{class}}">{{bullet}} {{message}}</span>'
    );
   

    var multiLineMessageFirstLineTemplate = (
        ' <div class="errorDisplayDetailsListItem">' +
        '   <span class ="{{class}}">{{bullet}} {{message}}</span>' + 
	' </div>'
    );


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
                        'displayLocation' : 'bottom'
                    }, options);
                

                if ( ! data ) {
                    
                    $this.append(errorDisplayHtml);
                    $this.find('.errorDisplay').width($this.width()-6);  
                    
                    var detailDisplay = $(detailDisplayHtml).appendTo($("body"));
                    var detailDisplayList = $(detailDisplayListHtml);
                    var errorDisplayFlag = 0;  //set error display flag to off

                    
                    $(detailDisplay).find('.errorDisplayDetailsXButton').click(function(event) {
                        event.preventDefault();
                        $(detailDisplay).hide().find('.errorDisplayOptions').hide();   
                        $this.find('.errorDisplayRetriever').show();
                    });         
                    
                    $this.data('errorDisplay', {
                        'detailDisplay' : detailDisplay,
                        'detailDisplayList' : detailDisplayList,
                        'displayFontColor' : settings.displayFontColor,
                        'displayBackgroundColor' : settings.displayBackgroundColor,
                        'displayTime' : settings.displayTime,
                        'displayIndicatorColor' : settings.displayIndicatorColor,
                        'displayLocation' : settings.displayLocation
                    });

                    $this.find('.errorDisplayXButton').click(function(event) {
                        event.preventDefault(); 
                        $this.find('.errorDisplayOptions').hide();
                        $this.find('.errorDisplay').slideUp(settings.displayTime, function(){
                            $this.find('.errorDisplayRetriever').show();
                        });
                        
                        console.log(event.timestamp);
                    });         
                                     
                    $this.find('.errorDisplayDetailsButton').click(function(event) {
                        event.preventDefault(); 
                        $this.find('.errorDisplay').hide();           
                        $this.find('.errorDisplayRetriever').hide();
			$(detailDisplay).find('.errorDisplayFullMessageArea').append($(detailDisplayList));
			$(detailDisplay).show();       
                        
                        
                        $(detailDisplay).find('.errorDisplayExpandable').click(function(event){
                          event.preventDefault();
                          $(this).nextUntil('.errorDisplayExpandable').toggle();
                        });                 
                                      
                    });
                    
                    
                    $this.find('.errorDisplayRetriever').hover(function(event) {
                        event.preventDefault();
                        errorDisplayFlag = 1;  //turn on error display flag
                          $this.find('.errorDisplayRetriever').hide();
                          $this.find('.errorDisplay').slideDown(function(){
                            $this.find('.errorDisplay').show();
                            $this.find('.errorDisplayOptions').show();
                          });  
   
                    });  
                    
                    $this.find('.errorDisplay').mouseleave(function(event){
                      if(errorDisplayFlag){ //test for error display flag
                        $this.find('.errorDisplayOptions').hide();
                        $this.find('.errorDisplay').slideUp(settings.displayTime, function(){
                          if( $(detailDisplay).css("display") == 'none' ){
                            $this.find('.errorDisplayRetriever').show(); //only show retriever if not viewing display details
                          }
                        });
                        errorDisplayFlag = 0; //turn off error display flag 
                      }                    
                    });                                       
                }
                return this;
            });
        }, // init() method
        
        displayError : function(fullMessage, shortMessage, options) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data('errorDisplay'),
                    settings = $.extend({
                        'displayFontColor' : data.displayFontColor,
                        'displayBackgroundColor' : data.displayBackgroundColor,
                        'displayTime' : data.displayTime,
                        'displayIndicatorColor' : data.displayIndicatorColor,
                        'displayLocation' : data.displayLocation
                    }, options);           
                
                var errorDisplayShortMessage = (!shortMessage) ? fullMessage : shortMessage;  //use first line of full message if short message does not 
                var errorDisplayTimestamp = new Date();
                errorDisplayTimestamp = (errorDisplayTimestamp.getMonth() + 1) + "/" + errorDisplayTimestamp.getDate() + "/" + errorDisplayTimestamp.getFullYear() + " " + errorDisplayTimestamp.toTimeString().substr(0,8);
                
                
                //process for multi-line messages
                var splitMsg = fullMessage.split("\n"); 
                var finalMsg;
                
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
		    obj.find('.errorDisplayDetailsListItemCollapsed').append(Mustache.to_html(multiLineMessageFirstLineTemplate, {'class' : 'collapsed', 'bullet' : '+', 'message' : errorDisplayTimestamp + ' ' + splitMsg[0] })).css('color', settings.displayFontColor);
		    obj.find('.errorDisplayDetailsListItemExpanded').append(Mustache.to_html(multiLineMessageFirstLineTemplate, {'class' : 'expanded', 'bullet' : '-', 'message' : errorDisplayTimestamp + ' ' + splitMsg[0] })).css('color', settings.displayFontColor);		    
		    for (var i=1; i<splitMsg.length; i++){
			obj.find('.errorDisplayDetailsListItemExpanded').append(Mustache.to_html(multiLineMessageAdditionalLineTemplate, {'class' : 'additional', 'bullet' : ' ', 'message' : splitMsg[i] })).css('color', settings.displayFontColor);
		    }
		    setupClickHandlers(obj);
		}


                if(settings.displayLocation == 'top'){
                  $this.find('.errorDisplay').removeClass('errorDisplayBottom').addClass('errorDisplayTop');
                  $this.find('.errorDisplayRetriever').removeClass('errorDisplayRetrieverBottom').addClass('errorDisplayRetrieverTop');
                }
                
                else{ 
                  $this.find('.errorDisplay').removeClass('errorDisplayTop').addClass('errorDisplayBottom');
                  $this.find('.errorDisplayRetriever').removeClass('errorDisplayRetrieverTop').addClass('errorDisplayRetrieverBottom');      
                }
                
                $this.find('.errorDisplayRetriever').hide();
                $this.find('.errorDisplayOptions').hide();
                $this.find('.errorDisplayShortMessage').css('color', settings.displayFontColor).html(errorDisplayShortMessage); 
                
                if( $('.errorDisplayDetailsOuter').css("display") == 'none' ){  //only show error display div if details are not open

                    $this.find('.errorDisplay').css('background-color', settings.displayBackgroundColor).show();  

                    //using height + 2 as a workaround due to inexplicable differences between scrollheight and height in some browsers
                    if(($('.errorDisplayShortMessage').height()+ 2) < $('.errorDisplayShortMessage')[0].scrollHeight){
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
                      $this.find('.errorDisplayOptions').show();
                      $this.find('.errorDisplay').show();
                    }
                } 
		

               // $(data.detailDisplayList).append($('<li>'+errorDisplayTimestamp+" " +fullMessage+'</li>').css('color', settings.displayFontColor));

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
