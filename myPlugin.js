(function ($) {
    "use strict";

    var methods = {
        init : function(options) {

            var settings = $.extend({
                'color' : '#00ffff'
            }, options);

            return this.each(function() {
                // 'this' refers to the targeted object
                //       options = { 'color' : '#ff0000'}
                $(this).css('background-color', settings.color);
                $(this).css('font-size', settings['font-size']);

                if ( ! $(this).data('myPlugin') ) {
                    $(this).data('myPlugin', {});
                }
                if (settings.color) {
                    $(this).data('myPlugin').color = settings.color;
                }
                if (settings['font-size']) {
                    $(this).data('myPlugin')['font-size'] = settings['font-size'];
                }

                return this;
            });
        }, // init() method

        setText : function(string) {
            return this.each(function() {
                $(this).text(string);
            });
        }, // setText() method

        setBackgroundColor : function(color) {
            return this.each(function() {
                $(this).css('background-color', color);
            });
        }, // setBackgroundColor() method

        setFontSize : function(size) {
            return this.each(function() {
                $(this).css('font-size', size);
            });
        }, // setFontSize() method

        reset : function() {
            return this.each(function() {
                if ($(this).data('myPlugin').color) {
                    $(this).css('background-color', $(this).data('myPlugin').color);
                }
                if ($(this).data('myPlugin')['font-size']) {
                    $(this).css('font-size', $(this).data('myPlugin')['font-size']);
                }
            });
        } // displayError() method


    };

    $.fn.myPlugin = function( method ) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.myPlugin' );
            return null;
        }    
    };
    
}(jQuery));
