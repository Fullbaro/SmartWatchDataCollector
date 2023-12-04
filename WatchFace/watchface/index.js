WatchFace({

  onInit() {
    console.log('index page.js on init invoke')
  },

  build() {
    console.log('index page.js on build invoke')

    const bg = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'bg.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    })

    const comma = hmUI.createWidget(hmUI.widget.IMG, {
      x: 200,
      y: 165,
      src: 'comma.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    })

    clock_widget = hmUI.createWidget(hmUI.widget.IMG_TIME, {
      hour_startX: 50,
      hour_startY: 180,
      hour_array: ["0_b.png","1_b.png","2_b.png","3_b.png","4_b.png","5_b.png","6_b.png","7_b.png","8_b.png","9_b.png"],
      hour_zero: 1,
      hour_space: 0,
      hour_angle: 0,
      hour_align: hmUI.align.CENTER,

      minute_startX: 265,
      minute_startY: 180,
      minute_array: ["0_b.png","1_b.png","2_b.png","3_b.png","4_b.png","5_b.png","6_b.png","7_b.png","8_b.png","9_b.png"],
      minute_zero: 1,
      minute_space: 0,
      minute_angle: 0,
      minute_follow: 0,      
      minute_align: hmUI.align.CENTER,

      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    battery_widget = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: 55,
      y: 370,
      w: 180,
      font_array: ["0_s.png","1_s.png","2_s.png","3_s.png","4_s.png","5_s.png","6_s.png","7_s.png","8_s.png","9_s.png"],        
      unit_en: 'percent.png',
      align_h: hmUI.align.CENTER_H,
      type: hmUI.data_type.BATTERY,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    date_week_widget = hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x: 240,
      y: 110,
      w: 123,
      week_en: ["Mon.png","Tue.png","Wed.png","Thu.png","Fri.png","Sat.png", "Sun.png"],      
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    date_day_widget =  hmUI.createWidget(hmUI.widget.IMG_DATE, {
      day_startX: 370,
      day_startY: 110,            
      day_en_array: ["0_s.png","1_s.png","2_s.png","3_s.png","4_s.png","5_s.png","6_s.png","7_s.png","8_s.png","9_s.png"],
      day_zero: 1,            
      day_align: hmUI.align.LEFT,      
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  
    temperature_current_widget = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: 55,
      y: 110,
      w: 180,
      font_array: ["0_s.png","1_s.png","2_s.png","3_s.png","4_s.png","5_s.png","6_s.png","7_s.png","8_s.png","9_s.png"],      
      unit_en: 'celsius.png',
      negative_image: 'minus.png',
      align_h: hmUI.align.CENTER_H,
      type: hmUI.data_type.WEATHER_CURRENT,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    step_current_widget = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: 255,
      y: 370,
      w: 180,
      font_array: ["0_s.png","1_s.png","2_s.png","3_s.png","4_s.png","5_s.png","6_s.png","7_s.png","8_s.png","9_s.png"],
      padding: false,
      h_space: 0,
      align_h: hmUI.align.CENTER_H,
      type: hmUI.data_type.STEP,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

  }, 

  onDestroy() {
    console.log('index page.js on destroy invoke')
  },
})
