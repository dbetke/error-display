
function init(){
	//assigning temporary message strings for testing
	var msg = "This is a string of errors \n with a second line of errors \n and a third line of errors \n and a fourth \n and \n and \n and then \n and some more \n and even more \n and \n and \n and \n blah blah blah";  
	var shortMsg = "This is a short message";
	
	//adds the error display message box on page load
	addErrors(msg);  

}


function addErrors(msgString, shortMsgString){
	//replace the unrecognized new line characters with line breaks 
	var fullMsg =  msgString.replace(/\n\r?/g, '<br />'); 
	
	//split the full message and return the first line only to display
	var firstLine = function(){
		var splitMsg = msgString.split("\n");
		return splitMsg[0];
		}

	//if shortMsgString exists, use it for final message, else use msgString
	var finalMsg = (shortMsgString != null) ? shortMsgString : firstLine; 

	//find the parent div to append the message dialog to
	var containerDiv = "#" + $("#errorDisplay").parent().attr("id"); 

	//only create error message dialog if errors exist
	if (msgString != null){ 
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
		$(".scrollbox").append(finalMsg); 
		
		
		//set the x button click event
		$(".xbutton").bind('click', function(event) {
    			alert("closed!");
		});

		//set the show details button click event
		$(".detailsButton").bind('click', function(event) {
    			alert(msgString);
		});

	}

}




