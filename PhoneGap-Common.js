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
var PhoneGap_isConnected = false;
var PhoneGap_isHighSpeed;
var PhoneGap_networkDescription = null;
var internetInterval;
var compassHeading = 0;
var PhoneGapNetword_watchID = null;
var PhoneGapCompass_watchID = null;
var PhoneGapGeolocation_watchID = null;
var PhoneGapAccelerometer_watchID = null;

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
		/*
        intervalID = window.setInterval(function() {
              if (PhoneGap.available) {
                  onDeviceReady();
              }
          }, 500);
		*/
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
    PhoneGap_networkDetection();
    
    // execute any events at start up
    executeEvents();
    
    // execute a callback function
    //executeCallback();
	
	// register push notifications...
	//RegisterPushNotification();
	
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
        
		/*
        // set a timer to check the network status
        internetInterval = window.setInterval(function() {
				console.log('..checking network... : ' + navigator.connection.type);
				
              if (navigator.connection.type != Connection.NONE) {
                onOnline();
              } else {
                onOffline();
              }
          }, 5000);
		*/
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

function PhoneGap_networkDetection() {


	console.log('network .. detection ..');

    if (isPhoneGapReady) {
		
        //if (navigator.network.connection.type != Connection.NONE) {
        //    isConnected = true;
        //}
        
        // determine if this connection is high speed or not
        switch (navigator.connection.type) {
            case Connection.UNKNOWN:
			case Connection.NONE:
				PhoneGap_isConnected = false;
				PhoneGap_isHighSpeed = false;
				break;
            case Connection.CELL_2G:
				PhoneGap_isConnected = true;			
                PhoneGap_isHighSpeed = false;
                break;
            default:
				PhoneGap_isConnected = true;	
                PhoneGap_isHighSpeed = true;
                break;
        }
		
		var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
		
		PhoneGap_networkDescription = states[navigator.connection.type];
		

		
		
		
    }
}

function onOnline() {
	console.log('onOnline...');
    PhoneGap_isConnected = true;
}

function onOffline() {
	console.log('onOffline...');
    PhoneGap_isConnected = false;
}

function onPause() {
    isPhoneGapReady = false;
    
    // clear the Internet check interval
    //window.clearInterval(internetInterval);
}

function onResume() {
    // don't run if phonegap is already ready
    if (isPhoneGapReady == false) {
        alert('resuming');
        initPhoneGap();
    }
}

// Network detection


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
		// Throw an error if no update is received every 3 seconds
        var options = { enableHighAccuracy: true, timeout: 3000 };
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
    function PhoneGapGeolocation_stopWatch() {
        if (PhoneGapGeolocation_watchID != null) {
            navigator.geolocation.clearWatch(PhoneGapGeolocation_watchID);
            PhoneGapGeolocation_watchID = null;
        }
    }

    // onError Callback receives a PositionError object
    function PhoneGapGeolocation_onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }
	
