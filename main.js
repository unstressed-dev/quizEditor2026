const addBtn = document.getElementById("add-question");
const editBtn = document.getElementById("edit-question");
const delBtn = document.getElementById("delete-question");
const tQuiz = document.getElementById("show-quiz");
const pQuiz = document.getElementById("play-quiz");
const cQuiz = document.getElementById("clear-quiz");
const qSetDisplay = document.getElementById("question-set");
const question = document.getElementById("question");
const iAnswer = document.getElementById("answer");
const iSumbit = document.getElementById("submit");
var quiz = [];
var seed = [];
var currentQuestion;
var questionsLeft;
//Functions
function updateQuiz() {
   //update questions
   let table = "<th>Question ID</th><th>Question</th><th>Answer</th>";
   for (var i = 0; i < quiz.length; i++) {
      table +=
         "<tr><td>" +
         String(i + 1) +
         "</td><td>" +
         String(quiz[i][0]) +
         "</td><td>" +
         String(quiz[i][1]) +
         "</td></tr>";
   }
   qSetDisplay.innerHTML = table;
}
function addQuestion() {
   let question = prompt("Enter Question:");
   if (question == "" || question == null) {
      return;
   }
   let answer = prompt("Enter Answer:");
   if (answer == "" || answer == null) {
      return;
   }
   quiz.push([question, answer]);
   updateQuiz();
}
function editQuestion() {}
function deleteQuestion() {}
function onSumbit() {
   //checks answer
   if (iAnswer.value == currentQuestion[1]) {
      alert("Correct!");
   } else {
      alert("Incorrect!");
   }
   if (questionsLeft == 0) {
      endQuiz();
   } else {
      questionsLeft -= 1;
      nextQuestion();
   }
}
function newQuestion() {
   //generate new question
   currentQuestion = quiz[seed[questionsLeft - quiz.length + 1]];
   question.innerHTML = currentQuestion[0];
}
function generateSeed() {
   //returns a random seed
}
function playQuiz() {
   //exit if nothing is in quiz
   if (quiz.length == 0) {
      alert("Quiz is Empty");
      return;
   }
   //generate random question sequence, enter it into seed
   //seed = generateSeed();
   seed = [0, 1, 2];
   //set questions left
   questionsLeft = quiz.length - 1;
   //question # = questionsLeft - quiz.length + 1
   //activate submit button
   newQuestion();
   iSumbit.addEventListener("click", onSubmit);
}
function quizEnd() {
   iSumbit.removeEventListener("click", onSumbit);
   //show quiz statistics
}
function clearQuiz() {}
//Event Listeners for button menu
addBtn.addEventListener("click", addQuestion);
editBtn.addEventListener("click", editQuestion);
pQuiz.addEventListener("click", playQuiz);
