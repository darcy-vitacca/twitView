console.log("twitView is starting");
var config = require("./config");
const Twit = require("twit");


var T = new Twit(config);

// let url = "https://twitter.com/EricRWeinstein/status/1256002413426696192";
// let url = "https://twitter.com/EricRWeinstein/status/1256036515844485120"; //last tweet//
let url = "https://twitter.com/ChrisMasterjohn/status/1202685850804506624";

// let url = 'https://twitter.com/DrBlack_Sheep/status/1257907084156301312';
// let url = "https://twitter.com/bronxdarcy/status/1257926657987362816";

let replies;
twitView(url);

//Fetches the tweet from address
function twitView() {




  
  console.log(url);

  //Picks out the id from the url
  function getId(url) {
    url = url.substr(url.lastIndexOf("/") + 1);
    return url;
  }

  //Stores the url in the searchId
  let tweetId1 = getId(url);
  let screenName;
  let tweetId;
  let firstTweet;
  let tweets;

  // console.log("tweetId1 " + tweetId1);

  // Pulls up the data from that tweetId

  T.get("statuses/show", { id: tweetId1, count: 10 }, function (
    err,
    data,
    response
  ) {
    tweets = data.statuses;
    // console.log(data);
    // screenName = ('@' + data["user"]["screen_name"]);
    screenName = data["user"]["screen_name"];
    firstTweet = data["id_str"];
    tweetId = data["id_str"];
    max_id = (tweetId -1);
    max_idplus = (tweetId + 2);
    console.log(max_id);
    console.log(max_idplus);

    tweetId = BigInt(data["id_str"]) - 1n;
    tweetId = tweetId.toString();
    threadSort();
    // tweetSearch();
  });


  function tweetSearch(){
    T.get('search/tweets', { q: screenName + tweetId, count: 100 }, function(err, data, response) {
      console.log(data);
    })
  }

  // bronx darcy not submitting but tweetId is FIX
  function threadSort() {
    console.log(typeof tweetId);
    params = {
      screen_name: screenName,
      since_id: tweetId,
      // last  max_id: "1256036515844485120",
      max_id: max_id,


      // max_id: "1202870812899889152",
     
      include_rts: false,
      tweet_mode : 'extended',
      count: 1000,
    };
    console.log("                             up" + screenName);

    //since_id is the oldest 1257907084156301312
    //max_id is the newest newest 1257958024888627200

    console.log(params);

    T.get("statuses/user_timeline", params, function (err, data, response) {
      tweets = data;

      let replies = [];
      let comments = [];
      let count = 0;
      let previousId;

      for (var i = tweets.length - 1; i >= 0; i--) {
        if (tweets[i].in_reply_to_status_id_str === firstTweet || tweets[i].id_str === firstTweet) {
          if (tweets[i].user.screen_name === screenName) {
            count += 1;
            replies[i] = tweets[i];
          } else {
            comments[i] = tweets[i];
          }
        } else if (
          tweets[i].in_reply_to_status_id_str === previousId &&
          tweets[i].user.screen_name === screenName
        ) {
          replies[i] = tweets[i];
        } else {
          comments[i] = tweets[i];
        }

        previousId = tweets[i].id_str;
      }

      // for (var i = comments.length - 1; i >= 0; i--) {
      //   if (comments[i] != undefined) {
      //     console.log([i] + " Comments      " + comments[i]);
      //   }
      // }

      
      for (var i = (replies.length-1); i >= 0; i--) {
        if(replies[i] != undefined){
          console.log([i]  + " Replies      \n\n " + JSON.stringify(replies[i], null));
        }

      }
    });
   
  }
}

