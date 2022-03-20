import $ from './dom.js';

let $weather = $('#weather');
let $name = $('#name');

const dates = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const API_KEY = 'e6dfac5e5c1bac344ff280c1824d8b01';

const weather = {
  onGeoOk(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        $name.innerText = '현재 위치는 ' + data.name;
        $weather.innerText = '날씨는 ' + data.weather[0].main;
      });
  },
  onGeoError() {
    alert('위치 정보가 없음');
  },
};
navigator.geolocation.getCurrentPosition(weather.onGeoOk, weather.onGeoError);

export default weather;
