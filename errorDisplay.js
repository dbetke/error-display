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
            + '</div>'
            + '<span class="errorDisplayRetriever"></span>'
    );
    
    var detailDisplayHtml = (
        ''
            + '<div class="errorDisplayDetails">'
            +   '<span class="errorDisplayOptions">'
            +     '<a href="" class="errorDisplayXButton">&#10006;</a>'
            +   '</span>'
            +   '<span class="errorDisplayFullMessageArea"></span>'
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
                    
                    $(detailDisplay).find('.errorDisplayXButton').click(function(event) {
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
                    });         
                    
                    
                    $this.find('.errorDisplayDetailsButton').click(function(event) {
                        event.preventDefault(); 
                        $this.find('.errorDisplay').hide().off(); //stops mouseleaveevent when details button is clicked              
                        $this.find('.errorDisplayRetriever').hide();
                        $(detailDisplay).find('.errorDisplayFullMessageArea').empty().append($(detailDisplayList));
                        $(detailDisplay).find('.errorDisplayOptions').show();
                        $(detailDisplay).show();                     
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
                $this.find('.errorDisplayShortMessage').css('color', settings.displayFontColor).text(shortMessage);   
                $this.find('.errorDisplay').css('background-color', settings.displayBackgroundColor).show();  
                
                  
               if(settings.displayTime != -1){   
                  $this.find('.errorDisplay').slideUp(settings.displayTime, function(){
                      $this.find('.errorDisplayRetriever').show();
                  });                              
              }
                
               else{                   
                   $this.find('.errorDisplayOptions').show();
                   $this.find('.errorDisplay').show().off();
                 }
                
                $(data.detailDisplayList).append($('<li>'+fullMessage+'</li>').css('color', settings.displayFontColor));
                
                $this.find('.errorDisplayRetriever').hover(function(event) {
                    event.preventDefault();                 
                    $this.find('.errorDisplayOptions').hide();
                    $this.find('.errorDisplayShortMessage').text(shortMessage).css('color', settings.displayFontColor);   
                                         
                    $this.find('.errorDisplay').slideDown(function(){
                      $this.find('.errorDisplayOptions').show();
                      $this.find('.errorDisplay').mouseleave(function(event){
                        event.preventDefault(); 
                        $this.find('.errorDisplayOptions').hide();
                        $this.find('.errorDisplay').slideUp(settings.displayTime, function(){
                            $this.find('.errorDisplayRetriever').show();
                        });                     
                      });     
                    });    
                                   
                    $this.find('.errorDisplayRetriever').hide();
                });
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
