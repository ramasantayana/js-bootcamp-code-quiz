let questions = [
    {
        question: "Q1", 
        ansChoices: ["A1", "A2", "A3", "A4"],
        correctAnswer: "A3",
    },
    {
        question: "Q2", 
        ansChoices: ["A1", "A2", "A3", "A4"],
        correctAnswer: "A1",
    },
    {
        question: "Q3", 
        ansChoices: ["A1", "A2", "A3", "A4"],
        correctAnswer: "A4",
    },
    {
        question: "Q4", 
        ansChoices: ["A1", "A2", "A3", "A4"],
        correctAnswer: "A2",
    },
    {
        question: "Q5", 
        ansChoices: ["A1", "A2", "A3", "A4"],
        correctAnswer: "A1",
    },
    {
        question: "Q6", 
        ansChoices: ["A1", "A2", "A3", "A4"],
        correctAnswer: "A4",
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