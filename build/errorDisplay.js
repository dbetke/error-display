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
                        $(detailDisplay).find('.errorDisplayFullMessageArea').empty().append($(detailDisplayList));
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
                 
                if (splitMsg.length > 1){
                     $(data.detailDisplayList).append($('<li class="errorDisplayExpandable">'+errorDisplayTimestamp+" " +shortMessage+'</li>').css('color', settings.displayFontColor));
                     
                      for (var i=0; i<splitMsg.length; i++){
                        finalMsg = '<li class="errorDisplayExpandedChildren">' +  splitMsg[i] + '</li>';  
                        $(data.detailDisplayList).append($(finalMsg).css('color', settings.displayFontColor));
                      }
                }
                   
                else{
                     $(data.detailDisplayList).append($('<li>'+errorDisplayTimestamp+" " +fullMessage+'</li>').css('color', settings.displayFontColor));
                }
        
      
                if(settings.displayLocation == 'top'){
                  $this.find('.errorDisplay').removeClass('errorDisplayBottom').addClass('errorDisplayTop');
                  $this.find('.errorDisplayRetriever').removeClass('errorDisplayRetrieverBottom').addClass('errorDisplayRetrieverTop');
                }
                
                else{ 
                  $this.find('.errorDisplay').removeClass('errorDisplayTop').addClass('errorDisplayBottom');
                  $this.find('.errorDisplayRetriever').removeClass('errorDisplayRetrieverTop').addClass('errorDisplayRetrieverBottom');      
                }
                
                $this.find('.errorDisplayRetriever').hide().css('background-color', settings.displayIndicatorColor);
                $this.find('.errorDisplayOptions').hide().css('background-color', settings.displayBackgroundColor);
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
jQuery('head').append(jQuery('<style type="text/css">.errorDisplay { font-family: Helvetica, sans-serif; color: #32446B; background-color: white; text-align: left; font-size: 12px; line-height: 12px; height: 45px; left: 0px; width: inherit; width: expression(this.parentNode.currentStyle[\'width\']); border: 3px solid #4D68A3; display: none; border-radius: 10px; } .errorDisplayTop{ position: relative; } .errorDisplayBottom{ position: absolute; bottom: 0px; } .errorDisplayRetriever{ height: 8px; background-color: #ff0000; width: 8px; position: absolute; left: 0px; display: none; } .errorDisplayRetrieverTop{ border-bottom-right-radius: 10px; } .errorDisplayRetrieverBottom{ bottom: 0px; border-top-right-radius: 10px;; } .errorDisplayShortMessage{ overflow-x: hidden; overflow-y: hidden; position: absolute; bottom: 0px; left: 0px; width: 90%; margin-top: 20px; margin-left: 10px; margin-bottom: 5px; display: inline; height: 13px; } .errorDisplayOverflow{ position: absolute; right: 7px; width: 5%; bottom: 0px; margin-bottom: 5px; display: none; } .errorDisplayXButton { text-decoration: none; font-size: 15px; margin-top: 2px; position: absolute; right: 2px; top: 0px; color: #4D68A3; } .errorDisplayDetailsButton { margin-left: 10px; margin-right: 10px; position: relative; } .errorDisplayDetailsOuter{ position: absolute; top: 25%; left: 25%; width: 630px; height: 100px; display: none; } .errorDisplayDetails{ width: 600px; height: 100px; border: 2px solid #4D68A3; border-radius: 10px; background-color: white; } .errorDisplayDetailsXButton { border: 2px solid #c2c2c2; position: absolute; right: 0px; top: 0px; padding: 1px 5px; background-color: #4D68A3; border-radius: 20px; text-decoration: none; font-size: 13px; color: white; } .errorDisplayFullMessageArea { font-family: Helvetica, sans-serif; font-size: .833em; color: #32446B; height: 80px; width: inherit; width: expression(this.parentNode.currentStyle[\'width\']); margin-top: 15px; } .errorDisplayFullMessageList { overflow: auto; white-space: nowrap; height: 80px; margin-top: 5px; } .errorDisplayOptions{ background-color: #FFFFFF; display: inline; } </style>'));
