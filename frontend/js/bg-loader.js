try {
  importScripts('randomforest.js', 'background.js');
} catch (e) {
  console.error(e);
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'redirect') {
    // Perform the redirect
    chrome.tabs.update(sender.tab.id, { url: request.redirectUrl });
  }
});