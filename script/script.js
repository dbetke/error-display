
var containerDiv;   //stores parent div
var fullShortMsg; 	//stores full single-line message for display <todo: add ability to view the full short message - maybe on hover?>
var initialMsg;		//stores the shortened single-line message for display
var fullMsg; 		//stores final full message for display if user chooses to view

//set message to instruct user how to retrieve error message after x button is clicked
var retrievalMsg = "To retrieve errors at a later time, please click Alt+E";

//set html that is applied to the error display div on init
var errorDisplayHtml = "<span class='errorDisplayOptions'>" + 
					   "<button id='details' class='errorDisplay_detailsButton'>See Details</button>" + 
					   "<a href='' class='errorDisplay_xbutton'>&#10006;</a>" + 
					   "</span>" + //end error display options span tag
					   "<span class='errorDisplayMessage'></span>";

function init(){
	
	//find the parent div of errorDisplay (needed for error display positioning)
	containerDiv = "#" + $("#errorDisplay").parent().attr("id");
	
	//change the parent div's position attribute so the error display div will be at the bottom
	$("#containerDiv").css("position", "relative");

	//append necessary html to the error display 
	$("#errorDisplay").append(errorDisplayHtml); 

	//append necessary html to the body for displaying full error details to user
	$("body").append("<div class = 'detailsDisplay'><span class='detailsDisplayMessage'></span><a href='' class='errorDisplay_xbutton'>&#10006;</a></div>");

}

function processErrors(fullMsgString, shortMsgString){

	//if there is no short message passed to the function, split the full message string and use the first line
	if (shortMsgString == ""){
		var splitMsg = fullMsgString.split("\n"); 
		var firstLine = splitMsg[0];
	}

	//replace the unrecognized new line characters with line breaks 
	fullMsg =  fullMsgString.replace(/\n\r?/g, '<br />'); 

	//if shortMsgString exists, use it for final message, else use msgString
	initialMsg = (shortMsgString != "") ? shortMsgString : firstLine;

	//only create error message dialog if errors exist
	if (fullMsgString != null){ 
		/*
		//shorten the message if longer than 90 characters
		if (initialMsg.length > 90){
			fullShortMsg = initialMsg;
			initialMsg = initialMsg.substring(0,90) + " ...";
		}
		*/

		showErrors(initialMsg);		
	}

}

function showErrors(msg){
	
		//empty the error display message (primarily for testing)
		$(".errorDisplayMessage").empty();

		//make the error display visible
		$("#errorDisplay").show();

		//make the error display options visible
		$(".errorDisplayOptions").show();

		//add the initial message to the screen
		$(".errorDisplayMessage").append(msg);

		//set the show details button click event
		$(".errorDisplay_detailsButton").bind("click", function(event) {
    			showDetails();
		});

		//set the x button click event
		$(".errorDisplay_xbutton").click(function(event) {
			$(".errorDisplayMessage").empty().append(retrievalMsg);
  			fadeErrorDisplay(event);
		});			

}

function showDetails(){

	//hide the error display div
	removeErrorDisplay();

	//clear any previous details display message
	$(".detailsDisplayMessage").empty();

	//show the details display div with the full message
	$(".detailsDisplay").show();
	$(".detailsDisplayMessage").append(fullMsg);

	//set the x button click event
		$(".errorDisplay_xbutton").click(function(event) {
			$(".detailsDisplayMessage").empty().append(retrievalMsg);
  			removeDetailsDisplay(event);
		});
	
}	

function retrieve(){

	//remove the retrieval message 
	$(".errorDisplayMessage").empty(); 

	$(document).keydown(function(e) {

		//detect alt + e or alt + E keypress
    	if (e.altKey && (e.which === 69 || e.which === 101)){  
        	e.preventDefault(); 

        	//verify error display is not already visible to prevent duplicated errors
        	if ($("#errorDisplay").is(':hidden')){ 

	        	//show the errorDisplay div
	       		$("#errorDisplay").show(); 

	       		//add the short error message back to the div
	       		showErrors(initialMsg); 
       		}	
    	}
    });

}

//fade the error display, while showing user retrieval instructions
function fadeErrorDisplay(event){
	event.preventDefault();	
	$(".errorDisplayOptions").hide();
	$("#errorDisplay").fadeOut(3000, function(){
		//allow the user to retrieve the message after fade out has completed
		retrieve(); 
	});
}

//quickly hide error display
function removeErrorDisplay(){

	//hide the error display
	$("#errorDisplay").hide();
}

//remove the details display div after user closes out
function removeDetailsDisplay(event){
	event.preventDefault();
	
	$(".detailsDisplay").fadeOut(3000, function(){	

		//allow the user to retrieve the errors after fade out has completed
		retrieve(); 
		
	});
}




