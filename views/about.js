MyApp.about = function (params) {
	
	var toolbar = {
            items: [
              {
                  align: "left",
                  widget: "button",
                  options: {
                      type: "back",
                      text: "Back",
                      clickAction: function(e) {
                           MyApp.app.navigate('home');;
                      }
                  }
              },
              {
                  align: "right",
                  widget: "dropDownMenu",
                  options: {
                      items: [
                          "Add",
                          "Edit",
                          "Remove"
                      ]
                  }
              },
              {
                  align: "center",
                  text: "Toolbar"
              }
            ]
    };	


		// RIMINI 44.435505,10.976787
	// S.ARCANGELO 44.057082,12.5646
	
	var latitude = ko.observable(44.435505);
	var longitude= ko.observable(10.976787);
	var latitude1 = ko.observable(44.057082);
	var longitude1 = ko.observable(12.5646);

	var self = this;

	var	messaggio = ko.observable('Setup');
	var	titolo = 'Setup111111';
		
	function buttonClicked() {
			console.log('PhoneGap check ... ');
			console.log('isPhoneGapReady : ' + isPhoneGapReady);
			console.log('isAndroid : '+ isAndroid);
			console.log('isBlackberry : ' + isBlackberry);
			console.log('isIphone  : ' + isIphone);
			console.log('isWindows  : ' + isWindows);
			console.log('deviceUUID  : ' + deviceUUID);
			console.log('isConnected  : ' + isConnected);
			console.log('isHighSpeed  : ' + isHighSpeed);
			console.log('internetInterval  : '+ internetInterval);
			getPhoneGapCompassHeading();
			console.log('Heading : ' + compassHeading); 
		   // get array push item
    };
	
	function StartPhoneGapNetwork(){
		PhoneGap_networkDetection();
		console.log(PhoneGap_networkDescription);
		var element = document.getElementById('phonegap_output');
        element.innerHTML = PhoneGap_networkDescription      + '<br />' +
                            '<hr />'      + element.innerHTML;
	};
	
	
	function StartPhoneGapCompass(){
		PhoneGapCompass_startWatch();
	};
	
	function StopPhoneGapCompass(){
		PhoneGapCompass_stopWatch()
	};
	
    function StartPhoneGapGeolocation(){
		PhoneGapGeolocation_startWatch();
	};
	
    function StopPhoneGapGeolocation(){
		PhoneGapGeolocation_stopWatch();
	};	
	
	function StartPhoneGapAcceleration(){
		PhoneGapAccelerometer_startWatch();
	};
		
	function StopPhoneGapAcceleration(){
		PhoneGapAccelerometer_stopWatch();
	};
	
	function GetCurrentPhoneGapAcceleration(){
		PhoneGapAccelerometer_currentWatch();
	};
	
	function ResetLog(){
		$("#phonegap_output").html('<li>Log reset!</li>');
	};
	
	function StartBarcodeScanner(){
		var scanner = cordova.require("cordova/plugin/BarcodeScanner");
		scanner.scan(
			function (result) {
				alert("We got a barcode\n" +
					"Result: " + result.text + "\n" +
					"Format: " + result.format + "\n" +
					"Cancelled: " + result.cancelled);
			}, 
			function (error) {
				alert("Scanning failed: " + error);
			}
		);
	};

	function StartPhoneGapPlaySound(){
		PhoneGapPlaySound();
	};
	
	function StartPushNotification(){
		initPushNotification();
	};
	
    return {
		latitude: latitude,
		longitude: longitude,
		latitude1: latitude1,
		longitude1: longitude1,
		self: self,
		messaggio: messaggio,
		titolo: titolo,
		StartPhoneGapNetwork : StartPhoneGapNetwork,
		StartPhoneGapCompass : StartPhoneGapCompass,
		StopPhoneGapCompass : StopPhoneGapCompass,
		StartPhoneGapAcceleration : StartPhoneGapAcceleration,
		StopPhoneGapAcceleration : StopPhoneGapAcceleration,
		StopPhoneGapGeolocation : StopPhoneGapGeolocation,
		StartPhoneGapGeolocation  : StartPhoneGapGeolocation,
		StartPhoneGapPlaySound  : StartPhoneGapPlaySound,
		StartBarcodeScanner: StartBarcodeScanner,
		StartPushNotification: StartPushNotification,
		ResetLog: ResetLog,
		GetCurrentPhoneGapAcceleration : GetCurrentPhoneGapAcceleration,
		buttonClicked: buttonClicked		
	};
};