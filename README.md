=== Error Display ===
Contributors: Mark Phillips

== Description ==

This plugin allows JavaScript errors to be displayed within a div on a webpage as an alternative to viewing them in the console.  

== Installation ==

Add jquery-1.8.2.js to project (located in repository's lib / jquery folder)
Add errorDisplay.js to project (located in repository's build folder)
Reference both JavaScript files in html page
Call error display
  To use defaults: 
    $(yourDiv).errorDisplay("displayError", yourFullMessage, yourShortMessage);
  To modify defaults:
    $(yourDiv).errorDisplay("displayError", yourFullMessage, yourShortMessage, {
        displayIndicatorColor: '',  //defaults to red
        displayBackgroundColor: '', //defaults to white
        displayFontColor: '',       //defaults to red
        displayTime: '',            //defaults to 1000 (hides after 1 second, can change time or set to -1 to keep on screen)
        displayLocation: ''         //defaults to bottom of div, only valid alternative is 'top'
    });

== Additional Info  ==

Internet Explorer does not like the styling; the plugin works in IE, but does not look as pretty.