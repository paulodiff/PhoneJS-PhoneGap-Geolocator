function radians(n) { return n * (Math.PI / 180); }
function degrees(n) { return n * (180 / Math.PI); }
function getHeading (){	var rotation = Math.random() * (350); }

function getHaversine(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = radians(lat2-lat1);
    var dLon = radians(lon2-lon1);
    var lat1 = radians(lat1);
    var lat2 = radians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}


function getBearing(startLat,startLong,endLat,endLong){
  startLat = radians(startLat);
  startLong = radians(startLong);
  endLat = radians(endLat);
  endLong = radians(endLong);

  var dLong = endLong - startLong;

  var dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));
  if (Math.abs(dLong) > Math.PI){
	if (dLong > 0.0)
	   dLong = -(2.0 * Math.PI - dLong);
	else
	   dLong = (2.0 * Math.PI + dLong);
  }

  return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
}	


//setInterval($root.updateMyLocation(),2000);

MyApp.geolocator = function (params) {
	
		
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
	
	function ViewModel(){
	
		var self = this;
		this.messaggio = ko.observable('geolocator');
		this.titolo = 'geolocator';
		this.finalLatitude = ko.observable(44.435505);
		this.finalLongitude= ko.observable(10.976787);
		this.currentLatitude = ko.observable(44.000001111);
		this.currentLongitude = ko.observable(12.00001111);
		this.heading = ko.observable(1000);
		
		this.finalLocation = ko.computed(function() { return self.finalLatitude() + " : " + self.finalLongitude(); } );
		this.currentLocation = ko.computed(function() { return self.currentLatitude() + " : " + self.currentLongitude(); } );
		
		this.haversine = ko.computed(function() {
			var hav = getHaversine(this.currentLatitude(),this.currentLongitude(),this.finalLatitude(),this.finalLongitude());	
			return hav;
			}, this);
			
		this.bearing  = ko.computed(function() {
			var bearing_1 = getBearing(this.currentLatitude(),this.currentLongitude(),this.finalLatitude(),this.finalLongitude());
			$compass = $("#compass");
			var bearing_1_int = parseInt(bearing_1);
			var rotateDeg = 'rotate(' + bearing_1_int + 'deg)';
			//console.log(bearing_1_int);
			$compass.css('-webkit-transform', rotateDeg);
			return bearing_1;
			}, this);
		
		
		this.updateMyLocation = function() {
           
		   
		   //Random data settings
		   
			var delta_lat = Math.random() * (10);
			var delta_lng = Math.random() * (10);
		   
			console.log(delta_lat + ":" + delta_lng);

		   	self.currentLatitude(self.finalLatitude() + delta_lat);
			self.currentLongitude(self.finalLongitude() + delta_lng);
  
		};
		
		
		// start tracking position - search
		this.startTracking = function() {
			$('#trackingStatus').text('Run!');
			
			var options = { enableHighAccuracy: true, timeout: 3000 };
			PhoneGapGeolocation_watchID = navigator.geolocation.watchPosition( 
				function (position) {
				
					//console.log('traking updated .... ' + position.coords.latitude + ' ' + position.coords.longitude);
					self.currentLatitude(position.coords.latitude);
					self.currentLongitude(position.coords.longitude);
					self.heading(position.coords.heading);
					
					$compass = $("#compass1");
					var heading_int = parseInt(position.coords.heading);
					var rotateDeg = 'rotate(' + heading_int + 'deg)';
					$compass.css('-webkit-transform', rotateDeg);
					
					$compass = $("#compass2");
					var real_direction = heading_int + self.bearing();
					if (real_direction > 360 ) real_direction = real_direction - 360;
					var rotateDeg = 'rotate(' + real_direction + 'deg)';
					$compass.css('-webkit-transform', rotateDeg);

				},
				function () {
							handleNoGeolocation(true);
						}
			
			, options);
		
		};
		
		// stop tracking
		this.stopTracking = function() {
			PhoneGapGeolocation_stopWatch();
			$('#trackingStatus').text('Stop!');
		
		};
		
		
		if(params.id) {
		
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
				
				self.finalLatitude(data.latitude);
				self.finalLongitude(data.longitude);

            }
        });
		
		} else {
				self.finalLatitude(20);
				self.finalLongitude(20);
		}
		
		//setInterval(self.updateMyLocation(),2000);
		
	}
	
	//console.log(1);
	
    var vm = new ViewModel();
	//ko.applyBindings(vm);
	return vm;
	
	//setInterval(vm.updateMyLocation(),2000);

};