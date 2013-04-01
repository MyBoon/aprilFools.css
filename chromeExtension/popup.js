
$(function(){

	/* Contact process.js to get effects */
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {method: "fromPopup", tabid: tab.id}, function(response) {

	    	var current = parseInt(response.current);

	    	// create select
	    	var tpl = "<select class='choice'>";
			for (var i = 0; i != response.effects.length; i++)
				tpl += "<option value='" + i + "'" + ((i == current) ? ("selected = 'true'") : ("")) + ">" + response.effects[i].name + "</option>";
			tpl += "</select>";

			// insert content
			$(".config").html(tpl);

			/* Bind validate button */
			$(".validateConfig").click(function() {
		    	var choice = $('.choice').find(":selected").index();
		    	
		    	// send choice to content script
		    	chrome.tabs.sendRequest(tab.id, {method: "fromPopupChoice", choice: choice});
		    	window.close();
		    });

			/* Bind cancel button */
		    $(".cancelConfig").click(function() {
		    	window.close();
		    });

		    /* Bind disable button */
		    $(".disableConfig").click(function() {
		    	// send non-valid effect
		    	chrome.tabs.sendRequest(tab.id, {method: "fromPopupChoice", choice: -1});
		    	window.close();
		    });
	    });
	});
})