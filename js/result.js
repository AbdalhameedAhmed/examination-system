let imageContainer = document.getElementById("image-container");
const userScore = localStorage.getItem("finalResult"); // Example score
const totalScore = localStorage.getItem("totalDegree"); // Example total score
const scorePers = (userScore / totalScore) * 100;
const passingScore = 50; // Example passing threshold
// --- END IMPORTANT ---

let sheet_url =
  "https://script.google.com/macros/s/AKfycbwtz0eAU_SM4tXU_exD_w8imWx4fCk-hVpZMRyC6Plo8ft1id4VEgMb4BV0BcPtIlNtvQ/exec&";

let results = localStorage.getItem("examResults"); // No need for || [] if you expect string or null
let userObject = localStorage.getItem("userObject"); // No need for || ""

if (results && userObject) {
  results = JSON.parse(results);
  userObject = JSON.parse(userObject);

  const params = new URLSearchParams({
    email: userObject.email,
    total: totalScore, // Ensure totalScore, userScore, scorePers, passingScore are defined
    result: userScore,
    state: scorePers >= passingScore ? "Passed" : "Faild",
  }).toString();

  // Construct the full URL
  const fullUrl = sheet_url + params;

  console.log("Request URL:", fullUrl); // Log the full URL to see what's being sent

  fetch(fullUrl)
    .then((response) => {
      // Always check if the response was successful (HTTP status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text(); // Get the response body as text
    })
    .then((data) => {
      console.log("Apps Script Response:", data); // Log the actual response from Apps Script
    })
    .catch((error) => {
      console.error("Error:", error);
    });
} else {
  console.log(
    "LocalStorage items 'examResults' or 'userObject' not found or empty."
  );
}

const resultHeading = document.getElementById("result-heading");
const scoreMessage = document.getElementById("score-message");
const confettiContainer = document.getElementById("confetti-container");
const tryAgainButton = document.getElementById("try-again-button");
const reviewResultsButton = document.getElementById("review-results-button");

// Determine if the user passed
const passed = scorePers >= passingScore;

// Display the results and apply Tailwind classes dynamically
if (passed) {
  resultHeading.textContent = "Congratulations! You Passed!";
  resultHeading.classList.add("text-green-600"); // Tailwind class for green text
  scoreMessage.textContent = `You scored ${scorePers}%. Well done!`;
  scoreMessage.classList.add("text-green-700"); // Tailwind class for green text
  imageContainer.children[1].classList.add("hidden");

  // Trigger confetti animation
  startConfetti();
} else {
  resultHeading.textContent = "You Did Not Pass";
  resultHeading.classList.add("text-red-600"); // Tailwind class for red text
  scoreMessage.textContent = `You scored ${scorePers}%. Keep trying!`;
  scoreMessage.classList.add("text-red-700"); // Tailwind class for red text
  imageContainer.children[0].classList.add("hidden");
}

// Optional: Try Again button functionality
tryAgainButton.addEventListener("click", () => {
  // Replace with your logic to restart the exam or go back to the start page
  // Example: Go back to an 'index.html' or 'exam.html'
  window.location.href = "index.html";
});

// Confetti Animation Function
function startConfetti() {
  const numberOfConfetti = 150; // More confetti for an awesome effect!
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ]; // Tailwind-compatible colors

  for (let i = 0; i < numberOfConfetti; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti"); // Custom CSS class for animation and basic shape

    // Apply a random Tailwind background color class
    const randomColorClass = colors[Math.floor(Math.random() * colors.length)];
    confetti.classList.add(randomColorClass);

    // Random positioning
    confetti.style.left = `${Math.random() * 100}vw`;

    // Random size and animation delay
    confetti.style.width = `${Math.random() * 0.5 + 0.25}rem`; // Random size between 0.25rem and 0.75rem
    confetti.style.height = confetti.style.width;
    confetti.style.animationDelay = `${Math.random() * 5}s`; // Random delay up to 5 seconds
    confetti.style.animationDuration = `${Math.random() * 3 + 4}s`; // Random duration between 4s and 7s

    confettiContainer.appendChild(confetti);
  }
}
reviewResultsButton.addEventListener("click", () => {
  window.location.href = "review.html";
});
