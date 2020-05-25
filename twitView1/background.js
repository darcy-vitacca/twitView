console.log("background working");




chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  // alert("This is my favorite website!");
  // console.log(details);
  if (details.url.includes('//twitter.com/') && details.url.includes('/status/')) {
    console.log("website updated");
    chrome.tabs.executeScript(null, { file: "bundle.js" });
    twitFetch();
  }
  else {
    console.log("Should reset");
  }
}, { url: [{ hostSuffix: 'twitter.com', pathContains: 'status' }] });



//Context menu funcitonality
function twitFetch() {
  let contextMenuItem = {
    "id": "compileThread",
    "title": "Compile Tweets",
    "contexts": ["page", "link"]
  };

  let pageChange = function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
      chrome.contextMenus.remove(contextMenuItem.id);
      chrome.tabs.onUpdated.removeListener(pageChange)
      console.log("still here");
      console.log(" sent ids removed");
      chrome.contextMenus.onClicked.removeListener(contextClicked);
    }
  }

  chrome.contextMenus.create(contextMenuItem);
  chrome.tabs.onUpdated.addListener(pageChange);




  let contextClicked = function (clickData) {
    console.log("click");
    console.log(clickData);

    if (clickData.menuItemId === contextMenuItem.id) {
      let max_id = getId(clickData.linkUrl);
      let since_id = getId(clickData.pageUrl);
      // console.log("Max ID :" + max_id + '  Since ID :   ' + since_id);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { maxId: max_id, sinceId: since_id });
        console.log('sent');
        // sentIds();
        
      });
      
    }
    
  }
  chrome.contextMenus.onClicked.addListener(contextClicked);

  // function sentIds() {
  //   console.log(" sent ids removed");
  //   chrome.contextMenus.onClicked.removeListener(contextClicked);
  // }
  

}



function getId(url) {
  console.log("removed");
  url = url.substr(url.lastIndexOf("/") + 1);
  return url;
}



///////////////////TOGGLE ON OFF BUGGY STILL//////////

// let isEnabled = true
// let buttonToggle = function () {
//   isEnabled = !isEnabled
//   if (isEnabled) {
//     chrome.browserAction.setIcon({
//       path: {
//         "19": "images/twitView16.png"
//       }
//     })
//     twitViewOn();
//   } else {
//     chrome.browserAction.setIcon({
//       path: {
//         "19": "images/greytwitview.png"
//       }
//     })
//     console.log("Twitview is toggled off");
//   }
// }

// chrome.browserAction.onClicked.addListener(buttonToggle);

//////////////////////////////////////////////////////////




// let webNav = (function (details) {
//   console.log(details);
//   if (details.url.includes('//twitter.com/') && details.url.includes('/status/')) {
//     console.log("website updated");
//     chrome.tabs.executeScript(null, { file: "bundle.js" });
//     twitFetch();

//   } else {
//     console.log("Should reset");

//   }
//   alert("This is my favorite website!");
// }, {url: [{hostSuffix : 'twitter.com', pathContains: 'status'}] });

// //Observe 
// chrome.webNavigation.onHistoryStateUpdated.addListener(webNav);











