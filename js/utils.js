export function togglePassword(ele, event) {
  event.preventDefault();
  let parent = ele.parentNode;
  let children = parent.children;
  for (let child of children) {
    if (child.localName == "input") {
      if (child.type == "text") {
        child.type = "password";
      } else {
        child.type = "text";
      }
    }
    if (child == ele) {
      child.classList.add("hidden");
    }
    if (child.localName == "button" && child != ele) {
      child.classList.remove("hidden");
    }
  }
}

export function showError(ele, errorMessage, errors) {
  let errorElement = ele.parentNode.parentNode.children[1];
  ele.classList.add("!border-red-500");
  errorElement.innerHTML = errorMessage;
  errorElement.classList.add("mt-2");
  errors[ele.name] = errorMessage;
}

export function removeError(ele, errors) {
  let errorElement = ele.parentNode.parentNode.children[1];
  errorElement.innerHTML = "";
  errorElement.classList.remove("mt-2");
  ele.classList.remove("!border-red-500");
  delete errors[ele.name];
}
