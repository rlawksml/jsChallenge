import $ from './dom.js';
import Store from './Store.js';

const $time = $('.clock');
const $loginBtn = $('.loginBtn');
const $signupBtn = $('#signupBtn');
const $itemAddButton = $('#itemAddButton');
const $todoList = $('.todoList');
const $changeImgBtn = $('#changeImgBtn');
const $container = $('body');

let $weather = $('#weather');
let $name = $('#name');

const dates = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const API_KEY = 'e6dfac5e5c1bac344ff280c1824d8b01';

function onGeoOk(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      $name.innerText = '위치' + data.name;
      $weather.innerText = '날씨' + data.weather[0].main;
    });
}

function onGeoError() {
  alert('위치 정보가 없음');
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

let user = [];

const App = () => {
  let login = false;
  let curuser = '';
  let curindex = 0;
  const $id = $('#id');
  const $pw = $('#pw');
  const $loginForm = $('#loginForm');

  if (Store.load('user') != false) {
    user = Store.load('user');
    console.log(user[curindex].todo);
  }

  const changeBackImg = () => {
    const randomNumber = Math.floor(Math.random() * 5);
    $container.style.backgroundImage = `url(./src/img/${randomNumber}.jpg)`;
  };

  $changeImgBtn.addEventListener('click', changeBackImg);
  const $todoItem_delete = $('#todoItem_delete');
  const $todoTxt = $('#todoTxt');

  const todoItemDelete = (e) => {
    e.target.closest('li').remove();

    user.map((user) => {
      if (user.id === curuser[curindex].id) {
        return (user.todo = String($todoList.innerHTML));
      }
    });

    Store.save('user', user);
  };

  const todoItemAdd = (e) => {
    e.preventDefault();
    const newTodo = $todoTxt.value;

    const template = `<li id="todoItem" class="todoItem">
        <span id="todoItemText" class="">${newTodo}</span>
        <button id="todoItem_delete" class="todoItem_delete">삭제</button>
        </li>`;

    $todoList.innerHTML += template;
    user.map((user) => {
      if (user.id === curuser[curindex].id) {
        return (user.todo = String($todoList.innerHTML));
      }
    });

    Store.save('user', user);
    $todoTxt.value = '';
  };

  setInterval(() => {
    const date = new Date();
    const nowDay = date.getDate();
    const nowYear = date.getFullYear();
    const nowMonth = date.getMonth() + 1;
    const nowDate = date.getDay();
    const nowHour = date.getHours();
    const nowMin = date.getMinutes();

    $time.querySelector('.clockYear').innerText = `${nowYear}년 `;
    $time.querySelector('.clockMonth').innerText = `${nowMonth}월 `;
    $time.querySelector('.clockday').innerText = `${nowDay}일 `;
    $time.querySelector('.clockTime').innerText = `${nowHour}시 ${nowMin}분`;
    $time.querySelector('.clockDate').innerText = `${dates[nowDate]}`;
  }, 1000);

  const handleSignIn = (e) => {
    e.preventDefault();
    if ($id.value != '' && $pw.value != '') {
      user.push({ id: $id.value, pw: $pw.value, todo: '' });
    }

    Store.save('user', user);
    $id.value = '';
    $pw.value = '';
  };

  const handleLogin = (e) => {
    e.preventDefault();
    user = Store.load('user');

    curuser = user.filter((user, index) => {
      if (user.id === $id.value) {
        if (user.pw === $pw.value) {
          // 로그인 성공
          login = !login;

          $id.style.display = 'none';
          $pw.style.display = 'none';
          $loginBtn.style.display = 'none';
          document.querySelector('.logout').style.display = 'inline-block';
          curindex = index;

          user.login = login;
          return user;
        } else {
          console.log('비밀번호 틀림');
        }
      }
      Store.save('user', user);
    });
  };

  const logout = (e) => {
    $id.style.display = 'flex';
    $pw.style.display = 'flex';
    $loginBtn.style.display = 'flex';
    document.querySelector('.logout').style.display = 'none';

    login = !login;
    user.map((user) => {
      if (user.id === curuser.id) {
        user[curindex].login = login;
      }
    });
  };

  document.querySelector('.logout').addEventListener('click', logout);

  $todoItem_delete.addEventListener('click', todoItemDelete);
  $itemAddButton.addEventListener('click', todoItemAdd);
  $loginBtn.addEventListener('click', handleLogin);
  $signupBtn.addEventListener('click', handleSignIn);
};

App();
