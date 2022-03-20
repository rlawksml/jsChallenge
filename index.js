import $ from './dom.js';
import Store from './Store.js';
import changeBackImg from './changeBackImg.js';
import weather from './weather.js';
import clock from './clock.js';

function App() {
  const $loginBtn = $('.loginBtn');
  const $signupBtn = $('#signupBtn');
  const $itemAddButton = $('#itemAddButton');
  const $todoList = $('.todoList');
  const $changeImgBtn = $('#changeImgBtn');

  const $todoItem_delete = $('#todoItem_delete');
  const $todoTxt = $('#todoTxt');

  const $id = $('#id');
  const $pw = $('#pw');
  const $loginForm = $('#loginForm');

  this.currentUser = '';
  this.userList = [];
  this.user = {};
  let login = false;

  this.init = () => {
    clock();
    if (Store.load('user') && Store.load('userList')) {
      this.user = Store.load('user');
      this.userList = Store.load('userList');
      this.currentUser = Store.load('stateLogin');
    }

    if (this.currentUser != '') {
      if (this.user[this.currentUser].login) {
        $id.style.display = 'none';
        $pw.style.display = 'none';
        $loginBtn.style.display = 'none';
        document.querySelector('.logout').style.display = 'inline-block';
        renderItem(this.user[this.currentUser]);
      }
    }
  };

  const renderItem = (data) => {
    const template = data['todo']
      .map((item) => {
        return `<li id="todoItem" class="todoItem">
      <span id="todoItemText" class="">${item}</span>
      <button id="todoItem_delete" class="todoItem_delete">삭제</button>
      </li>`;
      })
      .join('');

    $todoList.innerHTML = template;

    $todoTxt.value = '';
  };

  const todoItemAdd = (e) => {
    e.preventDefault();
    const newTodo = $todoTxt.value;
    if (login) {
      this.user[this.currentUser]['todo'].push(newTodo);

      Store.save('user', this.user);
      renderItem(this.user[this.currentUser]);
    } else {
      alert('로그인을 먼저 해주세요');
    }
  };

  const todoItemDelete = (e) => {
    const $target = e.target.closest('li');
    $target.remove();
    this.user[this.currentUser].todo = this.user[this.currentUser].todo.filter((item) => {
      return $target.querySelector('span').innerText !== item;
    });

    Store.save('user', this.user);
    renderItem(this.user[this.currentUser]);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if ($id.value != '' && $pw.value != '') {
      if (!this.currentUser.includes($id.value)) {
        this.currentUser = $id.value;
        this.user[this.currentUser] = {
          id: $id.value,
          pw: $pw.value,
          todo: [],
          login: false,
        };
        this.userList.push(this.currentUser);

        Store.save('user', this.user);
        Store.save('userList', this.userList);
        Store.load('user');
        Store.load('userList');
      }
    }

    alert(`가입을 축하드립니다. ${this.currentUser}님`);
    $id.value = '';
    $pw.value = '';
  };

  const handleLogin = (e) => {
    e.preventDefault();

    this.currentUser = $id.value;
    this.user[this.currentUser].login = true;

    const tringLoginId = this.userList.filter((user) => {
      return user === $id.value;
    });

    if (this.user[tringLoginId].pw === $pw.value) {
      this.user[tringLoginId].login = true;
      this.currentUser = tringLoginId;

      login = !login;
      $id.style.display = 'none';
      $pw.style.display = 'none';
      $loginBtn.style.display = 'none';
      document.querySelector('.logout').style.display = 'inline-block';

      alert(`반갑습니다. ${this.currentUser}님`);

      renderItem(this.user[this.userList]);

      $('.desc').style.display = 'none';
      Store.save('user', this.user);
      Store.save('stateLogin', this.currentUser);
    }
  };

  const logout = (e) => {
    $id.style.display = 'flex';
    $pw.style.display = 'flex';
    $loginBtn.style.display = 'flex';
    document.querySelector('.logout').style.display = 'none';

    login = !login;
    this.user[this.currentUser].login = false;
    Store.save('user', this.user);
    alert(`로그아웃 됩니다. ${this.currentUser}님`);
    this.currentUser = '';
    Store.save('stateLogin', this.currentUser);

    $('.desc').style.display = 'flex';
  };

  // 이미지 변경
  $changeImgBtn.addEventListener('click', changeBackImg);

  // 로그인 관련
  // 로그아웃
  document.querySelector('.logout').addEventListener('click', logout);
  // 로그인
  $loginBtn.addEventListener('click', handleLogin);
  // 가입
  $signupBtn.addEventListener('click', handleSignIn);
  // 로그인 관련

  // 할일 목록
  // 삭제
  $todoItem_delete.addEventListener('click', todoItemDelete);
  // 추가
  $itemAddButton.addEventListener('click', todoItemAdd);
  // 할일 목록
}

const app = new App();
app.init();
