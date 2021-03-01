/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./src/js/contentScript.js ***!
  \*********************************/
function rotate(htmlElement, degree) {
  htmlElement.style.transform = 'rotate('+degree+'deg)';
  htmlElement.style.msTransform = 'rotate('+degree+'deg)';
  htmlElement.style.MozTransform = 'rotate('+degree+'deg)';
  htmlElement.style.WebkitTransform = 'rotate('+degree+'deg)';
  htmlElement.style.OTransform = 'rotate('+degree+'deg)';
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
      rotate(document.body, request.degree)
      break;
    }
    case "setElementRotation": {
      let degreeRotation = request.degree
      const imgSrc = request.imgSrc.replace(location.origin, '');
      const elements = document.querySelectorAll(`img[src="${imgSrc}"]`);
      elements.forEach(element => {
        if (degreeRotation) {
          var str = element.style.transform;
          var originalRotation = parseInt(str.replace(/[^\d.-]/g, ""));
          if (!isNaN(originalRotation)) {
             degreeRotation += originalRotation
          }
        }
        rotate(element, degreeRotation)
      })
    }
  }
  return true;
});
/******/ })()
;