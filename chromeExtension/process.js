$(function() {

	/* Effects definition */

	var upsidedown = function(type) {
		$(type).css("-webkit-transform", "rotate(180deg)");
	}

	var blur = function() {
		/* doesn't work :( */
		// $("body").css("-webkit-animation", "ablur 30s infinite");
		$("body").css("-webkit-filter", "blur(10px)");
	}

	var spinwebsite = function() {
		$("body").css("-webkit-animation", "spin 5s linear infinite");
	}

	var comicsans = function() {
		$("body").css("cssText", "font-family: 'Comic Sans MS', cursive !important;");
		$("p").css("cssText", "font-family: 'Comic Sans MS', cursive !important;");
		$("body p").css("cssText", "font-family: 'Comic Sans MS', cursive !important;");
		$("body div p").css("cssText", "font-family: 'Comic Sans MS', cursive !important;");
	}

	var spinimg = function() {
		$("img").css("-webkit-animation", "spin 1s linear infinite");
	}

	var hide2ndp = function() {
		$("p:nth-child(2)").css("cssText", "display:none !important;");
	}

	var cursorwait = function() {
		$("html").css("cssText", "cursor: wait !important;");
	}

	var cursorhide = function() {
		$("html").css("cssText", "cursor: none !important;");
	}

	var grow = function() {
		$("p").css("-webkit-animation", "grow 120s ease-in");
	}

	var pride = function() {
		$("html").css("-webkit-animation", "rainbow 8s infinite");
	}

	var websitefall = function() {
		$("html").css("height", "100%");
		$("body").css("height", "100%"); 
		$("html").css("-webkit-perspective", "1000");
		$("html").css("perspective", "1000");

		$("body").css("-webkit-transform-origin", "bottom center");
	  	$("body").css("-webkit-transform", "rotateX(-90deg)");
	  	$("body").css("-webkit-animation", "fall 1.5s ease-in");
	}

	var yolo = function() {
		$("p").before('<p>YOLO</p>');
	}

	var cutp = function() {
		$("p").each(function(index) {
	        var text = $(this).text();
	        var reg = new RegExp('^(.{' + 20 + '}[^\\s]*).*');
	        $(this).text(text.replace(reg, "$1") + ".");
	    });
	}

	var fadeout = function(type) {
		$(type).css("-webkit-transition", "opacity 10s ease-in");
		$(type).css("opacity", "0");
	}

	var pastwebsite = function() {
		$("body").css("cssText", "color: #ffffff !important; background-image: url(http://i.imgur.com/RGg7e8c.gif) !important; background-repeat: repeat !important;");
		$("span").css("cssText", "color: #ffffff !important;");
		$("p").css("cssText", "color: #ffffff !important;");
		$("img").css("cssText", "border: 3px solid blue !important;");
		$("div").css("cssText", "border-radius: 0px !important; background-color: black !important;");
		$("a").css("cssText", "text-decoration: blink !important;");
	}

	var effects = [
		{name: "Turn every website upside down", apply: upsidedown, param: "body"},
		{name: "Blur every website for a split second every 30 seconds", apply: blur},
		{name: "Spin every Website", apply: spinwebsite},
		{name: "Flip all images upside down", apply: upsidedown, param : "img"},
		{name: "Comic Sans Everything", apply: comicsans},
		{name: "Spin all images", apply: spinimg},
		{name: "Hide every 2nd paragraph element on a page", apply: hide2ndp},
		{name: "Permanent cursor wait", apply: cursorwait},
		{name: "Hide the cursor all together", apply: cursorhide},
		{name: "Slowly grow text", apply: grow},
		{name: "Html pride", apply: pride},
		{name: "Make every website fall over", apply: websitefall},
		{name: "Insert a YOLO every paragraph", apply: yolo},
		{name: "Stop paragraph every 20 letters", apply: cutp},
		{name: "Fade out website", apply: fadeout, param: "body"},
		{name: "Fade out slowly all website text", apply: fadeout, param: "p"},
		{name: "Turn every website like we were in the 90's", apply: pastwebsite},
	];


	/* Aplly an effect */

	var apply = function(effect) {

		if (effect >= 0 && effect < effects.length)
		{
			if (effects[effect].param)
				effects[effect].apply(effects[effect].param);
			else
				effects[effect].apply();
		}
	}

	/* On start get LocalStorage choice */

	chrome.extension.sendRequest({method: "getLocalStorage", key: "aprilchoice"}, function(response) {
		apply(parseInt(response.data));
	});

	/* config popup */

	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		if (request.method == "fromPopup")
		{
			// get current effect
			chrome.extension.sendRequest({method: "getLocalStorage", key: "aprilchoice"}, function(response) {
	    		sendResponse({effects: effects, current: response.data});
	    	});
	    }
	  	else if (request.method == "fromPopupChoice")
	  	{
		  	// save choice in localStorage
		  	chrome.extension.sendRequest({method: "setAprilChoice", key: request.choice}, function(response){

		  		// storage is done
		  		if (response.done)
		  		{
		  			// disable effect or apply for current website
		  			if (request.choice == -1)
				  		document.location.reload();
				  	else
				  		apply(request.choice);
		  		}
		  	});
	  	} 
	  	else
	  		sendResponse({}); // snub them.
	});

});
