//Variables
var trivia = {
  initialScreen: "",
  correctCounter: 0,
  inCorrectCounter: 0,
  unAnsweredCounter: 0,
  gameHTML: "",
  questionsArray: [
                  "The Cleveland franchise began with the new American League in 1901, joining seven other teams. The team was called the Cleveland Blues. Later they changed their name to Bronchos, Naps, then took the Indian name in which year?", "Which season did Cleveland fans attend their first-ever World Series?", "Who is the Cleveland Indian's General Manager?", "Kenny Lofton was the leadoff man for the tribe in 1995. What position in the field was his?", "The Indians brought Bob Feller to Cleveland during the 1936 season. How old was he?"],
  answerArray: [
                ["1812", "1905", "1915", "1942"], ["1918", "1919", "1920", "1921"], ["Terry Thomas", "Ballpark Frank", "Francona Frank", "Terry Francona"], ["Left", "Center", "Right", "Pitcher"], ["16", "17", "18", "19"],],
  correctAnswers: [
                  "C. 1915", "C. 1920", "D. Terry Francona", "B. Center", "B. 17"],
  imageArray: [
              "<img class='center-block img-right' src='assets/images/first-answer.png'>", "<img class='center-block img-right' src='assets/images/second-answer.jpg'>", "<img class='center-block img-right' src='assets/images/third-answer.jpg'>", "<img class='center-block img-right' src='assets/images/fourth-answer.jpg'>", "<img class='center-block img-right' src='assets/images/fifth-answer.jpg'>"],
  clock: "",
  questionCounter: 0,
  timeCounter: 20,
};


//Functions
function startScreen(){
  trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Click To Start!</a></p>";

  $(".main-area").html(trivia.initialScreen);
};

function timer(){
  trivia.clock = setInterval(twentySeconds, 1000);
  function twentySeconds(){
    if(trivia.timeCounter === 0){
      timeOutLoss();
      clearInterval(trivia.clock);
    }
    if(trivia.timeCounter > 0) {
      trivia.timeCounter --;
    }
    $(".timer").html(trivia.timeCounter);
  }
};

function wait(){
  if(trivia.questionCounter < 4) {
    trivia.questionCounter ++;
    generateHTML();
    trivia.timeCounter = 20;
    timer();
  }
  else {
    finalScreen();
  }
};

function win(){
  trivia.correctCounter ++;
  trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
  $(".main-area").html(trivia.gameHTML);
  setTimeout(wait, 4000);
};

function loss(){
  trivia.inCorrectCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 4000);
};

function timeOutLoss(){
  trivia.unAnsweredCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 4000);
};

function finalScreen(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".main-area").html(trivia.gameHTML);
};

function resetGame(){
  trivia.questionCounter = 0;
  trivia.correctCounter = 0;
  trivia.inCorrectCounter = 0;
  trivia.unAnsweredCounter = 0;
  trivia.timeCounter = 20;
  generateHTML();
  timer();
};

function generateHTML(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
  $(".main-area").html(trivia.gameHTML);
}


//Game Flow
startScreen();

$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	generateHTML();
	timer();
});

$("body").on("click", ".answer", function(event){
  selectedAnswer = $(this).text();
	if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {
		clearInterval(trivia.clock);
		win();
	}
	else {
		clearInterval(trivia.clock);
		loss();
	}
});

$("body").on("click", ".reset-button", function(event){
	resetGame();
});




