// Variable Declaration
var startButton = document.querySelector("#start-button");
var avengersButton = document.querySelector("#avengers-button");
var scoresButton = document.querySelector("#scores-button");
var body = document.querySelector("body");
var main = document.querySelector("main");
var container = document.querySelector("#container");
var index;
var count;
var input;
var seconds = 0;
var scoreBox = document.querySelector("#scores");
var scoreButton = document.querySelector("#score-button");
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
  var accuracy = Math.round((correct.length / (index + 1)) * 100) + "%";
  return accuracy;
}
//Function for the timer
function startTimer() {
  count = setInterval(function () {
    seconds++;
  }, 1000);
}

// Loads highscores page
function highScores() {
  // Clears existing content
  main.innerHTML = "";
  // Creating elements
  var box = document.createElement("div");
  var list = document.createElement("ul");
  var backButton = document.createElement("button");
  var text = document.createElement("span");

  // Changing classes and text content
  box.className = "box is-medium has-text-centered is-size-1";
  box.setAttribute("style", "margin: auto;");

  backButton.className = "button is-medium has-background-link has-text-white";
  backButton.textContent = "Back";
  backButton.setAttribute("style", "margin-top: 10px;");

  text.textContent = "Scores";
  text.className = "box is-medium has-text-centered is-size-2";

  // Retreiving values from local storage
  var highscores = JSON.parse(localStorage.getItem("Scores list"));
  // If there are are existing scores create a scores page, else display "no scores" screen
  if (!(highscores === null)) {
    main.appendChild(box);
    box.appendChild(text);
    box.appendChild(list);
    // Looping over each object and printing the values to the page
    for (var i = 0; i < highscores.length; i++) {
      var score = document.createElement("li");
      score.className = "box is-small is-size-5 mg-small";
      score.textContent =
        highscores[i].name +
        " | " +
        highscores[i].accuracy +
        " | " +
        highscores[i].time;
      list.appendChild(score);
    }
  } else {
    text.textContent = "No scores have been submitted";
    text.className = "box is-medium has-text-centered is-size-5";
    main.appendChild(box);
    box.appendChild(text);
    box.appendChild(list);
  }
  box.appendChild(backButton);
}

// Ends the session; Creates an enter name page, and once entered,
// stores the name, accuracy, and time in localStorage
function doneTyping() {
  index = 0;
  // Changes font and shows results to user
  textBoxEl.setAttribute("style", "font-family: Verdana;");
  textBoxEl.textContent =
    "Completed in " +
    seconds +
    " seconds " +
    "with " +
    accuracy +
    " accuracy! The Avengers would be proud!";
  var form = document.createElement("form");
  input = document.createElement("input");
  var button = document.createElement("button");

  input.setAttribute("placeholder", "Enter your name");
  input.setAttribute("type", "text");
  input.setAttribute("style", "display: block; margin: 0 auto;");
  button.setAttribute("class", "block button is-light is-small");

  button.textContent = "Submit";

  textBoxEl.appendChild(form);
  form.appendChild(input);
  form.appendChild(button);

  clearInterval(count);
}

// Listens for comics button click
startButton.addEventListener("click", function () {
  // returns the promise to text, then once fulfilled,
  // runs the interactiveText function to make the text interactive
  var text = startTraining();
  text.then((resp) => {
    interactiveText(resp);
    startTimer();
  });
});

// Listens for Avengers button click
avengersButton.addEventListener("click", function () {
  // returns the promise to text, then once fulfilled,
  // runs the interactiveText function to make the text interactive
  var text = startTrainingAvengers();
  text.then((resp) => {
    interactiveText(resp);
    startTimer();
  });
});

// Listens for back button click and refreshes page

main.addEventListener("click", function (event) {
  var element = event.target;
  if (element.textContent === "Back") {
    document.location.reload(true);
  }
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
  if (textBoxEl != undefined) {
    accuracy = getAccuracy();
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

// Listens for highscores button
scoresButton.addEventListener("click", highScores);

// Listens for form submit on completion page
main.addEventListener("submit", function (event) {
  event.preventDefault();
  scores = JSON.parse(localStorage.getItem("Scores list"));
  if (scores == null) {
    scores = [];
  }
  // Check to see if entered value is blank
  if (input.value == "") {
    return;
  }

  // Create an object for user statistics
  var userScore = {
    name: input.value.trim(),
    accuracy: accuracy,
    time: seconds + " seconds",
  };

  // Setting the values to local storage
  localStorage.setItem("Score", JSON.stringify(userScore));
  scores.push(userScore);
  localStorage.setItem("Scores list", JSON.stringify(scores));
  document.location.reload(true);
});
