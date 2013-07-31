MyApp.demo1 = function() {

	//var geopositionsArray = ko.observableArray(null);
	var GEOLOCATIONS_KEY = "glck";	
	var geopositionsArray;

	function addGeolocation(){ 
			//alert('Hello world'); 
			var geoItem = MyApp.createGeolocationViewModel();
			geoItem.randomData();
			console.log(geoItem);
			console.log(geoItem.toJS());
			geopositionsArray.push(geoItem.toJS());
			saveGeolocations();
	}
	
	function delGeolocations(){ 
			geopositionsArray.removeAll();
			saveGeolocations();
	}
		
	function handleClickItem(e, itemData) {
			console.log('buttonClick : ...');
			this.actionSheetVisible(true);
			return false;
    }

	
	function saveGeolocations() {
		console.log(' saving ... : ' + JSON.stringify(geopositionsArray()));
        localStorage.setItem(GEOLOCATIONS_KEY, JSON.stringify(geopositionsArray()));
    }

	
	var actionSheetVisible = ko.observable(false);
	var actionSheetData = [	{text:"Delete", clickAction: function(){ self.deleteItem(); }} 	];

	// load item from storage
	var storageData = localStorage.getItem(GEOLOCATIONS_KEY);
	console.log(storageData);
	var data = storageData ? JSON.parse(storageData) : [];
	console.log(data);
	geopositionsArray = ko.observableArray(data);
	
	return {
        addGeolocation: addGeolocation,
		delGeolocations: delGeolocations,
        geopositionsArray: geopositionsArray,
		actionSheetData: actionSheetData,
		actionSheetVisible: actionSheetVisible,
        handleClickItem: handleClickItem
    };

	
}
	
/*	
	
    var viewModel = {
	
		geopositionsArray : ko.observableArray(null),
	
        addGeolocation: function()  addGeolocation{ 
			alert('Hello world'); 
			var geoItem = MyApp.createGeolocationViewModel();
			geoItem.randomData();
			this.geopositionsArray.push([ geoItem.toJS() ]);
			
		},
		handleClickItem: function(e, itemData) {
			console.log('buttonClick : ...');
			this.actionSheetVisible(true);
			return false;
			
        },
		
		dataSourceXML : {
			  load: function (loadOptions) {
				if (loadOptions.refresh) {
				  var resultData;
				  var result = new $.Deferred();
				  
				  var GEOLOCATIONS_KEY = "glck";	
				  var storageData = localStorage.getItem(GEOLOCATIONS_KEY);
				  var data = storageData ? JSON.parse(storageData) : [];
				  
				  var geoItem = MyApp.createGeolocationViewModel();
				  geoItem.randomData();
				  
				  console.log([ geoItem.toJS() ]);
				  
				  //this.geopositionsArray.push([ geoItem.toJS() ]);
				  return result.resolve(this.geopositionsArray).promise();
				  
				}
			  }
			},	
		//geopositionsArray : ko.observableArray(null),	
		actionSheetVisible : ko.observable(false),
		actionSheetData: [
				{text:"Delete", clickAction: function(){ self.deleteItem(); }}
			]

		
    };
    return viewModel;
}
*/

/*


MyApp.demo1	 = function(params) { 




	function hello() { alert('Hello world'); }
	
	
	function handleClickItem(e, itemData) {
			console.log('buttonClick : ...');
			
			//this.itemId2Delete = itemData._id.$oid;
			
			// delete item popup!
            // alert('Click for Id=' + itemData._id.$oid + ', Name=' + itemData.latitude);
			this.actionSheetVisible(true);
			
			return false;
			
        }	
	
	
	
	var dataSourceXML = {
		  load: function (loadOptions) {
			if (loadOptions.refresh) {
			  var resultData;
			  var result = new $.Deferred();
			  
			  var GEOLOCATIONS_KEY = "glck";	
			  var storageData = localStorage.getItem(GEOLOCATIONS_KEY);
			  var data = storageData ? JSON.parse(storageData) : [];
			  
			  var geoItem = MyApp.createGeolocationViewModel();
			  geoItem.randomData();
			  
			  this.geopositionsArray = ko.observableArray(null);
              return result.resolve(geoItem).promise();
			  
			}
		  }
		};

	var actionSheetVisible = ko.observable(false);	
	var actionSheetData = [
			{text:"Delete", clickAction: function(){ self.deleteItem(); }}
		];

			
	
		
	return {
	
		hello : hello
		//dataSourceXML : dataSourceXML,
		//actionSheetVisible: actionSheetVisible,
		//actionSheetData : actionSheetData,
		//handleClickItem :handleClickItem
		
		
	
	
	};
		
		
		
	/*

	var viewModel = {
	
		
		dataSourceXML : {
		  load: function (loadOptions) {
			if (loadOptions.refresh) {
			  var resultData;
			  var result = new $.Deferred();
			  
			  var GEOLOCATIONS_KEY = "glck";	
			  var storageData = localStorage.getItem(GEOLOCATIONS_KEY);
			  var data = storageData ? JSON.parse(storageData) : [];
			  
			  var geoItem = MyApp.createGeolocationViewModel();
			  geoItem.randomData();
			  
			  this.geopositionsArray = ko.observableArray(null);
              return result.resolve(geoItem).promise();
			  
			}
		  }
		},

	actionSheetVisible : ko.observable(false),
	actionSheetData: [
			{text:"Delete", clickAction: function(){ self.deleteItem(); }}
		],

			hello: function() { alert('Hello world'); }
	
	};	
		
		
	return viewModel;
	
	function ViewModel(){
	
		var self = this;
		var itemId2Delete = null;
		var geopositionsArray;
		
	
		this.actionSheetData = [
			{text:"Delete", clickAction: function(){ self.deleteItem(); }}
		];

		this.actionSheetVisible = ko.observable(false);
		
		this.dataSourceXML = {
		  load: function (loadOptions) {
			if (loadOptions.refresh) {
			  var resultData;
			  var result = new $.Deferred();
			  
			  var GEOLOCATIONS_KEY = "glck";	
			  var storageData = localStorage.getItem(GEOLOCATIONS_KEY);
			  var data = storageData ? JSON.parse(storageData) : [];
			  
			  var geoItem = MyApp.createGeolocationViewModel();
			  geoItem.randomData();
			  
			  this.geopositionsArray = ko.observableArray(null);
              return result.resolve(geoItem).promise();
			  
			}
		  }
		};


		
		this.deleteItem = function(){
			var message = "Item deleted! Lat : " + this.itemId2Delete ;
		
			DevExpress.ui.notify({ message: message, position: { of: '.dx-viewport .layout-content' } });
		};
		
		this.processClick = function(name){
			alert(name + " clicked");
			this.actionSheetVisible(false);
		};
		
		this.showActionSheet = function () {
			this.actionSheetVisible(true);
		};
		
		this.handleClickItem = function (e, itemData) {
			console.log('buttonClick : ...');
			
			//this.itemId2Delete = itemData._id.$oid;
			
			// delete item popup!
            // alert('Click for Id=' + itemData._id.$oid + ', Name=' + itemData.latitude);
			this.actionSheetVisible(true);
			
			return false;
			
        };	
			
		
	}
	
	var vm = new ViewModel();
	return vm;
	
	    
};

*/

