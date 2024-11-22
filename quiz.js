const questions = [
   {
    question:"Bitcoin build on which programming language?",
    answers: [
        {text: "C", correct: false},
        {text: "C++", correct: true},
        {text: "Python", correct: false},
        {text: "Rust", correct: false},
    ]
   },
   {question:"ETH build on which programming language?",
    answers: [
        {text: "Solidity", correct: true},
        {text: "Python", correct: false},
        {text: "Move", correct: false},
        {text: "C++", correct: false},
    ]
},
{question:"Sui build on which programming language?",
    answers: [
        {text: "Move", correct: true},
        {text: "Solidity", correct: false},
        {text: "Python", correct: false},
        {text: "Rust", correct: false},
    ]
},
{
    question:"Solana build on which programming language?",
    answers: [
        {text: "Rust", correct: true},
        {text: "Solidity", correct: false},
        {text: "Python", correct: false},
        {text: "Go", correct: false},
    ]
}
];

const questionElement=  document.getElementById("question");

const answerButtons=  document.getElementById("answer-button");

const nextbutton=  document.getElementById("next-btn");

let currentquestionindex= 0;
let score= 0;

function startquiz(){
    currentquestionindex=0;
    score=0;
    nextbutton.innerHTML= "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion= questions[currentquestionindex];
   let questionNO = currentquestionindex+1;
  questionElement.innerHTML = questionNO + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if(answer.correct){
        button.dataset.correct= answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextbutton.style.display= "none"
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct=== "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct=== "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}

function showscore(){
  resetState();
  questionElement.innerHTML= `Your Scored ${score} out of ${questions.length}`;
  nextbutton.innerHTML = "Play Again"
  nextbutton.style.display = "block"
}

function  handleNextButton(){
    currentquestionindex++;
    if(currentquestionindex < questions.length){
        showQuestion();
    }else{
        showscore();
    }
}

nextbutton.addEventListener("click", ()=>{
    if(currentquestionindex< questions.length){
        handleNextButton();
    }else{
        startquiz();
    }
})
startquiz();