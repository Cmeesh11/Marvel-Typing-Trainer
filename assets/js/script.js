// Variable Declaration
var startButton = document.querySelector("#start-button");
var avengersButton = document.querySelector("#avengers-button");
var body = document.querySelector("body");
var container = document.querySelector("#container");
var index;
var scoreBox = document.querySelector("#scores");
var scoreButton = document.querySelector("#score-button");
// Created Elements
var textBoxEl = document.createElement("div");
var publicKey = "c80a5387467017b31f13477fc4481d74";
var avengersMovies = [
  "The+Avengers",
  "Avengers+Age+of+Ultron",
  "Avengers+Infinity+War",
  "Avengers+Endgame",
];

function startTrainingAvengers() {
  return fetch(
    "http://www.omdbapi.com/?apikey=6961e40c&t=" +
      avengersMovies[Math.floor(Math.random() * 4)] +
      "&type=movie&plot=full"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      var text = data.Plot;
      container.innerHTML = "";
      // Styling textbox
      textBoxEl.setAttribute("class", "box has-text-centered");
      textBoxEl.setAttribute("style", "font-family: Courier New");
      // Setting textbox content to text
      text = text.replace(/â€™/g, "'");
      text = text.replace(/â€”/g, " ");
      // Appending textbox to body
      container.appendChild(textBoxEl);
      return text;
    });
}

function startTraining() {
  // Fetching Marvel API
  return fetch(
    "https://gateway.marvel.com/v1/public/events?limit=50&apikey=" + publicKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Chooses a random description to display
      var text = data.data.results[Math.floor(Math.random() * 49)].description;
      // Clearing previous landing page HTML and replacing it with generated text
      container.innerHTML = "";
      // If text length is less than 100 characters, add another description
      while (text.length < 100) {
        text +=
          " " + data.data.results[Math.floor(Math.random() * 49)].description;
      }
      // Styling textbox
      textBoxEl.setAttribute("class", "box has-text-centered");
      textBoxEl.setAttribute("style", "font-family: Courier New");
      // Setting textbox content to text
      text = text.replace(/â€™/g, "'");
      text = text.replace(/â€”/g, " ");
      // Appending textbox to body
      container.appendChild(textBoxEl);
      return text;
    })
    .catch((error) => {
      return console.error(error);
    });
}

function interactiveText(textEl) {
  // Splits text into an array of characters (including spaces)
  var text = textEl.split("");
  // Loop over each letter and create a span
  for (var i = 0; i < text.length; i++) {
    var spanLet = document.createElement("span");
    spanLet.textContent = text[i];
    textBoxEl.appendChild(spanLet);
  }
  index = 0;
}
// Returns the accuracy of the user
function getAccuracy() {
  // Selects all spans in textboxEl with class "correct"
  var correct = textBoxEl.querySelectorAll(".correct");
  // Compares index to correctly entered characters and returns a percent
  var accuracy = (correct.length / index) * 100 + "%";
  return accuracy;
}
//Function for the timer
var seconds = 0
function startTimer() {
  var count = setInterval(function(){
    seconds++;
     }, 1000);
}

function highScores(){
  var scores = localStorage.getItem("Highscores")
 

}


// Ends the session
function doneTyping() {
  console.log("done!");
  clearInterval(count)
  textBoxEl.textContent = "Completed in " + seconds + " seconds! The Avengers would be proud!" 
  localStorage.setItem("Highscores", seconds + " seconds")
}

// Listens for comics button click
startButton.addEventListener("click", function () {
  // returns the promise to text, then once fulfilled,
  // runs the interactiveText function to make the text interactive
  var text = startTraining();
  text.then((resp) => {
    interactiveText(resp);
  });
});

//Starts timer on button click
startButton.addEventListener("click", startTimer);

// Listens for button click
startButton.addEventListener("click", startTraining);

// Listens for movies button click
avengersButton.addEventListener("click", function () {
  // returns the promise to text, then once fulfilled,
  // runs the interactiveText function to make the text interactive
  var text = startTrainingAvengers();
  text.then((resp) => {
    interactiveText(resp);
  });
});

// Listens for keypress
window.addEventListener("keypress", (event) => {
  var charInput = event.key;
  var passage = textBoxEl.querySelectorAll("span");
  // Only runs when the textbox is on screen
  // If user input character is the same as the current letter, turn green
  if (charInput === passage[index].textContent) {
    new Audio("./assets/sounds/keypress.mp3").play();
    passage[index].classList.add("correct");
  } // If the wrong key is pressed, make color red
  else {
    new Audio("./assets/sounds/wronganswer.mp3").play();
    passage[index].classList.add("incorrect");
  }
  if (index === passage.length - 1) {
    return doneTyping();
  }
  index++;
});

// Listens for backspace
window.addEventListener("keydown", (event) => {
  var charInput = event.key;
  var passage = textBoxEl.querySelectorAll("span");
  // If the backspace key is pressed, go back one index and change color
  if (charInput === "Backspace") {
    // Prevents index from being negative
    if (index > 0) {
      new Audio("./assets/sounds/keypress.mp3").play();
      // Moves index back a space
      index--;
      // Removes the background color from the character
      passage[index].classList.remove("correct");
      passage[index].classList.remove("incorrect");
    }
  }
});
