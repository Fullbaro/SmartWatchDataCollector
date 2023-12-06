
# Description of the project
!! Developed and tested on Amazfit GTR 3 Pro running Zepp OS v1.0!!

There is only one problem with almost all existing smartwatches, and that is that you cannot export your own data for personal use. I own an **Amazfit GTR 3 Pro** watch, which had exactly this problem, so I had to come up with my own solution to retrieve my data from ALL the available sensors. 

**It is important to note that this is not a formal solution, I would call it a workaround. It is very complicated but unfortunately it is the only way to go.** If you're also looking for a solution to this problem, I suggest you check [**THIS**](https://user.huami.com/privacy/index.html#/) link first, you may find the information available here sufficient.

This project was mainly about functionality, so the watch face is not necessarily the most design-oriented. It is possible to create your own face, or if you want to modify the current one, you can find the assets **[here](https://www.figma.com/file/vRE1wTHGOqUN3NSEEFcj5b/Untitled?type=design&node-id=0:1&mode=design&t=6gdPgM8FrmKmiMb8-1)**

<p align="center">
  <img src="https://raw.githubusercontent.com/Fullbaro/SmartWatchDataCollector/main/WatchFace/assets/480x480-amazfit-gtr-3-pro/screenshot.png" width="200" title="screenshot">
</p>

# How does it work?

The Amazfit watches run on **Zepp OS**, on which it is possible to write apps and watch faces. In my case, I am running the **V1.0** version of Zepp OS, which is much more limited than the newer ones, making the process even more complicated.

1. You need to create a **watch face** that reads the data from the sensors and then saves it to the root directory of the clock, which is available to other apps. This is needed because it is the only program that runs continuously  on the watch as if it were a background process.
2. You need to create an **app** for the watch, which when opened, reads the data from the globally available file, then passes it to the **app-side** part of the program, which has a **fetch-api** function so it can send it to a server.

	The app is what **runs on the watch.** They can't run in the background, they only work when they are open and don't have internet access by default. Therefore you need an app-side part **running on the device**, so it is possible to send the data using an **HTTP POST request**
3. Finally, you need a **server** that can receive POST requests and then save the data to a database or wherever you want

# Setting requirements
1.  All available sensors should be switched on to read the values automatically
2. The clock face must be set to always on
3. You need to turn on the developer options in the Zepp phone app. Go to "Profile" => "Settings" => "About" and click the Zepp icon 7 times in a row until a pop-up window appears

# Installation

Note that for writing any program for Zepp OS, an excellent documentation is available at the following link: [https://docs.zepp.com/docs/1.0/intro/](https://docs.zepp.com/docs/1.0/intro/)

1. It is important that you include the path to your own endpoint in the App code ([here](https://github.com/Fullbaro/SmartWatchDataCollector/blob/main/App/utils/config/constants.js)).
2. Also in this file, for the key parameter, enter a unique secret key. You can generate your own [here](https://www.uuidgenerator.net/)
3. You can specify how often the watch saves sensor data in [this file](https://github.com/Fullbaro/SmartWatchDataCollector/blob/main/WatchFace/app.js) by changing the `interval`(ms) variable. Some sensors are event based.
4. You will need to install the Zeus CLI ([docs](https://docs.zepp.com/docs/1.0/guides/tools/cli/))
5. Enter **App**/**WatchFace** folder, and execute the `zeus preview` command. 
6. Scan the **QR code** on the terminal with your phone using the option on the developer tab
7. I have created a **PHP** file for the server side and to receive the data, but there are many solutions for this purpose. You can place it on an Apache or NGINX web server and then call it over the Internet.

	**It is also important to rewrite the value in the php file to the secret key you generated yourself**
	
	**I recommend you to create SSL for your web server to be accessible with HTTPS! Also, disable `data` folder access over the internet!**

## Final thoughts

**TIP:** Set the bottom button to open the Data Collector App to make it easier to send data frequently

With this solution, the limitation of how large a file the watch can read into its memory at the same time may arise. The more times you open the application during the day, the smaller files the program has to work with.

I find it sad that the data collected about my own body can only be extracted in such a complicated and unjustified way. I know that not everyone wants to perform data analysis on themselves, but we should at least be given the opportunity.
If you are so determined to go through all these steps and have any questions, feel free to contact me
