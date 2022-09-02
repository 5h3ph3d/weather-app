const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  messageOne.textContent = "Fetching results...";
  messageTwo.textContent = "";
  searchWeather(location);
  search.value = "";
});

const searchWeather = (address) => {
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        return console.log(data.error);
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
      console.log(data.forecast);
      console.log(data.location);
    });
  });
};
