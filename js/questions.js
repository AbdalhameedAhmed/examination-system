export const jsQuizQuestions = [
  {
    question:
      "What is the correct way to declare a variable in JavaScript that cannot be reassigned?",
    options: ["var x = 5;", "let x = 5;", "const x = 5;", "variable x = 5;"],
    answer: "const x = 5;",
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Integer", "Symbol"],
    answer: "Integer",
  },
  {
    question: "What will `console.log(typeof null)` output?",
    options: ["null", "object", "undefined", "number"],
    answer: "object",
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: [
      "array.push()",
      "array.pop()",
      "array.shift()",
      "array.unshift()",
    ],
    answer: "array.push()",
  },
  {
    question: 'What is the output of `console.log(2 + "2")`?',
    options: ["4", `22`, "NaN", `44`],
    answer: "22",
  },
  {
    question: "How do you check if a variable is an array?",
    options: [
      'typeof variable === "array"',
      "variable.isArray()",
      "Array.isArray(variable)",
      "variable instanceof Array",
    ],
    answer: "Array.isArray(variable)",
  },
  {
    question: "What does the `===` operator check?",
    options: [
      "Only value equality",
      "Only type equality",
      "Both value and type equality",
      "Neither value nor type",
    ],
    answer: "Both value and type equality",
  },
  {
    question: "What is the purpose of the `this` keyword in JavaScript?",
    options: [
      "Refers to the current function",
      "Refers to the parent object",
      "Refers to the global object",
      "Depends on the execution context",
    ],
    answer: "Depends on the execution context",
  },
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A function inside another function",
      "A function that has access to its outer function's scope",
      "A way to hide variables",
      "A built-in JavaScript method",
    ],
    answer: "A function that has access to its outer function's scope",
  },
  {
    question: 'What will `console.log(1 == "1")` return?',
    options: ["true", "false", "NaN", "TypeError"],
    answer: "true",
  },
];
