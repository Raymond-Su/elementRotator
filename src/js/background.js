chrome.runtime.onInstalled.addListener(async () => {
  console.log("Background page loaded");
});

const contextMenuContents = [{
  id: "rotateRight",
  title: "Rotate clockwise"
}, {
  id: "rotateLeft",
  title: "Rotate anti-clockwise"
}, {
  id: "rotateReset", 
  title: "Reset"
}]


contextMenuContents.forEach(contextMenu => chrome.contextMenus.create({
  id: contextMenu.id,
  contexts:["image"],
  title: contextMenu.title
}))

chrome.contextMenus.onClicked.addListener(function(itemData) {
  let degree = 0;
  if (itemData.menuItemId == "rotateRight") degree = 90
  if (itemData.menuItemId == "rotateLeft") degree = -90

  chrome.tabs.query({active:true, currentWindow: true}, function (tab) {
    chrome.tabs.sendMessage(tab[0].id, { action: "setElementRotation", degree, imgSrc:itemData.srcUrl });
  })
});