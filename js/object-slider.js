const objectSlider = document.querySelector('#object-slider');
const objectsSide = objectSlider.querySelector('.objects-side');
const arrowLeft = objectSlider.querySelector('.arrow-left');
const arrowRight = objectSlider.querySelector('.arrow-right');
const sliderContainer = objectSlider.querySelector('.objects-container')
const objectSlide = objectSlider.querySelector('.object');


const sliderContainerWidth = objectsSide.offsetWidth;
const allSlidesContainerWidth = sliderContainer.offsetWidth;
const objectWidth = objectSlide.offsetWidth;

const objectSlides = objectSlider.querySelectorAll('.object');
const gapWidth = objectSlides[1].offsetLeft - objectWidth;

const widthOfTransition = objectWidth + gapWidth;

const deffrentOfWidth = allSlidesContainerWidth - sliderContainerWidth;


let firstClone = [];
let lastClone = [];



objectSlides.forEach((element,i) => {
  
  firstClone[i] = element.cloneNode(true);
  lastClone[objectSlides.length - i - 1] = objectSlides[objectSlides.length - i - 1].cloneNode(true);

  firstClone[i].id = `first-clone-${i}`;
  lastClone[objectSlides.length - i - 1].id = `last-clone-${objectSlides.length - i - 1}`;

  sliderContainer.append(firstClone[i]);
  sliderContainer.prepend(lastClone[objectSlides.length - i - 1]);

});

sliderContainer.style.left = `-${allSlidesContainerWidth + gapWidth/2}px`;

let index = 0;
let showIndex = 1;

arrowRight.addEventListener('click', ()=>{
  if(allSlidesContainerWidth < widthOfTransition*index) return;
  sliderContainer.style.transition = '.5s';
  index++;
  sliderContainer.style.transform = `translate(-${widthOfTransition*index}px, -50%)`;
})

arrowLeft.addEventListener('click', ()=>{
  if(allSlidesContainerWidth < Math.abs(widthOfTransition*index)) return;
  sliderContainer.style.transition = '.5s';
  index--;
  if(index<0){
    sliderContainer.style.transform = `translate(${Math.abs(widthOfTransition*index)}px, -50%)`;
  }else{
    sliderContainer.style.transform = `translate(-${widthOfTransition*index}px, -50%)`;
  }
})



sliderContainer.addEventListener('transitionend' , ()=>{
  if(allSlidesContainerWidth < Math.abs(widthOfTransition*index)){
    sliderContainer.style.transition = 'none';
    index = 0;
    sliderContainer.style.transform = `translate(${widthOfTransition*index}px, -50%)`;
  }

  // if(widthOfTransition*index <= 0){
  //   sliderContainer.style.transition = 'none';
  //   index = 1;
  //   sliderContainer.style.transform = `translate(${widthOfTransition*index}px, -50%)`;
  //   console.log('hi');
  // }
})