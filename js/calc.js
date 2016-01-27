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
  evaluateResult: function() {
    var result = eval(Calculator.previewContent());
    $("#preview").html(result);
    $("#result").html(result);
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
  handleDot: function() {
    // exp to extract the lastestNumber 4m de preview after an operator
    var patternForLastestNum = /[^\+\-\*\/]*$/;
    // extracted lastestNumber after an operator
    var lastestNumber = Calculator.previewContent().match(patternForLastestNum)[0];
    if (lastestNumber.indexOf(".") == -1) {
      Calculator.handleInput(".");
    }
  },
  clear: function() {
    $("#preview").html("");
    $("#result").html("");
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
    else if (Calculator.keyIsOperator(key)) {
      Calculator.handleOperators(key);
    }
    else if (key == "=") {
      Calculator.evaluateResult();
    }
    else if (key == ".") {
      Calculator.handleDot();
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
    $('.delete').dblclick(function() {
      Calculator.clear();
    });
  }

};

$(document).ready(function() {
  Calculator.init();

});
