const blogSlider = document.querySelector(".blog-slider .slider-side");
const controller = blogSlider.querySelector(".controller");
const blogMainSlide = blogSlider.querySelector(".main-slide");
const blogSlides = Array.from(blogMainSlide.querySelectorAll(".slide"));

const controllerListItem = controller.querySelector(".list");
const controllerItems = Array.from(controller.querySelectorAll(".item"));



let activeControllerItem, activeBlogSlide;

controllerItems.forEach((element,i) => {
  
  element.addEventListener('click', ()=>{
    activeControllerItem = controller.querySelector(".item.active");
    activeControllerItem.classList.remove('active');
    element.classList.add('active');

    activeBlogSlide = blogMainSlide.querySelector(".slide.active");
    activeBlogSlide.classList.remove('active');
    blogSlides[i].classList.add('active');
  })
});

let blogSliderInterval;

let runBlogSlider = ()=>{
  blogSliderInterval = setInterval(()=>{
    let activeIndex = blogSlides.findIndex((item) =>
      item.classList.contains("active")
    );

    let i = activeIndex;

    if(i == controllerItems.length - 1){
      i = -1;
    }

    activeControllerItem = controller.querySelector(".item.active");
    activeControllerItem.classList.remove('active');
    controllerItems[i+1].classList.add('active');

    activeBlogSlide = blogMainSlide.querySelector(".slide.active");
    activeBlogSlide.classList.remove('active');
    blogSlides[i+1].classList.add('active');

    i++;


  }, 4000)
}

blogSlider.addEventListener("mouseenter", () => {
  clearInterval(blogSliderInterval);
});

blogSlider.addEventListener("mouseleave",  runBlogSlider);

runBlogSlider();
