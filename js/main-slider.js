const slider = document.querySelector("#main-slider");

const itemsContainer = slider.querySelector(".option-box");
const items = Array.from(slider.querySelectorAll(".item"));

const mainSlidesContainer = slider.querySelector(".slide-side");
const mainSlides = slider.querySelectorAll(".slide");
// console.log(mainSlidesContainer);
let timeStop = 5000;

let lastItemIndex = items.length - 1;

let stopSlider = false;

let navSide = document.createElement('div');
navSide.classList.add('nav-side');
slider.appendChild(navSide);
const navSideQuery = slider.querySelector('.nav-side');


items.forEach((item, i) => {
  let nav = document.createElement('div');
  nav.classList.add('nav');
  if(i==0){
    nav.classList.add('active')
  }
  navSide.appendChild(nav);
});

const navQuery = Array.from(slider.querySelectorAll('.nav-side .nav'));


items.forEach((item, i) => {

  item.addEventListener("click", () => {
    let activeItem = itemsContainer.querySelector(".active");
    let activeMainSlide = mainSlidesContainer.querySelector(".active");
    let activeNav = navSideQuery.querySelector(".active");
    activeItem.classList.remove("active");
    activeMainSlide.classList.remove("active");
    activeNav.classList.remove("active");

    item.classList.add("active");
    mainSlides[i].classList.add("active");
    navQuery[i].classList.add("active");
  });

  navQuery[i].addEventListener("click", () => {
    let activeItem = itemsContainer.querySelector(".active");
    let activeMainSlide = mainSlidesContainer.querySelector(".active");
    let activeNav = navSideQuery.querySelector(".active");
    activeItem.classList.remove("active");
    activeMainSlide.classList.remove("active");
    activeNav.classList.remove("active");

    item.classList.add("active");
    mainSlides[i].classList.add("active");
    navQuery[i].classList.add("active");
  });
});

let interval;

let runSlider = () => {
  
  interval = setInterval(() => {
    let activeItemIndex = items.findIndex((item) =>
      item.classList.contains("active")
    );
    let addActiveIndex =
      activeItemIndex < lastItemIndex ? activeItemIndex + 1 : 0;

    let activeItem = itemsContainer.querySelector(".active");
    
    let activeMainSlide = mainSlidesContainer.querySelector(".active");
    let activeNav = navSide.querySelector(".active");

    activeItem.classList.remove("active");
    activeMainSlide.classList.remove("active");
    activeNav.classList.remove("active");

    items[addActiveIndex].classList.add("active");
    mainSlides[addActiveIndex].classList.add("active");
    navQuery[addActiveIndex].classList.add("active");
  }, timeStop);
};




slider.addEventListener("mouseenter", () => {
  
  clearInterval(interval);
});

slider.addEventListener("mouseleave",  runSlider);

runSlider();