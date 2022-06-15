function TimerCountdown(setting) {

  // for use or Not of New keyword
  if (!(this instanceof TimerCountdown)) {
    return new TimerCountdown(setting);
  }

  this.setSetting = {
    timeItemsList: {
      mounth:{
        name: 'mounth',
        unity: 60*60*24*7*4.357,
        label: 'Mounth',
        seprator: ':',
        color: 'main-color',
      },
      week:{
        name: 'week',
        unity: 60*60*24*7,
        label: 'Week',
        seprator: ':',
        color: 'main-color',
      },
      day:{
        name: 'day',
        unity: 60*60*24,
        label: 'Day',
        seprator: ':',
        color: 'main-color',
      },
      hour:{
        name: 'hour',
        unity: 60*60,
        label: 'Hour',
        seprator: ':',
        color: 'main-color',
      },
      min:{
        name: 'min',
        unity: 60 ,
        label: 'Min',
        seprator: ':',
        color: 'main-color',
      },
      sec:{
        name: 'sec',
        unity: 1,
        label: 'Sec',
        seprator: false,
        color: 'main-color',
      },
      
    },
    firstItem: "day",
    endItem: "sec",
    singleItem: false,
    remainingType: "particular",
    deadTime: "April 29, 2023 16:40:00",
    label: true,
    seprator: true,
    type: 'model-1',
    isDualChar: true,
    className: 'timer__countdown',
    color: 'main-color',
    isShowNumbers: true,
    isShowProgress: false,
  };

  this.setSetting = { ...this.setSetting, ...setting };

  this.id = this.setSetting.id;
  this.timeItemsList = this.setSetting.timeItemsList;
  this.timeItems = this.setSetting.timeItems;
  this.deadTime = this.setSetting.deadTime;
  this.firstItem = this.setSetting.firstItem;
  this.endItem = this.setSetting.endItem;
  this.singleItem = this.setSetting.singleItem;
  this.remainingType = this.setSetting.remainingType;
  this.label = this.setSetting.label;
  this.seprator = this.setSetting.seprator;
  this.type = this.setSetting.type;
  this.isDualChar = this.setSetting.isDualChar;
  this.className = this.setSetting.className;
  this.color = this.setSetting.color;
  this.isShowNumbers = this.setSetting.isShowNumbers;
  this.isShowProgress = this.setSetting.isShowProgress;


  this.mainContainer = document.querySelector(`#${this.id}`);
  
  this.runTimer();
  
}

TimerCountdown.prototype.changeToSingleMode = function () {

  if(this.singleItem){

    this.firstItem = this.singleItem;
    this.endItem = this.singleItem;

  }

}

TimerCountdown.prototype.customizeItemsList = function () {

  this.changeToSingleMode()

  let list = this.timeItemsList
  let keys = Object.keys(list);
  
  let firstItemIndex = keys.indexOf(this.firstItem);
  keys.splice(0, firstItemIndex);

  let endItemIndex = keys.indexOf(this.endItem); 
  keys.splice(endItemIndex + 1, keys.length);

  return keys;

}

TimerCountdown.prototype.updateDataOfCustomizeItemsList = function () {

  let list = this.customizeItemsList();
  let lastIndex = list.length - 1

  this.timeItemsList[list[lastIndex]].seprator = false
  
}

TimerCountdown.prototype.makeDualChar = function (count, isDualChar) {

  let dualChar = count;
  
  if(isDualChar){
    if(count<10){
      dualChar = '0' + count;
    }
  }
  
  return dualChar;
  
}

TimerCountdown.prototype.calcTimePerUnity = function (type, item ,time) {

  let calcTime;

  let list = this.timeItemsList
  let keys = Object.keys(list);
  let indexOfItem = keys.indexOf(item);
  
  if(type == 'particular'){

    calcTime = Math.floor(time%list[keys[indexOfItem-1]].unity/list[item].unity);
    
  } else if(type == 'full') {

    calcTime = Math.floor(time/list[item].unity);

  }

  return calcTime;

}

