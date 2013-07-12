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
	
	var bearing  = ko.computed(function() {
		var bearing_1 = getBearing(latitude(),longitude(),latitude1(),longitude1());
		$compass = $("#compass");
		var bearing_1_int = parseInt(bearing_1);
		var rotateDeg = 'rotate(' + bearing_1_int + 'deg)';
		console.log(bearing_1_int);
		$compass.css('-webkit-transform', rotateDeg);
		return bearing_1;
    }, this);
	
	var	messaggio = ko.observable('Setup');
	var	titolo = 'Setup111111';
		
	function buttonClicked() {
           //alert('1backxxxxx1');
		   // get array push item
		   
		   $compass = $("#compass");
		   //var rotation = 360 - heading;
		   var rotation = Math.random() * (100);
		   var rotateDeg = 'rotate(' + rotation + 'deg)';
		   $compass.css('-webkit-transform', rotateDeg);
		   
		   
    };
		
		
		
	function radians(n) {
		return n * (Math.PI / 180);
	}
	function degrees(n) {
		return n * (180 / Math.PI);
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
		
	

    

    return {
		latitude: latitude,
		longitude: longitude,
		latitude1: latitude1,
		longitude1: longitude1,
		bearing: bearing,
		self: self,
	
		
		messaggio: messaggio,
		titolo: titolo,
		buttonClicked: buttonClicked		

	};
};