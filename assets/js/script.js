// Variable Declaration
var startButton = document.querySelector("#start-button");
var body = document.querySelector("body");
var container = document.querySelector("#container");
// Created Elements
var textBoxEl = document.createElement("div");

var publicKey = "c80a5387467017b31f13477fc4481d74";

function startTraining() {
  // Fetching Marvel API
  fetch(
    "https://gateway.marvel.com/v1/public/events?limit=50&apikey=" + publicKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Chooses a random description to display
      var text = data.data.results[Math.floor(Math.random() * 49)].description;
      // Clearing previous landing page HTML and replacing it with generated text
      container.innerHTML = "";
      // If text length is less than 500 characters, add another description
      while (text.length < 500) {
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
      // Runs interactiveText function to make text interactive
      interactiveText(text);
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

}

// Listens for button click
startButton.addEventListener("click", startTraining);

// Listens for keypress
window.addEventListener("keypress", (event) => {
  console.log(event.key);
  var passage = textBoxEl.querySelectorAll("span");
   passage.forEach((span) => {
     var charInput = event.key;
     if (charInput === span.textContent) {
       span.setAttribute("style", "background-color: lightgreen;");
     } else {
       span.setAttribute("style", "background-color: red;");
     }
   })
 })