chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case "getRotation": {
      var str = document.body.style.transform;
      var degree = parseInt(str.replace(/[^\d.-]/g, ""));
      if (!isNaN(degree)) {
        sendResponse({ degree: degree });
      } else {
        sendResponse({ degree: 0 });
      }
      break;
    }
     
    case "setRotation": {
      const degree = request.degree;
      document.body.style.transform = 'rotate('+degree+'deg)';
      document.body.style.msTransform = 'rotate('+degree+'deg)';
      document.body.style.MozTransform = 'rotate('+degree+'deg)';
      document.body.style.WebkitTransform = 'rotate('+degree+'deg)';
      document.body.style.OTransform = 'rotate('+degree+'deg)';
    }
  }
});