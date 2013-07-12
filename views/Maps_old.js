//MyApp.Maps = fun



MyApp.Maps = function(params) {

    var viewModel = {
        tabs: [
            { text: "Google map1" },
			{ text: "Bing map1" },
        ],
		
		lat: ko.observable(44.05983592536113),
        lng: ko.observable(12.576427459716797),

		selectedTab: ko.observable(0),
		
		mappaId : params.id,
				
		locatePositionX : function(){
		
			var map = $('#map').dxMap('instance');
            var viewModel = this;
		
			viewModel.lat(44.05703525659159);
			viewModel.lng(12.564749533152508);
		
			if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function (position) {
							//viewModel.lat(position.coords.latitude);
							//viewModel.lng(position.coords.longitude);
							//map.setZoom(10);
							//map.mapOptions.zoom = 1;
							
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
						}, function () {
							handleNoGeolocation(true);
						});
					} else {
						// Browser doesn't support Geolocation
						handleNoGeolocation(false);
					};
				
			console.log(map.getZoom());	
			
			
					
		},		
				
				
		addPosition: function (){
		
			var deferred = new $.Deferred();
			var viewModel = this;
			
			Geolocation_rr.name = new Date().getTime();
			Geolocation_rr.latitude = viewModel.lat();
			Geolocation_rr.longitude = viewModel.lng(); 
			Geolocation_rr.altitude = 3455.344;
			Geolocation_rr.accuracy = 1;
			Geolocation_rr.altitudeAccuracy = 33;
			Geolocation_rr.heading = 2234;
			Geolocation_rr.speed = 11;
			Geolocation_rr.timestamp = new Date().getTime();

			
			
			$.ajax( { url: "https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_",
					 data: JSON.stringify( Geolocation_rr ),
					 type: "POST",
					 success:deferred.resolve,
					 contentType: "application/json" } );
			
			// add geolocation
			deferred.promise();
				
			var message = "New position was added";
			//showToast(message);	
				
			DevExpress.ui.notify({ message: message, position: { of: '.dx-viewport .layout-content' } });
				
		},			
				
				
		locatePosition: function(){
		
			var map = $('#map').dxMap('instance');
            var viewModel = this;
		
			if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function (position) {
							viewModel.lat(position.coords.latitude);
							viewModel.lng(position.coords.longitude);
							//map.setZoom(10);
							//map.mapOptions.zoom = 1;
											
							
							
							map.addMarker({
								location: [viewModel.lat(), viewModel.lng()],
								tooltip: 'Io sono qui'
							}, function (marker) {
								marker.setDraggable(true);
								google.maps.event.addListener(marker, 'dragend', function (e) {
									//if (map.getZoom() > 16) 
									viewModel.lat(e.latLng.hb);
									viewModel.lng(e.latLng.ib);
								});
								
			
							});
						}, function () {
							handleNoGeolocation(true);
						});
					} else {
						// Browser doesn't support Geolocation
						handleNoGeolocation(false);
					};
				
			console.log(map.getZoom());	
			
			
					
		},
		
		
		viewShow2 : function () {
		
		
		},
		
		viewShown1: function () {
            var map = $('#map').dxMap('instance');
            var viewModel = this;
            map._initMap().done(function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {

                        viewModel.lat(position.coords.latitude);
                        viewModel.lng(position.coords.longitude);
					
						
                        map.addMarker({
                            location: [viewModel.lat(), viewModel.lng()],
                            tooltip: 'You\'re here'
                        }, function (marker) {
                            marker.setDraggable(true);
                            google.maps.event.addListener(marker, 'dragend', function (e) {
                                viewModel.lat(e.latLng.hb);
                                viewModel.lng(e.latLng.ib);
                            });
                        });

                    }, function () {
                        handleNoGeolocation(true);
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleNoGeolocation(false);
                };
            });
        },
		
        options: {
            provider: 'google',
            mapType: 'roadmap',
            //location: [viewModel.lat(), viewModel.lng()],
			location: ko.observable(),
			markers : ko.observableArray(),
            width: "100%",
            //height: "500",
            zoom: 10
        },
    };
	

	// load default data
   
	
   var http_url = 'https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations/' +  params.id + '?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_';
   
   //var deferred = new $.Deferred();
   $.ajax( { url: http_url,
					 //data: JSON.stringify( Geolocation_rr ),
					 type: "GET",
					 //success:deferred.resolve,
					 contentType: "application/json" } ).done(function (result) {
					 
						//deferred.resolve;
						console.log(result);
							
						// TODO load data into DIV	
							
					 });
			
			// add geolocation
	//deferred.promise();
			
	var message = "New position was added";
			//showToast(message);	
				
	DevExpress.ui.notify({ message: message, position: { of: '.dx-viewport .layout-content' } });
   
	
	console.log(viewModel.options.location);
					
	
	
	

    ko.applyBindings(viewModel);
 	
	return viewModel;
	
		
};