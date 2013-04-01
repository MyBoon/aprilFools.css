
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage")
    	sendResponse({data: localStorage[request.key]});
  	else if (request.method == "setAprilChoice")
  	{
  		localStorage["aprilchoice"] = parseInt(request.key);
  		sendResponse({done: true});
  	}
    else
      sendResponse({});
});