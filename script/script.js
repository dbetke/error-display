

//will need to change div ID depending page adding error display to
var containerDiv = "#imageContainer";

function init(){

	$(containerDiv).click(addErrors); 

	//adds the necessary css for the errorDisplay
	//$("head").append("<style type=\"text/css\">#errorDisplay{background-color: gray;width: 100%; height: 20px;position: relative;top: 95%;margin: 0 auto;text-align: left;</style>}");



}

function addErrors(){
	//appends the error div to the container
	$('#imageContainer').append('<div id ="errorDisplay"></div>');
	//var msgString = $("This is an error <br />"); 
	
	//$("#errorDisplay").append("This is an error!<br />");
	//$("#errorDisplay").append(msgString); 


/**
	Download necessary files for locally stored css and js for dialog
	Once verified, change to have dialog hover in the proper area
	Change css to have dialog box be the right size relative to the
		container
	Have dialog not force user to click - simply sit there and allow the 
		user to ignore or x out
*/


	$('#errorDisplay').append('<div id ="dialog"></div>');
	$( "#dialog" ).dialog({ height: 75, minWidth:500, position: "bottom" });
	//$(".ui-dialog-titlebar").hide();
	//$(".ui-dialog").addClass("customclass");

}


