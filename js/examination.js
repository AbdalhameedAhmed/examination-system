import { jsQuizQuestions } from "./questions.js";
import { totalTime } from "./utils.js";
if (localStorage.getItem("isLoggedIn") != "true") {
  window.location.href = "./login.html";
}

let isMArkSectionOpened = false;
let currentQuestion = null;
let appQuestions = [];
let markBtn = document.querySelector("#mark");
let unmarkBtn = document.querySelector("#unmark");
let timerDiv = document.getElementById("timer");
let timerWrapperDiv = document.getElementById("timerWrapper");
let examSubmitBtn = document.getElementById("examSubmit");
let popupDiv = document.getElementById("popup");
let intervalCode = setInterval(timerHandler, 1000);
let currrentTime = 0;
let timeStepPerc = (1 / totalTime) * 100;
let totalDegree = jsQuizQuestions.length;
let finalResult = 0;
let userAnswers = null;
function timerHandler() {
  currrentTime += 1;
  timerDiv.style.transform = `translateX(${
    -100 + timeStepPerc * currrentTime
  }%)`;
  if (timeStepPerc * currrentTime >= 75) {
    timerDiv.classList.add("!bg-red-500", "animate-pulse");
    timerWrapperDiv.classList.add("!bg-red-950");
  }
  if (currrentTime == totalTime) {
    calculateFinalDegree();
    clearInterval(intervalCode);
    setTimeout(() => {
      popupDiv.classList.remove("!hidden");
      setTimeout(() => {
        popupDiv.children[0].classList.remove("scale-0");
      });
    }, 1000);
  }
}

function calculateFinalDegree() {
  if (!userAnswers) userAnswers = [...appQuestions];
  finalResult = 0;
  for (let question of userAnswers) {
    if (question.answer == question.userAnswer) {
      finalResult += 1;
    }
  }
  localStorage.setItem("finalResult", finalResult);
  localStorage.setItem("totalDegree", totalDegree);
  localStorage.setItem("examResults", JSON.stringify(userAnswers));
  console.log("final re", finalResult);
}
class Question {
  constructor(question, options, answer, order) {
    this.question = question;
    this.options = options;
    this.answer = answer;
    this.order = order;
    this.userAnswer = undefined;
    this.isMarked = false;
  }
}
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

    for (const element of questions) {
      let questionOrder = +element.getAttribute("data-order");

      if (isMArkSectionOpened) {
        element.classList.remove("justify-center");
        element.classList.add("justify-between");
        setTimeout(() => {
          element.children[0].innerHTML = `Question ${questionOrder + 1}`;
        }, 150);
      } else {
        element.classList.add("justify-center");
        element.classList.remove("justify-between");
        element.children[0].innerHTML = `Q${questionOrder + 1}`;
      }

      element.children[1].classList.toggle("hidden");
    }
  });

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
  let questionSectionElement = document.querySelector("#questionsSection");
  questionSectionElement.innerHTML = "";
  for (let question of appQuestions) {
    let buttonClasses = `w-10 h-10 rounded-2xl border border-primary focus:inset-shadow-xs inset-shadow-primary shrink-0 ${
      question.userAnswer ? "bg-green-300" : "bg-background"
    }  relative`;
    let buttonElement = document.createElement("button");
    buttonElement.className = buttonClasses;
    buttonElement.setAttribute("data-questionFlagOrder", question.order);
    buttonElement.innerHTML = `<span class="z-20 relative">
    ${question.order + 1}
    </span><img src="assets/flag-solid.svg" alt="mark question" class=" ${
      question.isMarked ? "" : "hidden"
    } md:hidden z-10 absolute top-1/2 left-1/2 -translate-1/2 w-5 opacity-30"/>
    `;

    buttonElement.addEventListener("click", () => {
      displayQuestion(question);
    });

    questionSectionElement.appendChild(buttonElement);
  }
}

function toggleMarkedSectionVisibility() {
  let markSection = document.querySelector("#markSection");
  let markedQuestionsArray = appQuestions.filter(
    (question) => question.isMarked
  );
  if (markedQuestionsArray.length == 0) {
    markSection.classList.remove("md:block");
  }
}

function removeMerkedQuestion(question) {
  let markedBtn = document.querySelector(`[data-order="${question.order}"]`);
  markedBtn.remove();
  question.isMarked = false;
  toggleMarkedSectionVisibility();
  if (question == currentQuestion) {
    markBtn.classList.remove("hidden");
    unmarkBtn.classList.add("hidden");
  }
  let markedQuestionFlag = document.querySelector(
    `[data-questionFlagOrder="${currentQuestion.order}"] img`
  );
  markedQuestionFlag.classList.add("hidden");
}

