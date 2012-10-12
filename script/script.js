

var containerDiv = "#imageContainer";  //div id to place the error dialog in, designed to change as needed
	


function init(){
	var msg = "This is a string of errors \n with a second line of errors \n and a third line of errors";  //assigning a message string for testing
	
	addErrors(msg);  //adds the error display message box on page load

}

function addErrors(msgString){
	
	$(containerDiv).append('<div id ="dialog" title="Errors"></div>'); //appends the errors div to the container declared above

    var w = $(containerDiv).width() - 15;  //calculates the necessary width relative to the container div
    var h = $(containerDiv).height() * .30;  //calculates the necessary height relative to the container div

    $("#dialog").html(msgString.replace(/\n\r?/g, '<br />')); //replace all \n's with <br />'s, since \n is not recognized in the dialog box
    $("#dialog").dialog({ height: h, width: w, position: { my: "center bottom", at: "center bottom", of: containerDiv} }); //adds the dialog box
	$("div.ui-dialog-titlebar").css("height", ".9em"); //reduces the height of the title bar
	$("div.ui-dialog").css("font-size", "13px"); //reduces the text size of the message 

}


