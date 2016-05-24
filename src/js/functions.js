//********************************************
//           Javascript
//********************************************
var pelicanWeather = document.querySelector('.pelican-weather');
var pelicanWeatherInfo = document.querySelector('.pelican-weather-info');
var weatherType = pelicanWeatherInfo.querySelector('li:nth-of-type(2)');
var degrees = pelicanWeatherInfo.querySelector('li:nth-of-type(1) h2');
var dateLi = pelicanWeatherInfo.querySelector('li:nth-of-type(3)');

(function changeDegree() {
  var deg = degrees.textContent.substr(0,2);
  degrees.textContent = deg + '';
})();

(function acquireDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  mm = months[mm];

  dateLi.querySelector('span:nth-of-type(1)').textContent = mm;
  dateLi.querySelector('span:nth-of-type(2)').textContent = dd;
})();

(function weatherIcon() {
  var weatherSpan = weatherType.querySelector('span:nth-of-type(1)').textContent;
  var spanClass;

  if(weatherSpan === 'Clear') {
    spanClass = 'wi wi-day-sunny';
  } else if(weatherSpan === 'Rain') {
    spanClass = 'wi wi-day-rain';
  } else if (weatherSpan === 'Clouds') {
    spanClass = 'wi wi-day-cloudy';
  } else if (weatherSpan === 'Thunderstorm') {
    spanClass = 'wi wi-day-lightning';
  }

  var pelicanIcon = pelicanWeather.querySelector('i').setAttribute('class', spanClass);

})();
