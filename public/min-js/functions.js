function menuTog(){var e=document.querySelector(".header-wrapper"),t=menuButton.querySelectorAll("span");this.classList.toggle("active-menu-button"),e.classList.toggle("active-menu");for(var n=0;n<t.length;n++)t[n].classList.toggle("active-span")}var pelicanWeather=document.querySelector(".pelican-weather"),pelicanWeatherInfo=document.querySelector(".pelican-weather-info"),weatherType=pelicanWeatherInfo.querySelector("li:nth-of-type(2)"),degrees=pelicanWeatherInfo.querySelector("li:nth-of-type(1) h2"),dateLi=pelicanWeatherInfo.querySelector("li:nth-of-type(3)"),menuButton=document.querySelector(".header-menu-button");menuButton.addEventListener("click",menuTog),function(){var e=degrees.textContent.substr(0,2);degrees.textContent=e+""}(),function(){var e=new Date,t=e.getDate(),n=e.getMonth()+1,a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];n=a[n],dateLi.querySelector("span:nth-of-type(1)").textContent=n,dateLi.querySelector("span:nth-of-type(2)").textContent=t}(),function(){var e,t=weatherType.querySelector("span:nth-of-type(1)").textContent;"Clear"===t?e="wi wi-day-sunny":"Rain"===t?e="wi wi-day-rain":"Clouds"===t?e="wi wi-day-cloudy":"Thunderstorm"===t?e="wi wi-day-lightning":"Haze"===t&&(e="wi wi-day-haze");pelicanWeather.querySelector("i").setAttribute("class",e)}();