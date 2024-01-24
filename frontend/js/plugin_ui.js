var colors = {
    "-1":"#58bc8a",
    "0":"#ffeb3c",
    "1":"#ff8b66"
};
var featureList = document.getElementById("features");

chrome.tabs.query({ currentWindow: true, active: true }, function(tabs){
    chrome.storage.local.get(['results', 'legitimatePercents', 'isPhish'], function(items) {
        var result = items.results[tabs[0].id];
        var isPhish = items.isPhish[tabs[0].id];
        var legitimatePercent = items.legitimatePercents[tabs[0].id];
    
        for(var key in result){
            var newFeature = document.createElement("li");
            //console.log(key);
            newFeature.textContent = key;
            //newFeature.className = "rounded";
            newFeature.style.backgroundColor=colors[result[key]];
            featureList.appendChild(newFeature);
        }
        
        $("#site_score").text(parseInt(legitimatePercent)+"%");
        if(isPhish) {
            $("#res-circle").css("background", "#ff8b66");
            $("#site_msg").text("Warning!! You're being phished.");
            $("#site_score").text(parseInt(legitimatePercent)-20+"%");
        }
    });
    
});


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('redirectButton').addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs.length > 0) {
          // Send a message to the content script to initiate the redirect
          chrome.tabs.sendMessage(tabs[0].id, { action: 'redirect', redirectUrl: 'https://www.youtube.com/results?search_query=how+an+extension+works+in+google' });
        }
      });
    });
  });
  
// document.addEventListener('DOMContentLoaded', function () {
//     // Add a click event listener to the button
//     document.getElementById('redirectButton').addEventListener('click', function () {
//       // Send a message to the background script to initiate the redirect
//       chrome.runtime.sendMessage({ action: 'redirect', redirectUrl: 'https://www.youtube.com/' });
//     });
//   });

// chrome.runtime.sendMessage({ action: "redirect", redirectUrl: "https://www.youtube.com/" });

