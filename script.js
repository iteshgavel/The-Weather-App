let weather = {
  //------My API key-----generated on 18/06/2022-----
  apiKey: "0cacc6fb29718e4ea9ae79274abc3a8b",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("Can't get updated Weather. Please make sure that you have an active internet connection and searched a valid location. If location was valid then try searching some nearby city.");
          throw new Error("No weather found...!");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    
    //==================Adding More Features=====================
    const {lon, lat} = data.coord;
    const { feels_like, temp_min, temp_max, pressure } = data.main;
    const { country } = data.sys;
    
    //using neme----------------------------------
    document.querySelector(".city").innerText = "Current Weather in " + name;
    //using icon----------------------------------
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    //using description----------------------------
    document.querySelector(".description").innerText = description;
    //using temp-------------------------------------------------
    document.querySelector(".temp").innerText = temp + "°C";
    //using humidity------------------------------------------
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    //using wind speed-----------------------------------
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";

    //=========Extra part start==============================

    document.querySelector(".temp_optimal").innerText =
      "Max / Min Temp: " + temp_max + "°C / " + temp_min + "°C";

    // //using temp_max------------------------------------------
    // document.querySelector(".temp_max").innerText =
    //   "Maximum Temperature: " + temp_max + "°C";
    
    // //using temp_min------------------------------------------
    // document.querySelector(".temp_min").innerText =
    //   "Minimum Temperature: " + temp_min + "°C";

    //using feels_like------------------------------------------
    document.querySelector(".feels_like").innerText =
      "Feels Like: " + feels_like + "°C";

    //using sunrise------------------------------------------
    // document.querySelector(".sunrise").innerText =
    //   "Sunrise: " + sunrise;

    // //using sunset------------------------------------------
    // document.querySelector(".sunset").innerText =
    //   "Sunset: " + sunset;

    //using pressure------------------------------------------
    document.querySelector(".pressure").innerText =
      "Air Pressure: " + pressure + "Pa";

    //using country------------------------------------------
    document.querySelector(".country").innerText =
      "Country: " + country;

    //using lon------------------------------------------
    document.querySelector(".lon").innerText =
      "Longitude: " + lon;

    //using lat------------------------------------------
    document.querySelector(".lat").innerText =
      "Latitude: " + lat;
    //=================Extra Part End=================================
    
    //other default views---------------------------------
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
       "url('https://source.unsplash.com/1600x900/?" + description + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
//-----Default location--------------
weather.fetchWeather("Raipur");
