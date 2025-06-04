// review.js

document.addEventListener("DOMContentLoaded", () => {
  const questionsContainer = document.getElementById("questions-container");
  const backToHomeBtn = document.getElementById("backToHomeBtn");

  // --- 1. Retrieve Exam Results from localStorage ---
  // IMPORTANT: Ensure your exam page saves the results in this format.
  const examResultsJSON = localStorage.getItem("examResults");
  let examResults = [];

  if (examResultsJSON) {
    try {
      examResults = JSON.parse(examResultsJSON);
    } catch (e) {
      console.error("Error parsing exam results from localStorage:", e);
      // Handle error, maybe redirect to home or show an error message
    }
  } else {
    // If no results are found, redirect or show a message
    questionsContainer.innerHTML = `
            <p class="text-center text-red-500 text-xl font-semibold">
                No exam results found. Please complete an exam first!
            </p>
        `;
    // Optional: Redirect after a short delay
    // setTimeout(() => { window.location.href = 'welcome.html'; }, 3000);
    return; // Stop execution if no results
  }

  // --- 2. Dynamically Render Each Question for Review ---
  examResults.forEach((result, index) => {
    const questionCard = document.createElement("div");
    questionCard.classList.add(
      "bg-gray-50",
      "p-6",
      "rounded-lg",
      "shadow-md",
      "border"
    );

    // Determine card border color based on correctness
    if (result.userAnswer == result.answer) {
      questionCard.classList.add("border-green-300");
    } else {
      questionCard.classList.add("border-red-300");
    }

    questionCard.innerHTML = `
            <p class="text-xl font-semibold mb-4">${index + 1}. ${
      result.question
    }</p>
            <ul class="space-y-2">
                ${result.options
                  .map((option, optionIndex) => {
                    let optionClasses = "p-3 rounded-md text-gray-700";
                    let statusText = "";

                    // Check if this is the correct answer
                    if (option === result.answer) {
                      optionClasses =
                        "p-3 rounded-md bg-green-100 border border-green-400 text-green-800";
                      statusText =
                        '<span class="font-bold">(Correct Answer)</span>';
                    }

                    // Check if this was the user's answer
                    if (
                      option === result.userAnswer &&
                      result.userAnswer !== result.answer
                    ) {
                      if (result.isCorrect) {
                        // User's answer is correct AND it's the correct option
                        optionClasses =
                          "p-3 rounded-md bg-green-200 border-2 border-green-600 text-green-900 font-medium";
                        statusText =
                          '<span class="font-bold">(Your Correct Answer)</span>';
                      } else {
                        // User's answer is incorrect
                        optionClasses =
                          "p-3 rounded-md bg-red-100 border border-red-400 text-red-800";
                        statusText =
                          '<span class="font-bold">(Your Answer - Incorrect)</span>';
                      }
                    }

                    return `
                        <li class="${optionClasses}">
                            ${String.fromCharCode(
                              65 + optionIndex
                            )}) ${option} ${statusText}
                        </li>
                    `;
                  })
                  .join("")}
            </ul>
        `;
    questionsContainer.appendChild(questionCard);
  });

  // --- 3. Back to Home Button Functionality ---
});
backToHomeBtn.addEventListener("click", () => {
  // Optional: Clear exam results from localStorage if they shouldn't persist
  // localStorage.removeItem('examResults');
  console.log("dasdas");

  window.location.href = "welcome.html"; // Or your main exam start page
});
