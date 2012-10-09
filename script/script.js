

var containerDiv = "#imageContainer";  //div id to place the error dialog in, designed to change as needed

function init(){

	addErrors();  //adds the error display message box on page load

}

function addErrors(){
	$(containerDiv).append('<div id ="dialog"></div>');  //appends the dialog div to the container

    var w = $(containerDiv).width() - 15;  //calculates the necessary width relative to the container div
    var h = $(containerDiv).height() * .25;  //calculates the necessary height relative to the container div



	$( "#dialog" ).dialog({ height: h, width: w, position: { my: "center bottom", at: "center bottom", of: containerDiv} }); //adds the dialog box
	$('div.ui-dialog-titlebar').css('height', '.5em'); //reduces the height of the title bar

}


