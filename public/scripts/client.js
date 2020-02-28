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
      <p class="content">
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
    let tweet = createTweetElement(element)
    $('#tweets-container').prepend(tweet);
  }

  const renderTweets = function (tweetsData) {
    for (const element of tweetsData) {
      let tweet = createTweetElement(element)
      $('#tweets-container').prepend(tweet);
    }
  }

  const loadTweet = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then((res) => {
        renderTweet(res[res.length - 1]);
      })
  }

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then((res) => {
        renderTweets(res);
      })
  }
  loadTweets();

  let $form = $('form');

  $form.on("submit", function (event) {
    event.preventDefault();
    $(".no-text").slideUp(400);
    $(".too-long").slideUp(400);
    // console.log($(".too-long").display)
    // console.log($(".no-text").display)

    // serialize the text inside the textbox
    let serialized = $form.serialize();

    if ($('textarea')[0].value.length === 0) {
      $(".no-text").slideToggle(400);
      return;
    }
    if ($('textarea')[0].value.length > 140) {
      $(".too-long").slideToggle(400);
      $('textarea')[0].value = "";
      return;
    }
    // send POST request to server using ajax
    $.ajax('/tweets', { method: 'POST', data: serialized })
      .then(() => {
        loadTweet();
        $('textarea')[0].value = "";
        $('.counter')[0].innerHTML = 140;
      })
    // GET request to the server, recieve back array of tweets as JSON


  }) // end of $form.onsubmit
}) // end of document.ready