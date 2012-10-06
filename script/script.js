

//will need to change div ID depending page adding error display to
var containerDiv = "#imageContainer";

function init(){
	$(containerDiv).click(addErrors); 

	//adds the necessary css for the errorDisplay
	$("head").append("<style type=\"text/css\">#errorDisplay{background-color: gray;width: 100%; height: 20px;position: relative;top: 95%;margin: 0 auto;text-align: left;</style>}");

}

function addErrors(){
	//appends the error div to the container
	$('#imageContainer').append('<div id ="errorDisplay"></div>');
	//var msgString = $("This is an error <br />"); 
	
	$("#errorDisplay").append("This is an error!<br />");
	//$("#errorDisplay").append(msgString); 


}
