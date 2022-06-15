const bodyArea = document.querySelector('body');
const mouseMovingArea = document.querySelector('.info-section');
const objectMovreContainer = document.querySelector('.object-mover');
const itemsMoverType1 = objectMovreContainer.querySelectorAll('.item.type1');
const itemsMoverType2 = objectMovreContainer.querySelectorAll('.item.type2');
const itemMoverTypeAuto = objectMovreContainer.querySelectorAll('.item.auto');

let x, y;
bodyArea.addEventListener('mousemove', (e)=>{
  mouseX = e.x
  mouseY = e.y

  itemsMoverType1.forEach((element,i) => {
    element.style.transform = `translate(${mouseX/50}px, -${mouseY/40}px)`;   
  });

  itemsMoverType2.forEach((element,i) => {
    element.style.transform = `translate(-${mouseX/50}px, ${mouseY/40}px)`;   
  });
  
})


// let cy = [];
// let cx = [];
// let xx = [];
// let yy = [];

// let radius = 10;
// let angle =0;

// let type;
// let dirMove;

// itemMoverTypeAuto.forEach((element,i) => {
//     cy[i] = element.offsetTop;
//     cx[i] = element.offsetLeft;
//     // console.log(cy, cx);
// });

// setInterval(function() {

//   itemMoverTypeAuto.forEach((element,i) => {
//     type = element.getAttribute('type');
//     dirMove = element.getAttribute('dirMove');
//     radius = element.getAttribute('radius');
//     speed = element.getAttribute('speed');

//     if(type == 1 || type == 3){
//       xx[i] = cx[i] - radius * Math.cos(angle * Math.PI / 180);
//     } else {
//       xx[i] = cx[i] + radius * Math.cos(angle * Math.PI / 180);
//     }

//     if(type == 2 || type == 3){
//       yy[i] = cy[i] + radius * Math.sin(angle * Math.PI / 180);
//     } else {
//       yy[i] = cy[i] - radius * Math.sin(angle * Math.PI / 180);
//     }
    
//     if(dirMove == 'x'){
//       element.style.left = `${xx[i]}px`;
      
//     } else if(dirMove == 'y'){
//       element.style.top = `${yy[i]}px`;
      
//     } else {
//       element.style.top = `${yy[i]}px`;
//       element.style.left = `${xx[i]}px`;

//     }
    
//     angle += .3;
  
//   });


// }, 1)

