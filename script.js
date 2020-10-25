// JavaScript function that wraps everything
$(document).ready(function () {
  //question object arrays with prompts, choices, and answer as object elements
  var questions = [
    {
      prompt: "1. What was the first movie in the Marvel Cinematic Universe?",
      a: "Iron Man",
      b: "Spider Man",
      c: "Batman",
      d: "The Avengers",
      answer: "A",
    },
    {
      prompt:
        "2. For which of these movies did Leonardo DiCaprio win an Oscar for Best Actor?",
      a: "Blood Diamond",
      b: "Titanic",
      c: "The Revenant",
      d: "The last King of Scotland",
      answer: "C",
    },
    {
      prompt: "3. In the 'Godfather' series, where was Vito Corleone born?",
      a: "Corleone, Sicily",
      b: "Athens",
      c: "New York City",
      d: "Rome",
      answer: "A",
    },
    {
      prompt:
        "4. Which one of these Academy Awards did Gone With the Wind not win?",
      a: "Best actor",
      b: "Best actress",
      c: "Best picture",
      d: "Best supporting actor",
      answer: "A",
    },
    {
      prompt: "5. In what year is The Great Gastby set?",
      a: "1925",
      b: "1923",
      c: "1924",
      d: "1922",
      answer: "D",
    },
  ];
  //other global variable
  var questionCount = 0;
  var correctCount = 0;
  var answerPicked = "";
  var secondLeft = 60;
  var timeInterval = 0;
  var highestScore = 0;
  var highScoreUserOutput = "";
  startpage();

  function startpage() {
    //upon loading, show starting page
    $("#mainContent").html(
      "<h1 id='homePageTitle'>Funfact Movie Quiz Challenge</h1>" +
        "<p id='homePagePara'>Try to answer the following funfact movie questions within the time limit. Keep in mind that incorrect answers will penalize your score and subtract 10 seconds from your time.</p>" +
        "<button id='startBut' class='btn btn-lg'>Start Quiz</button>"
    );
    //upon clicking start, call displying question function
    $("#startBut").on("click", function () {
      displayQuestion();
      keepTimer();
    });
  }

  //function that get and display current question
  function displayQuestion() {
    //check if test reaches the end
    if (questionCount >= questions.length) {
      //output result
      terminateQuiz();
    }
    //if test is not finished yet
    else {
      //display each question prompt
      $("#mainContent").html(
        "<h3 id='questionPromt'>" + questions[questionCount].prompt + "</h3>"
      );
      //display options as radio class from bootstrap with default stacking(maybe need to condense code here)
      $("#mainContent").append(
        "<div class='form-check'><label for='optionA' class='btn btn-lg btn-secondary form-check-label'><input class='form-check-input' type='radio' name='options' id='optionA' value='A'>" +
          questions[questionCount].a +
          "</label></div>"
      );
      $("#mainContent").append(
        "<div class='form-check'><label for='optionB' class='btn btn-lg btn-secondary form-check-label'><input class='form-check-input' type='radio' name='options' id='optionB' value='B'>" +
          questions[questionCount].b +
          "</label></div>"
      );
      $("#mainContent").append(
        "<div class='form-check'><label for='optionC' class='btn btn-lg btn-secondary form-check-label '><input class='form-check-input' type='radio' name='options' id='optionC' value='C'>" +
          questions[questionCount].c +
          "</label></div>"
      );
      $("#mainContent").append(
        "<div class='form-check'><label for='optionD' class='btn btn-lg btn-secondary form-check-label'><input class='form-check-input' type='radio' name='options' id='optionD' value='D'>" +
          questions[questionCount].d +
          "</label></div>"
      );
    } //call checkAns function once an option is picked
    $(".form-check-input").on("click", checkAns);
  }
  //check option picked
  function checkAns() {
    var options = document.getElementsByName("options");
    console.log(options);
    for (var j = 0; j < options.length; j++) {
      if (options[j].checked) {
        answerPicked = options[j].value;
        console.log(answerPicked);
      }
    }

    //check if picked option value match with correct answer for all save value
    if (answerPicked == questions[questionCount].answer) {
      $("#mainContent").append("<div><p>Correct!</p></div>");
      //add 1 to correctCount if picked correct answer
      correctCount++;
      console.log("correct");
      //display "correct" below question
    }
    //if option picked is wrong
    else {
      $("#mainContent").append("<p>Incorrect!</p>");
      console.log("incorrect");
      secondLeft = secondLeft - 10;
      //display "incorrect" below question
    }
    //add to question Count and display next question
    questionCount++;
    displayQuestion();
  }

  //timer function
  function keepTimer() {
    secondLeft = 60;
    timeInterval = setInterval(function () {
      secondLeft--;
      $("#quizTimer").text("Time Remain: " + secondLeft);

      if (secondLeft === 0) {
        clearInterval(timeInterval);
        terminateQuiz();
      }
    }, 1000);
  }

  function terminateQuiz() {
    //output result
    clearInterval(timeInterval);

    $("#mainContent").html(
      "<h1>All done!</h1>" +
        "<p>Your final score is " +
        correctCount +
        ".</p>" +
        "<div class='input-group' id='inputDiv'></div>"
    );
    $("#inputDiv").append(
      "<label for='userInitial'>Enter Initial: </label>" +
        "<input type='text' name='userInitial' id='userInitial' placeholder='your initial here'/>"
    );
    $("#inputDiv").append(
      "<button type='submit' class='btn btn-sm' id='submitBtn'>Submit</button>"
    );
    var userSavedInitial = document.querySelector("#userInitial");
    var userScore = correctCount;

    //save initial to local storage

    $("#submitBtn").on("click", function (event) {
      event.preventDefault();
      var user = {
        userinitial: userSavedInitial.value,
        userscore: userScore,
      };

      if (user.userinitial === "") {
        alert("Initial cannot be blank");
      } else {
        alert("Score saved successfully");

        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
      //to the highscore page
      highscorePage();
    });
    //reset quiz
    questionCount = 0;
    correctCount = 0;
  }

  //highscore page initation function
  function highscorePage() {
    console.log(highestScore);
    var currentuser = JSON.parse(localStorage.getItem("user"));

    $("#mainContent").html(
      "<h1>Highscores</h1>" +
        "<p id='scoreRank'></p>" +
        "<div id='resetBtns'></div>"
    );
    $("#resetBtns").append(
      "<button type='button' class='btn btn-sm' id='restartQuiz'>Go Back</button>" +
        "<button type='button' class='btn btn-sm' id='clearScore'>Clear Highscores</button>"
    );
    if (currentuser.userscore > highestScore) {
      highestScore = currentuser.userScore;
      highScoreUserOutput =
        currentuser.userinitial + ": " + currentuser.userscore;
      $("#scoreRank").text(highScoreUserOutput);
      console.log(highScoreUserOutput);
    }
    //if pressgoback, restartquiz
    $("#restartQuiz").on("click", startpage);

    $("#clearScore").on("click", function () {
      $("#scoreRank").text("No Score available yet");
    });
  }
});
