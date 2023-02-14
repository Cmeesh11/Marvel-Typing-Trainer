// Variable Declaration
var startButton = document.querySelector("#start-button");
var body = document.querySelector("body");
var container = document.querySelector("#container");
// Created Elements
var textBox = document.createElement("div");

var publicKey = "c80a5387467017b31f13477fc4481d74";

function startTraining() {
  // Fetching Marvel API
  fetch("https://gateway.marvel.com/v1/public/events?limit=50&apikey=" + publicKey)
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
      while (text.length < 5000) {
        text += " " + data.data.results[Math.floor(Math.random() * 49)].description;
      }
      // Styling textbox
      textBox.setAttribute("class", "box has-text-centered");
      // Setting textbox content to text
      text = text.replace(/â€™/g, "'");
      text = text.replace(/â€”/g, " ");
      textBox.textContent = text;
      // Appending textbox to body
      container.appendChild(textBox);
    })
    .catch((error) => {
      return console.error(error);
    });
}

// Listens for button click
startButton.addEventListener("click", startTraining);
