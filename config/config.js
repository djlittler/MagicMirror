/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out or empty, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
			     // local for armv6l processors, default
			     //   starts serveronly and then starts chrome browser
			     // false, default for all  NON-armv6l devices
			     // true, force serveronly mode, because you want to.. no UI on this device

	modules: [
    {
      module: 'MMM-Face-Reco-DNN',
      config: {
        // Logout 15 seconds after user was not detected any more
        // If they are detected within this period, the delay will start again
        logoutDelay: 30000,
        // How often the recognition starts in milliseconds
        // With a Raspberry Pi 3+ it works well every 2 seconds
        checkInterval: 2000,
        // Module set used for strangers or if no user is detected
        defaultClass: 'default',
        // Set of modules which should be shown for every recognised user
        everyoneClass: 'shared',
        // XML to recognize with haarcascade
        cascade: 'modules/MMM-Face-Reco-DNN/tools/haarcascade_frontalface_default.xml',
        // Pre-encoded pickle with the faces
        encodings: 'modules/MMM-Face-Reco-DNN/tools/encodings.pickle',
        // Use Raspberry Pi camera or another type
        // 1 = RasPi camera, 0 = other camera
        usePiCamera: 1,
        // Method of facial recognition
        // dnn = deep neural network, haar = haarcascade
        method: 'dnn',
        // Which face detection model to use
        // "hog" is less accurate but faster on CPUs
        // "cnn" is a more accurate deep-learning model which is GPU/CUDA accelerated
        detectionMethod: 'hog',
        // How long in milliseconds modules take to hide and show
        animationSpeed: 0,
        // Path to Python to run the face recognition
        // null or '' means default path
        pythonPath: null,
        // Should a welcome message be shown using the MagicMirror alerts module?
        welcomeMessage: true,
        // Capture new pictures of recognized people, if unknown we save it in folder "unknown"
        // So you can extend your dataset and retrain it afterwards for better recognitions
        extendDataset: false,
        // If extendDataset is true, you need to set the full path of the dataset
        dataset: 'modules/MMM-Face-Reco-DNN/dataset/'
      }
    },
  	{
      module: 'MMM-pages',
      classes: 'default Daniel Cret Oscar Woo_Young',
      config: {
        modules: [
					["newsfeed", "MMM-Spotify", "MMM-ViewNotifications", "MMM-SendNotificationButton"],
					["weatherforecast", "calendar", "MMM-Pollen", "MMM-Todoist", "on -this-day", "MMM-AVStock", "MMM-CoinMarketCap"],
          ["compliments", "MMM-ISS", "MMM-ISS-Live"]],
        fixed: ["MMM-OnScreenMenu","clock", "currentweather", "MMM-page-indicator", "mm-hide-all", "MMM-NetworkConnection"],
      }
    },
    {
      module: 'MMM-page-indicator',
      position: 'bottom_bar',
      classes: 'default shared Daniel Cret Oscar Woo_Young',
      config: {
          pages: 4,
      }
    },
    {
	    module: 'MMM-Cursor',
	    classes: "default Daniel Cret Oscar Woo_Young",
	    config: {
		// See 'Configuration options' for more information.
	    }
    },
		{
      module: 'MMM-OnScreenMenu',
      position: 'bottom_right',
      classes: 'Daniel',
      /* Valid positions: 'top_right', 'top_left', 'bottom_right', 'bottom_left' */
      config: {
        touchMode: true,
        enableKeyboard: true,
        // ... see more options below
      }
    },
		{
			module: "MMM-Dynamic-Modules",
		},
		{
      module: 'MMM-KeyBindings',
      config: {
			  evdev: {
					enabled: false
				},
        enableKeyboard: true
      }
    },
		{
			module: "alert",
			classes: "default Daniel Cret Oscar Woo_Young"
		},
		{
			module: "updatenotification",
			position: "top_bar",
			classes: 'Daniel Cret Oscar Woo_Young'
		},
		{
			module: "clock",
			position: "top_left",
			classes: 'default Daniel Cret Oscar Woo_Young'
		},
		{
			module: "calendar",
			header: "Holidays",
			position: "top_left",
			classes: 'Daniel Cret Oscar Woo_Young',
			config: {
				calendars:[
					{
						symbol: "calendar-check",
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"
					}
				]
			}
		},
		{
			module: "compliments",
			position: "lower_third",
			classes: 'Daniel Cret Oscar Woo_Young'
		},
		{
			module: "currentweather",
			position: "top_right",
			classes: 'default Daniel Cret Oscar Woo_Young',
			config: {
				location: "London",
				locationID: "2643743", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "95bcc2e45fcf190858c5273b37e604f0"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			classes: 'default Daniel Cret Oscar Woo_Young',
			config: {
				location: "London",
				locationID: "2643743", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "95bcc2e45fcf190858c5273b37e604f0"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			classes: 'Daniel Cret Oscar Woo_Young',
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
    {
      module: 'MMM-NetworkConnection',
      position: 'top_bar',
      classes: 'Daniel',
      config: {
      }
    },
    {
      module: 'on-this-day',
      position: 'bottom_bar',
      classes: "Daniel Cret Oscar Woo_Young",
      config: {
        // see below for configurable options...
      }
    },
  	{
      module: "MMM-Pollen",
      position: "top_left",
      header: "Pollen Forecast",
      classes: 'Daniel Cret',
      config: {
        updateInterval: 3 * 60 * 60 * 1000, // every 3 hours
        zip_code: "90210"
      }
    },
		{
		  module: "MMM-Spotify",
		  position: "bottom_right", // "bottom_bar" or "top_bar" for miniBar
			classes: 'default Daniel',
		  config: {
		    debug: false, // debug mode
		    style: "default", // "default" or "mini" available (inactive for miniBar)
		    control: "default",
		    accountDefault: 0, // default account number, attention : 0 is the first account
		    updateInterval: 1000,
		    onStart: null, // disable onStart feature with `null`
		    deviceDisplay: "Listening on", // text to display in the device block (default style only)
		    allowDevices: [], //If you want to limit devices to display info, use this.
		    // allowDevices: ["RASPOTIFY", "My iPhoneX", "My Home speaker"],
		    miniBarConfig: {
		      album: true, // display Album name in miniBar style
		      scroll: true, // scroll title / artist / album in miniBar style
		      logo: true, // display Spotify logo in miniBar style
		    }
		  }
		},

		//Development
    {
      module: 'MMM-ViewNotifications',
      position: "top_left",
      header: "Notifications",
			classes: "default Daniel",
      config: {
        // See below for configurable options
				excludeModules: ["clock"],
      }
    },
		{
			module: 'MMM-SendNotificationButton',
			position: 'top_left',	// This can be any of the regions. Best results in left or right regions.
			header: 'Send Notification', // This is optional
			classes: 'default Daniel',
			config: {
				// See 'Configuration options' for more information.
      }
		},
		//Not working
		{
			module: 'MMM-Todoist',
			position: 'top_left',	// This can be any of the regions. Best results in left or right regions.
			header: 'Todoist', // This is optional
			classes: 'Daniel',
			config: { // See 'Configuration options' for more information.
				accessToken: '60c3b3ee4c855567f5617b9c22b77455b631367d',
				maximumEntries: 60,
				updateInterval: 10*60*1000, // Update every 10 minutes
				fade: false,
				// projects and/or labels is mandatory:
				projects: ["Magic Mirror"],
				//labels: [ "Magic Mirror", "Important" ] // Tasks for any projects with these labels will be shown.
      }
		},
		{
			disabled: false,
			module: 'MMM-ISS-Live',
			position: 'bottom_right',
			classes: 'Daniel',
			config: {
		   useHeader: false,                // true if you want a header
		   header: "ISS Feed",                      // Change in config file. useHeader must be true
		   animationSpeed: 1000,            // fade speed
			}
		},
		{
			disabled: false,
			module: 'MMM-ISS',
			position: 'bottom_right',
			classes: 'Daniel',
			config: {
			  country: "England",
			  city: "London",
		    lat: "51.5336",                // latitude
		    lng: "-0.1199",                // longitude
		    units: "km",                   // mi = miles, mph / km = kilometers, km/h
		    useHeader: false,              // true if you want a header
		    header: "",                    // Any text you want. useHeader must be true
		    updateInterval: 5 * 60 * 1000,
			 }
		},
		{
		  module: "MMM-AVStock",
		  position: "top_right", //"bottom_bar" is better for `mode:ticker`
			classes: "Daniel Woo_Young Oscar Cret",
		  config: {
		    apiKey : "13HOT9JACUC6FFRI", // https://www.alphavantage.co/
		    timeFormat: "YYYY-MM-DD HH:mm:ss",
		    symbols : ["aapl", "GOOGL", "005930.KS"],
		    alias: ["APPLE", "", "SAMSUNG Electronics"], //Easy name of each symbol. When you use `alias`, the number of symbols and alias should be the same. If value is null or "", symbol string will be used by default.
		    tickerDuration: 60, // Ticker will be cycled once per this second.
		    chartDays: 90, //For `mode:series`, how much daily data will be taken. (max. 90)
		    poolInterval : 1000*15, // (Changed in ver 1.1.0) - Only For Premium Account
		    mode : "series", // "table", "ticker", "series"
		    decimals: 4, // number o decimals for all values including decimals (prices, price changes, change%...)
		    candleSticks : false, //show candle sticks if mode is Series
		    coloredCandles : false, //colored bars: red and green for negative and positive candles
		    premiumAccount: false, // To change poolInterval, set this to true - Only For Premium Account
		  }
		},
		{
      module: 'MMM-CoinMarketCap',
      position: "top_right",
      header: "Cryptocurrencies",
			classes: 'Daniel Woo_Young',
      config: {
        apiKey: 'd7e684aa-9437-46a5-9c18-9ea27ad661ad',
        currencies: ['bitcoin', 'ethereum', 'litecoin'],
        view: 'graph',
        conversion: 'GBP',
        ...
        // See below for more Configuration Options
      }
    },
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
