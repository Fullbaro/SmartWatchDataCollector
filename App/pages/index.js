import { fetchAndSendChunks } from '../shared/fetch'
const { messageBuilder, storages } = getApp()._options.globalData;

const time = hmSensor.createSensor(hmSensor.id.TIME)
const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)

Page({
  state: {},
  build() {
    console.log("App build begin")

    text_widget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 0,
      w: 480,
      h: 480,
      color: 0xffffff,
      text_size: 80,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "LOADING...",
    });

    // Send data to server
    fetchAndSendChunks(storages, messageBuilder, text_widget);


    hmUI.setScrollView(true, px(480), 7, true)
    
    // PAGE #1  
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: px(480) * 1,
      w: px(480),
      h: px(480),
      color: 0x003049
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(140),      
      y: px(140) + px(480) * 1,
      w: 200,
      h: 200,
      normal_src: 'vape.png',
      press_src: 'vape_press.png',
      click_func: () => {
          console.log("VAPE BUTTON")
        
          storages.vape.append(time.utc)
          console.log(storages.vape.get(0, Infinity))

          vibrate.stop()
          vibrate.scene = 25
          vibrate.start()      
      }
    })

    // PAGE #2 
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: px(480) * 2,
      w: px(480),
      h: px(480),
      color: 0xd62828
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(85),      
      y: px(85) + px(480) * 2,
      w: 150,
      h: 150,
      normal_src: 'drink_1.png',
      press_src: 'drink_1_press.png',
      click_func: () => {
        console.log("Drink 1 BUTTON")

        storages.drink.append(`${time.utc};${1}`)
  
        vibrate.stop()
        vibrate.scene = 25
        vibrate.start()      
      }
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(250),      
      y: px(85) + px(480) * 2,
      w: 150,
      h: 150,
      normal_src: 'drink_2.png',
      press_src: 'drink_2_press.png',
      click_func: () => {
        console.log("Drink 2 BUTTON")

        storages.drink.append(`${time.utc};${3}`)     

        vibrate.stop()
        vibrate.scene = 25
        vibrate.start()         
      }
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(85),      
      y: px(250) + px(480) * 2,
      w: 150,
      h: 150,
      normal_src: 'drink_3.png',
      press_src: 'drink_3_press.png',
      click_func: () => {
        console.log("Drink 3 BUTTON")

        storages.drink.append(`${time.utc};${5}`)    

        vibrate.stop()
        vibrate.scene = 25
        vibrate.start()          
      }
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(250),      
      y: px(250) + px(480) * 2,
      w: 150,
      h: 150,
      normal_src: 'drink_4.png',
      press_src: 'drink_4_press.png',
      click_func: () => {
        console.log("Drink 4 BUTTON")

        storages.drink.append(`${time.utc};${20}`)

        vibrate.stop()
        vibrate.scene = 25
        vibrate.start()
      }
    })


    // PAGE #3
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: px(480) * 3,
      w: px(480),
      h: px(480),
      color: 0xf77f00
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(85),      
      y: px(85) + px(480) * 3,
      w: 150,
      h: 150,
      normal_src: 'food_1.png',
      press_src: 'food_1_press.png',
      click_func: () => {
        console.log("food 1 BUTTON")
    
        storages.food.append(`${time.utc};${1}`)

        vibrate.stop()
        vibrate.scene = 25
        vibrate.start() 
      }
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(250),      
      y: px(85) + px(480) * 3,
      w: 150,
      h: 150,
      normal_src: 'food_2.png',
      press_src: 'food_2_press.png',
      click_func: () => {
        console.log("food 2 BUTTON")

        storages.food.append(`${time.utc};${2}`)

        vibrate.stop()
        vibrate.scene = 25
        vibrate.start()
      }
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(85),      
      y: px(250) + px(480) * 3,
      w: 150,
      h: 150,
      normal_src: 'food_3.png',
      press_src: 'food_3_press.png',
      click_func: () => {
        console.log("food 3 BUTTON")

        storages.food.append(`${time.utc};${6}`)

        vibrate.stop()
        vibrate.scene = 25
        vibrate.start()  
      }
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(250),      
      y: px(250) + px(480) * 3,
      w: 150,
      h: 150,
      normal_src: 'food_4.png',
      press_src: 'food_4_press.png',
      click_func: () => {
        console.log("food 4 BUTTON")

        storages.food.append(`${time.utc};${9}`)             

        vibrate.stop()
        vibrate.scene = 25
        vibrate.start()  
      }
    })

        
    // PAGE #4
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: px(480) * 4,
      w: px(480),
      h: px(480),
      color: 0xfcbf49
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(60),      
      y: px(152) + px(480) * 4,
      w: 175,
      h: 175,
      normal_src: 'alcohol_1.png',
      press_src: 'alcohol_1_press.png',
      click_func: () => {
        console.log("alcohol 1 BUTTON")

        storages.alcohol.append(`${time.utc};${1}`)  

        vibrate.stop()
        vibrate.scene = 25
        vibrate.start()   
      }
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(245),      
      y: px(152) + px(480) * 4,
      w: 175,
      h: 175,
      normal_src: 'alcohol_2.png',
      press_src: 'alcohol_2_press.png',
      click_func: () => {
        console.log("alcohol 2 BUTTON")

        storages.alcohol.append(`${time.utc};${3}`) 

        vibrate.stop()
        vibrate.scene = 25
        vibrate.start() 
      }
    })


     // PAGE #5
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: px(480) * 5,
      w: px(480),
      h: px(480),
      color: 0xeae2b7
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(60),      
      y: px(152) + px(480) * 5,
      w: 175,
      h: 175,
      normal_src: 'pee.png',
      press_src: 'pee_press.png',
      click_func: () => {
        console.log("pee 1 BUTTON")

        storages.pee.append(time.utc)         
        
        vibrate.stop()
        vibrate.scene = 25
        vibrate.start()   
      }
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(245),      
      y: px(152) + px(480) * 5,
      w: 175,
      h: 175,
      normal_src: 'poo.png',
      press_src: 'poo_press.png',
      click_func: () => {
        console.log("poo 2 BUTTON")

        storages.poo.append(time.utc)         
      
        vibrate.stop()
        vibrate.scene = 25
        vibrate.start()   
      }
    })


    // PAGE #6
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: px(480) * 6,
      w: px(480),
      h: px(480),
      color: 0xf9f7eb
    })


    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(140),      
      y: px(140) + px(480) * 6,
      w: 200,
      h: 200,
      normal_src: 'headache.png',
      press_src: 'headache_press.png',
      click_func: () => {
        console.log("headache BUTTON")

        storages.headache.append(time.utc)           

        vibrate.stop()
        vibrate.scene = 25
        vibrate.start()  
      }
    })

  }
});