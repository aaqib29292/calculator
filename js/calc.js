var Calculator = {
  handleInput: function(key) {
    $("#preview").append(key);
  },
  previewContent: function() {
    return $("#preview").html();
  },
  deleteLastChar: function() {
    var preview = $("#preview").html();
    var newPreview = preview.slice(0, -1);
    $("#preview").html(newPreview);
    // $("#preview").html(previewContent().slice(0, -1));
  },
  keyIsOperator: function(key) {
    return (["+", "-", "*", "/"].indexOf(key) != -1);
  },
  handleZero: function() {
    if (Calculator.previewContent() != "0") {
      Calculator.handleInput("0");
    }
  },
  handleOperators: function(key) {
    // Successive operators corner case
    var lastChar = Calculator.previewContent().slice(-1);
    if (Calculator.keyIsOperator(lastChar)) {
      // Delete the last operator from the preview
      Calculator.deleteLastChar();
    }

    // First operator in the preview corner case
    if ((Calculator.previewContent() != "") || (key == "-")) {
      Calculator.handleInput(key);
    }
  },
  handleGenericInput: function(key) {
    // corner case of 0 key
    if(key == "0") {
      Calculator.handleZero();
    }
    // corner case of DEL key
    else if (key == "DEL") {
      Calculator.deleteLastChar()
    }
    else if (Calculator.keyIsOperator(key))  {
      Calculator.handleOperators(key);
    }
    else {
      Calculator.handleInput(key);
    }
  },

  init: function() {
    $('.key').click(function() {
      var key = $(this).html();
      Calculator.handleGenericInput(key);
    });
  }

};

$(document).ready(function() {
  Calculator.init();

});
