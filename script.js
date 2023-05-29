let questions = [
    {
        question: "How does a FOR loop start?", 
        ansChoices: ["for (i <= 5; i++)", "for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5"],
        correctAnswer: "for (i = 0; i <= 5; i++)",
    },
    {
        question: "Inside which HTML element do we put the JavaScript?", 
        ansChoices: ["<javascript>", "<js>", "<scripting>", "<script>"],
        correctAnswer: "<script>",
    },
    {
        question: "Where is the correct place to insert a JavaScript?", 
        ansChoices: ["Both the <head> section and the <body> section are correct", "The <body> section", "The <body> section"],
        correctAnswer: "Both the <head> section and the <body> section are correct",
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?", 
        ansChoices: ["<script src='xxx.js'>", "<script name='xxx.js'>", '<script href="xxx.js">'],
        correctAnswer: '<script src="xxx.js">',
    },
    {
        question: "The external JavaScript file must contain the <script> tag.", 
        ansChoices: ["False", "True"],
        correctAnswer: "False",
    },
    {
        question: "How do you write 'Hello World' in an alert box?", 
        ansChoices: ["msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');"],
        correctAnswer: "msg('Hello World');",
    },
    {
        question: "How do you create a function in JavaScript?", 
        ansChoices: ["function = myFunction()", "function:myFunction()", "function myFunction()"],
        correctAnswer: "function myFunction()",
    },
    {
        question: "How do you call a function named 'myFunction'?", 
        ansChoices: ["call myFunction()", "call function myFunction()", "myFunction()"],
        correctAnswer: "myFunction()",
    },
    {
        question: "How to write an IF statement in JavaScript?", 
        ansChoices: ["if i = 5", "if i = 5 then", "if (i == 5)", "if i == 5 then"],
        correctAnswer: "if i = 5",
    },
    {
        question: "How does a WHILE loop start?", 
        ansChoices: ["while (i <= 10)", "while (i <= 10; i++)", "while i = 1 to 10"],
        correctAnswer: "while (i <= 10)",
    },
];

let startBtn = document.getElementById('begin');
startBtn.addEventListener("click", handleStart);
let timerId;
let timeRemaining = 75;
let timerEl = document.getElementById("timer");
let index = 0;
let questionsDivEl = document.getElementById("questions-div");
let highScoreDivEl = document.getElementById("high-score-div");
let endDivEl = document.getElementById("end-div");
let questionEl = document.getElementById("question");
let ansChoicesEl = document.getElementById("ans-choices");
let beginDivEl = document.getElementById("begin-div");
let currentQuestion= questions[index];
let score=0;
let data=[];

if(localStorage.getItem('score')){
    data=JSON.parse(localStorage.getItem('score'));
}

function handleStart (){
    console.log ("start button clicked");
    document.querySelector('#prev-ans').innerHTML=''
    index=0;
    currentQuestion= questions[index];
    timerId = setInterval (handleOneSecTimeOut, 1000);
    timerEl.textContent = timeRemaining; 
    
    beginDivEl.setAttribute("class", "hide");
    questionsDivEl.removeAttribute("class");
    highScoreDivEl.setAttribute("class", "hide");
    endDivEl.setAttribute("class", "hide");
    showQuestion ();
}   

function handleOneSecTimeOut (){
    if(timeRemaining<=0){
        clearInterval(timerId)
        return alert('game end')
    }
    timeRemaining--; 
    timerEl.textContent = timeRemaining;
} 

const handleOptionClick=(questionIndex,answerIndex)=>{
  let question=questions[questionIndex];
  let userAns=question.ansChoices[answerIndex];
  if(userAns!==question.correctAnswer){
    document.querySelector('#prev-ans').innerHTML='wrong answer';
    timeRemaining=timeRemaining-10; 
    if(timeRemaining<=0){
    clearInterval(timerId)
     showEnd();
     return
    }
    timerEl.textContent = timeRemaining;
  }else{
    score++;
    document.querySelector('#prev-ans').innerHTML='correct answer';
  }
  index++;
  if(index==questions.length){
    clearInterval(timerId)
    return showEnd()
  }
  currentQuestion= questions[index];
  showQuestion();




}

function showQuestion (){
    questionEl.textContent = currentQuestion.question;
    // console.log(questionEl);
    // console.log(questionEl.textContent);
    // console.log(questions[index].question);

    ansChoicesEl.innerHTML = '';

    for (let i=0; i <currentQuestion.ansChoices.length; i++ ) {
        let choiceBtn = document.createElement('button');
        let choice = currentQuestion.ansChoices[i];
        choiceBtn.onclick=()=>handleOptionClick(index,i)
        choiceBtn.setAttribute('class','ans-choice');
        choiceBtn.setAttribute('value',choice);
        choiceBtn.textContent = i + 1 + '.' + choice;
        ansChoicesEl.appendChild(choiceBtn);
    }
}


function saveInfo(){
    let name=document.querySelector('#myname').value;
    data.push({name,score});
    localStorage.setItem('score',JSON.stringify(data))
    showHighScore();
}

function showEnd(){
    timeRemaining=75; 
    timerEl.textContent = timeRemaining;
    document.querySelector('#myscore').innerHTML=score;
    beginDivEl.setAttribute("class", "hide");
    questionsDivEl.setAttribute("class", "hide");
    highScoreDivEl.setAttribute("class", "hide");
    endDivEl.removeAttribute("class");
   
}


function showHighScore(){
    beginDivEl.setAttribute("class", "hide");
    questionsDivEl.setAttribute("class", "hide");
    highScoreDivEl.removeAttribute("class");
    endDivEl.setAttribute("class", "hide");
    let scoreDiv=document.querySelector('.high-score');
    scoreDiv.innerHTML='';
    data.map(({name,score})=>{
        scoreDiv.insertAdjacentHTML('beforeend',`
        <h3>${name} : ${score}</h3>`)
    })

}

function showHome(){
    beginDivEl.removeAttribute("class");
    questionsDivEl.setAttribute("class", "hide");
    highScoreDivEl.setAttribute("class", "hide");
    endDivEl.setAttribute("class", "hide");
}