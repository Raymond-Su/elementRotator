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

document.body.style.transform = 'rotate('+degree+'deg)';
document.body.style.msTransform = 'rotate('+degree+'deg)';
document.body.style.MozTransform = 'rotate('+degree+'deg)';
document.body.style.WebkitTransform = 'rotate('+degree+'deg)';
document.body.style.OTransform = 'rotate('+degree+'deg)';