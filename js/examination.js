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
