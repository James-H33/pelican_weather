function changeDegree(){var e=pelicanWeatherInfo.querySelector("li:nth-of-type(1) h2"),t=e.textContent.substr(0,2);e.textContent=t+""}function acquireDate(){var e=pelicanWeatherInfo.querySelector("li:nth-of-type(3)"),t=new Date,n=t.getDate(),a=t.getMonth()+1,r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];a=r[a],e.querySelector("span:nth-of-type(1)").textContent=a,e.querySelector("span:nth-of-type(2)").textContent=n}function weatherIcon(){var e,t=pelicanWeatherInfo.querySelector("li:nth-of-type(2)"),n=t.querySelector("span:nth-of-type(1)").textContent;"Clear"===n?e="wi wi-day-sunny":"Rain"===n?e="wi wi-day-rain":"Clouds"===n?e="wi wi-day-cloudy":"Thunderstorm"===n?e="wi wi-day-lightning":"Haze"===n&&(e="wi wi-day-haze");pelicanWeather.querySelector("i").setAttribute("class",e)}function menuTog(){var e=document.querySelector(".header-wrapper"),t=menuButton.querySelectorAll("span");this.classList.toggle("active-menu-button"),e.classList.toggle("active-menu");for(var n=0;n<t.length;n++)t[n].classList.toggle("active-span")}var pelicanWeather=document.querySelector(".pelican-weather"),pelicanWeatherInfo=document.querySelector(".pelican-weather-info"),menuButton=document.querySelector(".header-menu-button"),pathName=window.location.pathname;menuButton.addEventListener("click",menuTog),"/"!==pathName&&"/?search"!=pathName.substr(0,8)||(changeDegree(),acquireDate(),weatherIcon());