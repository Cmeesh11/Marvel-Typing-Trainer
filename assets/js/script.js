
var publicKey = "c80a5387467017b31f13477fc4481d74";

// Fetching Marvel API
fetch("https://gateway.marvel.com/v1/public/stories?apikey=" + publicKey)
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log(data);
})
.catch((error) => {
  return console.error(error);
})