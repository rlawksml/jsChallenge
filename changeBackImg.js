import $ from './dom.js';

const $container = $('body');

const changeBackImg = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  $container.style.backgroundImage = `url(./src/img/${randomNumber}.jpg)`;
};

export default changeBackImg;
