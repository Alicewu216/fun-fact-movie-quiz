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
  var x = document.getElementById("quizTimer");

  //call staring function to home page
  startpage();
  //staring functiong that load starting homepage on screen
  function startpage() {
    
    //upon loading, show starting page with quiz rule and start button
    $("#mainContent").html(
      "<h1 id='homePageTitle'>Funfact Movie Quiz Challenge</h1>" +
        "<p id='homePagePara'>Try to answer the following funfact movie questions within the time limit. Keep in mind that incorrect answers will penalize your score and subtract 10 seconds from your time.</p>" +
        "<button id='startBut' class='btn btn-lg bg-light btn-outline-secondary'>Start Quiz</button>"
    );
    //upon clicking start, call displying question function
    $("#startBut").on("click", function () {
      //print questions on screen
      displayQuestion();
      //start timer
      keepTimer();
    });
  }

  //function that get and display current question
  function displayQuestion() {
    //show hidhen timer when timer reset
    x.style.display = "block";
    //check if quiz reaches the end
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
        "<div class='form-check'><label for='optionA' class='btn btn-lg form-check-label bg-light btn-outline-secondary'><input class='form-check-input' type='radio' name='options' id='optionA' value='A'>" +
          questions[questionCount].a +
          "</label></div>"
      );
      $("#mainContent").append(
        "<div class='form-check'><label for='optionB' class='btn btn-lg form-check-label bg-light btn-outline-secondary'><input class='form-check-input' type='radio' name='options' id='optionB' value='B'>" +
          questions[questionCount].b +
          "</label></div>"
      );
      $("#mainContent").append(
        "<div class='form-check'><label for='optionC' class='btn btn-lg form-check-label bg-light btn-outline-secondary'><input class='form-check-input' type='radio' name='options' id='optionC' value='C'>" +
          questions[questionCount].c +
          "</label></div>"
      );
      $("#mainContent").append(
        "<div class='form-check'><label for='optionD' class='btn btn-lg form-check-label bg-light btn-outline-secondary'><input class='form-check-input' type='radio' name='options' id='optionD' value='D'>" +
          questions[questionCount].d +
          "</label></div>"
      );
    } //call checkAns function once an option is picked
    $(".form-check-input").on("click", checkAns);
  }
  //check option picked
  function checkAns() {
    //save user's choices to an array
    var options = document.getElementsByName("options");
    //go through each option element in that array
    for (var j = 0; j < options.length; j++) {
      //check if each option is picked
      if (options[j].checked) {
        //save the picked option
        answerPicked = options[j].value;
      }
    }

    //check if picked option value match with correct answer for all save value
    if (answerPicked == questions[questionCount].answer) {
      //I tried to change button outline to green if the correct answer is picked, but this did not seen to work :(
      $(".form-check-input").attr("class","btn btn-lg form-check-label bg-light btn-outline-success");
      //add 1 to correctCount if picked correct answer
      correctCount++;
      console.log("correct");
    }
    //if option picked is wrong
    else {
       //I tried to change button outline to red if the wrong answer is picked, but this did not seen to work :(
      $(".form-check-input").attr("class","btn btn-lg form-check-label bg-light btn-outline-warning");
      console.log("incorrect");
      //subtract 10 sec from timer
      secondLeft = secondLeft - 10;
    }
    //add to question Count and display next question
    questionCount++;
    displayQuestion();
  }

  //timer function
  function keepTimer() {
    //start with 60 sec everytime when quiz start
    secondLeft = 60;
    //timer goes down every second and remining time shown on the right upper corner
    timeInterval = setInterval(function () {
      secondLeft--;
      $("#quizTimer").text("Time Remain: " + secondLeft);
      //when time runs out, stop the quiz and stop timer
      if (secondLeft === 0) {
        clearInterval(timeInterval);
        terminateQuiz();
      }
    }, 1000);
  }
//output quiz result when quiz is finished
  function terminateQuiz() {
    //stop timer
    clearInterval(timeInterval);
    //hide timer display
    x.style.display = "none";
//show result page with "all done" title, user's score, and options to enter initial for saving
    $("#mainContent").html(
      "<h1>All done!</h1>" +
        "<p>Your final score is " +
        correctCount +
        ".</p>" +
        "<div class='input-group' id='inputDiv'></div>"
    );
    //input text option for user to enter initial
    $("#inputDiv").append(
      "<label for='userInitial'>Enter Initial: </label>" +
        "<input type='text' name='userInitial' id='userInitial' placeholder='your initial here'/>"
    );
    //button for user to submit initial and score
    $("#inputDiv").append(
      "<button type='submit' class='btn btn-sm bg-light btn-outline-secondary' id='submitBtn'>Submit</button>"
    );
    //save user initial and score to variables for puting them into an object later
    var userSavedInitial = document.querySelector("#userInitial");
    var userScore = correctCount;

    
    //start saving to local storage function when submit button is clicked
    $("#submitBtn").on("click", function (event) {
      event.preventDefault();
      //save user initial and score to an object
      var user = {
        userinitial: userSavedInitial.value,
        userscore: userScore,
      };
      //check if user entered an empty initial
      if (user.userinitial === "") {
        //alert user and stay on the same screen if inital is empty
        return alert("Initial cannot be blank");
      } else {
        //alert susccessfully saved if inital is entered
        alert("Score saved successfully");
        //save object with initial and score to local storage
        localStorage.setItem("user", JSON.stringify(user));
      }
      //go to the highscore page
      highscorePage();
    });
    //reset quiz
    questionCount = 0;
    correctCount = 0;
  }

  //highscore page initation function
  function highscorePage() {
    //get user object with inital and score
    var currentuser = JSON.parse(localStorage.getItem("user"));
    //display high score page with highscore title, user's initial and score, as well as two buttons for restart and for clear history score
    $("#mainContent").html(
      "<h1 id=>Highscores</h1>" +
        "<p id='scoreRank'></p>" +
        "<div id='resetBtns'></div>"
    );
    $("#resetBtns").append(
      "<button type='button' class='btn btn-sm bg-light btn-outline-secondary' id='restartQuiz'>Go Back</button>" +
        "<button type='button' class='btn btn-sm bg-light btn-outline-secondary' id='clearScore'>Clear Highscores</button>"
    );
    //if user score is higher than highest score, output user's score and initial
    if (currentuser.userscore > highestScore) {
      highestScore = currentuser.userScore;
      highScoreUserOutput =
        currentuser.userinitial + ": " + currentuser.userscore;
      $("#scoreRank").text(highScoreUserOutput);
    }
    //if pressgoback, restartquiz
    $("#restartQuiz").on("click", startpage);
    // if press clearScore, clear all score history and show no score available
    $("#clearScore").on("click", function () {
      $("#scoreRank").text("No Score available yet");
    });
  }
});
