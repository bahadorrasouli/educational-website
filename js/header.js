const menuContainer = document.querySelector('.main-header .small-width');
const menuBox = menuContainer.querySelector('.menu-box');
const menuBurger = menuContainer.querySelector('.hamburger-menu');

menuBurger.addEventListener('click', ()=>{
  menuBox.classList.toggle('active');
  menuContainer.classList.toggle('active');
})

