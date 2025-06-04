import { jsQuizQuestions } from "./questions.js";
import { totalTime } from "./utils.js";
// Get references to elements
const startExamButton = document.getElementById("startExamButton");
const welcomeCard = document.getElementById("welcome-card");
const questionCount = document.getElementById("questionCount");
const time = document.getElementById("time");
time.innerHTML = totalTime > 60 ? (totalTime / 60).toFixed(0) : totalTime;
questionCount.innerHTML = jsQuizQuestions.length;
// --- Animation on Load ---
// After a short delay, remove the 'initial-hidden' class to trigger the animation
// This ensures the page renders first before the animation plays
setTimeout(() => {
  welcomeCard.classList.remove("initial-hidden");
  welcomeCard.classList.add("animate-in"); // Add the animation class
}, 100); // Small delay to allow CSS to load

// --- Button Navigation ---
startExamButton.addEventListener("click", () => {
  // Optional: Add a brief exit animation for the card before navigating
  welcomeCard.classList.remove("animate-in"); // Remove entry animation
  setTimeout(() => {
    welcomeCard.classList.add("!opacity-0", "!scale-95");
  });

  // Navigate to the exam page after the exit animation (or immediately if no exit anim)
  setTimeout(() => {
    window.location.href = "index.html"; // Ensure this path is correct for your exam page
  }, 500);
});