TimerCountdown.prototype.calcRemainingTime = function () {

  let distance = this.calcDistanceTime(); // calc distance time to Seconds
  let isDualChar = this.isDualChar

  let timeValues = {}
  let list = this.customizeItemsList();

  for (let i = 0; i < list.length; i++) {
    
    if(this.remainingType == 'particular' && i==0){

      timeValues[list[i]] = this.calcTimePerUnity('full', list[i], distance);
      // add if for first item of time that allow to make dualChar or Not!
      timeValues[list[i]] = this.makeDualChar(timeValues[list[i]], isDualChar);
      
    
    } else {
      
      timeValues[list[i]] = this.calcTimePerUnity(this.remainingType, list[i], distance);
      timeValues[list[i]] = this.makeDualChar(timeValues[list[i]], isDualChar);

    }

  } 
  
  return timeValues;

};

TimerCountdown.prototype.calcDistanceTime = function () {

  let nowTime = new Date().getTime(); // get a now Time Object
  let deadTime = new Date(this.deadTime).getTime(); // convert deatTime input to deadTime Time Object
  let distance = (deadTime - nowTime) / 1000; // calc distance time to Seconds

  return distance;

}

TimerCountdown.prototype.makeTimeItems = function () {

  let timeItemsList = this.timeItemsList
  let timeItems = {};
  let list = this.customizeItemsList();

  let timeValues = this.calcRemainingTime()

  for (let i = 0; i < list.length; i++) {
    timeItems[list[i]] = {
        value: timeValues[list[i]],
        label: timeItemsList[list[i]].label,
    };
  }

  return timeItems;

};

TimerCountdown.prototype.createItem = function (type) {

  let item = document.createElement('div');
  item.classList.add('item', type);
  
  let subItems = this.createSubItems(type);
  let keys = Object.keys(subItems)

  for(let i=0; i<keys.length; i++){
    item.appendChild(subItems[keys[i]]);
  }
  
  return item;

}

TimerCountdown.prototype.createSubItems = function (type) {

  let timeItems = this.timeItemsList;
  
  let value = document.createElement('div');
  let label = document.createElement('div');
  let seprator = document.createElement('div');

  value.classList.add('subItem', 'value');
  label.classList.add('subItem', 'label');
  seprator.classList.add('subItem', 'seprator');
  
  let subItems = {value:value, seprator:seprator, label:label}

  if(!this.label || !timeItems[type].label){
    delete subItems.label
  }

  if(!this.seprator || !timeItems[type].seprator){
    delete subItems.seprator
  }

  //Set Values for Sub Items; 
  let _this = this
  setInterval(function() {

    value.innerHTML = _this.calcRemainingTime()[type];
    
  }, 1000)
  
  label.innerHTML = timeItems[type].label;
  seprator.innerHTML = timeItems[type].seprator;

  return subItems;

}

TimerCountdown.prototype.createContainer = function (className) {

  let container = document.createElement('div');
  container.classList.add(className)
  
  return container
  
}

TimerCountdown.prototype.createNumCountTemplate = function () {

  let list = this.customizeItemsList();
  let type = this.type;

  let mainContainer = this.mainContainer;
  let subContainer = this.createContainer('num-count-container');
  subContainer = mainContainer.appendChild(subContainer);
  
  mainContainer.classList.add(this.className);
  subContainer.classList.add(type, this.color);
  
  if(type == 'model-1'){
    
    for(let i=0; i<list.length; i++){
      subContainer.appendChild(this.createItem(list[i]))
    }

  }
  else if(type == 'model-2'){

  }

}

TimerCountdown.prototype.createProgressTemplate = function () {

  let list = this.customizeItemsList();
  let type = this.type;

  let mainContainer = this.mainContainer;
  let subContainer = this.createContainer('num-count-container');
  subContainer = mainContainer.appendChild(subContainer);
  
  subContainer.classList.add(this.className, type, this.color);
  
  if(type == 'model-1'){
    
    for(let i=0; i<list.length; i++){
      subContainer.appendChild(this.createItem(list[i]))
    }

  }
  else if(type == 'model-2'){

  }

}

TimerCountdown.prototype.createTemplate = function () {

  if(this.isShowNumbers){
    this.createNumCountTemplate();
  }

  if(this.isShowProgress){
    this.createProgressTemplate();
  }

}


TimerCountdown.prototype.runTimer = function () {

  this.updateDataOfCustomizeItemsList();

  if(this.calcDistanceTime()>0){

    this.createTemplate();
    
  } else {

    console.log("this is End");

  }
  

};


