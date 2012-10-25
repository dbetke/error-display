
var containerDiv; 	//stores parent div
var finalShortMsg; 	//stores final single-line message for display
var fullMsg; 		//stores final full message for display if user chooses to view

function init(){
	//assigning temporary message strings (for testing only)
	var longMsg = "This is a string of errors \n with a second line of errors \n and a third line of errors \n and a fourth \n and \n and \n and then \n and some more \n and even more \n and \n and \n and \n blah blah blah";  
	var shortMsg = "This is a short message";
	
	//find the parent div to append the message dialog to
	containerDiv = "#" + $("#errorDisplay").parent().attr("id");

	//adds the error display message box on page load
	addErrors(longMsg); 

}


function addErrors(msgString, shortMsgString){
	//replace the unrecognized new line characters with line breaks 
	fullMsg =  msgString.replace(/\n\r?/g, '<br />'); 
	

	//split the full message and return the first line only to display
	var firstLine = function(){
		var splitMsg = msgString.split("\n");
		finalShortMsg = splitMsg[0];
		return splitMsg[0];
		}

	//if shortMsgString exists, use it for final message, else use msgString
	finalShortMsg = (shortMsgString != null) ? shortMsgString : firstLine; 
 
	//only create error message dialog if errors exist
	if (msgString != null){ 
		addDisplay(finalShortMsg);
	}

}


function addDisplay(msg){
		//add css to the html page
		$("head").append("<link rel='stylesheet' type='text/css' href='lib/css/errorDisplay.css' />"); 
		
		//add the error display box class with css to the error display div
		$("#errorDisplay").addClass("errorDisplay_initial"); 
		//calculate to use for positioning relative to top of outer div
		var h = $(containerDiv).height() - 40; 
	  
		//set the error display box to the bottom of the outer div utilizing the top attribute
	    $(".errorDisplay_initial").css("top", h); 

		//append the show details button
		$(".errorDisplay_initial").append("<button id='details' class='errorDisplay_detailsButton'>See Details</button>"); 

		//append the x button
		$(".errorDisplay_initial").append("<a href='' class='errorDisplay_xbutton'>&#10006;</a>");

		//add the single-line message to the screen
		$(".errorDisplay_initial").append("<span class='errorDisplayInitialMessage'>").append(msg).append("</span>"); 
		
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
	       		addDisplay(finalShortMsg); 
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


