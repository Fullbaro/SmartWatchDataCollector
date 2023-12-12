import LocalStorage from "./shared/storage"
import { INTERVAL, STORAGES } from './utils/config/constants'

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

App({
  globalData: {
    storages: {}
  },
  onCreate(options) {
    console.log('Watch face app starting')

    // Setup sensor data storage files
    for(const element of STORAGES)
      this.globalData.storages[element] = new LocalStorage("../../../../../../../"+element+"_storage.txt")

    // !TEMP! Clear files
    // for (const element of STORAGES)
    //   this.globalData.storages[element].set("")

    // Always available sensor values    
    const loop = timer.createTimer(
      500,
      INTERVAL,
      function (options) {            

        let length = options.self.globalData.storages.basic.length() 
        let lastElement = options.self.globalData.storages.basic.get(length-1, length)        
        
        if (length === 0 || (time.utc - (INTERVAL - 20_000) ) > lastElement.split(';')[0]) {

          // Basic sensors
          const weatherData = weather.getForecastWeather()
          const { forecastData, tideData } = weatherData

          options.self.globalData.storages.basic.append(
            `${time.utc};${battery.current};${step.current};${calorie.current};${distance.current};${stand.current};${weatherData.cityName};${thermometer.current};${forecastData.data[0].index};${forecastData.data[0].low};${forecastData.data[0].high}`
          );
          
          // Sleep
          const date = time.year+"-"+time.month+"-"+time.day
          let length = options.self.globalData.storages.sleep.length() 
          let lastElement = options.self.globalData.storages.sleep.get(length-1, length)
          
          if (length === 0 || date !== lastElement.split(';')[0]) {

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

            options.self.globalData.storages.sleep.append(
              `${date};${basicInfo.startTime};${basicInfo.endTime};${basicInfo.score};${wake};${rem};${light};${deep}`
            );
            
          }
                    
          console.log("DATA SAVED")
        } else
          console.log("Not enough time passed")
      },{self: this}      
    )

    // Event based sensor values
    heart.addEventListener(heart.event.CURRENT, () => {            
      this.globalData.storages.heart.append(
          `${time.utc};${heart.current}`
      );
    });

    spo2.addEventListener(hmSensor.event.CHANGE, () => {      
      this.globalData.storages.spo2.append(
        `${time.utc};${spo2.current}`
      );
    })

    stress.addEventListener(hmSensor.event.CHANGE, () => {      
      this.globalData.storages.stress.append(
        `${time.utc};${stress.current}`
      );  
    })

    wear.addEventListener(hmSensor.event.CHANGE, () => {      
      this.globalData.storages.wear.append(
        `${time.utc};${wear.current}`
      );
    })

  },

  onDestroy(options) {
    console.log('Watch face app destroyed')
  }
})