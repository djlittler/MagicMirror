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
        logoutDelay: 15000,
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
					["MMM-Pollen", "newsfeed", "calendar", "on -this-day", "currentweather", "MMM-Spotify"],
					["weatherforecast"],
          ["compliments"]],
        fixed: ["MMM-OnScreenMenu","clock", "currentweather", "MMM-page-indicator", "mm-hide-all", "MMM-NetworkConnection", "MMM-ViewNotifications"],
      }
    },
    {
      module: 'MMM-page-indicator',
      position: 'bottom_bar',
      classes: 'default Daniel Cret Oscar Woo_Young',
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
      position: 'top_right',
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
    {
      module: 'MMM-ViewNotifications',
      position: "top_left",
      header: "Notifications",
      config: {
        // See below for configurable options
      }
    }
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
