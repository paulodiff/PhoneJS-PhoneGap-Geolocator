"use strict";

MyApp.createGeolocationViewModel = function() {
    var geo_id = ko.observable(),
		name = ko.observable(),
		latitude = ko.observable(),
		longitude = ko.observable(), 
		altitude = ko.observable(),
		accuracy = ko.observable(),
		altitudeAccuracy = ko.observable(),
		heading = ko.observable(),
		speed = ko.observable(),
		timestamp = ko.observable(),
		datesaved = ko.observable(),
		timesaved = ko.observable();
		
    function clear() {
        fromJS({
            geo_id: Globalize.format( new Date(), "ddMMMMyyyyhhmmssfff" ),
			name: null,
            latitude: null,
			longitude: null,
			altitude : null,
			accuracy : null,
			altitudeAccuracy : null,
			heading : null,
			speed : null,
			timestamp : null,
			datesaved : Globalize.format( new Date(), "dd/MMMM/yyyy" ),
			timesaved : Globalize.format( new Date(), "hh:mm:ss" )
        });
    }

	function randomData() {
        fromJS({
            geo_id: Globalize.format( new Date(), "ddMMMMyyyyhhmmssfff" ),
			name: 'randomData' + Globalize.format( new Date(), "ddMMMMyyyyhhmmssfff" ),
            latitude: 11.1,
			longitude: 22.2,
			altitude: 101,
			accuracy: 1,
			altitudeAccuracy: 1,
			heading: 100,
			speed: 50,
			timestamp: 3429384792,
			datesaved: Globalize.format( new Date(), "dd/MMMM/yyyy" ),
			timesaved: Globalize.format( new Date(), "hh:mm:ss" )
        });
    }

    function fromJS(data) {
		geo_id(data.geo_id);
		name(data.name);
        latitude(data.latitude);
		longitude(data.longitude);
		altitude(data.altitude);
		accuracy(data.accuracy);
		altitudeAccuracy(data.altitudeAccuracy);
		heading(data.heading);
		speed(data.speed);
		timestamp(data.timestamp);
		datesaved(data.datesaved);
		timesaved(data.timesaved);
    }

    function toJS() {
        return {
			
		geo_id: geo_id(),
		name: name(),
        latitude: latitude(),
		longitude: longitude(),
		altitude: altitude(),
		accuracy: accuracy(),
		altitudeAccuracy: altitudeAccuracy(),
		heading: heading(),
		speed: speed(),
		timestamp: timestamp(),
		datesaved: datesaved(),
		timesaved: timesaved()
			
        }
    }

	/*
	
    function handleDone(e) {
        save();
        DXWorkout.removeCurrentWorkout();
        DXWorkout.app.navigate("Log", { root: true });
    }
 

    function save() {
        var data = toJS();

        if (typeof (data.date) == "object") {
            data.date = data.date.toJSON();
        }
        
        if(!data.id) {
            data.id = DXWorkout.currentId;
            id(DXWorkout.currentId);
            DXWorkout.insertWorkout(data);
        } else {
            DXWorkout.updateWorkout(data.id, data);
        }
        
    }

    function handlePostpone(e) {
        started(false);
        DXWorkout.saveCurrentWorkout();
        DXWorkout.app.navigate("CreateWorkout/" + DXWorkout.currentId);
    }

    function handleStart(e) {
        started(true);
        DXWorkout.saveCurrentWorkout();
        DXWorkout.app.navigate("EditWorkout/" + DXWorkout.currentId);
    }

    function isEmpty() {
        return !id() && !started() && !goal() && !notes();
    }

    function handleCancel(e) {
        if(!isEmpty()) {
            if(!confirm("Are you sure you want to cancel this workout?"))
                return;
            if(id())
                DXWorkout.deleteWorkout(id());
        }
        DXWorkout.removeCurrentWorkout();
        DXWorkout.app.navigate("Log", { root: true });
    }
       
    title = ko.computed(function() {
        var format = "MMM d, yyyy",
            bag = [Globalize.format(date(), format)];

        if(goal())
            bag.push("-", goal());

        return bag.join(" ");
    });

	*/
	
    return {
        
        
		geo_id : geo_id,
		name : name,
		latitude : latitude,
		longitude : longitude, 
		altitude : altitude,
		accuracy : accuracy,
		altitudeAccuracy : altitudeAccuracy,
		heading : heading,
		speed : speed,
		timestamp : timestamp,
		datesaved : datesaved,
		timesaved : timesaved,
		
		randomData : randomData,	
        toJS: toJS,
        fromJS: fromJS,
        clear: clear
    };
};