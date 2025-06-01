import { jsQuizQuestions } from "./questions.js";
let isMArkSectionOpened = false;
let currentQuestion = null;
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
  constructor(question, options, answer, order) {
    this.question = question;
    this.options = options;
    this.answer = answer;
    this.order = order;
    this.userAnswer = undefined;
  }
}

console.log(jsQuizQuestions);

let appQuestions = [];

function loadAppQuestion() {
  while (jsQuizQuestions.length) {
    let jsQuizLength = jsQuizQuestions.length;
    let randomNumber = +(Math.random() * 1000).toFixed() % jsQuizLength;
    let selectedQuestion = jsQuizQuestions[randomNumber];
    let questionObj = new Question(
      selectedQuestion.question,
      selectedQuestion.options,
      selectedQuestion.answer,
      appQuestions.length
    );
    appQuestions.push(questionObj);
    jsQuizQuestions.splice(randomNumber, 1);
  }
}

function renderQuestionSection() {
  let buttonClasses =
    "w-10 h-10 rounded-2xl border border-primary focus:inset-shadow-xs inset-shadow-primary shrink-0 bg-background";
  let questionSectionElement = document.querySelector("#questionsSection");
  for (let question of appQuestions) {
    let buttonElement = document.createElement("button");
    buttonElement.className = buttonClasses;
    buttonElement.innerHTML = question.order + 1;

    buttonElement.addEventListener("click", () => {
      displayQuestion(question);
    });

    questionSectionElement.appendChild(buttonElement);
  }
}

function displayQuestion(question) {
  currentQuestion = question;
  let questionHeaderP = document.querySelector("#pageQuestionHeader");
  let questionOptionsDiv = document.querySelector("#pageQuestionOptions");

  questionHeaderP.innerHTML = `${question.order + 1}-${question.question}`;
  questionOptionsDiv.innerHTML = "";
  for (let optionIndex in question.options) {
    let optionDiv = `  <div class="w-full relative">
                <input
                  id="option-${optionIndex}"
                  class="peer hidden"
                  type="radio"
                  name="question-${question.order + 1}"
                  value="${question.options[optionIndex]}"
                /><label
                  for="option-${optionIndex}"
                  class="flex items-center text-secondary justify-between bg-background border-[rgba(87,143,202,0.422)] gap-3 p-2 w-full rounded border-2 transition duration-300 hover:border-primary text-lg md:text-xl peer-checked:border-primary"
                  ><p class="w-max flex items-center gap-2">
                    <span
                      class="w-[22px] h-[22px] bg-[#FFF5E9] flex items-center justify-center"
                      >${String.fromCharCode(65 + +optionIndex)}</span
                    >${question.options[optionIndex]}
                  </p>
                </label>
                <img
                  alt="correct mark"
                  loading="lazy"
                  width="15"
                  height="18"
                  decoding="async"
                  data-nimg="1"
                  class="hidden peer-checked:block absolute right-2 top-1/2 -translate-y-1/2"
                  style="color: transparent"
                  src="/assets/check-solid.svg"
                />
              </div>`;

    questionOptionsDiv.innerHTML += optionDiv;
  }
}

function next(event) {
  let currentQuestionOrder = currentQuestion.order;
  displayQuestion(appQuestions[currentQuestionOrder + 1]);

  // if (currentQuestionOrder + 1 == appQuestions.length - 1) {
  //   event.target.disabled = "true";
  // } else {
  //   event.target.disabled = null;
  // }
}

function prev(event) {
  let currentQuestionOrder = currentQuestion.order;
  displayQuestion(appQuestions[currentQuestionOrder - 1]);

  // if (currentQuestionOrder - 1 == 0) {
  //   event.target.disabled = "true";
  // } else {
  //   event.target.disabled = null;
  // }
}

loadAppQuestion();
renderQuestionSection();
displayQuestion(appQuestions[0]);

let nextButton = document.querySelector("#next");
let prevButton = document.querySelector("#prev");

nextButton.addEventListener("click", next);
prevButton.addEventListener("click", prev);

console.log(appQuestions);
