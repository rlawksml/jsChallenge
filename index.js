import $ from './dom.js'
import Store from './Store.js'

const $time = $('.clock')
const $loginBtn = $('.loginBtn')
const $signupBtn = $('#signupBtn')
const $itemAddButton = $('#itemAddButton')
const $todoList = $('.todoList')
const $changeImgBtn = $('#changeImgBtn')
const $container = $('body')
let $weather = $('#weather')
let $name = $('#name')


const dates = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const API_KEY ='e6dfac5e5c1bac344ff280c1824d8b01'

function onGeoOk(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    fetch(URL).then(response => response.json()).then(data => {
        $name.innerText = data.name + "위치"
        $weather.innerText = data.weather[0].main + "날씨"
    })
}

function onGeoError(){
    alert('위치 정보가 없음')
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError)

let user = [{id : "genie" , pw: "0127", todo:`<li id="todoItem" class="todoItem">
<span id="todoItemText" class="">JS 챌린지</span>
<button id="todoItem_delete" class="todoItem_delete">삭제</button>
</li>`}]

if(Store.load()){
    user = Store.load()
}


const App = () => {

    const $id = $('#id')
    const $pw = $('#pw')
    const $loginForm = $('#loginForm')

    const changeBackImg = () => {
        const randomNumber =  Math.floor(Math.random()*5)
        console.log(randomNumber)
        $container.style.backgroundImage = `url(./src/img/${randomNumber}.jpg)`;
    }

    $changeImgBtn.addEventListener('click', changeBackImg)
    const $todoItem_delete = $('#todoItem_delete')
    const $todoTxt = $('#todoTxt')

    const todoItemDelete = (e) => {
        e.target.closest('li').remove()
    }

    const todoItemAdd = (e) => {
        e.preventDefault()
        const newTodo = $todoTxt.value

        const template = `<li id="todoItem" class="todoItem">
        <span id="todoItemText" class="">${newTodo}</span>
        <button id="todoItem_delete" class="todoItem_delete">삭제</button>
        </li>`

        $todoList.innerHTML += template
        Store.save('user', user)

        $todoTxt.value = ""
    }

    setInterval(() => {
        const date = new Date()
        const nowDay = (date.getDate())
        const nowYear = (date.getFullYear())
        const nowMonth = (date.getMonth()+1)
        const nowDate = (date.getDay())
        const nowHour = (date.getHours())
        const nowMin = (date.getMinutes())

        $time.querySelector('.clockYear').innerText = `${nowYear}년 `
        $time.querySelector('.clockMonth').innerText = `${nowMonth}월 `
        $time.querySelector('.clockday').innerText = `${nowDay}일 `
        $time.querySelector('.clockTime').innerText = `${nowHour}시 ${nowMin}분`
        $time.querySelector('.clockDate').innerText = `${dates[nowDate]}`
    }, 1000)

    
    const handleSignIn = (e) => {
        e.preventDefault();
        if ($id.value != "" && $pw.value != ""){
            user.push({id : $id.value , pw:$pw.value})
        }
        $id.value = "";
        $pw.value = ""
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if(
            $id.value === user.id && $pw.value === user.pw){
            console.log('로그인')
        }
    }

    $todoItem_delete.addEventListener('click', todoItemDelete)
    $itemAddButton.addEventListener('click', todoItemAdd)
    $loginBtn.addEventListener('click', handleLogin)
    $signupBtn.addEventListener('click', handleSignIn)
}

App()