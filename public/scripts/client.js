/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
      ${escape(tweet['content']['text'])}
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

  const renderTweet = function (element) {
    // for (const element of tweets) {
    let tweet = createTweetElement(element)
    $('#tweets-container').prepend(tweet);
  }
  // }

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then((res) => {
        renderTweet(res[res.length - 1]);
      })
  } // end of loadTweets fn definition

  let $form = $('form');

  $form.on("submit", function (event) {
    event.preventDefault();

    // serialize the text inside the textbox
    let serialized = $form.serialize();

    if ($('textarea')[0].value.length === 0) {
      alert("Please enter tweet content!");
      return;
    }
    if ($('textarea')[0].value.length > 140) {
      alert("Your tweet is too long!");
      $('textarea')[0].value = "";
      return;
    }
    // send POST request to server using ajax
    $.ajax('/tweets', { method: 'POST', data: serialized })
      .then(() => {
        loadTweets()
        $('textarea')[0].value = ""
      })
    // GET request to the server, recieve back array of tweets as JSON


  }) // end of $form.onsubmit
}) // end of document.ready