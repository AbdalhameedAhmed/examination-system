import { togglePassword, showError, removeError } from "./utils.js";

let errors = {};

let popupErrorDiv = document.querySelector("#login-error-popup");
let popupSuccessDiv = document.querySelector("#login-sucess-popup");

let allToggleButtons = document.querySelectorAll(
  "button[data-type='togglePassword']"
);
allToggleButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    togglePassword(button, event);
  });
});

document.getElementById("email").addEventListener("blur", (e) => {
  let elementValue = e.target.value;
  let regex = /^[a-zA-Z][a-zA-Z_.0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/g;
  if (!regex.test(elementValue)) {
    showError(e.target, "Please enter a valid email", errors);
  }
});

document.getElementById("email").addEventListener("input", (e) => {
  let elementValue = e.target.value;
  let regex = /^[a-zA-Z][a-zA-Z_.0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/g;
  if (regex.test(elementValue)) {
    removeError(e.target, errors);
  }
});
document.getElementById("password").addEventListener("blur", (e) => {
  let elementValue = e.target.value;
  if (elementValue.length < 8) {
    showError(e.target, "Password must be more than 8 characters long", errors);
  }
});

document.getElementById("password").addEventListener("input", (e) => {
  let elementValue = e.target.value;
  if (elementValue.length >= 8) {
    removeError(e.target, errors);
  }
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let valuesObject = Object.fromEntries(formData.entries());
  if (Object.values(errors).length == 0) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userObject = users.find(
      (user) =>
        user.email == valuesObject.email &&
        user.password == valuesObject.password
    );

    if (userObject) {
      popupSuccessDiv.classList.add("!scale-x-100");
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "./welcome.html";
      }, 800);
    } else {
      popupErrorDiv.classList.add("!scale-x-100");
      setTimeout(() => {
        popupErrorDiv.classList.remove("!scale-x-100");
      }, 3000);
    }
    console.log("Submitted", valuesObject);
  }
});
