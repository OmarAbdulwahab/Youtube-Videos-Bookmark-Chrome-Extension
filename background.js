// This will listen to any update that happen to our tab system and see if it is a youtube page
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    // we will gonna use queryParameters as a unique id to search for the video with it
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    // from the documentation
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});

/*
// This will listen to any update that happen to our tab system and see if it is a youtube page
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    // we will gonna use queryParameters as a unique id to search for the video with it
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    console.log(urlParameters);
    // from the documentation
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});

*/

// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   if (tab.url && tab.url.includes("youtube.com/watch")) {
//     const queryParameters = tab.url.split("?")[1];
//     const urlParameters = new URLSearchParams(queryParameters);

//     chrome.tabs.sendMessage(tabId, {
//       type: "NEW",
//       videoId: urlParameters.get("v"),
//     });
//   }
// });
