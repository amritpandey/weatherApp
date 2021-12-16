//Create your own json file

[
  {
      artist: 'Bob Marley',
      albums: ['burnin', 'catch a fire', 'soul revolution', 'natty dread'],
      hitsongs: [
          { title: 'buffalo soldier', length: '6:15', year: 1975 },
          { title: 'no woman no cry', length: '5:47', year: 1989 },
      ],
      genre: 'reggae',
  },
  {
      artist: 'coldplay',
      albums: ['parachuets', 'xny', 'ghost stories'],
      hitsongs: [
          { title: 'yellow', length: '5:15', year: 2000 },
          { title: 'viva la vida', length: '5:40', year: 2005 },
      ],
      genre: 'rock',
  },
];

// Find a cool api
//aniapi.com/docs/
https: [
  {
      status_code: 200, // number
      message: 'Anime found', // string
      data: {
          // object
          anilist_id: 1,
          mal_id: 1,
          format: 0,
          'status:': 0,
          titles: {
              //object inside object
              en: 'Cowboy Bebop',
              jp: 'カウボーイビバップ',
          },
          // ...
          id: 0,
      },
      version: '1', // The response API version
  },
];

//Weather app //be9e1928280950bedf8ff42caa2aa649

const cityInput = document.querySelector('.search-bar');
const btnToSearchByCity = document.querySelector('.btnSearch');

const cityName = document.querySelector('.cityName');
const cityTemp = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like');
const cityIcon = document.querySelector('.icon');
const windSpeed = document.querySelector('.windSpeed');
const cloudy = document.querySelector('.cloudy');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const description= document.querySelector('.description');

const errorDisplay=document.querySelector('#error-display')
let weatherApi;

//local storage start
const city = localStorage.getItem('myCity');
if (city) {
  
  weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be9e1928280950bedf8ff42caa2aa649&units=metric`;
  renderApiData(weatherApi);
}
//local storage end

// geolocation api start
const btnToKnowCurrentPosition = document.querySelector('#currentPosition');

// searching weather data using current location of the user
btnToKnowCurrentPosition.addEventListener('click', () => {
  errorDisplay.innerHTML="";
  function success(pos) {
      var crd = pos.coords;
      weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=be9e1928280950bedf8ff42caa2aa649&units=metric`;
      renderApiData(weatherApi);
  }

  function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error);
});

// geolocation api end

// searching weather data using city name
btnToSearchByCity.addEventListener('click', () => {
  errorDisplay.innerHTML="";
  weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=be9e1928280950bedf8ff42caa2aa649&units=metric`;
    renderApiData(weatherApi);
  
});

function renderApiData(weatherApi) {

  fetch(weatherApi)
      .then((res) => res.json())
      .then((yesNoData) => {
          //console.log(yesNoData);
          if (yesNoData.name) {
            
          cityName.innerHTML = `Weather in <strong>${yesNoData.name}</strong>`;
          cityTemp.innerHTML = yesNoData.main.temp + ' °C';
          feelsLike.innerHTML = `Feels like ${yesNoData.main.feels_like} °C`;
          description.innerHTML=yesNoData.weather[0].description;
          const iconDisplay = yesNoData.weather[0].icon;
          /*cityIcon.innerHTML=`<img src="http://openweathermap.org/img/w/${iconDisplay}.png" alt="weather icon">` */
          cityIcon.setAttribute(
              'src',
              `http://openweathermap.org/img/w/${iconDisplay}.png`,
          );
          windSpeed.innerHTML = `Wind Speed: ${yesNoData.wind.speed} km/h`;
          cloudy.innerHTML = `Cloud in the sky:  ${yesNoData.clouds.all} %`;

          // converting time to local time
          const sunriseDate = yesNoData.sys.sunrise;
          const sunriseTime = new Date(sunriseDate * 1000);
          const sunsetTime = new Date(yesNoData.sys.sunset * 1000);

          const timeSunrise = sunriseTime.toLocaleTimeString();
          const timeSunset = sunsetTime.toLocaleTimeString();
          sunrise.innerHTML = 'Sunrise: ' + timeSunrise;
          sunset.innerHTML = `Sunset:  ${timeSunset}`;

          // show city on a map
          const latitude = yesNoData.coord.lat;
          const longitude = yesNoData.coord.lon;
          const locationToLink = document.querySelector('#location-link');
          locationToLink.href = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&amp;output=embed`;

          localStorage.setItem('myCity', yesNoData.name); // storing the last visited city
        } else{
          //alert("not a valid city");

          const p=document.createElement('p');
          p.innerHTML="<strong>NOT VALID<strong>"
          errorDisplay.appendChild(p);

        }
      }); // end of fetch
} // end of
