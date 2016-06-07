//********************************************
//           Javascript
//********************************************

var pelicanWeather     = document.querySelector('.pelican-weather');
var pelicanWeatherInfo = document.querySelector('.pelican-weather-info');
var menuButton         = document.querySelector('.header-menu-button');
var pathName          = window.location.pathname;

//********************************************
//           Javascript Events
//********************************************

menuButton.addEventListener('click', menuTog);


//********************************************
//           Javascript Functions
//********************************************

if (pathName === '/' || pathName.substr(0, 8) == '/?search') {
  changeDegree();
  acquireDate();
  weatherIcon();
}

// Changes the degrees
function changeDegree() {
  var degrees = pelicanWeatherInfo.querySelector('li:nth-of-type(1) h2');
  var deg = degrees.textContent.substr(0,2);
  degrees.textContent = deg + '';
}

// Gets Current month and day
function acquireDate() {
  var dateLi  = pelicanWeatherInfo.querySelector('li:nth-of-type(3)');

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  mm = months[mm];

  dateLi.querySelector('span:nth-of-type(1)').textContent = mm;
  dateLi.querySelector('span:nth-of-type(2)').textContent = dd;
}

// Changes weather icon depending on data
function weatherIcon() {
  var weatherType        = pelicanWeatherInfo.querySelector('li:nth-of-type(2)');
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
  } else if (weatherSpan === 'Haze') {
    spanClass = 'wi wi-day-haze';
  }

  var pelicanIcon = pelicanWeather.querySelector('i').setAttribute('class', spanClass);

}

function menuTog() {
  var headerWrapper = document.querySelector('.header-wrapper');
  var headerSpans = menuButton.querySelectorAll('span');

  // Toggle classes
  this.classList.toggle('active-menu-button');
  headerWrapper.classList.toggle('active-menu');

  for (var i = 0; i < headerSpans.length; i++) {
    headerSpans[i].classList.toggle('active-span');
  }

}