function createMarkedQuestionButton(question) {
  let spanClasses = `cursor-pointer ${isMArkSectionOpened ? "" : "hidden"}`;
  let spanHtml = `<img src="assets/trash-solid.svg" alt="" class="w-[10px]" />`;
  let buttonClasses = `w-full px-2 py-2 flex items-center ${
    isMArkSectionOpened ? "justify-between" : "justify-center"
  } rounded-2xl border border-primary focus:inset-shadow-xs inset-shadow-primary bg-background shrink-0`;
  let buttonHtmlContent = `<p>${isMArkSectionOpened ? "Question " : "Q"}${
    question.order + 1
  }
  
  </p>`;

  let buttonElement = document.createElement("button");
  let trashSpan = document.createElement("span");
  trashSpan.innerHTML = spanHtml;
  trashSpan.className = spanClasses;
  trashSpan.addEventListener("click", function (event) {
    event.stopPropagation();
    removeMerkedQuestion(question);
  });
  buttonElement.className = buttonClasses;
  buttonElement.innerHTML = buttonHtmlContent;
  buttonElement.appendChild(trashSpan);
  buttonElement.setAttribute("data-order", question.order);
  return buttonElement;
}

function renderMarkedQuestionSection(currentQuestion) {
  let markedSectionDiv = document.querySelector("#markSection");
  let markListDiv = document.querySelector("#markList");

  if (!markedSectionDiv.classList.contains("md:block")) {
    markedSectionDiv.classList.add("md:block");
  }

  if (!currentQuestion.isMarked) {
    let buttonElement = createMarkedQuestionButton(currentQuestion);
    buttonElement.addEventListener("click", (event) => {
      displayQuestion(currentQuestion);
    });
    markListDiv.appendChild(buttonElement);
    currentQuestion.isMarked = true;
  }
}

function displayQuestion(question) {
  currentQuestion = question;
  disableNextBtn(question.order);
  disablePrevBtn(question.order);
  let questionHeaderP = document.querySelector("#pageQuestionHeader");
  let questionOptionsDiv = document.querySelector("#pageQuestionOptions");

  if (question.isMarked) {
    markBtn.classList.add("hidden");
    unmarkBtn.classList.remove("hidden");
  } else {
    markBtn.classList.remove("hidden");
    unmarkBtn.classList.add("hidden");
  }

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
                  src="assets/check-solid.svg"
                />
              </div>`;

    questionOptionsDiv.innerHTML += optionDiv;
  }

  for (let optionIndex in question.options) {
    let input = document.getElementById(`option-${optionIndex}`);
    input.addEventListener("change", (e) => {
      console.log(e);
      question.userAnswer = `${e.target.value}`;
      console.log(e.target.value);
      renderQuestionSection();
    });
    if (question.options[optionIndex] == question.userAnswer) {
      input.checked = true;
    }
  }
}

function disableNextBtn(questionOrder) {
  let nextButton = document.querySelector("#next");
  if (questionOrder == appQuestions.length - 1) {
    nextButton.disabled = "true";
  } else {
    nextButton.disabled = null;
  }
}

function disablePrevBtn(questionOrder) {
  let nextButton = document.querySelector("#prev");
  if (questionOrder == 0) {
    nextButton.disabled = "true";
  } else {
    nextButton.disabled = null;
  }
}

function next() {
  let currentQuestionOrder = currentQuestion.order;
  displayQuestion(appQuestions[currentQuestionOrder + 1]);
}

function prev() {
  let currentQuestionOrder = currentQuestion.order;
  displayQuestion(appQuestions[currentQuestionOrder - 1]);
}

function markQuestion() {
  let markedQuestionFlag = document.querySelector(
    `[data-questionFlagOrder="${currentQuestion.order}"] img`
  );
  markedQuestionFlag.classList.remove("hidden");
  renderMarkedQuestionSection(currentQuestion);

  markBtn.classList.add("hidden");
  unmarkBtn.classList.remove("hidden");
}

function unmarkQuestion() {
  unmarkBtn.classList.add("hidden");
  markBtn.classList.remove("hidden");
  removeMerkedQuestion(currentQuestion);
}

loadAppQuestion();
renderQuestionSection();
displayQuestion(appQuestions[0]);

let nextButton = document.querySelector("#next");
let prevButton = document.querySelector("#prev");

nextButton.addEventListener("click", next);
prevButton.addEventListener("click", prev);
markBtn.addEventListener("click", markQuestion);
unmarkBtn.addEventListener("click", unmarkQuestion);

examSubmitBtn.addEventListener("click", () => {
  calculateFinalDegree();
  window.location.href = "./result.html";
});
document.querySelector("#popup-submit").addEventListener("click", function () {
  window.location.href = "./result.html";
});
