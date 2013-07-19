"use strict";

window.MyApp = {};


!function () {

	var myapp  = window.MyApp;
    //var device = 
	DevExpress.devices.current("iPhone");
	var device = DevExpress.devices.current();
	$.extend(myapp, {
        defaultSettings: {
            goal: ["Abs", "Arms", "Back", "Chest", "Legs", "Shoulders"],
            exercise: ["Back extension", "Bench press", "Bent-over row", "Biceps curl", "Calf raise", "Chest fly", "Chin-up", "Close-grip bench press", "Crunch",
                "Deadlift", "Dip", "Front raise", "Good-morning", "Handstand push-up", "Hyperextension", "Lateral raise", "Leg curl", "Leg extension", "Leg press",
                "Leg raise", "Lunge", "Machine fly", "Military press", "Pulldown", "Pullup", "Push-up", "Pushdown", "Rear delt raise", "Rowing at cable machine",
                "Seated row", "Shoulder press", "Shoulder shrug", "Sit-up", "Squat", "Supine row", "Triceps extension", "Upright row"],
            equipment: ["Back fly station", "Back row station", "Barbell", "Chin-up bar", "Decline bench", "Dip bar", "Dumbbells", "Ez-curl-bar", "Flat bench",
                "Incline bench", "Kettlebells", "Leg curl bench", "Leg extension bench", "Power rack station", "Preacher curl station", "Pulldown station"],
            lengthUnit: "miles",
            weightUnit: "lbs"
        },
        initStates: {
            NORMAL: "normal",
            EMPTY: "emptyLog"
        },
        isWinPhone: device.platform === "win8" && device.phone,

        currentId: null,
		saveSettings: function() {
			console.log('....saving settings');
		}
		
		
    });


	$(function() {

		// force device to iphone
		
		MyApp.app = new DevExpress.framework.html.HtmlApplication({
			namespace: MyApp,
			
			defaultLayout: "navbar",
			
			navigation: [
			  {
				title: "Home",
				action: "#home",
				icon: "home"
			  },
			  {
				title: "About",
				action: "#about",
				icon: "info"
			  },
			  {
				title: "Geo List",
				action: "#geopositionsList",
				icon: "tags"
			  },
			  {
				title: "Compass",
				action: "#compass",
				icon: "globe"
			  },
			   {
				title: "Geolocation",
				action: "#geolocation",
				icon: "globe"
			  },
			  {
				title: "Geolocator",
				action: "#geolocator",
				icon: "globe"
			  }
			]
		});
		
		MyApp.app.router.register(":view/:id", {view: "home", id: undefined });
		//MyApp.app.router.register(":view/:id");
		
		
		
		// wait PhoneGap Event and Hide SplashScreen...
		/*
		 setTimeout(function () {
                document.addEventListener("deviceready", function () {
					console.log('.... go!');
                    if(myapp.isWinPhone) {
                        document.addEventListener("backbutton", function() {
                            if(myapp.app.canBack()) {
                                myapp.app.back();
                            }
                            else {
                                throw new Error("exit");
                            }
                        }, false);
                    }
                    navigator.splashscreen.hide();
                }, false);
            }, 1000);
			
		*/
		//
		// Simple start up PhoneGap
		//
		
		// call to library of PhoneGap-Common.js
		initPhoneGap();
	
		/*
	
		document.addEventListener("deviceready", onDeviceReady, false);

		function onDeviceReady()
		{
		
			console.log('..starting PhoneGap..');
			var startView = "home";
			MyApp.app.navigate(startView);   
		} 
		
		*/
		
		// TO REMOVE with Phonegap
		MyApp.app.navigate();
		
		//navigator.splashscreen.show();
		
	});
		
}();