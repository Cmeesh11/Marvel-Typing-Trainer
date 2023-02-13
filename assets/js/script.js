// Defining API keys and creating a timestamp
var publicKey = "c80a5387467017b31f13477fc4481d74";
var privateKey = "747b04935d0b762d907eae78288967013a942b90";
var timestamp = (new Date()).toString();
// Using CryptoJS library to encrypt hash into MD5 digest
var hash = CryptoJS.MD5(timestamp + privateKey + publicKey);
// Fetching Marvel API
fetch("https://gateway.marvel.com/v1/public/stories?ts=" + timestamp + "&apikey=" + publicKey + "&hash=" + hash)
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log(data);
})
.catch((error) => {
  return console.error(error);
})