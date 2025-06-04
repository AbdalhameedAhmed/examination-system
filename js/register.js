import { showError, removeError, togglePassword } from "./utils.js";
let errors = {};
let users = JSON.parse(localStorage.getItem("users")) || [];
if (users.length > 0) {
  window.location.href = "./login.html";
}
let popupDiv = document.querySelector("#register-sucess-popup");
let allToggleButtons = document.querySelectorAll(
  "button[data-type='togglePassword']"
);
allToggleButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    togglePassword(button, event);
  });
});

document.getElementById("fName").addEventListener("blur", (e) => {
  let elementValue = e.target.value;
  let regex = /^[a-zA-Z ]+$/g;
  if (elementValue.length <= 1 || !regex.test(elementValue)) {
    showError(e.target, "Please enter a valid name", errors);
  }
});

document.getElementById("fName").addEventListener("input", (e) => {
  let elementValue = e.target.value;
  let regex = /^[a-zA-Z ]+$/g;
  if (elementValue.length > 1 && regex.test(elementValue)) {
    removeError(e.target, errors);
  }
});
document.getElementById("lName").addEventListener("blur", (e) => {
  let elementValue = e.target.value;
  let regex = /^[a-zA-Z ]+$/g;
  if (elementValue.length <= 1 || !regex.test(elementValue)) {
    showError(e.target, "Please enter a valid name", errors);
  }
});

document.getElementById("lName").addEventListener("input", (e) => {
  let elementValue = e.target.value;
  let regex = /^[a-zA-Z ]+$/g;
  if (elementValue.length > 1 && regex.test(elementValue)) {
    removeError(e.target, errors);
  }
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

document.getElementById("confirmPassword").addEventListener("blur", (e) => {
  let password = document.getElementById("password").value;
  let elementValue = e.target.value;
  if (elementValue != password) {
    showError(e.target, "Passwords do not match", errors);
  }
});

document.getElementById("confirmPassword").addEventListener("input", (e) => {
  let password = document.getElementById("password").value;
  let elementValue = e.target.value;
  if (elementValue == password) {
    removeError(e.target, errors);
  }
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let valuesObject = Object.fromEntries(formData.entries());
  if (Object.values(errors).length == 0) {
    popupDiv.classList.add("!scale-x-100");
    console.log("Submitted", valuesObject);
    let userObject = {
      fName: valuesObject.fName,
      lName: valuesObject.lName,
      email: valuesObject.email,
      password: valuesObject.password,
    };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userObject);
    localStorage.setItem("users", JSON.stringify(users));
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 800);
  }
});
