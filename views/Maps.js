
MyApp.Maps = function(params) {


function ViewModel()
    {
        var self = this;
        self.wiTemplates = ko.observableArray();
		this.lat = ko.observable(40.749825);
        this.lng = ko.observable(-73.987963);
		this.mappaId = params.id;
		this.loc = ko.observable();
		this.messaggio = 'Maps.js';
		var	titolo = 'Maps';

		this.options = {
            provider: 'google',
            mapType: 'roadmap',
            //location: [viewModel.lat(), viewModel.lng()],
			location: ko.observable(),
			//location: "44.05983592536113, 12.576427459716797 ",
			//markers : ko.observableArray(),
            width: "100%",
            //height: "500",
            zoom: ko.observable(15)
        };
		
		this.locatePosition = function(){
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
				
					
		};		
				
				
				
		
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
		
		
		
    }

	//console.log(1);
	
    var vm = new ViewModel();

    ko.applyBindings(vm);

	return vm;


	/*

	function getLocationData() {
		var deferred = new $.Deferred();
		var http_url = 'https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations/' +  params.id + '?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_';
		$.get(http_url)
          .done(function (result) {

			var mapped = result.latitude + "," + result.longitude;
			console.log(mapped);
		  
		      deferred.resolve(mapped);
			
			return new ViewModel(mapped);
			
          });
        return deferred;
    }
    

	function ViewModel( _loc_ ) {
        this.lat = ko.observable(40.749825);
        this.lng = ko.observable(-73.987963);
		this.mappaId = params.id;
		this.loc = _loc_;

        this.viewShown = function () {
            var map = $('#map').dxMap('instance');
            var viewModel = this;
            map._initMap().done(function () {
			
				
			
                map.addMarker({
                    location: viewModel._loc_,
                    tooltip: 'Location: ' + viewModel.lat() + "; " + viewModel.lng()
                }, function (marker) {
                    marker.setDraggable(true);
                    google.maps.event.addListener(marker, 'dragend', function (e) {
                        viewModel.lat(e.latLng.hb);
                        viewModel.lng(e.latLng.ib);
                    });
                });
            });
        };
    }

	return getLocationData();
	
    //return new ViewModel();
	*/
	
	/*


    var viewModel = {
		
		lat: ko.observable(44.05983592536113),
        lng: ko.observable(12.576427459716797),
		mappaId : params.id,
		selectedTab: ko.observable(0),
		messaggio : 'messaggio-maps.js',
		
        options: {
            provider: 'google',
            mapType: 'roadmap',
            //location: [viewModel.lat(), viewModel.lng()],
			//location: ko.observable(),
			location: "44.05983592536113, 12.576427459716797 ",
			//markers : ko.observableArray(),
            width: "100%",
            //height: "500",
            zoom: ko.observable(15)
        },
    };
	
	
	var http_url = 'https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations/' +  params.id + '?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_';

	// load default data
   
   */
   
   /*
	
   var http_url = 'https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations/' +  params.id + '?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_';
   
   //var deferred = new $.Deferred();
   $.ajax( { url: http_url,
					 //data: JSON.stringify( Geolocation_rr ),
					 type: "GET",
					 //success:deferred.resolve,
					 contentType: "application/json" } )
			.done(function (result, viewModel) {
					 
						//deferred.resolve;
						console.log('RESULT+' + result);
						console.log(result);
						console.log(result.latitude);
						console.log(result.longitude);
						
						
						viewModel.lat(result.latitude);
						viewModel.lng(result.longitude);
						viewModel.options.location( result.latitude + ',' + result.longitude );
							
						return viewModel;						
							
						// TODO load data into DIV	
							
					 });
			
			// add geolocation
	//deferred.promise();
			
	//var message = "New position was added";
	//showToast(message);	
				
	//DevExpress.ui.notify({ message: message, position: { of: '.dx-viewport .layout-content' } });
   
   
	console.log('location:');
	console.log(viewModel.options.location);
				
    ko.applyBindings(viewModel);
 	
	viewModel.lat(44.05682274227982);
	viewModel.lng(12.564510816550182);
	viewModel.options.location( viewModel.lat() + ',' + viewModel.lng() );
	viewModel.options.zoom(15);
	
	return viewModel;
	
	*/
	
};