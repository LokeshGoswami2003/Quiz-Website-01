(function() {
    var allQuestions = [{
        question: "Number of primitive data types in Java are?:",
        options: ["6", "7", "8", "9"],
        answer: 2
    }, {
        question: "What is the size of float and double in java?",
        options: ["32 and 64", "64 and 32", "32 and 32", "64 and 64"],
        answer: 0
    }, {
        question: " Automatic type conversion is possible in which of the possible cases?",
        options: ["Byte to int", "Int to long", "Long to int", "Byte to long"],
        answer: 1
    }, {
        question: "Select the valid statement.",
        options: ["char[] ch = new char(5)", "char[] ch = new char[5]", "char[] ch = new char()", "char[] ch = new char[]"],
        answer: 1
    }, {
        question: "When an array is passed to a method, what does the method receive?",
        options: ["The reference of the array", "Length of the array", "Copy of first element", "A copy of the array"],
        answer: 0
    }, {
        question: "When is the object created with new keyword?",
        options: ["At run time", "At compile time", "Depends on the code", "None"],
        answer: 0
    }, {
        question: "Identify the corrected definition of a package.",
        options: ["A package is a collection of editing tools", "A package is a collection of classes", "A package is a collection of classes and interfaces", "A package is a collection of interfaces"],
        answer: 2
    }, {
        question: "In which of the following is toString() method defined?",
        options: ["java.lang.Object", "java.lang.String", "java.lang.util", "None"],
        answer: 0
    }, {
        question: "Identify the return type of a method that does not return any value.",
        options: ["Int", "Void", "Double", "None"],
        answer: 1
    }, {
        question: "Output of Math.floor(3.6)?",
        options: ["3", "3.0", "4", "4.0"],
        answer: 1
    }];

    var quesCounter = 0;
    var selectOptions = [];
    var quizSpace = $('#quiz');

    nextQuestion();

    $('#next').click(function() {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) {
            alert('Please select an option !');
        } else {
            quesCounter++;
            nextQuestion();
        }
    });

    $('#prev').click(function() {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });

    function createElement(index) {
        var element = $('<div>', { id: 'question' });
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }

    function radioButtons(index) {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += allQuestions[index].options[i];
            item.append(input);
            radioItems.append(item);
        }
        return radioItems;
    }

    function chooseOption() {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }

    function nextQuestion() {
        quizSpace.fadeOut(function() {
            $('#question').remove();
            if (quesCounter < allQuestions.length) {
                var nextQuestion = createElement(quesCounter);
                quizSpace.append(nextQuestion).fadeIn();
                if (!(isNaN(selectOptions[quesCounter]))) {
                    $('input[value=' + selectOptions[quesCounter] + ']').prop('checked', true);
                }
                if (quesCounter === 1) {
                    $('#prev').show();
                } else if (quesCounter === 0) {
                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                var scoreRslt = displayResult();
                quizSpace.append(scoreRslt).fadeIn();
                $('#next').hide();
                $('#prev').hide();
            }
        });
    }

    function displayResult() {
        var score = $('<p>', { id: 'question' });
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) {
            if (selectOptions[i] === allQuestions[i].answer) {
                correct++;
            }
        }
        score.append('You scored ' + correct + ' out of ' + allQuestions.length);
        return score;
    }
})();