chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.todo === "activate_icon") {
    chrome.pageAction.show(sender.tab.id);
  }
  if (request.todo == 'color') {
    console.log('color');
  }
});

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.pageActions.show(tabs[0].id);
// });