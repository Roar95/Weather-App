// Week Three Homework
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// Feature One
let now = new Date();
let h2 = document.querySelector("#dateAndTime");

let date = now.getDate();
let year = now.getFullYear();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

h2.innerHTML = `${day} ${date} ${month} ${year} | ${hour}:${minutes}`;

// Feature Two
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#location");
  city.innerHTML = `${searchInput.value}`;

  if (weather[searchInput] !== undefined) {
    let temp = weather[searchInput].temp;
    //let humidity = weather[citySearch].humidity;
    let celsiusTemp = Math.round(temp);
    //let fahrenheitTemp = Math.round((temp * 9) / 5 + 32);

    let currentCelsius = document.querySelector("#dailyTemperature");
    currentCelsius.innerHTML = `${celsiusTemp}`;
  }
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#dailyTemperature");
  h1.innerHTML = `${temperature}°C`;
  let searchInput = document.querySelector("#search-text-input");
  searchInput.innerHTML = response.data.name;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let showCurrentPosition = document.querySelector("#latitude-longtitude");
  showCurrentPosition.innerHTML = `Latitude: ${lat} Longtitude:${lon}`;
  axios.get(url).then(showWeather);
}

function showGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocation = document.querySelector("#currentButton");
currentLocation.addEventListener("click", showGeoLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
