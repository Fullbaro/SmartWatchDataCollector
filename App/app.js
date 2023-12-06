import "./shared/device-polyfill";
import { MessageBuilder } from "./shared/message";
import LocalStorage from './shared/storage'

App({
  globalData: {
    messageBuilder: null,
    localStorage: new LocalStorage("../../../../../../../local_storage_data.txt"),
    data_template: {
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
  },
  onCreate(options) {
    console.log("app on create invoke");
    let appId;
    if (!hmApp.packageInfo) {      
      throw new Error('Set appId,  appId needs to be the same as the configuration in app.json');
    } else {
      appId = hmApp.packageInfo().appId;
    }
    this.globalData.messageBuilder = new MessageBuilder({
      appId,
    });
    this.globalData.messageBuilder.connect();
  },

  onDestroy(options) {
    console.log("app on destroy invoke");
    this.globalData.messageBuilder.disConnect();
  },
});
