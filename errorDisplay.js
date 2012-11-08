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

    var retrievalMsg = "To retrieve errors at a later time, please click Alt+E";

    var methods = {
        init : function(options) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data('errorDisplay'),
                    settings = $.extend({
                        // key : value
                        // ...
                    }, options);
                if ( ! data ) {

                    $this.append(errorDisplayHtml);
                    $this.find('.errorDisplay').width($this.width()-6);

                    var detailDisplay = $(detailDisplayHtml).appendTo($("body"));
                    var detailDisplayList = $(detailDisplayListHtml);

                    $(detailDisplay).find(".errorDisplayXButton").click(function(event) {
                        event.preventDefault();
                        $(detailDisplay).find(".errorDisplayFullMessageArea").text(retrievalMsg);
                        $(detailDisplay).find(".errorDisplayOptions").hide();
                        $(detailDisplay).fadeOut(3000);
                    });         

                    $this.data('errorDisplay', {
                        'detailDisplay' : detailDisplay,
                        'detailDisplayList' : detailDisplayList
                    });


                    $this.find(".errorDisplayXButton").click(function(event) {
                        event.preventDefault(); 
                        $this.find(".errorDisplayShortMessage").text(retrievalMsg);
                        $this.find(".errorDisplayOptions").hide();
                        $this.find(".errorDisplay").fadeOut(3000);
                    });         


                    $this.find(".errorDisplayDetailsButton").click(function(event) {
                        event.preventDefault(); 
                        $this.find(".errorDisplay").hide();
                        $(detailDisplay).find('.errorDisplayFullMessageArea').empty().append($(detailDisplayList));
                        $(detailDisplay).find(".errorDisplayOptions").show();
                        $(detailDisplay).show();
                    });

                    $(document).keydown(function(e) {
                        if (e.altKey && (e.which === 69 || e.which === 101)){  
                            e.preventDefault();
                            $this.find(".errorDisplayOptions").show();
                            $this.find('.errorDisplay').show();
                        }
                    });

                }
                return this;
            });
        }, // init() method

        displayError : function(fullMessage, shortMessage) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data('errorDisplay');
                $this.find('.errorDisplayShortMessage').text(shortMessage);
                $this.find(".errorDisplayOptions").show();
                $this.find('.errorDisplay').show();
                $(data.detailDisplayList).append($('<li>'+fullMessage+'</li>'));
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
