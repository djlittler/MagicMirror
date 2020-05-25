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
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "US Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"					}
				]
			}
		},
		{
			module: "compliments",
			position: "lower_third"
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "New York",
				locationID: "", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "YOUR_OPENWEATHER_API_KEY"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "New York",
				locationID: "5128581", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "YOUR_OPENWEATHER_API_KEY"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
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
            module: 'MMM-OnScreenMenu',
            position: 'bottom_right',
            /* Valid positions: 'top_right', 'top_left', 'bottom_right', 'bottom_left' */
            config: {
                touchMode: true,
                enableKeyboard: true,
                // ... see more options below
            }
        },
        {
            module: 'MMM-NetworkConnection',
            position: 'top_right',
            config: {
            }
            
        },
        {
            module: 'on-this-day',
            position: 'bottom_bar',
            config: {
                // see below for configurable options...
            }
        },
        {
            module: 'MMM-pages',
            config: {
                modules:
                    [[ "weatherforecast", "newsfeed"],
                     ["MMM-Pollen"],
                     [ "calendar", "compliments", "on -this-day" ]],
                fixed: ["MMM-OnScreenMenu","clock", "currentweather", "MMM-page-indicator", "mm-hide-all", "MMM-NetworkConnection"],
            }
        },
        {
            module: 'MMM-page-indicator',
            position: 'bottom_bar',
            config: {
                pages: 4,
            }
        },
        {
		    module: 'MMM-Cursor',
		    config: {
			// See 'Configuration options' for more information.
		    }
	    },
	    {
            module: "MMM-Pollen",
            position: "top_left",
            header: "Pollen Forecast",
            config: {
                updateInterval: 3 * 60 * 60 * 1000, // every 3 hours
                zip_code: "90210"
            }
        },
        {
	        module: 'mm-hide-all',
	        position: 'bottom_right'
        },
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
