import LocalStorage from '../shared/storage'

const { messageBuilder } = getApp()._options.globalData;

path = '../../../../../../../local_storage_data.txt'
const localStorage = new LocalStorage(path)

const data_template = {
  time: [],
  battery: [],
  step: [],
  calorie: [],  
  distance: [],
  stand: [],
  city: [],  
  thermometer: [],
  sleep: {
    date: [],
    start: [],
    end: [],
    score: [],
    wake: [],
    rem: [],
    light: [],
    deep: []
  },
  events: {
    heart: {
      time: [],
      value: []
    },
    spo2: {
      time: [],
      value: []
    },
    stress: {
      time: [],
      value: []
    },
    wear: {
      time: [],
      value: []
    }
  }
}

function getChunk(data, from, to){  
      
  tmp = {
    time: data.time.slice(from, to),
    battery: data.battery.slice(from, to),
    step: data.step.slice(from, to),
    calorie: data.calorie.slice(from, to),  
    distance: data.distance.slice(from, to),
    stand: data.stand.slice(from, to),
    city: data.city.slice(from, to),  
    thermometer: data.thermometer.slice(from, to),
    sleep: {
      date: data.sleep.date.slice(from, to),
      start: data.sleep.start.slice(from, to),
      end: data.sleep.end.slice(from, to),
      score: data.sleep.score.slice(from, to),
      wake: data.sleep.wake.slice(from, to),
      rem: data.sleep.rem.slice(from, to),
      light: data.sleep.light.slice(from, to),
      deep: data.sleep.deep.slice(from, to)
    },
    events: {
      heart: {
        time: data.events.heart.time.slice(from, to),
        value: data.events.heart.value.slice(from, to)
      },
      spo2: {
        time: data.events.spo2.time.slice(from, to),
        value: data.events.spo2.value.slice(from, to)
      },
      stress: {
        time: data.events.stress.time.slice(from, to),
        value: data.events.stress.value.slice(from, to)
      },
      wear: {
        time: data.events.wear.time.slice(from, to),
        value: data.events.wear.value.slice(from, to)
      }
    }
  }

  return tmp
}

function getMaxLength(obj) {
  let maxLength = 0;
  let maxList = null;

  const stack = [{ obj, depth: 0 }];

  while (stack.length > 0) {
    const { obj, depth } = stack.pop();

    for (const key in obj) {      
      if (Array.isArray(obj[key])) {              
        if (obj[key].length > maxLength) {
          maxLength = obj[key].length;
          maxList = obj[key];
        }
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {        
        stack.push({ obj: obj[key], depth: depth + 1 });
      }
    }
  }

  return maxLength;
}

function fetcher(param, max, i, chunkSize){
  console.log("SENDING...("+(i+1)+"/"+max+")")
  text_widget.setProperty(hmUI.prop.MORE, {
    text: "SENDING...("+(i+1)+"/"+max+")",
  })

  messageBuilder
    .request({      
      data: getChunk(param, (i*chunkSize), ((i*chunkSize)+ chunkSize))
    })
    .then((data) => {
      console.log("receive data");
      const { result = {} } = data;
      //const text = JSON.stringify(result);      

      if(result === "OK"){
        if(i < max-1){
          fetcher(param, max, i+1, chunkSize)
        }else{
          // Clear storage
          localStorage.set(data_template)          

          text_widget.setProperty(hmUI.prop.MORE, {
            text: "DONE",
          })  
        }
      }else{
        text_widget.setProperty(hmUI.prop.MORE, {
          text: "ERROR",
        })
      }
    });
}

Page({
  state: {},
  build() {
    console.log("App build begin")  

    text_widget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(56),
      y: px(74),
      w: 480 - 2 * px(56),
      h: px(200),
      color: 0xffffff,
      text_size: px(36),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "",
    });

    // Read data from storage file
    data = localStorage.get()
    
    const chunkSize = 500
    const max = Math.ceil(getMaxLength(data) / chunkSize)    
    if(max > 0)
      fetcher(data, max, 0, chunkSize)    
    else
      text_widget.setProperty(hmUI.prop.MORE, {
        text: "Nothing to send",
      })
  }
});
