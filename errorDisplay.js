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
                        'fontColor' : '#ff0000',
                        'backgroundColor' : '#ffffff',
                        'displayTime' : 2000
                    }, options);
                    
                if ( ! data ) {

                    $this.append(errorDisplayHtml);
                    $this.find('.errorDisplay').width($this.width()-6);  

                    var detailDisplay = $(detailDisplayHtml).appendTo($("body"));
                    var detailDisplayList = $(detailDisplayListHtml);

                    $(detailDisplay).find('.errorDisplayXButton').click(function(event) {
                        event.preventDefault();
                        $(detailDisplay).find('.errorDisplayOptions').hide();   
                        $(detailDisplay).hide();
                        $this.find('.errorDisplayRetriever').show();
                    });         

                    $this.data('errorDisplay', {
                        'detailDisplay' : detailDisplay,
                        'detailDisplayList' : detailDisplayList,
                        'fontColor' : settings.fontColor,
                        'backgroundColor' : settings.backgroundColor,
                        'displayTime' : settings.displayTime
                    });


                    $this.find('.errorDisplayXButton').click(function(event) {
                        event.preventDefault(); 
                        $this.find('.errorDisplayOptions').hide();
                        $this.find('.errorDisplay').slideUp();
                        $this.find('.errorDisplayRetriever').show();
                    });         


                    $this.find('.errorDisplayDetailsButton').click(function(event) {
                        event.preventDefault(); 
                        $this.find('.errorDisplay').hide();
                        $(detailDisplay).find('.errorDisplayFullMessageArea').empty().append($(detailDisplayList));
                        $(detailDisplay).find('.errorDisplayOptions').show();
                        $(detailDisplay).show();
                        $this.find('.errorDisplayRetriever').hide();
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
                        'fontColor' : data.fontColor,
                        'backgroundColor' : data.backgroundColor,
                        'displayTime' : data.displayTime
                    }, options);
   
   console.log("fontColor: " + settings.fontColor + " backgroundColor: " + settings.backgroundColor + " displayTime: " + settings.displayTime);
                
                $this.find('.errorDisplayRetriever').hide();
                $this.find('.errorDisplayOptions').hide();
                
             
                if(settings.displayTime >= 0){    
                  $this.find('.errorDisplayShortMessage').text(shortMessage).css('color', settings.fontColor);                
                  $this.find('.errorDisplay').show();
                  $this.find('.errorDisplay').slideUp(settings.displayTime, function(){
                    $this.find('.errorDisplayRetriever').show();
                  });              
                  
              }
                
                else{                   
                   $this.find('.errorDisplayShortMessage').text(shortMessage).css('color', settings.fontColor);
                   $this.find('.errorDisplayOptions').show();
                   $this.find('.errorDisplay').show();
                 }
                
                $(data.detailDisplayList).append($('<li>'+fullMessage+'</li>').css('color', settings.fontColor));
                
                $this.find('.errorDisplayRetriever').hover(function(event) {
                    event.preventDefault();                 
                    $this.find('.errorDisplayOptions').hide();
                    $this.find('.errorDisplayShortMessage').text(shortMessage).css('color', settings.fontColor);                 
                    $this.find('.errorDisplay').slideDown(function(){
                      $this.find('.errorDisplayOptions').show();
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
