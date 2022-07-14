function actionOnEndtype(typer, updateStatus = null, action = () => {}) {
  let timer,
    timeoutVal = 500; // time it takes to wait for user to stop typing in ms

  typer.on("keypress", handleKeyPress);
  typer.on("keyup", handleKeyUp);

  // when user is pressing down on keys, clear the timeout
  function handleKeyPress(e) {
    window.clearTimeout(timer);
    typeof updateStatus == "function" && updateStatus();
  }

  // when the user has stopped pressing on keys, set the timeout
  // if the user presses on keys before the timeout is reached, then this timeout is canceled
  function handleKeyUp(e) {
    window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
    timer = window.setTimeout(() => {
      typeof action == "function" && action(typer);
    }, timeoutVal);
  }
}

$(document).ready(function (e) {
  $(".btn-submit").click(function () {
    $("form").submit();
  });
});
