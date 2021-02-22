chrome.extension.onRequest.addListener(function (request, sender, callback) {
  switch (request.action) {
    case "getRotation": {
      var str = document.body.style.transform;
      var degree = parseInt(str.replace(/[^\d.-]/g, ""));
      if (!isNaN(degree)) {
        callback({ degree: degree });
      } else {
        callback({ degree: 0 });
      }
    }
  }
});
