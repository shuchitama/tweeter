$(document).ready(function () {
  const txt = $('textarea');
  let $charsLeft;

  // count characters in the tweet textbox
  txt.on("keyup", function () {
    $charsLeft = (140 - $(this).val().length);
    $counter = $(this).siblings().find(".counter");
    $counter.text($charsLeft);

    if ($charsLeft < 0) {
      $counter.addClass('fontred');
    } else {
      $counter.removeClass('fontred');
    }
  });
});