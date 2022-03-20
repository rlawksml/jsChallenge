import $ from './dom.js';

const clock = () => {
  const $time = $('.clock');

  setInterval(() => {
    const date = new Date();
    const nowDay = date.getDate();
    const nowYear = date.getFullYear();
    const nowMonth = date.getMonth() + 1;
    const nowHour = date.getHours();
    const nowMin = date.getMinutes();

    $time.querySelector('.clockYear').innerText = `${nowYear}년 `;
    $time.querySelector('.clockMonth').innerText = `${nowMonth}월 `;
    $time.querySelector('.clockday').innerText = `${nowDay}일 `;
    $time.querySelector('.clockTime').innerText = `${nowHour}시 ${nowMin}분`;
  }, 1000);
};

export default clock;
