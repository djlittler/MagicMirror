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
	timeFormat: 12,
	units: "metric",
	// serverOnly:  true/false/"local" ,
			     // local for armv6l processors, default
			     //   starts serveronly and then starts chrome browser
			     // false, default for all  NON-armv6l devices
			     // true, force serveronly mode, because you want to.. no UI on this device

	modules: [
  	{
      module: 'MMM-pages',
      classes: 'default Daniel Cret Oscar Woo_Young',
      config: {
        modules: [
					//Page 1: Homepage
					["clock", "MMM-Screencast", "MMM-Habits", "MMM-Spotify", "MMM-network-signal"],
					//Page 2: Daily Brief
					["MMM-DigClock", "currentweather", "MMM-OClock", "weatherforecast", "MMM-Pollen", "MMM-AVStock", "MMM-CoinMarketCap", "newsfeed"],
					//Page 3: Scheduler
          ["MMM-DigClock", "calendar", "holidays", "MMM-HabiticaStats", "MMM-Todoist", "MMM-CountDOWN", "MMM-CountUP"],
					//Page 4: For You
					["MMM-DigClock", "MMM-ISS", "MMM-ISS-Live", "on-this-day", "compliments"],
					//Page 5: Work/Dump
					["MMM-DigClock", "MMM-Tube-Status"],
					//Page 6: Settings
					["MMM-DigClock", "MMM-SendNotificationButton", "MMM-NetworkConnection"]],
        fixed: ["MMM-OnScreenMenu", "MMM-page-indicator", "mm-hide-all", "MMM-Face-Reco-DNN", "MMM-Modulebar", "MMM-ViewNotifications"],
      }
			//"MMM-SimpleLogo"
    },
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
	    module: 'MMM-Cursor',
	    classes: "default Daniel Cret Oscar Woo_Young",
	    config: {
		// See 'Configuration options' for more information.
	    }
    },
		{
      module: 'MMM-OnScreenMenu',
      position: 'bottom_right',
      classes: 'default Daniel',
      /* Valid positions: 'top_right', 'top_left', 'bottom_right', 'bottom_left' */
      config: {
        touchMode: true,
        enableKeyboard: true,
        // ... see more options below
      }
    },
		{
      module: 'MMM-ModuleScheduler',
      config: {
			  // SHOW ALL MODULES AT 06:00 AND DIM THEM TO 40% AT 22:00
        global_schedule: [
					{from: '0 6 * * *', to: '0 10 * * *', dimLevel: '40', ignoreModules: ['clock', 'calendar'], groupClass: 'morning_interface'},
					{from: '0 10 * * *', to: '30 17 * * *', ignoreModules: ['clock', 'calendar'], groupClass: 'day_interface'},
					{from: '30 17 * * *', to: '0 0 * * *', ignoreModules: ['clock', 'calendar'], groupClass: 'night_interface'},
					{from: '0 0 * * *', to: '0 6 * * *', ignoreModules: ['clock', 'calendar'], groupClass: 'midnight_interface'}],
        // SHOW AN ALERT AT 09:30 EVERY DAY (see https://github.com/MichMich/MagicMirror/tree/develop/modules/default/alert)
        notification_schedule: {
          notification: 'SHOW_ALERT',
          schedule: '30 9 * * *',
          payload: {
            type: "notification",
            title: 'Scheduled alert!'
          }
        }
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
			classes: 'default Daniel Cret Oscar Woo_Young'
		},
		{
			module: "clock",
			position: "top_left",
			classes: 'default Daniel Cret Oscar Woo_Young'
		},
		{
		module: "MMM-DigClock",
		position: "top_left",	// This can be any of the regions.
		classes: 'default Daniel Cret Oscar Woo_Young',
		config: {
			showDate: true,
			showWeek: false,
			showSeconds: false,
			dateFormat: "ddd, ll",
			timezone: "America/Chicago"
			}
		},



//Page 1: Homepage
		//Module: Screencast

		{
		  module: "MMM-Widget",
			classes: 'default Daniel Cret Oscar Woo_Young',
		  config: {
		    widgets: [
      {
        html:`
        <!-- TradingView Widget BEGIN -->
        <div class="tradingview-widget-container">
          <div id="tv-medium-widget"></div>
          <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/AAPL/" rel="noopener" target="_blank"><span class="blue-text">Apple Quotes</span></a> by TradingView</div>
          <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
          <script type="text/javascript">
          new TradingView.MediumWidget(
          {
          "container_id": "tv-medium-widget",
          "symbols": [
            [
              "Apple",
              "AAPL "
            ]
          ],
          "greyText": "Quotes by",
          "gridLineColor": "#e9e9ea",
          "fontColor": "#83888D",
          "underLineColor": "#dbeffb",
          "trendLineColor": "#4bafe9",
          "width": "800px",
          "height": "400px",
          "locale": "en"
        }
          );
          </script>
        </div>
        <!-- TradingView Widget END -->
        `,
        position: "top_left",
        width: "800px",
        height: "400px",
        backgroundColor: "#FFF"
      },
      {
        html:`<script type="text/javascript" src="http://www.mta.info/sites/all/libraries/mta_WidgetScripts/serviceStatusWidget.js"></script>`,
        position: "top_left",
        width: "400px",
        height: "500px"
      },
      {
        html:`
<a class="weatherwidget-io" href="https://forecast7.com/en/40d71n74d01/new-york/" data-label_1="NEW YORK" data-label_2="WEATHER" data-theme="original" >NEW YORK WEATHER</a>
<script>
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
</script>
        `,
        position: "top_right",
        width: "300px",
        height: "600px",
      }
    ]
		  }
		},
		{
			module: 'MMM-Screencast',
			position: 'bottom_right', // This position is for a hidden <div /> and not the screencast window
			classes: 'default Daniel Cret Oscar Woo_Young',
			config: {
				position: 'middle_center',
				height: 300,
				width: 500,
				castName: 'Magic Mirror',
			}
    },
		//Module: Spotify
		{
		  module: "MMM-Spotify",
		  position: "bottom_right", // "bottom_bar" or "top_bar" for miniBar
			classes: 'default Daniel',
		  config: {
		    debug: false, // debug modes
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
		  module: "MMM-OClock",
		  position: "middle_center",
			classes: 'default Daniel Cret Oscar Woo_Young',
		  config: {
		    locale: "", //default is system locale, or use like this. "de-DE"
		    canvasWidth:1000,
		    canvasHeight:1000,
		    centerColor: "#FFFFFF",
		    centerR: 50,
		    centerTextFormat: "YYYY",
		    centerFont: "bold 20px Roboto",
		    centerTextColor:"#000000",
		    hands: ["month", "date", "day", "hour", "minute", "second"],
		    //available values; "year", "month", "date", "week", "day", "hour", "minute", "second"
		    handType: "round", //"default", "round"
		    handWidth: [40, 40, 40, 40, 40, 40],
		    handTextFormat: ["MMM", "Do", "ddd", "h", "m", "s"],
		    handFont: "bold 16px Roboto",
		    useNail: true,
		    nailSize: 40,
		    nailBgColor: "#000000",
		    nailTextColor: "#FFFFFF", //CSS color or "inherit"
		    space: 3,
		    colorType: "hsv", //availables: "static", "radiation", "transform", "hsv"
		    colorTypeStatic: ["red", "orange", "yellow", "green", "blue", "purple"],
		    colorTypeRadiation: ["#333333", "red"],
		    colorTypeTransform: ["blue", "red"],
		    colorTypeHSV: 0.25, //hsv circle start color : 0~1

		    handConversionMap: { // I think you don't need to modify this.
		      "year": "YYYY",
		      "month": "M",
		      "date": "D",
		      "week": "w", // Local week of year. If you want to use ISO week of year, use "W" instead "w"
		      "day": "e", // Local day of week. If you want to use ISO day of week, use "E" instead "e"
		      "hour": "h", // 12H system. If you want to 24H system, use "H" instead "h"
		      "minute": "m",
		      "second": "s"
		    },

		    ////// Available as of v2.x:
		    secondsUpdateInterval: 1,  // how often to redraw the seconds hand (integer >= 1 sec)

		    // To show an age bar enter your birthYear AND enter "age" in the hands array.
		    birthYear: false,  // e.g. 1901
		    birthMonth: 0,    // e.g. 1-12 (optional, recommended)
		    lifeExpectancy: 85, // default: 85
		    linearLife: false,  // set to true to plot life linearly not logarithmically
		                        // Inspiration: http://www.bertrandplanes.com/pages/LifeClock3.php
		    ageBarColor: [],  // false for no gradient, empty array for default, or
		                      // [start, stop] colors, e.g. ['#000', 'white']

		    scale: 1, // convenience to scale bar dimensions (font size & nailSize should be
		              // adjusted manually).  E.g. 0.5 is half-size, 2 is double sized.

		    canvasStyle: "", // Any CSS styles, e.g. "opacity: .7; ..."

		  }
		},
		{
			module: "compliments",
			position: "lower_third",
			classes: 'default Daniel Cret Oscar Woo_Young'
		},
		{
	    module: "MMM-network-signal",
	    position: "top_bar",
			classes: 'default Daniel',
	    config: {
        // Configuration of the module goes here
	    }
		},

    // {
    //   module: 'MMM-SimpleLogo',
    //   position: 'top_center',    // This can be any of the regions.
		// 	classes: 'Daniel',
    //   config: {
    //       // The config property is optional.
    //       // See 'Configuration options' for more information.
    //   }
    // },
//Page 2: Daily Brief


	//Section: Weather
		//Module: Current Forecast
		{
			module: "currentweather",
			position: "top_left",
			classes: 'default Daniel Cret Oscar Woo_Young',
			config: {
				location: "London",
				locationID: "2643743", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "95bcc2e45fcf190858c5273b37e604f0"
			}
		},
		//Module: 7 Day Forecast
		{
			module: "weatherforecast",
			position: "top_left",
			header: "Weather Forecast",
			classes: 'default Daniel Cret Oscar Woo_Young',
			config: {
				location: "London",
				locationID: "2643743", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "95bcc2e45fcf190858c5273b37e604f0"
			}
		},
		//Module: Pollen Count
  	{
      module: "MMM-Pollen",
      position: "top_left",
      header: "Pollen Forecast",
      classes: 'default Daniel Cret',
      config: {
        updateInterval: 3 * 60 * 60 * 1000, // every 3 hours
        zip_code: "90210"
      }
    },


	//Section: Finance
		//Module: Stock
		{
		  module: "MMM-AVStock",
		  position: "top_right", //"bottom_bar" is better for `mode:ticker`
			classes: "default Daniel Woo_Young Oscar Cret",
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
		//Module: Cryptocurrency
		{
      module: 'MMM-CoinMarketCap',
      position: "top_right",
      header: "Cryptocurrencies",
			classes: 'default Daniel Woo_Young',
      config: {
        apiKey: 'd7e684aa-9437-46a5-9c18-9ea27ad661ad',
        currencies: ['bitcoin', 'ethereum', 'litecoin'],
        view: 'graph',
        conversion: 'GBP',
        // See below for more Configuration Options
      }
    },


	//Bottom: News Ticker
		//Module: Newsfeed
		{
			module: "newsfeed",
			position: "bottom_center",
			classes: 'default Daniel Cret Oscar Woo_Young',
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
			module: 'MMM-Habits',
			position: 'top_left',	// This can be any of the regions. Best results in left or right regions.
			header: 'Habits', // This is optional
			classes: 'default Daniel',
			config: { // See 'Configuration options' for more information.

				//labels: [ "Magic Mirror", "Important" ] // Tasks for any projects with these labels will be shown.
	    }
		},

//Page 3: Scheduler


	//Left: Calendars & Planners
		//Module: US Holiday **CHANGE**
		{
			module: "calendar",
			header: "Holidays",
			position: "top_left",
			classes: 'default Daniel Cret Oscar Woo_Young',
			config: {
				calendars:[
					{
						symbol: "calendar-check",
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"
					}
				]
			}
		},
		//Module: Personal Schedule **ADD**


	//Right: To Do + Habits
		//Module: Habitica
		{
			module: "MMM-HabiticaStats",
			position: "top_right", // put it wherever you want
			classes: 'default Daniel',
			config: {
				userID: "1a9ed6e3-96eb-46a0-a662-acc5660f8614",
				APIToken: "b4cc5435-1adb-4eea-b3f4-0fabc639109e",
				zoom: 0.5,
			}
		},
		//Module: ToDoist
		{
			module: 'MMM-Todoist',
			position: 'top_right',	// This can be any of the regions. Best results in left or right regions.
			header: 'Todoist', // This is optional
			classes: 'default Daniel',
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
		//Module: Microsoft ToDo **ADD**


	//Top
		//Module: CountUp
		{
	    module: "MMM-CountDOWN",
			position: 'top_center',
      classes: "default Daniel Cret Oscar Woo_Young",
	    config: {
	      header: 'Quarantine Ends',
				date: '2020-07-01',
	      time: '00:00:00',
				showOnlyWeeks: true
	    }
  	},


	//Bottom
		//Module: CountUp
		{
	    module: "MMM-CountUP",
			position: 'bottom_center',
      classes: "default Daniel Cret Oscar Woo_Young",
	    config: {
	      header: 'Quit Smoking',
	      date: '2020-02-08',
	      time: '00:00:00',
				showOnlyWeeks: true
	    }
  	},



//Page 4: For you


	//Section: Space
		{
			disabled: false,
			module: 'MMM-ISS-Live',
			position: 'bottom_right',
			classes: 'default Daniel',
			config: {
		   useHeader: false,                // true if you want a header
		   header: "ISS Feed",                      // Change in config file. useHeader must be true
		   animationSpeed: 1000,            // fade speed
			}
		},
		//
		// {
		// 	disabled: false,
		// 	module: 'MMM-ISS',
		// 	position: 'bottom_right',
		// 	classes: 'default Daniel',
		// 	config: {
		// 	  country: "England",
		// 	  city: "London",
		//     lat: "51.5336",                // latitude
		//     lng: "-0.1199",                // longitude
		//     units: "km",                   // mi = miles, mph / km = kilometers, km/h
		//     useHeader: false,              // true if you want a header
		//     header: "",                    // Any text you want. useHeader must be true
		//     updateInterval: 5 * 60 * 1000,
		// 	 }
		// },


		//Module: On This Day
    {
      module: 'on-this-day',
      position: 'bottom_center',
      classes: "default Daniel Cret Oscar Woo_Young day_interface",
      config: {
        // see below for configurable options...
      }
    },


//Page 5: Work


	//Right: London Transport
		//Module: Tube Status
		{
	    module:		'MMM-Tube-Status',
	    position:	'top_right',
	    header:		'Tube Status',
			classes: "default Daniel Cret Oscar Woo_Young",
	    config:		{
	      show_all:	 true
	    }
		},

		// {
		// 	module: "MMM-windy",
		// 	position: 'fullscreen_above', // this must be set to 'fullscreen_above'
		// 	config: {
		// 		apiKey: 'YOUR_API_KEY',
		//     initLoadDelay: 50, // optional, default is 50 milliseconds
		// 		location: {	// optional location in latitude and longitude
		// 			lat: 29.629633,
		// 			lng: -98.495894,
		// 		},
		// 		zoom: 5,	// optional zoom level, default is 5.  Bigger numbers zoom closer
		// 		particlesAnim: 'on',	// optional, turns particles animation on or off, default 'on'
		// 		graticule: false,	// optional
		// 		englishLabels: false, // optional
		// 		hourFormat: '12h' // optional
		// 	}
		// }


//Page 6: Settings
	//Top: Network (Top)
		//Module: Network Connection Status
    {
      module: 'MMM-NetworkConnection',
      position: 'top_bar',
      classes: 'default Daniel',
      config: {
      }
    },
		//Module: Wifi Symbol **ADD**


	//Left: Notifications (Left)
		//Module: View Notifications
    {
      module: 'MMM-ViewNotifications',
      position: "top_left",
      header: "Notifications",
			classes: "default Daniel",
      config: {
        // See below for configurable options
				excludeModules: ["clock", "newsfeed"],
      }
    },
		//Module: Send Notifications
		{
			module: 'MMM-SendNotificationButton',
			position: 'top_left',	// This can be any of the regions. Best results in left or right regions.
			header: 'Send Notification', // This is optional
			classes: 'default Daniel',
			config: {
				// See 'Configuration options' for more information.
      }
		},


//Unused


		//Module: Countdown

		// {
		// disabled: false,
		// module: 'MMM-EventHorizon',
		// position: 'top_center',
		// classes: "default Daniel Woo_Young Oscar Cret",
		// config: {
		//     timezone: "n136",                     // See Timezone chart at bottom
		//     units: "1",          // 1=no units, 2=units initial only, 3=units abbr singular, 4= units abbr plural, 5= units full name
		//     justDays: "",                         //  yes or no // For longer countdowns. Displays ONLY days remaining
		//     size: "large",                        // small, medium or large
		//     countUp: "yes",                       // Count up after timer ends
		//     date: "2019-07-04",                   // YYYY-MM-DD format ONLY
		//     time: "00:00:01",                     // (HH:MM:SS)    Exact time you want timer to end
		//     text1: "Describe event",              // 2 lines of text during timer
		//     text2: "And here too!",               // 2 lines of text during timer
		//     text1Color: "FFFFFF",                 // Hex color codes
		//     text2Color: "62FF00",                 // Hex color codes
		//     timerColor: "FFFFFF",                 // Hex color codes
		//     endText1: "When timer ends",          // 2 lines of text when timer ends
		//     endText2: "Say something here",       // 2 lines of text when timer ends
		//     endText1Color: "FFFFFF",              // Hex color codes
		//     endText2Color: "62FF00",              // Hex color codes
		//     timerUpColor: "FFFFFF",               // Hex color codes
		//     colorpc: "000",                       // color of the background 000 = black, t = transparent
		//   }
		// },

		//Global Bottom
    {
	    module: "MMM-Modulebar",
	    position: "bottom_center", // This can be any of the regions.
	    header: "Modules", // Optional
	    classes: "default Daniel", // Optional
		  config: {
				//allowForce: true,
				buttons: {
				  "1": {
			      // This is a button with text and a symbol
			      module: "currentweather",
			      symbol: "cloud",
			    },
			    "2": {
			      // A button with only a symbol and an idnum to target a specific weatherforecast module.
			      module: "weatherforecast",
			      symbol: "sun-o",
			      // The ID-number of the "weatherforecast" module (when you have more then one).
			      //idnum: 8,
			    },
			    "3": {
						module: "MMM-Pollen",
						symbol: "tree",
					},
			    "4": {
						module: "MMM-AVStock",
						symbol: "gbp",
			    },
			    "5": {
						module: "MMM-CoinMarketCap",
						symbol: "btc",
					},
			    "6": {
						module: "calendar",
						symbol: "calendar-o",
			    },
			    "7": {
						module: "newsfeed",
						symbol: "newspaper-o",
					},
			    "8": {
						module: "MMM-CountDOWN",
						symbol: "angle-double-up",
					},
			    "9": {
						module: "MMM-CountUP",
						symbol: "angle-double-down",
					},
			    "10": {
						module: "clock",
						symbol: "clock-o",
					},
			    "11": {
						module: "MMM-Spotify",
						symbol: "spotify",
					},
			    "12": {
						module: "MMM-Tube-Status",
						symbol: "subway",
					},
			    "13": {
						module: "compliments",
						symbol: "smile-o",
					},
			    "14": {
						module: "MMM-ISS-Live",
						symbol: "space-shuttle",
					},
			    "15": {
						module: "MMM-OClock",
						symbol: "circle-o-notch",
					},
				}
			}
    },
    {
      module: 'MMM-page-indicator',
      position: 'bottom_bar',
      classes: 'default shared Daniel Cret Oscar Woo_Young',
      config: {
          pages: 5,
      }
    },
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
