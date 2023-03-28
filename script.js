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
let timeRemaining = 120;
let timerEl = document.getElementById("timer");
let index = 0;
let questionsDivEl = document.getElementById("questions-div");
let questionEl = document.getElementById("question");
let ansChoicesEl = document.getElementById("ans-choices")

function handleStart (){
    console.log ("start button clicked");
    timerId = setInterval (handleOneSecTimeOut, 1000);
    timerEl.textContent = timeRemaining; 
    showQuestion ();
}   

function handleOneSecTimeOut (){
    timeRemaining--; 
    timerEl.textContent = timeRemaining;
} 

function showQuestion (){
    
}