import { fetcher } from '../shared/fetch'
const { messageBuilder, localStorage, data_template } = getApp()._options.globalData;

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
            
    fetcher(data_template, messageBuilder, text_widget, localStorage.get(), data, 0)    
    
  }
});
