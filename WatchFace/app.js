import LocalStorage from "./shared/storage"

path = "../../../../../../local_storage_data.txt"
const localStorage = new LocalStorage(path)

// SENSORS
const time = hmSensor.createSensor(hmSensor.id.TIME)
const battery = hmSensor.createSensor(hmSensor.id.BATTERY)
const step = hmSensor.createSensor(hmSensor.id.STEP)
const calorie = hmSensor.createSensor(hmSensor.id.CALORIE)
const distance = hmSensor.createSensor(hmSensor.id.DISTANCE)
const stand = hmSensor.createSensor(hmSensor.id.STAND)
const weather = hmSensor.createSensor(hmSensor.id.WEATHER)
const thermometer = hmSensor.createSensor(hmSensor.id.BODY_TEMP) // Simulator can not handle it. Works on watch

const heart = hmSensor.createSensor(hmSensor.id.HEART)
const spo2 = hmSensor.createSensor(hmSensor.id.SPO2)
const stress = hmSensor.createSensor(hmSensor.id.STRESS)
const sleep = hmSensor.createSensor(hmSensor.id.SLEEP)
const wear = hmSensor.createSensor(hmSensor.id.WEAR)

// Structure of all the sensor data
data = {
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

const interval = 300_000

App({
  globalData: {},
  onCreate(options) {
    console.log('Watch face app starting')

    // Check if storage file exists
    const [fs_stat, err] = hmFS.stat(path)
    if(err !== 0)
      localStorage.set(data)

    // Read data
    data = localStorage.get()    

    // Always available sensor values    
    const loop = timer.createTimer(
      500,
      interval,
      function () {            

        if (data.time.length === 0 || (time.utc - (interval - 20_000) ) > data.time[data.time.length - 1]) {
          // Basic sensors
          data.time.push(time.utc)
          data.battery.push(battery.current)
          data.step.push(step.current)
          data.calorie.push(calorie.current)
          data.distance.push(distance.current)
          data.stand.push(stand.current)        
          data.city.push(weather.getForecastWeather().cityName)
          data.thermometer.push(thermometer.current)      
          
          // Sleep
          const date = time.year+"-"+time.month+"-"+time.day

          if (data.sleep.date.length === 0 || date !== data.sleep.date[data.sleep.date.length - 1]) {

            const sleepStageArray = sleep.getSleepStageData()
            const modelData = sleep.getSleepStageModel()
            const basicInfo = sleep.getBasicInfo()

            wake = 0
            rem = 0
            light = 0
            deep = 0
            for (i = 0; i < sleepStageArray.length; i++) {
              const _data = sleepStageArray[i]          

              switch(_data.model){
                case modelData.WAKE_STAGE:
                  wake += _data.stop - _data.start
                  break
                case modelData.REM_STAGE:
                    rem += _data.stop - _data.start
                    break
                case modelData.LIGHT_STAGE:
                    light += _data.stop - _data.start
                    break
                case modelData.DEEP_STAGE:
                    deep += _data.stop - _data.start
                    break
                default:
                  break
              }                
            }       
            
            data.sleep.date.push(date)
            data.sleep.start.push(basicInfo.startTime)
            data.sleep.end.push(basicInfo.endTime)
            data.sleep.score.push(basicInfo.score)
            data.sleep.wake.push(wake)
            data.sleep.rem.push(rem)
            data.sleep.light.push(light)
            data.sleep.deep.push(deep)
          }            


          // Log full data structure
          // for (const key in data)
          //   console.log(key+"---> "+data[key])

          // Log single data
          //console.log("---->("+data.time.length+")"+data.time)

          // Save data
          localStorage.set(data)
                    
          console.log("DATA SAVED")
        } else
          console.log("Not enough time passed")
      },{}      
    )

    // Event based sensor values
    heart.addEventListener(heart.event.CURRENT, function(){      
      data.events.heart.time.push(time.utc)
      data.events.heart.value.push(heart.current)    
    })

    spo2.addEventListener(hmSensor.event.CHANGE, function(){      
      data.events.spo2.time.push(time.utc)
      data.events.spo2.value.push(spo2.current)    
    })

    stress.addEventListener(hmSensor.event.CHANGE, function(){      
      data.events.stress.time.push(time.utc)
      data.events.stress.value.push(stress.current)    
    })

    wear.addEventListener(hmSensor.event.CHANGE, function () {      
      data.events.wear.time.push(time.utc)
      data.events.wear.value.push(wear.current)    
    })

  },

  onDestroy(options) {
    console.log('Watch face app destroyed')
  }
})