document.addEventListener("DOMContentLoaded", function () {
  // Elements
  var degreeRange = document.getElementById("degree-range");
  var degreeNumber = document.getElementById("degree-number");
  var resetButton = document.getElementById("reset-button");

  // Get current rotation (runs every time extension icon is clicked)
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendRequest(tab.id, { action: "getRotation" }, function (response) {
      var degree = response.degree;
      if (!isNaN(degree) && -180 <= degree && degree <= 180) {
        degreeRange.value = degree;
        degreeNumber.value = degree;
      }
    });
  });

  // Helper functions
  function rotateElement(degree) {
    chrome.tabs.executeScript(
      null,
      {
        code: "var degree = " + degree + ";",
      },
      function () {
        chrome.tabs.executeScript(null, { file: "contentScript.bundle.js" });
      }
    );
  }


  function verifyRange(degree) {
    return degree && !isNaN(degree) && -180 <= degree && degree <= 180;
  }

  function addMultipleListeners(elements, actions, handler) {
    var _actions = actions.split(" ");
    var i = 0,
      j = 0;
    for (; i < _actions.length; ++i) {
      if (Object.prototype.toString.call(elements) !== "[object Array]") {
        elements.addEventListener(_actions[i], handler);
      } else {
        for (; j < elements.length; ++j) {
          elements.addEventListener(_actions[i], handler);
        }
      }
    }
  }

  // Listeners
  degreeRange.addEventListener("input", function () {
    var degree = parseInt(this.value);

    // adjust degree number
    if (verifyRange(degree)) {
      degreeNumber.value = degree;
    }

    // rotate
    rotateElement(degree);
  });

  addMultipleListeners(degreeNumber, "keyup keypress keydown change", function () {
    var degree = parseInt(this.value);

    // adjust degree number
    if (verifyRange(degree)) {
      degreeRange.value = degree;
    }

    // rotate
    rotateElement(degree);
  });

  resetButton.addEventListener("click", function () {
    degreeRange.value = 0;
    degreeNumber.value = 0;
    rotateElement(0);
  });
});
