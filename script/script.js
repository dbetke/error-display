

var containerDiv = "#imageContainer";  //div id to place the error dialog in, designed to change as needed



function init(){
	var msg = "This is a string of errors \n with a second line of errors \n and a third line of errors";  //assigning a message string for testing
	addErrors(msg);  //adds the error display message box on page load

}

function addErrors(msgString){
	//$(containerDiv).append('<div id ="dialog"></div>');  //appends the dialog div to the container

	$(containerDiv).append('<div id ="dialog" title="Errors">'+ msgString + '</div>');

    var w = $(containerDiv).width() - 15;  //calculates the necessary width relative to the container div
    var h = $(containerDiv).height() * .25;  //calculates the necessary height relative to the container div



	$("#dialog").dialog({ height: h, width: w, position: { my: "center bottom", at: "center bottom", of: containerDiv} }); //adds the dialog box
	$("div.ui-dialog-titlebar").css("height", ".9em"); //reduces the height of the title bar
	$("div.ui-dialog").css("font-size", "13px"); //reduces the text size of the message 
}


