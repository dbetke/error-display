
function init(){
	var msg = "This is a string of errors \n with a second line of errors \n and a third line of errors \n and a fourth \n and \n and \n and then \n and some more \n and even more \n and \n and \n and";  //assigning a message string for testing
	var shortMsg = "This is a short message";
	addErrors(msg);  //adds the error display message box on page load

}



function addErrors(msgString, shortMsgString){

	var fullMsg =  msgString.replace(/\n\r?/g, '<br />'); //replace the unrecognized new line characters with line breaks 
	var firstLine = function(){
		var splitMsg = msgString.split("\n");
		return splitMsg[0];
		}
		

	var finalMsg = (shortMsgString != null) ? shortMsgString : firstLine; //if shortMsgString exists, use it for final message, else use msgString
	var scrollboxClass = {	"font-family" :  "Helvetica, sans-serif", 
							"background-color": "#CCCCFF",
							"text-align" : "left", 
							"font-size" : "10px",
							"line-height" : "12px", 
							"height" : "20px", 
							"padding" : "5px", 
							"overflow" : "auto",
							"position": "relative"};


	var containerDiv = "#" + $("#errorDisplay").parent().attr("id"); //finds the parent div to append the message dialog to

	if (msgString != null){ //only create error message dialog if errors exist

		$(containerDiv).append('<div id ="dialog" title="Errors"></div>'); //appends the errors div to the container declared above
		$("#errorDisplay").addClass("scrollbox"); //add the class
		$(".scrollbox").css(scrollboxClass); //add the css
		$(".scrollbox").append(finalMsg); //append the message to the screen

 
	    var h = $(containerDiv).height() - 40; //calculate to use for positioning relative to top of outer div
	    var w = $(containerDiv).width() - 20; //calculate to use for setting the scrollbox width
	    

	    $(".scrollbox").css("top", h); //set the scrollbox to the bottom of the outer div utilizing the top attribute




	}

}




