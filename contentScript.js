
console.log("content working");
let greyTwit = "images/greytwitview.png";
let twitLogo = "images/twitView48.png";


const Autolinker = require( 'autolinker' );

const Twit = require("twit");
let T = new Twit({
  consumer_key: 'MT9iShqi7z8HASwCBkHvQVq40',
  consumer_secret: 'T0o5AU8NBcUaLAv8YfyDHPl6God3ocwywQdscoMPAgyFgd2yxO',
  access_token: '1254584570575351814-xl64J2QaqRzLUfvTURAVgeHmeSYvWE',
  access_token_secret: 'H1kWtw9tgB7Denk7iDY5TJIsjXkt3iKhrqvMBkEgJ2ADG',
});

let replies;
let since_id;
let max_id;
let screenName;
let tweetId;
let firstTweet;
let tweets;
let addModal;


//was going to remove the listener but it's good to keep it on I think
let getIds = function(request) {
  console.log("Max ID: " + request.maxId + " Since ID: " +request.sinceId);
  since_id = request.sinceId;
  max_id = request.maxId;
  twitView();
}

chrome.runtime.onMessage.addListener(getIds);
// do i have to remove? then re add maybe?


function twitView() {
  
  addModal = function() {
    
    console.log("check");
    let elements = document.querySelector("main");
    let modalCheck = document.querySelector("div[class=modal-content]");
    console.log(elements);

    if (elements) {
      if (modalCheck){
        console.log("modal present");

      }else {
      //inject style sheet
      var style = document.createElement('link');
      console.log(style);
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = chrome.extension.getURL('style.css');
      (document.head||document.documentElement).appendChild(style);

      //overall div
      let modal = document.createElement("DIV");
      modal.setAttribute("class", "modal-content");
      elements.appendChild(modal);
      
      //exit symbol
      let exit = document.createElement("SPAN");
      exit.setAttribute("class", "modal-close");
      exit.innerHTML = "&times;";
      modal.appendChild(exit);
      exit.addEventListener('click', function(){
        console.log("click remove");
        modal.remove();
        style.remove();
      })
      
      //logo header
      let logo = document.createElement("DIV");
      logo.setAttribute("class", "logo");
      modal.appendChild(logo);
      
      //image
      let imgLogo = document.createElement("IMG"); 
      imgLogo.src = chrome.runtime.getURL(twitLogo);
      logo.appendChild(imgLogo); 


      //ul
      // let ulContent = document.createElement("ul");
      // ulContent.setAttribute("class", "ulContent");
      // modal.appendChild(ulContent);
    }
    }
  }
  addModal();

  
  T.get("statuses/show", { id: since_id, count: 1 }, function (err, data, response) {
    // tweets = data.statuses;
    tweets = data;

    // console.log(JSON.stringify(data, null, ' '));

    // screenName = ('@' + data["user"]["screen_name"]);
    screenName = data["user"]["screen_name"];
    // console.log(screenName);

    firstTweet = data["id_str"];
    // console.log(firstTweet);

    // tweetId = data["id_str"];
    // console.log(tweetId);

    tweetId = BigInt(data["id_str"]) - 1n;
    // console.log(tweetId);

    tweetId = tweetId.toString();
    // console.log(tweetId);
    threadSort();
  });



  function threadSort() {
    // console.log(typeof tweetId);
    params = {
      screen_name: screenName,
      since_id: tweetId,
      max_id: max_id,
      include_rts: false,
      tweet_mode: 'extended',
      count: 1600,
    };
    // console.log("           up" + screenName);

    //since_id is the oldest 1257907084156301312
    //max_id is the newest newest 1257958024888627200

    console.log(params);

    T.get("statuses/user_timeline", params, function (err, data, response) {


      let replies = [];
      let comments = [];
      let count = 0;
      let previousId;

      for (var i = data.length - 1; i >= 0; i--) {

        // console.log(JSON.stringify(data[i]["user"]["screen_name"], null, ' '));

        if ((data[i]["in_reply_to_status_id_str"]) === firstTweet || (data[i]["id_str"]) === firstTweet) {
          if ((data[i]["user"]["screen_name"]) === screenName) {
            count += 1;
            replies[i] = data[i];
          } else {
            comments[i] = data[i];
          }
        } else if ((data[i]["in_reply_to_status_id_str"]) === previousId && (data[i]["user"]["screen_name"]) === screenName) {
          replies[i] = data[i];
        } else {
          comments[i] = data[i];
        }
        previousId = data[i].id_str;
      }
      // for (var i = comments.length - 1; i >= 0; i--) {
      //   if (comments[i] != undefined) {
      //     console.log([i] + " Comments      " + comments[i]);
      //   }
      // }

      //Json filter
      // replies = JSON.stringify(replies); 
      // console.log(replies);


     


      let ulContent = document.querySelector("div[class=modal-content]");
      for (var i = (replies.length - 1); i >= 0; i--) {
        if (replies[i] != undefined) {
          // console.log([i] + " Replies      \n\n " + (JSON.stringify(replies[i]["full_text"], null, ' ')));
          console.log([i] + " " + replies[i]["full_text"]);
          console.log(replies[i]);

          let pContent = document.createElement("p");
          

          pContent.innerHTML =  Autolinker.link(([i] + " " + replies[i]["full_text"]));
          // pContent.innerHTML = ([i] + " " + replies[i]["full_text"]);
          
          ulContent.appendChild(pContent);
          console.log(ulContent);
        }
      }

    });

  }
}

