MyApp.geolocation = function(params) {

function ViewModel()
    {
        var self = this;
		this.loadPanelVisible = ko.observable(false);
		this.numOfLocalization = 0;
		this.lat = ko.observable(40.749825);
        this.lng = ko.observable(-73.987963);
		
		this.accuracy = ko.observable(0);      
        this.altitudeAccuracy = ko.observable(0);
        this.heading = ko.observable(0);
        this.speed = ko.observable(0);
        this.timestamp = ko.observable(0);
				
		this.loc = ko.observable();
		this.lat_lng = ko.computed(function() { return self.lat() + " : " + self.lng(); } );
		this.disabledButtonSaveValue = ko.observable(true);
		
		this.options = {
            provider: 'google',
            mapType: 'roadmap',
            location: ko.observable(this.lat() + "," + this.lng()),
			//location: ko.observable(),
			//location: "44.05983592536113, 12.576427459716797 ",
			//markers : ko.observableArray(),
			width: '100%',
            height: '400',
            //height: "500",
            zoom: ko.observable(5)
        };
		
		
		// Random position for test
		this.locateSimplePosition = function(){
			var map = $('#map').dxMap('instance');
			var viewModel = this;
			var lat1 = Math.random() * (20); 
			var lng1 = Math.random() * (50); 
			var zoom1 = Math.random() * (10); 
			
			viewModel.lat(lat1);
			viewModel.lng(lng1);
			
			var mapped = viewModel.lat() + "," + viewModel.lng();
			viewModel.options.location(mapped);
			//viewModel.options.zoom(zoom1);
			console.log('locateSimplePosition:' + mapped);
		};
		
		
		
		// start loop GPS
		this.locateStartWatch = function(){
		
			var map = $('#map').dxMap('instance');
			var viewModel = this;
		
			viewModel.loadPanelVisible(true);
		
			var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
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
					
					viewModel.options.zoom(5);
							
					console.log('locatePosition: ' + viewModel.lat() + ":" + viewModel.lng());
					
					viewModel.disabledButtonSaveValue(false);
					viewModel.loadPanelVisible(false);
					
					
					viewModel.numOfLocalization = viewModel.numOfLocalization + 1;
							
					map.addMarker({
						location: [viewModel.lat(), viewModel.lng()],
						tooltip: 'Io sono qui 2'
					}, function (marker) {
						marker.setDraggable(true);
						google.maps.event.addListener(marker, 'dragend', function (e) {
							//if (map.getZoom() > 16) 
							viewModel.lat(e.latLng.hb);
							viewModel.lng(e.latLng.ib);
						});
					});	
	
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
		
		this.locatePosition = function(){
			var map = $('#map').dxMap('instance');
			var viewModel = this;
				
			//viewModel.lat(44.05703525659159);
			//viewModel.lng(12.56474953315258);
				
			console.log('load panel...');
			viewModel.loadPanelVisible(true);
			var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
		
			if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function (position) {
							viewModel.lat(position.coords.latitude);
							viewModel.lng(position.coords.longitude);
							viewModel.options.zoom(2);
							//map.setZoom(10);
							//map.mapOptions.zoom = 1;
							
							console.log('locatePosition: ' + viewModel.lat() + ":" + viewModel.lng());
							
							map.addMarker({
								location: [viewModel.lat(), viewModel.lng()],
								tooltip: 'Io sono qui 2'
							}, function (marker) {
								marker.setDraggable(true);
								google.maps.event.addListener(marker, 'dragend', function (e) {
									//if (map.getZoom() > 16) 
									viewModel.lat(e.latLng.hb);
									viewModel.lng(e.latLng.ib);
								});
							});
						
							console.log(' hide panel...');			
							viewModel.loadPanelVisible(false);
							
							// TODO save data!!!
							
							var message = "Nuova posizione salvata! Lat : " + viewModel.lat() + " long : " +   viewModel.lng() ;
							DevExpress.ui.notify({ message: message, position: { of: '.dx-viewport .layout-content' } });
							
						}, function () {
							handleNoGeolocation(true);
						}, options
						);
					} else {
						// Browser doesn't support Geolocation
						handleNoGeolocation(false);
					};
		};		
				
		this.savePosition = function (){
		
			var deferred = new $.Deferred();
			var viewModel = this;
			var Geolocation_rr = {
							name : '',
							latitude : '' ,
							longitude : '', 
							altitude : '',
							accuracy : '',
							altitudeAccuracy : '',
							heading : '',
							speed : '',
							datesaved : '',
							timesaved : '',
							timestamp : ''
						};
			
			Geolocation_rr.name = new Date().getTime();
			Geolocation_rr.latitude = viewModel.lat();
			Geolocation_rr.longitude = viewModel.lng(); 
			Geolocation_rr.altitude = viewModel.altitude
			Geolocation_rr.accuracy = viewModel.accuracy;
			Geolocation_rr.altitudeAccuracy = viewModel.altitudeAccuracy;
			Geolocation_rr.heading = viewModel.heading;
			Geolocation_rr.speed = viewModel.speed;
			Geolocation_rr.timestamp = viewModel.timestamp;
			Geolocation_rr.datesaved = Globalize.format( new Date(), "dd/MMMM/yyyy" );
		    Geolocation_rr.timesaved = Globalize.format( new Date(), "hh:mm:ss" );
						
			//console.log( Globalize.format( new Date(), "dd/MMMM/yyyy" ) );
			//console.log( Globalize.format( new Date(), "hh:mm:ss" ) );
			//console.log( Globalize.format( new Date(), "hh:mm:ss" ) );
						
			$.ajax( { url: "https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_",
					 data: JSON.stringify( Geolocation_rr ),
					 type: "POST",
					 success:deferred.resolve,
					 contentType: "application/json" } );
			
			// add geolocation
			deferred.promise();
				
			var message = "New position was added. Lat : " + viewModel.lat() + " long : " +   viewModel.lng() ;
			//showToast(message);	
				
			DevExpress.ui.notify({ message: message, position: { of: '.dx-viewport .layout-content' } });
				
		};

				
		
		/* GET POSITION FROM GPS --------------------------------  */
		
		/*
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
							console.log('navigator.geolocation:' + position.coords.latitude + ":" + position.coords.longitude);
							self.lat(position.coords.latitude);
							self.lng(position.coords.longitude);
							var map = $('#map').dxMap('instance');
							map.option('location.lng',self.lng());
							map.option('location.lat',self.lat());
							
						});
		};
		*/
				
		/* -------------------------------------------- */

		/* GET POSITION FROM DB	-----------------------------------------------		
		
		var http_url = 'https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations/' +  params.id + '?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_';
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: "",
			async: false,
            url: http_url,
            success: function (data)
            {
                //var mappedTemplates = $.map(allData, function (item) { return new wiTemplateInit(item.WiName, item.Description) });
                //self.wiTemplates({mappedTemplates: 'aaa'});
								
				var mapped = data.latitude + "," + data.longitude;
				self.options.location(mapped);
				self.options.zoom(7);
				self.loc(mapped);
				console.log(mapped);
            }
        });
		
		-------------------------------------------------------------------------- */
		
		
    }

	//console.log(1);
	
    var vm = new ViewModel();
	
	//vm.locatePosition();
	
    //ko.applyBindings(vm);
	
	//setInterval(vm.locatePosition,3000);

	return vm;


	
};