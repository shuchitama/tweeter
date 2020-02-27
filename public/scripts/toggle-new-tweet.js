const toggleNewTweet = function () {
  $(".toggle-btn").click(() => {
    $(".new-tweet").slideToggle(400)
  })
}

$(document).ready(function () {
  toggleNewTweet();
})