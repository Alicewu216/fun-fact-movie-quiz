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
      answer: "b",
    },
    {
      prompt:
        "2. For which of these movies did Leonardo DiCaprio win an Oscar for Best Actor?",
      a: "Blood Diamond",
      b: "Titanic",
      c: "The Revenant",
      d: "The last King of Scotland",
      answer: "c",
    },
    {
      prompt: "3. In the 'Godfather' series, where was Vito Corleone born?",
      a: "Corleone, Sicily",
      b: "Athens",
      c: "New York City",
      d: "Rome",
      answer: "a",
    },
    {
      prompt:
        "4. Which one of these Academy Awards did Gone With the Wind not win?",
      a: "Best actor",
      b: "Best actress",
      c: "Best picture",
      d: "Best supporting actor",
      answer: "a",
    },
    {
      prompt: "5. In what yest is The Great Gastby set?",
      a: "1925",
      b: "1923",
      c: "1924",
      d: "1922",
      answer: "d",
    },
  ];
  //other global variable
  var questionCount = 0;
  var correctCount = 0;

  //upon loading, show starting page
  $("#mainContent").html(
    "<h1 id='homePageTitle'>Funfact Movie Quiz Challenge</h1>" +
      "<p id='homePagePara'>Try to answer the following funfact movie questions within the time limit. Keep in mind that incorrect answers will penalize your score and subtract 10 seconds from your time.</p>" +
      "<button id='startBut' class='btn btn-lg'>Start Quiz</button>"
  );
  //upon clicking start, call displying question function
  $("#startBut").on("click", displayQuestion);

  function displayQuestion() {
    //check if test reaches the end
    if (questionCount >= questions.length) {
      //output result
      $("#mainContent").html("You have completed the quiz.");
      //reset quiz
      questionCount = 0;
      correctCount = 0;
    }
    else {
      $("#mainContent").html(
        "<h3 id='questionPromt'>" +
          questions[questionCount].prompt +
          "</h3>" +
          "<div id='choiceOptions'></div>"
      );
      //display options as radio class from bootstrap with default stacking(maybe need to condense code here)
      $("#choiceOptions").append(
        "<div class='form-check'><label class='btn btn-lg btn-secondary'><input type='radio' name='options' value='A'>" +
          questions[questionCount].a +
          "</label></div>"
      );
      $("#choiceOptions").append(
        "<div class='form-check'><label class='btn btn-lg btn-secondary'><input type='radio' name='options' value='B'>" +
          questions[questionCount].b +
          "</label></div>"
      );
      $("#choiceOptions").append(
        "<div class='form-check'><label class='btn btn-lg btn-secondary'><input type='radio' name='options' value='C'>" +
          questions[questionCount].c +
          "</label></div>"
      );
      $("#choiceOptions").append(
        "<div class='form-check'><label class='btn btn-lg btn-secondary'><input type='radio' name='options' value='D'>" +
          questions[questionCount].d +
          "</label></div>"
      );
      $(".btn").on("click", checkAns);
    }
    //if test is not finished yet
    //display each question prompt
    
    //display options as radio class from bootstrap with default stacking(maybe need to condense code here)
    
  }

  function checkAns() {
    questionCount++;
    displayQuestion();
    console.log(questionCount);
  }
});

//display question function
//function getQuestion() {

//get current question (with maybe a for loop: terminate function at the end and allows restart)

//display question
//display options

//check correctness of answer
//compare user choice with answer
//add score is anser match
//call display function to display next question

//timer function
