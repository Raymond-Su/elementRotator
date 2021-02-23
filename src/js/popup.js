// Helper functions
function rotateElement(degree) {
  chrome.tabs.query({active:true, currentWindow: true}, function (tab) {
    chrome.tabs.sendMessage(tab[0].id, { action: "setRotation", degree });
  }
)}

function verifyRange(degree) {
  return degree && !isNaN(degree) && -180 <= degree && degree <= 180;
}

function addMultipleListeners(elements, actions, handler) {
  const _actions = actions.split(" ");
  let i = 0,
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

document.addEventListener("DOMContentLoaded", function () {
  console.log("Listeners Added")
  // Elements
  let degreeRange = document.getElementById("degree-range");
  let degreeNumber = document.getElementById("degree-number");
  let resetButton = document.getElementById("reset-button");

  // Get current rotation (runs every time extension icon is clicked)
  chrome.tabs.query({active:true, currentWindow: true}, function (tab) {
    chrome.tabs.sendMessage(tab[0].id, { action: "getRotation" }, function (response) {
        const degree = response.degree;
        if (!isNaN(degree) && -180 <= degree && degree <= 180) {
          degreeRange.value = degree;
          degreeNumber.value = degree;
        }
    });
  });
  // Listeners
  degreeRange.addEventListener("input", function () {
    const degree = parseInt(this.value);

    // adjust degree number
    if (verifyRange(degree)) {
      degreeNumber.value = degree;
    }

    // rotate
    rotateElement(degree);
  });

  addMultipleListeners(degreeNumber, "keyup keypress keydown change", function () {
    const degree = parseInt(this.value);

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
