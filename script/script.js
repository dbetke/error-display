
var containerDiv; 	//stores parent div
var finalMsg; 		//stores final single-line message for display
var fullMsg; 		//stores final full message for display if user chooses to view

function init(){
	//assigning temporary message strings for testing
	var longMsg = "This is a string of errors \n with a second line of errors \n and a third line of errors \n and a fourth \n and \n and \n and then \n and some more \n and even more \n and \n and \n and \n blah blah blah";  
	var shortMsg = "This is a short message";
	
	//adds the error display message box on page load
	addErrors(longMsg); 

}


function addErrors(msgString, shortMsgString){
	//replace the unrecognized new line characters with line breaks 
	fullMsg =  msgString.replace(/\n\r?/g, '<br />'); 
	


	//split the full message and return the first line only to display
	var firstLine = function(){
		var splitMsg = msgString.split("\n");
		finalMsg = splitMsg[0];
		return splitMsg[0];
		}


	//if shortMsgString exists, use it for final message, else use msgString
	finalMsg = (shortMsgString != null) ? shortMsgString : firstLine; 


	//find the parent div to append the message dialog to
	containerDiv = "#" + $("#errorDisplay").parent().attr("id"); 

	//only create error message dialog if errors exist
	if (msgString != null){ 
		addDisplay(finalMsg);
	}

}

function addDisplay(msg){
		$("head").append("<style> .xbutton { text-decoration : none; font-size : 15px} .detailsButton{margin-left : 10px}</style>"); //add css to the html page
		
		//add the scrollbox class with css to the error display div
		$("#errorDisplay").addClass("scrollbox").css({"font-family" :  "Helvetica, sans-serif", 
													  "background-color": "#CCCCFF",
													  "text-align" : "left", 
													  "font-size" : "12px",
													  "line-height" : "12px", 
													  "height" : "20px", 
													  "padding" : "5px", 
													  "position": "relative"}); 
		//calculate to use for positioning relative to top of outer div
		var h = $(containerDiv).height() - 40; 
	  
		//set the scrollbox to the bottom of the outer div utilizing the top attribute
	    $(".scrollbox").css("top", h); 

	    //add the options div to the error display div 
		$("#errorDisplay").append("<div id ='options'></div>"); 

		//assign css to the options div
		$("#options").css({ "text-align" : "right",
							"float" : "right"}); 

		//append the show details button
		$("#options").append("<button id='details' class='detailsButton'>See Details</button>&nbsp;&nbsp;"); 

		//append the x button
		$("#options").append("<a href='' class='xbutton'>&#10006;</a>"); 

		//add the single-line message to the screen
		$(".scrollbox").append("<span class='message'>").append(msg).append("</span>"); 
		

		//set the x button click event
		$('.xbutton').click(function(event) {
  			event.preventDefault();
			$(".scrollbox").empty().append("To retrieve errors at a later time, please click Alt+E");
			$("#errorDisplay").fadeOut(3000);
		});

		//set the show details button click event
		$(".detailsButton").bind('click', function(event) {
    			alert(fullMsg);
		});

		$(document).keydown(function(e) {
    		if (e.altKey && (e.which === 69 || e.which === 101)){  //detect alt + e or alt + E keypress
        		e.preventDefault();
       		 	retrieve();
    		}
		}); 
}

function retrieve(){
	alert(finalMsg);
}




//alt = 18
// e = 69




