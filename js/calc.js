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
    $("#preview").html("");
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
  clear: function() {
    $("#preview").html("");
    $("#result").html("");
  },
  bindKeys: function() {
    $(document).bind('keyup', '0', function() { Calculator.handleInput("0") });
    $(document).bind('keyup', '1', function() { Calculator.handleInput("1") });
    $(document).bind('keyup', '2', function() { Calculator.handleInput("2") });
    $(document).bind('keyup', '3', function() { Calculator.handleInput("3") });
    $(document).bind('keyup', '4', function() { Calculator.handleInput("4") });
    $(document).bind('keyup', '5', function() { Calculator.handleInput("5") });
    $(document).bind('keyup', '6', function() { Calculator.handleInput("6") });
    $(document).bind('keyup', '7', function() { Calculator.handleInput("7") });
    $(document).bind('keyup', '8', function() { Calculator.handleInput("8") });
    $(document).bind('keyup', '9', function() { Calculator.handleInput("9") });

    $(document).bind('keyup', '.', function() { Calculator.handleDot() });

    $(document).bind('keyup', '/', function() { Calculator.handleOperators("/") });
    $(document).bind('keyup', '*', function() { Calculator.handleOperators("*") });
    $(document).bind('keyup', '-', function() { Calculator.handleOperators("-") });
    $(document).bind('keyup', '+', function() { Calculator.handleOperators("+") });

    $(document).bind('keyup', 'return', function() { Calculator.evaluateResult() });
    $(document).bind('keyup', 'del', function() { Calculator.deleteLastChar() });
    $(document).bind('keyup', 'backspace', function() { Calculator.deleteLastChar() });
    $(document).bind('keyup', 'esc', function() { Calculator.clear() });
  },

  init: function() {
    $('.key').click(function() {
      var key = $(this).html();
      Calculator.handleGenericInput(key);
    });
    $('.delete').dblclick(function() {
      Calculator.clear();
    });
    Calculator.bindKeys();

  }

};

$(document).ready(function() {
  Calculator.init();

});
