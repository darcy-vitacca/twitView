
console.log("content working");



let greyTwit = "images/greytwitview.png";

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



//was going to remove the listener but it's good to keep it on I think
let getIds = function(request, sender, sendResponse) {
  console.log("Max ID: " + request.max_id + " Since ID: " +request.since_id);
  since_id = request.since_id;
  max_id = request.max_id;
  twitView();
}

chrome.runtime.onMessage.addListener(getIds);


function twitView() {
  T.get("statuses/show", { id: since_id, count: 1 }, function (err, data, response) {
    // tweets = data.statuses;
    tweets = data;

    console.log(JSON.stringify(data, null, ' '));
    // screenName = ('@' + data["user"]["screen_name"]);
    screenName = data["user"]["screen_name"];
    console.log(screenName);

    firstTweet = data["id_str"];
    console.log(firstTweet);

    // tweetId = data["id_str"];
    // console.log(tweetId);

    tweetId = BigInt(data["id_str"]) - 1n;
    console.log(tweetId);

    tweetId = tweetId.toString();
    console.log(tweetId);
    threadSort();
  });



  function threadSort() {
    console.log(typeof tweetId);
    params = {
      screen_name: screenName,
      since_id: tweetId,
      max_id: max_id,
      include_rts: false,
      tweet_mode: 'extended',
      count: 400,
    };
    console.log("                             up" + screenName);

    //since_id is the oldest 1257907084156301312
    //max_id is the newest newest 1257958024888627200

    console.log(params);

    T.get("statuses/user_timeline", params, function (err, data, response) {


      let replies = [];
      let comments = [];
      let count = 0;
      let previousId;

      for (var i = data.length - 1; i >= 0; i--) {
        console.log(JSON.stringify(data[i]["user"]["screen_name"], null, ' '));
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

      for (var i = (replies.length - 1); i >= 0; i--) {
        if (replies[i] != undefined) {
          console.log([i] + " Replies      \n\n " + (JSON.stringify(replies[i]["full_text"], null, ' ')));
        }
        

      }
    });

  }
}





