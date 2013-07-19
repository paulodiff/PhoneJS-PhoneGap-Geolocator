// Global variable that will tell us if PhoneGap is ready
var isPhoneGapReady = false;

// Default all phone types to false
var isAndroid = false;
var isBlackberry = false;
var isIphone = false;
var isWindows = false;
var intervalID = false;

// Store the device's uuid
var deviceUUID;

// Store the current network status
var isConnected = false;
var isHighSpeed;
var internetInterval;
var compassHeading = 0;
var PhoneGapNetword_watchID = null;
var PhoneGapCompass_watchID = null;
var PhoneGapGeolocation_watchID = null;

var currentUrl;

function initPhoneGap() {

	console.log('initPhoneGap...');

    if (isPhoneGapReady) {
        onDeviceReady();
    } else {
        // Add an event listener for deviceready
        document.addEventListener("deviceready", onDeviceReady, false);
        
        // Older versions of Blackberry < 5.0 don't support 
        // PhoneGap's custom events, so instead we need to 
        // perform an interval check every 500 milliseconds 
        // to see if PhoneGap is ready.  Once done, the 
        // interval will be cleared and normal processing
        // can begin
        intervalID = window.setInterval(function() {
              if (PhoneGap.available) {
                  onDeviceReady();
              }
          }, 500);
      }
}

function onDeviceReady() {

	console.log('onDeviceReady...');

    window.clearInterval(intervalID);
    
    // set to true
    isPhoneGapReady = true;
    
    deviceUUID = device.uuid;
    
    // detect the device's platform
    deviceDetection();
    
    // detect for network access
    networkDetection();
    
    // execute any events at start up
    executeEvents();
    
    // execute a callback function
    //executeCallback();
}

function executeEvents() {
    if (isPhoneGapReady) {
	
		console.log('attached events ...');
	
        // attach events for online and offline detection
        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);
        
        // attach events for pause and resume detection
        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
        
        // set a timer to check the network status
        internetInterval = window.setInterval(function() {
				console.log('..checking network... : ' + navigator.connection.type);
				
              if (navigator.connection.type != Connection.NONE) {
                onOnline();
              } else {
                onOffline();
              }
          }, 5000);
    }
}

/*
function executeCallback() {
    if (isPhoneGapReady) {
        // get the name of the current html page
        var pages = currentUrl.split("/");
        var currentPage = pages[pages.length - 1].slice(0, pages[pages.length - 1].indexOf(".html"));
        
        // capitalize the first letter and execute the function
        currentPage = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
        
        if (typeof window['on' + currentPage + 'Load'] == 'function') {
            window['on' + currentPage + 'Load']();
        }
    }
}
*/

function deviceDetection() {
    if (isPhoneGapReady) {
        switch (device.platform) {
            case "Android":
                isAndroid = true;
                break;
            case "Blackberry":
                isBlackberry = true;
                break;
            case "iPhone":
                isIphone = true;
                break;
            case "WinCE":
                isWindows = true;
                break;
        }
    }
}


function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        //alert('Connection type: ' + states[networkState]);
}

function networkDetection() {
    if (isPhoneGapReady) {
		
        //if (navigator.network.connection.type != Connection.NONE) {
        //    isConnected = true;
        //}
        
        // determine if this connection is high speed or not
        switch (navigator.connection.type) {
            case Connection.UNKNOWN:
			case Connection.NONE:
				isConnected = false;
				isHighSpeed = false;
				break;
            case Connection.CELL_2G:
				isConnected = true;			
                isHighSpeed = false;
                break;
            default:
				isConnected = true;	
                isHighSpeed = true;
                break;
        }
    }
}

function onOnline() {
	console.log('onOnline...');
    isConnected = true;
}

function onOffline() {
	console.log('onOffline...');
    isConnected = false;
}

function onPause() {
    isPhoneGapReady = false;
    
    // clear the Internet check interval
    window.clearInterval(internetInterval);
}

function onResume() {
    // don't run if phonegap is already ready
    if (isPhoneGapReady == false) {
        alert('resuming');
        initPhoneGap();
    }
}

// Compass ------------------------------------------------------------------------

    function PhoneGapCompass_startWatch() {
        // Update compass every 3 seconds
        var options = { frequency: 3000 };
        PhoneGapCompass_watchID = navigator.compass.watchHeading(PhoneGapCompass_onSuccess, PhoneGapCompass_onError, options);
    }

    // Stop watching the compass
    function PhoneGapCompass_stopWatch() {
        if (PhoneGapCompass_watchID) {
            navigator.compass.clearWatch(PhoneGapCompass_watchID);
            watchID = null;
        }
    }

    // onSuccess: Get the current heading
    function PhoneGapCompass_onSuccess(heading) {
        //var element = document.getElementById('heading');
        //element.innerHTML = 'Heading: ' + heading.magneticHeading;
		console.log('PhoneGapCompass_onSuccess : ' + heading.magneticHeading);
		compassHeading = heading.magneticHeading;
		
		$('#phonegap_output').text(compassHeading);
		
    }

    // onError: Failed to get the heading
    function PhoneGapCompass_onError(compassError) {
        alert('Compass error: ' + compassError.code);
    }

// Geolocation --------------------------------------------------------------------------------	
	
	function PhoneGapGeolocation_startWatch() {
        // Get the most accurate position updates available on the device.
        var options = { enableHighAccuracy: true };
        PhoneGapGeolocation_watchID = navigator.geolocation.watchPosition(PhoneGapGeolocation_onSuccess, PhoneGapGeolocation_onError, options);
    }

    // onSuccess Geolocation
    function PhoneGapGeolocation_onSuccess(position) {
        var element = document.getElementById('phonegap_output');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
    }

    // clear the watch that was started earlier
    function PhoneGapGeolocation_clearWatch() {
        if (PhoneGapGeolocation_watchID != null) {
            navigator.geolocation.clearWatch(PhoneGapGeolocation_watchID);
            PhoneGapGeolocation_watchID = null;
        }
    }

        // onError Callback receives a PositionError object
        //
    function PhoneGapGeolocation_onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }
	


/*
// This gets called by jQuery mobile when the page has loaded
$(document).bind("pageload", function(event, data) {
    initPhoneGap(data.url);
});

$(document).bind("mobileinit", function(){
  $.mobile.page.prototype.options.addBackBtn = true;
});

// Set an onload handler to call the init function
window.onload = initPhoneGap;
*/