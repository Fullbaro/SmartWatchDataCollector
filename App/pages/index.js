import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from "../utils/config/constants";
import { DEVICE_WIDTH } from "../utils/config/device";
import LocalStorage from '../shared/storage'

const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;

path = '../../../../../../../local_storage_data.txt'
const localStorage = new LocalStorage(path)

data_template = {
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

Page({
  state: {},
  build() {
    // Display state
    text_widget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(56),
      y: px(74),
      w: DEVICE_WIDTH - 2 * px(56),
      h: px(200),
      color: 0xffffff,
      text_size: px(36),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "SENDING DATA...",
    });

    // Read data from storage file
    data = localStorage.get()

    // Send data to server
    this.fetchData(data);  

    console.log("App build done")
  },

  fetchData(param) {
    messageBuilder
      .request({
        method: "POST_DATA",
        data: param
      })
      .then((data) => {
        logger.log("receive data");
        const { result = {} } = data;
        //const text = JSON.stringify(result);

        // Clear values from storage        
        if(result === "OK"){
          localStorage.set(data_template)

          text_widget.setProperty(hmUI.prop.MORE, {
            text: "SENT",
          })
        }else{
          text_widget.setProperty(hmUI.prop.MORE, {
            text: "ERROR",
          })
        }

        
      });
  },
});
