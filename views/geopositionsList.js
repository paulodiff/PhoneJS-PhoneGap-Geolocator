MyApp.geopositionsList = function(params) { 

	/*

    var lists = [
        {
            items: KitchenSink.db.products,
            grouped: ko.observable(false),
            customTemplate: ko.observable(false),
            showSearchField: ko.observable(false)
        },
        {
            items: KitchenSink.db.productsGrouped,
            grouped: ko.observable(true),
            customTemplate: ko.observable(false),
            showSearchField: ko.observable(false)
        },
        {
            items: ko.observable(KitchenSink.db.productsCustom),
            grouped: ko.observable(false),
            customTemplate: ko.observable(true),
            showSearchField: ko.observable(true),
            searchQuery: ko.observable().extend({ throttle: 500 })
        }
    ];

    var viewModel = {
        tabs: [
            { text: "Simple" },
            { text: "Grouped" },
            { text: "Custom" }
        ],
        selectedTab: ko.observable(0),
        tabContent: ko.observable()
    };

    lists[2].searchQuery.subscribe(function(value) {
        var result = $.grep(KitchenSink.db.productsCustom, function(product, index) {
            var regExp = new RegExp(value, "i");
            return !!product.Name.match(regExp);
        });
        lists[2].items(result);
    });
	 
    ko.computed(function() {
        viewModel.tabContent(lists[viewModel.selectedTab()]);
    });
    
	
	*/
	
	
	
	/*
	
	var dataSourceXML = {
      load: function (loadOptions) {
		//console.log('kdfsdf');
		//console.log(loadOptions.refresh);
        if (loadOptions.refresh) {
          var resultData;
		  
		  //MongolabDriver.search('intridea').then(function(data) { return data; });
		  
		  var deferred = new $.Deferred();
          //$.get('http://127.0.0.1:8989/gitroot/PhoneJS/ApplicationTemplate/books.xml')
		  // https://api.mongolab.com/api/1/databases/my-db/collections/my-coll?s={"priority": 1, "difficulty": -1}&apiKey=myAPIKey
		  // https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?s={"datesaved": -1, "timesaved": -1}&apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_		  
		  // 'https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_'
		  var http_get = 'https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?s={"datesaved": -1, "timesaved": -1}&apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_';
		  
		  $.get(http_get)
           .done(function (result) {

		
		
			  deferred.resolve(result);
			  //console.log('data loaded!');
			  
              //resultData = result;
            });
          return deferred;
        }
      }
    };
	
	*/
	

	/*
	
	var actionSheetData = [
		{text:"Reply", clickAction: function(){ processClick("Reply")}},
		{text:"ReplyAll", clickAction: function(){ processClick("ReplyAll")}},
		{text:"Forward", clickAction: function(){ processClick("Forward")}},
		{text:"Delete", clickAction: function(){ processClick("Delete")}}
	];
	
	*/
	
	
	function ViewModel(){
	
		var self = this;
		var itemId2Delete = null;
		this.actionSheetData = [
			
			{text:"Delete", clickAction: function(){ self.deleteItem(); }}
		];
		this.actionSheetVisible = ko.observable(false);
		this.dataSourceXML = {
		  load: function (loadOptions) {
			if (loadOptions.refresh) {
			  var resultData;
			  var deferred = new $.Deferred();
			  //$.get('http://127.0.0.1:8989/gitroot/PhoneJS/ApplicationTemplate/books.xml')
			  // https://api.mongolab.com/api/1/databases/my-db/collections/my-coll?s={"priority": 1, "difficulty": -1}&apiKey=myAPIKey
			  // https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?s={"datesaved": -1, "timesaved": -1}&apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_		  
			  // 'https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_'
			  var http_get = 'https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?s={"datesaved": -1, "timesaved": -1}&apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_';
			  
			  $.get(http_get)
			   .done(function (result) {
				  deferred.resolve(result);
				});
			  return deferred;
			}
		  }
		};
		
		this.deleteItem = function(){
			var message = "Item deleted! Lat : " + this.itemId2Delete ;
		
			DevExpress.ui.notify({ message: message, position: { of: '.dx-viewport .layout-content' } });
		}
		
		this.processClick = function(name){
			alert(name + " clicked");
			this.actionSheetVisible(false);
		};
		
		this.showActionSheet = function () {
			this.actionSheetVisible(true);
		};
		
		this.handleClickItem = function (e, itemData) {
			console.log('buttonClick : ' + 'Click for Id=' + itemData._id.$oid + ', Name=' + itemData.latitude);
			
			this.itemId2Delete = itemData._id.$oid;
			
			// delete item popup!
            // alert('Click for Id=' + itemData._id.$oid + ', Name=' + itemData.latitude);
			this.actionSheetVisible(true);
			//return false;
			//e.jQueryEvent.stopPropagation();
			//e.preventDefault();
			//e.stopPropagation();
			
			return false;
			
        };	
			
		
	}
	
	var vm = new ViewModel();
	return vm;
	
	/*
	
	var viewModel = {

		actionSheetData: actionSheetData,
		dataSourceXML: dataSourceXML,
		actionSheetVisible: ko.observable(false),
        selectedTab: ko.observable(0),
		searchQuery: ko.observable('cco').extend({ throttle: 500 }),
		
		processClick: function(name){
			alert(name + " clicked");
			this.actionSheetVisible(false);
		},
		
		showActionSheet: function () {
			this.actionSheetVisible(true);
		},
		
		handleClickItem: function (e, itemData) {
			console.log('buttonClick');
			
			// delete item popup!
            // alert('Click for Id=' + itemData._id.$oid + ', Name=' + itemData.latitude);
			actionSheetVisible(true);
			return false;
        },	
        tabContent: ko.observable()
    };
	
	*/
	    
};