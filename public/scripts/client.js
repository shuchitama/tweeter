/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


$(document).ready(function () {

  const tweetData = [
    {
      "user": {
        "name": "Harry Potter",
        "avatars": "../images/hpDP.jpg"
        ,
        "handle": "@hjpotter"
      },
      "content": {
        "text": "There's no need to call me sir, professor"
      },
      "created_at": 1561116232227
    },
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  const renderTweets = function (tweets) {
    for (const element of tweets) {
      let tweet = createTweetElement(element)
      $('#tweets-container').append(tweet);
    }
  }

  const createTweetElement = function (tweet) {
    let $tweet =
      `<article>
      <header class="tweetHeader">
        <div class="userInfo">
          <div><img src=${tweet['user']['avatars']}></div>
          <div class="userName">${tweet['user']['name']}</div>
        </div>
        <div class="handle">
        ${tweet['user']['handle']}
          </div>
      </header>
      <p>
      ${tweet['content']['text']}
        </p>
      <footer class="tweetFooter">
        <div>
        ${moment(tweet['created_at']).fromNow()}
          </div>
        <div>
          🏳️🔁❤️
          </div>
      </footer>
    </article>`;
    return $tweet;
  }

  renderTweets(tweetData);

})


// const printPassTimes = function (passTimes) {
//   for (const pass of passTimes) {
//     const datetime = new Date(0);
//     datetime.setUTCSeconds(pass.risetime);
//     const duration = pass.duration;
//     console.log(`Next pass at ${datetime} for ${duration} seconds!`);
//   }
// };