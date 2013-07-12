MyApp.geolocation = function(params) {

function ViewModel()
    {
        var self = this;
		this.lat = ko.observable(40.749825);
        this.lng = ko.observable(-73.987963);
		this.loc = ko.observable();
		this.lat_lng = ko.computed(function() { return self.lat() + " : " + self.lng(); } );
		
		this.options = {
            provider: 'google',
            mapType: 'roadmap',
            location: ko.observable(this.lat() + "," + this.lng()),
			//location: ko.observable(),
			//location: "44.05983592536113, 12.576427459716797 ",
			//markers : ko.observableArray(),
			width: '100%',
            height: '500',
            //height: "500",
            zoom: ko.observable(8)
        };
		
		
		this.gotoSavePosition = function(){
		};
		
		this.locateSimplePosition = function(){
		
			//console.log('locateSimplePosition');
		
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
			//viewModel.options.zoom(7);
			
			//map.panTo(mapped);
			
			//map.option('location.lng',lat1);
			//map.option('location.lat',lng1);
			//map.option('zoom',zoom1);
			
		
		};
		
		this.locatePosition = function(){
			var map = $('#map').dxMap('instance');
			var viewModel = this;
		
			
		
			//viewModel.lat(44.05703525659159);
			//viewModel.lng(12.56474953315258);
		
			if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function (position) {
							viewModel.lat(position.coords.latitude);
							viewModel.lng(position.coords.longitude);
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
						}, function () {
							handleNoGeolocation(true);
						});
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
			Geolocation_rr.altitude = 3455.344;
			Geolocation_rr.accuracy = 1;
			Geolocation_rr.altitudeAccuracy = 33;
			Geolocation_rr.heading = 2234;
			Geolocation_rr.speed = 11;
			Geolocation_rr.timestamp = new Date().getTime();
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