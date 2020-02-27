/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


$(document).ready(function () {

  const renderTweets = function (tweets) {
    for (const element of tweets) {
      let tweet = createTweetElement(element)
      $('#tweets-container').prepend(tweet);
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

  let $form = $('form');

  $form.on("submit", function (event) {
    event.preventDefault();


    // serialize the text inside the textbox
    let serialized = $form.serialize();

    if (serialized.length === 5) {
      alert("Please enter tweet content")
    } else {
      if (serialized.length > 145) {
        alert("Your tweet is too long!")
      } else {
        // send POST request to server using ajax
        $.ajax('/tweets', { method: 'POST', data: serialized })

        // GET request to the server, recieve back array of tweets as JSON
        const loadTweets = function () {
          $.ajax('/tweets', { method: 'GET' })
            .then((res) => {
              // console.log("Is it an array?: ", Array.isArray(res));
              // console.log("res.length: ", res.length);
              // console.log("recent tweet?: ", res[res.length - 1]);

              renderTweets(res);
            })
        }
        loadTweets();
      }
    }
  })
})