// Push notifications ---------------------------------------------------------------------



	function PushNotificationSuccessHandler(result){
		alert('Callback Success! Result = '+result)
		$('#phonegap_output').append('<li>PushNotificationSuccessHandler ...' + result + '</li>');
	}
	
	function PushNotificationErrorHandler(error){
		$('#phonegap_output').append('<li>PushNotificationErrorHandler ...' + error + '</li>');
		alert(error);
	}
	
	function PushNotificationTokenHandler(msg){
		console.log("Token Handler " + msg);
	}

	
	function initPushwoosh_OLD()
	{
		var pushNotification = window.plugins.pushNotification;
		
							
		$('#phonegap_output').text('init pushwoosh');
		
		
		pushNotification.onDeviceReady();
	 
		pushNotification.registerDevice({ projectid: "1045204524713", appid : "F19B9-D7122" },
			function(status) {
				var pushToken = status;
				console.warn('push token: ' + pushToken);
			},
			function(status) {
				console.warn(JSON.stringify(['failed to register ', status]));
			}
		);
	 
		document.addEventListener('push-notification', function(event) {
			var title = event.notification.title;
				var userData = event.notification.userdata;
	 
				if(typeof(userData) != "undefined") {
				console.warn('user data: ' + JSON.stringify(userData));
			}
	 
			navigator.notification.alert(title);
		});
	}
	

	function initPushwoosh()
	{
		$('#phonegap_output').append('<li>initPushwoosh ...</li>');
		RegisterPushNotification();
	}
	
	
	function RegisterPushNotification(){
	
		console.log('RegisterPushNotification ... ');
		$('#phonegap_output').append('<li>RegisterPushNotification ...</li>');
	
		var pushNotification = window.plugins.pushNotification;
        // TODO: Enter your own GCM Sender ID in the register call for Android
        if (device.platform == 'android' || device.platform == 'Android') {
			pushNotification.register(PushNotificationSuccessHandler, PushNotificationErrorHandler,{"senderID":"1045204524713","ecb":"PushNotificationAndroid"});
        }
        else {
            pushNotification.register(PushNotificationTokenHandler,PushNotificationErrorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"PushNotificationIOS"});
        }
        //console.log('RegisterPushNotification: ' + id);
    }
	
	
	function PushNotificationAndroid(event) {
	
		$('#phonegap_output').append('<li>RegisterPushNotification ...</li>');	
	
		switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    alert('registration id = '+e.regid);
					$('#phonegap_output').append('<li>reg id ...' + e.regid + '</li>');
					
			// Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
             PushWoosh.appCode = "F19B9-D7122";
             PushWoosh.register(e.regid, function(data) {
                         alert("PushWoosh register success: " + JSON.stringify(data));
						 $('#phonegap_output').append('<li>PushWoosh register success...' + JSON.stringify(data) + '</li>');
                     }, function(errorregistration) {
                         alert("Couldn't register with PushWoosh" +  errorregistration);
						 $('#phonegap_output').append('<li>PushWoosh ERROR...' + errorregistration + '</li>');
                     });
					
					
                }
            break;

            case 'message':
              // this is the actual push notification. its format depends on the data model
              // of the intermediary push server which must also be reflected in GCMIntentService.java
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
			  $('#phonegap_output').append('<li> Event message...' + +e.msgcnt + '</li>');
			  
			  if (e.foreground)
                    {
                        $("#phonegap_output").append('<li>--INLINE NOTIFICATION--' + '</li>');

                        // if the notification contains a soundname, play it.
						
						$("#phonegap_output").append('<li>--INLINE NOTIFICATION--' + e.soundname + '</li>');
						
                        var my_media = new Media("/audio/bell.mp3");
                        my_media.play();
                    }
                    else
                    {   // otherwise we were launched because the user touched a notification in the notification tray.
                        if (e.coldstart)
                            $("#phonegap_output").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                        else
                        $("#phonegap_output").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                    }

                    $("#phonegap_output").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                    $("#phonegap_output").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
			  
			  
			  
			  
            break;

            case 'error':
              alert('GCM error = '+e.msg);
			  $('#phonegap_output').append('<li>gcm error...' + +e.msg + '</li>');
            break;

            default:
              alert('An unknown GCM event has occurred');
			  $('#phonegap_output').append('<li> gcm error... unknown </li>');
              break;
        }
	}
	
	function PushNotificationIOS(event){
		var pushNotification = window.plugins.pushNotification;
        console.log("Received a notification! " + event.alert);
        console.log("event sound " + event.sound);
        console.log("event badge " + event.badge);
        console.log("event " + event);
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            console.log("Set badge on  " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
	}

// Acceleration Accelerometer -----------------------------------------	

	function PhoneGapAccelerometer_currentWatch() {
		console.log('PhoneGapAccelerometer_currentWatch ... ');
		navigator.accelerometer.getCurrentAcceleration(PhoneGapAccelerometer_onSuccess, PhoneGapAccelerometer_onError);

	}

    function PhoneGapAccelerometer_startWatch() {
		console.log('PhoneGapAccelerometer_startWatch ... ');
        var options = { frequency: 1000 };
        PhoneGapAccelerometer_watchID = navigator.accelerometer.watchAcceleration(PhoneGapAccelerometer_onSuccess, PhoneGapAccelerometer_onError, options);
    }

    function PhoneGapAccelerometer_stopWatch() {
		
        if (PhoneGapAccelerometer_watchID) {
			console.log('PhoneGapAccelerometer_stopWatch ... ');
            navigator.accelerometer.clearWatch(PhoneGapAccelerometer_watchID);
            PhoneGapAccelerometer_watchID = null;
        }
    }
	
	
	function PhoneGapAccelerometer_onTrigger(acceleration) {
		console.log('PhoneGapAccelerometer_onSuccess ');
		
        var txt_innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
                            'Acceleration Y: ' + acceleration.y         + '<br />' +
                            'Acceleration Z: ' + acceleration.z         + '<br />' +
                            'Timestamp:      ' + acceleration.timestamp + '<br />';
							
		$('#phonegap_output').text(txt_innerHTML);
		
    }

	

    function PhoneGapAccelerometer_onSuccess(acceleration) {
		console.log('PhoneGapAccelerometer_onSuccess ');
		
        var txt_innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
                            'Acceleration Y: ' + acceleration.y         + '<br />' +
                            'Acceleration Z: ' + acceleration.z         + '<br />' +
                            'Timestamp:      ' + acceleration.timestamp + '<br />';
							
		$('#phonegap_output').text(txt_innerHTML);
		
    }

    function PhoneGapAccelerometer_onError() {
		console.log('PhoneGapAccelerometer_onError ');
        alert('Accelerometer error: ');
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