const addBtn = document.getElementById("add-question");
const srchBtn = document.getElementById("search-question");
const delBtn = document.getElementById("delete-question");
const mkImportant = document.getElementById("mark-important");
const pQuiz = document.getElementById("play-quiz");
const cQuiz = document.getElementById("clear-quiz");
const imptDisplay = document.getElementById("important-set");
const qSetDisplay = document.getElementById("question-set");
const question = document.getElementById("question");
const iAnswer = document.getElementById("answer");
const iSubmit = document.getElementById("submit");
var quiz = [];
var important = [];
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
function updateImportant() {
   //update questions
   let table = "<th>Question ID</th><th>Question</th><th>Answer</th>";
   for (var i = 0; i < important.length; i++) {
      table +=
         "<tr><td>" +
         String(i + 1) +
         "</td><td>" +
         String(important[i][0]) +
         "</td><td>" +
         String(important[i][1]) +
         "</td></tr>";
   }
   imptDisplay.innerHTML = table;
}
function addQuestion() {
   let question = prompt("Enter Question:");
   if (question == null || question == "") {
      return;
   }
   let answer = prompt("Enter Answer:");
   if (answer == null || answer == "") {
      return;
   }
   quiz.push([question, answer]);
   updateQuiz();
}
function srchQuestion() {
   let question = prompt("Which question would you like to find in the Quiz?\nNOTE: This is case and whitespace sensitive");
   if(question == null || question == "") {
      return;
   }
   index = quiz.findIndex(qPair => qPair[0]===question);
   if(index == -1) {
      alert("No Match");
   } else {
      alert("Question ID of first occurence: "+String(index+1));
   };

}
function deleteQuestion() {
   delIndex = prompt("Which Question would you want to remove from the quiz?\n(Enter Question ID)");
   quiz.splice(delIndex-1,1);
   updateQuiz();
}
function markAsImportant() {
   important = [];
   for(pair of quiz) {
      let choice = prompt("Mark this question as important?\n"+String(pair[0])+"\ny for yes, anything else for no");
      if(choice == null) {
         updateImportant();
         return;
      }
      if(choice.toLowerCase()=="y"||choice.toLowerCase()=="yes") {
         important.push(pair);
      }
   }
   updateImportant();
}
function onSubmit() {
   //checks answer
   if(iAnswer.value == null || iAnswer.value == "") {
      alert("Please Submit an Answer");
      return;
   }
   if (iAnswer.value == currentQuestion[1]) {
      alert("Correct!");
   } else {
      alert("Incorrect.");
   }
   iAnswer.value = null;
   if (questionsLeft == 0) {
      endQuiz();
   } else {
      questionsLeft -= 1;
      newQuestion();
   }
}
function newQuestion() {
   //generate new question
   currentQuestion = quiz[seed[quiz.length - questionsLeft-1]];
   question.innerHTML = currentQuestion[0];
}
function generateSeed() {
   //returns a random seed
}
function playQuiz() {
   //exit if nothing is in quiz
   if (quiz.length == 0){
      alert("Quiz is Empty");
      return;
   }
   //generate random question sequence, enter it into seed
   //seed = generateSeed();
   seed = Array.from({ length: quiz.length }, (_, i) => i);;
   //set questions left
   questionsLeft = quiz.length - 1;
   //question # = questionsLeft - quiz.length + 1
   //activate submit button
   newQuestion();
   iSubmit.addEventListener("click", (event)=>{
      event.preventDefault();
      onSubmit()});
}
function endQuiz() {
   question.innerHTML = "[End of Quiz]";
   iSubmit.removeEventListener();
   //show quiz statistics
}
function clearQuiz() {
   quiz = [];
   updateQuiz();
}
//Event Listeners for button menu
addBtn.addEventListener("click", addQuestion);
srchBtn.addEventListener("click", srchQuestion);
delBtn.addEventListener("click", deleteQuestion);
mkImportant.addEventListener("click", markAsImportant);
pQuiz.addEventListener("click", playQuiz);
cQuiz.addEventListener("click",clearQuiz);
