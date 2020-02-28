const toggleNewTweet = function () {
  $(".toggle-btn").click(() => {
    $(".new-tweet").slideToggle(400)
    $('textarea').focus();
  })
}

$(document).ready(function () {
  toggleNewTweet();
})