"use strict";

!function($, DX, myapp, undefined) {
    var DATA_VERSION_KEY = "GEOLOCATION-VERSION",
        CURRENT_KEY = "GEOLOCATION-CURRENT-KEY",
        GEOLOCATION_KEY = "GEOLOCATION-KEY",
        DATA_VERSION = "2",
        geolocationArray;

    function insertGeolocation(geoloc) {
        geolocationArray.push(geoloc);
        saveGeolocations();
    }
	
	function getGeolocation(geo_id) {
		var geo_item = ko.utils.arrayFirst(geolocationArray(), function(item) {
			return item.geo_id === geo_id;
		});
		
		console.log('getGeolocation : ' + geo_id );
		
		return geo_item;
	}
	

	/* updateWorkout
    function updateWorkout(id, workout) {
        var index,
            array = workoutArray();
        for (index = 0; index < array.length; index++) {
            if (array[index].id === id)
                break;
        }

        workoutArray.splice(index, 1, workout);
        saveWorkouts();
    }
	*/

    function deleteGeolocation(geo_id) {
        geolocationArray.remove(function(item) {
            return item.geo_id === geo_id;
        });
        saveGeolocations();
    }

    function saveGeolocations() {
        localStorage.setItem(GEOLOCATION_KEY, JSON.stringify(geolocationArray()));
    }

	/* initCurrentWorkout
    function initCurrentWorkout() {
        var current = wo.createWorkoutViewModel(),
            savedData = localStorage.getItem(CURRENT_KEY);
        if (savedData)
            current.fromJS(JSON.parse(savedData));
        else
            current.clear();

        wo.currentWorkout = current;
        wo.currentId = current.id() || (new DevExpress.data.Guid).toString();
    }
	*/

	/* setCurrentWorkoutById
    function setCurrentWorkoutById(id) {
        var workout = wo.currentWorkout,
            currentId = wo.currentId;

        if (id != currentId) {
            var index,
                foundItem,
                array = workoutArray();
            for (index = 0; index < array.length; index++) {
                if (array[index].id === id) {
                    foundItem = array[index];
                    break;
                }
            }

            workout = wo.createWorkoutViewModel();
            if (foundItem)
                workout.fromJS(foundItem);
            else
                workout.clear();
            wo.currentWorkout = workout;
            wo.currentId = id;
        } else if (!workout) {
            workout = wo.createWorkoutViewModel();
            workout.clear();
            wo.currentWorkout = workout;
        }
        return workout;
    }

    function saveCurrentWorkout() {
        var data = JSON.stringify(wo.currentWorkout.toJS());
        localStorage.setItem(CURRENT_KEY, data);
    }

    function removeCurrentWorkout() {
        localStorage.removeItem(CURRENT_KEY);

        wo.currentWorkout = null;
        wo.currentId = (new DevExpress.data.Guid).toString();
    }

    function initSetting(key) {
        var settingsFromStorage = localStorage.getItem("dxworkout-settings-" + key),
            currentSettings;
        if(settingsFromStorage) {
            currentSettings = JSON.parse(settingsFromStorage); 
        } else {
           currentSettings = wo.defaultSettings[key]; 
        }
        wo.settings[key] = currentSettings;
    }

    function saveSetting(key, value) {
        wo.settings[key] = value;
        localStorage.setItem("dxworkout-settings-" + key, JSON.stringify(value));
    }

	*/
	
	function initUserData() {
		console.log('initUserData...');
		var result = $.Deferred();
		var storageData = localStorage.getItem(GEOLOCATION_KEY);
        //var data = storageData ? JSON.parse(storageData) : wo.sampleData;
        //var state = data.length > 0 ? myapp.initStates.NORMAL: myapp.initStates.EMPTY;

		var data = storageData ? JSON.parse(storageData) : [];
		var state = data.length > 0 ? myapp.initStates.NORMAL: myapp.initStates.EMPTY;
        geolocationArray = myapp.geolocations = ko.observableArray(data);
        return result.resolve(state).promise();
	}	
	
	/* initUserData
	
    function initUserData() {
        var result = $.Deferred();

        if(localStorage.getItem(DATA_VERSION_KEY) !== DATA_VERSION) {
            clearUserData();
            localStorage.setItem(DATA_VERSION_KEY, DATA_VERSION);
        }

        initSetting("goal");
        initSetting("exercise");
        initSetting("equipment");
        initSetting("lengthUnit");
        initSetting("weightUnit");
        initCurrentWorkout();

        var storageData = localStorage.getItem(WORKOUTS_KEY);
        var data = storageData ? JSON.parse(storageData) : wo.sampleData;
        var state = data.length > 0
                ? wo.initStates.NORMAL
                : wo.initStates.EMPTY;

        workoutArray = wo.workouts = ko.observableArray(data);
        return result.resolve(state).promise();
    }

	
	
    function clearUserData() {
        var localStorageKeys = [
            CURRENT_KEY,
            WORKOUTS_KEY,
            DATA_VERSION,
            "dxworkout-settings-exercise",
            "dxworkout-settings-equipment",
            "dxworkout-settings-lengthUnit",
            "dxworkout-settings-weightUnit"
        ];

        $.each(localStorageKeys, function () {
            localStorage.removeItem(this);
        });
    }

	*/
	
	function clearAllGeolocations(){
		localStorage.removeItem(GEOLOCATION_KEY);
		geolocationArray.removeAll();
	}
	
	
    $.extend(myapp, {

		geolocations: null,
		insertGeolocation: insertGeolocation,
		deleteGeolocation: deleteGeolocation,
		getGeolocation: getGeolocation,
		saveGeolocations: saveGeolocations,
		clearAllGeolocations : clearAllGeolocations,
		initUserData: initUserData

	/*
		workouts: null,
        insertWorkout: insertWorkout,
        updateWorkout: updateWorkout,
        deleteWorkout: deleteWorkout,
        initUserData: initUserData,
        clearUserData: clearUserData,
        setCurrentWorkoutById: setCurrentWorkoutById,
        saveCurrentWorkout: saveCurrentWorkout,
        removeCurrentWorkout: removeCurrentWorkout,
        saveSettings: saveSetting,
        settings: {}
	*/
		
    });

    
}(jQuery, DevExpress, MyApp);