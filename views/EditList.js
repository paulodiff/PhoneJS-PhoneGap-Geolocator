"use strict";




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


MyApp.EditList = function(params) {
    var key = params.id,
        title,
        titleBag,
        newValue = ko.observable(""),
        emptyValue = "Enter new " + key + "...",
        keySettings = ko.observableArray();

    titleBag = ["Edit ", key.substr(0,1).toUpperCase(), key.substr(1)];
    if (key != "equipment")
        titleBag.push("s");
    title = titleBag.join("");

    function showToast(message) {
        DevExpress.ui.notify({ message: message, position: { of: '.dx-viewport .layout-content' } });
    }

    function handleDeleteClick(e) {
        var message = key.substr(0, 1).toUpperCase() + key.substr(1) + " \"" + e.model + "\" was deleted";
        keySettings.splice(keySettings.indexOf(e.model), 1);
        MyApp.saveSettings(key, keySettings());

        showToast(message);
    }

	var MongolabDriver = {
			search:function(query) {
				var dfr = $.Deferred();
			$.ajax({
			 url:"https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_",
			 //data:{q:query},
			 dataType:'json',
			 type: 'GET',
			 success:dfr.resolve
			});
			return dfr.promise();
		  }
		}
	
	//MongolabDriver.search('intridea').then(function(data) { alert(data.results[0].text);});
	
	
	function handleAddClick() {
	
		var added = false,
            formattedNewValue = $.trim(newValue());
	
		//var message = key.substr(0, 1).toUpperCase() + key.substr(1) + " \"" + e.model + "\" was deleted";
		if(formattedNewValue) {
		
		var deferred = new $.Deferred();
		
		Geolocation_rr.name = formattedNewValue + new Date().getTime();
		Geolocation_rr.latitude = (Math.random() * (50)).toFixed(5);
		Geolocation_rr.longitude = (Math.random() * (50)).toFixed(5); 
		Geolocation_rr.altitude = 3455.344;
		Geolocation_rr.accuracy = 1;
		Geolocation_rr.altitudeAccuracy = 33;
		Geolocation_rr.heading = 2234;
		Geolocation_rr.speed = 11;
		Geolocation_rr.timestamp = new Date().getTime();
		Geolocation_rr.datesaved = Globalize.format( new Date(), "dd/MMMM/yyyy" );
		Geolocation_rr.timesaved = Globalize.format( new Date(), "hh/mm/ss" );
		
		$.ajax( { url: "https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_",
				 data: JSON.stringify( Geolocation_rr ),
				 type: "POST",
				 success:deferred.resolve,
				 contentType: "application/json" } );
				 
				 
				 
		}
		// add geolocation
		deferred.promise();
		
		console.log('add_click');
		var message = "New " +  formattedNewValue + " was added";
		showToast(message);
	}
	
    function handleAddClick_old() {
        var added = false,
            formattedNewValue = $.trim(newValue());
        newValue(""); 
        if(formattedNewValue) {
            var message = "New " + key + " \"" + formattedNewValue + "\" was added";
            $.each(keySettings(), function(key, value) {
                if (value.toLowerCase() === formattedNewValue.toLowerCase()) {
                   added = true;
                   return false; 
                }
            });
            if(!added) {
                keySettings.push(formattedNewValue);
                keySettings.sort();
            }

            MyApp.saveSettings(key, keySettings());
            showToast(message);
        }   
    }
	
	//var goal = ["Abs", "Arms", "Back", "Chest", "Legs", "Shoulders"];
	var goal = [];
	var goal2 = [];
	
	var dataSourceXML = {
      load: function (loadOptions) {
        if (loadOptions.refresh) {
          var resultData;
		  
		  //MongolabDriver.search('intridea').then(function(data) { return data; });
		  
		  var deferred = new $.Deferred();
          //$.get('http://127.0.0.1:8989/gitroot/PhoneJS/ApplicationTemplate/books.xml')
		  $.get('https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_')
           .done(function (result) {
			  //console.log('done....' + result);
			  //console.log($.toJSON(result));
			  
			  // XML Parsing
			  //$(result).find("book").each(function()
			  //{
		      //console.log($(this).attr("id"));
			  //	goal.push($(this).attr("id") + ' ' +  $(this).find("author").text());
			  //	goal2.push( { 
			  //					'book_id' :  $(this).attr("id") , 
			  //					'author_name': $(this).find("author").text()  
			  //				});
			  //});
			  
		
			  //console.log(goal2);
		
			  deferred.resolve(result);
			  
              //resultData = result;
            });
          return deferred;
        }
      }
    }

			
	
	//keySettings(MyApp.settings[key]);
	keySettings(goal);


    return {
        currentNavigationItemId: "Settings",

        keySettings: keySettings,
        title: title,
        newValue: newValue,
        emptyValue: emptyValue,
		dataSourceXML: dataSourceXML,
        handleDeleteClick: handleDeleteClick,
        handleAddClick: handleAddClick
    };
};