
var containerDiv;   //stores parent div
var fullShortMsg; 	//stores full single-line message for display
var initialMsg;		//stores the shortened single-line message for display
var fullMsg; 		//stores final full message for display if user chooses to view

var cssLink = "<link rel='stylesheet' type='text/css' href='lib/css/errorDisplay.css' />";
var errorDisplayHtml = "<button id='details' class='errorDisplay_detailsButton'>See Details</button>" + 
					   "<a href='' class='errorDisplay_xbutton'>&#10006;</a>" + 
					   "<span class='errorDisplayInitialMessage'></span>";

function init(){
	
	//find the parent div to append the message dialog to
	containerDiv = "#" + $("#errorDisplay").parent().attr("id");

	//adds the error display message box on page load
	//addErrors(longMsg); 
}

function test(userShortMsg, userFullMsg){

 	addErrors(userFullMsg, userShortMsg);	

}

function addErrors(msgString, shortMsgString){
	//if there is no short message passed to the function, split the full message string and use the first line
	if (shortMsgString == ""){
		var splitMsg = msgString.split("\n"); 
		var firstLine = splitMsg[0];
	}

	//replace the unrecognized new line characters with line breaks 
	fullMsg =  msgString.replace(/\n\r?/g, '<br />'); 


	//if shortMsgString exists, use it for final message, else use msgString
	initialMsg = (shortMsgString != "") ? shortMsgString : firstLine;

	//only create error message dialog if errors exist
	if (msgString != null){ 
		if (initialMsg.length > 90){
			fullShortMsg = initialMsg;
			initialMsg = initialMsg.substring(0,90) + " ...";
		}

		addDisplay(initialMsg);		
	}

}


function addDisplay(msg){

	if ($("#errorDisplay").is(':empty')){ //prevent duplicated errors
		//calculate to use for positioning relative to top of outer div
		var h = $(containerDiv).height() - 40;


		//add css to the html page
		$("head").append(cssLink);  
		
		//add the error display box class with css to the error display div
		$("#errorDisplay").addClass("errorDisplay_initial");  
	  
		//set the error display box to the bottom of the outer div utilizing the top attribute
	    $(".errorDisplay_initial").css("top", h); 

		//append necessary html to the error display 
		$(".errorDisplay_initial").append(errorDisplayHtml); 

		//add the single-line message to the screen
		$(".errorDisplayInitialMessage").append(msg);
	}
	else {

		//if the error has changed, displays the new error (primarily for testing)
		$(".errorDisplay_initial").empty();
		$("#errorDisplay").show(); 
		addDisplay(initialMsg); 

	}

		//set the show details button click event
		$(".errorDisplay_detailsButton").bind("click", function(event) {
    			showDetails();
		});

		//set the x button click event
		$(".errorDisplay_xbutton").click(function(event) {
			$(".errorDisplay_initial").empty().append("To retrieve errors at a later time, please click Alt+E");
  			fadeErrorDisplay();
		});

				 
}

function showDetails(){
	removeErrorDisplay();
	$("body").append("<div class = 'detailsDisplay'></div>");
	$(".detailsDisplay").append("<a href='' class='errorDisplay_xbutton'>&#10006;</a>");
	$(".detailsDisplay").append(fullMsg);
	//set the x button click event
		$(".errorDisplay_xbutton").click(function(event) {
			$(".detailsDisplay").empty().append("To retrieve errors at a later time, please click Alt+E");
  			removeDetailsDisplay();
		});
}

function retrieve(){
	//remove the retrieval message 
	$(".errorDisplay_initial").empty(); 

	$(document).keydown(function(e) {
		//detect alt + e or alt + E keypress
    	if (e.altKey && (e.which === 69 || e.which === 101)){  
        	e.preventDefault(); 
        	if ($("#errorDisplay").is(':hidden')){ //prevent duplicated errors
	        	//show the errorDisplay div
	       		$("#errorDisplay").show(); 
	       		//add the short error message back to the div
	       		addDisplay(initialMsg); 
       		}	
    	}
    });

}

//fade the error display, while showing user retrieval instructions
function fadeErrorDisplay(){
	event.preventDefault();	
	$("#errorDisplay").fadeOut(3000, function(){
		//allow the user to retrieve the message after fade out has completed
		retrieve(); 
	});
}

//quickly hide error display
function removeErrorDisplay(){
	event.preventDefault();
	$("#errorDisplay").hide();
}

//remove the details display div after user closes out
function removeDetailsDisplay(){
	event.preventDefault();
	
	$(".detailsDisplay").fadeOut(3000, function(){
		//allow the user to retrieve the errors after fade out has completed
		retrieve(); 
		//remove details display after hidden
		$(".detailsDisplay").remove(); 
	});

}




