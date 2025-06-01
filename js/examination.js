import {jsQuizQuestions} from "./questions.js"
let isMArkSectionOpened = false;
document
  .getElementById("toggle-mark-section")
  .addEventListener("click", function () {
    isMArkSectionOpened = !isMArkSectionOpened;
    let ele = this;
    ele.classList.toggle("rotate-180");
    let markSection = ele.parentNode;
    let questionsParent = markSection.children[1];
    let questions = questionsParent.children;
    markSection.classList.toggle("!w-[160px]");
    for (let i = 0; i < questions.length; i++) {
      if (isMArkSectionOpened) {
        setTimeout(() => {
          questions[i].children[0].innerHTML = `Question ${i + 1}`;
        }, 150);
      } else {
        questions[i].children[0].innerHTML = `Q${i + 1}`;
      }

      questions[i].children[1].classList.toggle("hidden");
    }
  });

  class Question {
    constructor(question,options,answer,order){
      this.question = question ;
      this.options = options;
      this.answer= answer;
      this.order = order ;
      this.userAnswer = undefined
    }
    
  }

  console.log(jsQuizQuestions);
  
  let appQuestions = []
  
  
  function loadAppQuestion (){
    while (jsQuizQuestions.length) {
      let jsQuizLength = jsQuizQuestions.length 
      let randomNumber = + (Math.random()*1000).toFixed()%jsQuizLength 
      let selectedQuestion = jsQuizQuestions[randomNumber]
      let questionObj = new Question(selectedQuestion.question,selectedQuestion.options,selectedQuestion.answer,appQuestions.length) ;
      appQuestions.push(questionObj)
      jsQuizQuestions.splice(randomNumber,1)
    }

  }

  

  function renderQuestionSection (){
    let buttonClasses = "w-10 h-10 rounded-2xl border border-primary focus:inset-shadow-xs inset-shadow-primary shrink-0 bg-background"
    let questionSectionElement = document.querySelector('#questionsSection')
    for (let question of appQuestions)   {
      let buttonElement = document.createElement('button')
      buttonElement.className=buttonClasses 
      buttonElement.innerHTML = question.order+1
      
      buttonElement.addEventListener('click',()=>{
        console.log(question);
      })

      questionSectionElement.appendChild(buttonElement)
      
    }
    
  }

  loadAppQuestion()
  renderQuestionSection()

  console.log(appQuestions);


  