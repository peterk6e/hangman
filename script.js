const head = document.getElementById("head");
const body = document.getElementById("body");
const rightArm = document.getElementById("armR");
const leftArm = document.getElementById("armL");
const rightLeg = document.getElementById("legR");
const leftLeg = document.getElementById("legL");
const wrongLettersList = document.getElementById("wrong-letters");
const hiddenWord = document.getElementById("word");
const message = document.getElementById("message");

const words = ["programming", "tomorrow", "asynchronous", "congratulations"];
const hiddenWordArray = [];
var word = "";
const wrongLettersSet = new Set();
const goodLettersSet = new Set();

init();
function init() {
  wrongLettersSet.clear();
  goodLettersSet.clear();
  hiddenWordArray.splice(0);
  hiddenWord.className = "";

  head.style.visibility = "hidden";
  body.style.visibility = "hidden";
  rightArm.style.visibility = "hidden";
  leftArm.style.visibility = "hidden";
  rightLeg.style.visibility = "hidden";
  leftLeg.style.visibility = "hidden";

  word = words[Math.floor(Math.random() * words.length)];
  [...word].forEach(() => {
    hiddenWordArray.push("_ ");
  });

  wrongLettersList.innerText = "";
  message.innerText ="";
  updateWord();
}

//Play
document.addEventListener("keydown", (event) => {
  if (isLetter(event) && !isAlreadyTypedLetter(event.key)) {
    var isInWord = false;
    [...word].forEach((char, index) => {
      if (event.key == char) {
        hiddenWordArray[index] = event.key.toUpperCase();
        goodLettersSet.add(event.key);
        isInWord = true;
        updateWord();
      }
    });
    if (!isInWord) {
      updateWrongLetters(event.key);
    }
    checkEndGame();
  }
});

function updateWord() {
  hiddenWord.innerText = hiddenWordArray.join("");
}

function updateWrongLetters(key) {
  let text = "";
  wrongLettersSet.add(key);
  for (const entry of wrongLettersSet.values()) {
    text += entry.toUpperCase() + ", ";
  }
  wrongLettersList.innerText = text;
}

function checkEndGame() {
  updateSVG();
  if (wrongLettersSet.size > 5) {
    hiddenWord.innerText = word.toUpperCase();
    hiddenWord.className = "lost";
    message.innerText = "sorry, you lost...";
  } else if (!hiddenWordArray.includes("_ ")) {
    hiddenWord.className = "won";
    message.innerText = "Congrats, you win!!";
  }
}

function isAlreadyTypedLetter(key) {
  if (!wrongLettersSet.has(key) && !goodLettersSet.has(key)) {
    return false;
  } else {
    alert("you have already typed this letter.");
    return true;
  }
}

function isLetter(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) return true;
  return false;
}

function updateSVG() {
  switch (wrongLettersSet.size) {
    case 1:
      head.style.visibility = "";
      break;
    case 2:
      body.style.visibility = "";
      break;
    case 3:
      rightArm.style.visibility = "";
      break;
    case 4:
      leftArm.style.visibility = "";
      break;
    case 5:
      rightLeg.style.visibility = "";
      break;
    case 6:
      leftLeg.style.visibility = "";
      break;
    default:
  }
}
