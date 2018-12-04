$(document).ready(function() {
    //quiz array
    var quiz = [{
        question: "Which wealthy family funded much of the art of the Renaissance?",
        choices: ["Tudor", "Walton", "Medici", "Habsburg"],
        correct: 2,
        imgName: "medici.jpg"
    },
    {
        question: "Though he painted one of the most famous painting in the world, this artist devoted more time to science and engineering.",
        choices: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
        correct: 0,
        imgName: "leo.jpg"
    },
    {
        question: "Raphael disparaged the quality of this sculptor's painting, so he was relegated to painting a ceiling, where no one would really see it.",
        choices: ["Donatello", "Michelangelo", "Ghiberti", "Van Gogh"],
        correct: 1,
        imgName: "sistine.jpg"
    },
    {
        question: "Which building did Michelangelo design the dome of?",
        choices: ["Hagia Sophia", "Pantheon", "United States Capitol", "St. Peter's Basillica"],
        correct: 3,
        imgName: "peters.jpg"
    },
    {
        question: "Which painter was humbled by the work of one of his contemporaries and included him in a painting including some of history's greatest minds?",
        choices: ["Titian", "Raphael", "Tintoretto", "Sandro Botticelli"],
        correct: 1,
        imgName: "raph.jpg"
    },
    {
        question: "Who mentored Leonardo da Vinci in painting?",
        choices: ["Hieronymus Bosch", "Leonardo DiCaprio", "Giotto", "Verrocchio"],
        correct: 3,
        imgName: "verr.jpg"
    },
    {
        question: "Donatello's bronze statue, traditionally identified as David, has also been identified as which Greek god?",
        choices: ["Hermes", "Zeus", "Apollo", "Kratos"],
        correct: 0,
        imgName: "dave.jpeg"
    },
    {
        question: "Michelangelo worked highly successfully in several different forms of art, but he primarily considered himself what?",
        choices: ["Architect", "Painter", "Sculptor", "Guitarist"],
        correct: 2,
        imgName: "mike.jpg"
    }];

    //tracking variables
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unAnswers = 0; 
    var count = 30;
    var number = 0;
    var timeRemain;

    //start button on click function
    $("#startButton").on("click", start) 
    
    //hide the button, set count to 30, display the time and start counting, and start displaying questions
    function start() {
        $(this).hide();
        count = 30;
        $("#timer").html("Time remaining: " + count + " secs");
        timeRemain = setInterval(timer, 1000);
        questions(number);
    }

    //list questions and answer choices
    function questions(number) {
        if (number < quiz.length) {
            $("#question").html(quiz[number].question);
            var choicesArr = quiz[number].choices;
            $("#choices").removeClass("textStyle");
            $("#choices").text("");
            for (var i = 0; i < choicesArr.length; i++) {
                var buttonChoices = $("<button>");
                buttonChoices.attr("data-ans", i);
                buttonChoices.html(choicesArr[i]);
                $("#choices").append(buttonChoices);
                $("#choices").append("<br>");
            } 
        } else { 
            result();
        }
    }

    //time user and eventually display answer if time runs out
    function timer() {
        count--;
        if (count <= 0) {
            var answer = quiz[number].correct;
            var answerString = quiz[number].choices[answer];
            clearInterval(timeRemain);
            $("#choices").addClass("textStyle");
            $("#timer").html("Time remaining: " + count + " secs");
            $("#question").text("Time up!");
            $("#choices").text("The correct answer was: " + answerString);
            unAnswers++;
            $("#image").html("<img src = 'assets/images/" + quiz[number].imgName +"' />");
            $("#image").show();
            setTimeout(function() {
                nextQuestions();
            }, 1500)   
        } else {
            $("#timer").html("Time remaining: " + count + " secs");
        }
    };

    //move on to the next question
    function nextQuestions() {
        number++;
        count = 30;
        timeRemain = setInterval(timer, 1000);
        $("#timer").html("Time remaining: " + count + " secs");
        questions(number);
        $("#image").hide();
    }

    //hide timer, display results, and offer restart button
    function result() {
        $("#timer").hide();
        $("#question").text("Results:");
        $("#choices").addClass("textStyle");
        $("#choices").text("Correct Answers: " + correctAnswers);
        $("#choices").append("<br> Incorrect Answers: " + wrongAnswers);
        $("#choices").append("<br> Unanswered questions: " + unAnswers);
        var startOver = $("<button>");
        startOver.text("Start Over?");
        $("#startOver").html(startOver);
        $("#startOver").show();
    }

    //when a choice is clicked 
    $("#choices").on("click", "button", function(event) {
        var answer = quiz[number].correct;
        var userPick = $(this).data("ans");
        $("#choices").addClass("textStyle");
        if (userPick === answer) {
            $("#question").text("Correct!");
            $("#choices").text("The correct answer was: " + quiz[number].choices[answer]);
            clearInterval(timeRemain);
            correctAnswers++;
            $("#image").html("<img src = 'assets/images/" + quiz[number].imgName +"' />");
            $("#image").show();
            setTimeout(function() {
                nextQuestions();
            }, 1500)
        } else {
            $("#question").text("Incorrect...");
            $("#choices").text("The correct answer was: " + quiz[number].choices[answer]);
            clearInterval(timeRemain);
            wrongAnswers++;
            $("#image").html("<img src = 'assets/images/" + quiz[number].imgName +"' />");
            $("#image").show();
            setTimeout(function() {
                nextQuestions();
            }, 1500)
        } 
    });

    //reset variables, show timer, and start the questions function
    $("#startOver").on("click",function(event) {
        correctAnswers = 0;
        wrongAnswers = 0;
        unAnswers = 0; 
        count = 30;
        number = 0;
        $(this).hide();
        $("#timer").show();
        $("#timer").html("Time remaining: " + count + " secs");
        questions(number);
    });
});