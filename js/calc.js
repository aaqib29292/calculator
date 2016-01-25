function handleInput(key) {
  $("#preview").append(key);
}

function previewContent() {
  return $("#preview").html();
}

function deleteLastChar() {
  var preview = $("#preview").html();
  var newPreview = preview.slice(0, -1);
  $("#preview").html(newPreview);
  // $("#preview").html(previewContent().slice(0, -1));
}

function keyIsOperator(key) {
  return (["+", "-", "*", "/"].indexOf(key) != -1);
}








$(document).ready(function() {
  $('.key').click(function() {
    var key = $(this).html();
    // corner case of 0 key
    if(key == "0") {
      if (previewContent() != "0") {
        handleInput(key);
      }
    }
    // corner case of DEL key
    else if (key == "DEL") {
      deleteLastChar()
    }
    else if (keyIsOperator(key))  {
      // Successive operators corner case
      var lastChar = previewContent().slice(-1);
      if (keyIsOperator(lastChar)) {
        // Delete the last operator from the preview
        deleteLastChar();
      }

      // First operator in the preview corner case
      if ((previewContent() != "") || (key == "-")) {
        handleInput(key);
      }
    }
    else {
      handleInput(key);
    }
  });

});
