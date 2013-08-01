MyApp.geolocSimple = function(params) {


function ViewModel()
    {
        var self = this;
		this.loadPanelVisible = ko.observable(false);
		this.numOfLocalization = 0;
		this.lat = ko.observable(40.749825);
        this.lng = ko.observable(-73.987963);
		this.name = ko.observable('desc...qui');
		
		this.accuracy = ko.observable(0);      
        this.altitudeAccuracy = ko.observable(0);
        this.heading = ko.observable(0);
        this.speed = ko.observable(0);
        this.timestamp = ko.observable(0);
				
		this.loc = ko.observable();
		this.lat_lng = ko.computed(function() { return self.lat() + " : " + self.lng(); } );
		this.disabledButtonSaveValue = ko.observable(true);
				
		
		// start loop GPS
		this.locateStartWatch = function(){
		
			var viewModel = this;
		
			viewModel.loadPanelVisible(true);
		
			var options = { maximumAge: 1000, timeout: 3000, enableHighAccuracy: true };
			PhoneGapGeolocation_watchID = navigator.geolocation.watchPosition( 
				function (position) {
	
					console.log('traking updated .... ' + position.coords.latitude + ' ' + position.coords.longitude);
					
					viewModel.lat(position.coords.latitude);
					viewModel.lng(position.coords.longitude);
					viewModel.accuracy(position.coords.accuracy);      
					viewModel.altitudeAccuracy(position.coords.altitudeAccuracy);
					viewModel.heading(position.coords.heading);
					viewModel.speed(position.coords.speed);
					viewModel.timestamp(position.timestamp);
					
					console.log('locatePosition: ' + viewModel.lat() + ":" + viewModel.lng());
					
					viewModel.disabledButtonSaveValue(false);
					viewModel.loadPanelVisible(false);
					
					
					viewModel.numOfLocalization = viewModel.numOfLocalization + 1;
							
					
	
					$('#output_debug').text(PhoneGapGeolocation_watchID + ' ' + position.timestamp + '@'+ viewModel.numOfLocalization);
				},
				function () {
							handleNoGeolocation(true);
						}
			
			, options);
		};
		
		// stop Geolocation and saving .....
		this.locateStopWatch = function(){
			var viewModel = this;
			PhoneGapGeolocation_stopWatch();
			viewModel.savePosition();
			$('#output_debug').text('geo stopped!');
		
		};
		
		// save Position to local store	
		this.savePosition = function (){
		
			var deferred = new $.Deferred();
			var viewModel = this;
			
			var geoItem = MyApp.createGeolocationViewModel();
			
			geoItem.clear();
			geoItem.name(viewModel.name());
			geoItem.latitude(viewModel.lat());
			geoItem.longitude(viewModel.lng()); 
			//geoItem.altitude = ko.observable(),
			geoItem.accuracy(viewModel.accuracy());
			//geoItem.altitudeAccuracy = ko.observable(),
			//geoItem.heading = ko.observable(),
			//geoItem.speed = ko.observable(),
			geoItem.timestamp(viewModel.timestamp());
			//geoItem.datesaved = ko.observable(),
			//geoItem.timesaved = ko.observable();
			
			MyApp.insertGeolocation(geoItem.toJS());
			
			// add geolocation
			deferred.promise();
				
			var message = "New position was added. Lat : " + viewModel.lat() + " long : " +   viewModel.lng() ;
			//showToast(message);	
				
			DevExpress.ui.notify({ message: message, position: { of: '.dx-viewport .layout-content' } });
		};
    }

	
    var vm = new ViewModel();
	return vm;
	
};