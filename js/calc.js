function handleInput(key) {
  $("#preview").append(key);
}





$(document).ready(function() {
  $('.key').click(function() {
    var key = $(this).text();
    // corner case of 0 key
    if(key == "0") {
      if ($("#preview").html() != "0") {
        handleInput(key);
      }
    }
    else {
      handleInput(key);
    }
  });

});
