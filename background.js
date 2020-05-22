console.log("background working");


chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  if (details.url.includes('//twitter.com/') && details.url.includes('/status/')){
  console.log("website updated");
  chrome.tabs.executeScript(null,{file:"bundle.js"});



    let contextMenuItem = {
      "id": "compileThread",
      "title": "Compile Tweets",
      "contexts": ["page", "link"]
    };

  let pageChange = function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
      chrome.contextMenus.remove(contextMenuItem.id);
      chrome.tabs.onUpdated.removeListener(pageChange)
      console.log("still here");
    }
  }

  chrome.contextMenus.create(contextMenuItem);
  chrome.tabs.onUpdated.addListener(pageChange)


  chrome.contextMenus.onClicked.addListener(function (clickData) {
    console.log("click");
    console.log(clickData);

    if (clickData.menuItemId === contextMenuItem.id) {
      let max_id = getId(clickData.linkUrl);
      let since_id = getId(clickData.pageUrl);
      console.log("Max ID :" + max_id + '  Since ID :   ' + since_id);

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {max_id: max_id , since_id: since_id});
          console.log('sent');
      });
    
  }

  
})  
}
});



function getId(url) {
  url = url.substr(url.lastIndexOf("/") + 1);
  return url;
}




// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   //creates button on correct page
//   if (request.todo === 'init') {
//     console.log("init");


//     let contextMenuItem = {
//       "id": "compileThread",
//       "title": "Compile Tweets",
//       "contexts": ["page", "link"]
//     };

//     let pageChange = function(tabId, changeInfo, tab) {
//       if (changeInfo.url) {
//         chrome.contextMenus.remove(contextMenuItem.id);
//         chrome.tabs.onUpdated.removeListener(pageChange)
//         console.log("still here");
//       }
//     }

//     chrome.contextMenus.create(contextMenuItem);
//     chrome.tabs.onUpdated.addListener(pageChange)

  
//     chrome.contextMenus.onClicked.addListener(function (clickData) {
//       console.log("click");
//       console.log(clickData);

//       if (clickData.menuItemId === contextMenuItem.id) {
//         let max_id = getId(clickData.linkUrl);
//         let since_id = getId(clickData.pageUrl);
//         console.log("Max ID :" + max_id + '  Since ID :   ' + since_id);
      
//     }
// })
// }
// });



