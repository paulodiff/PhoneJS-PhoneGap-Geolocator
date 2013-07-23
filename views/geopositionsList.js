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
	var dataSourceXML = {
      load: function (loadOptions) {
		//console.log('kdfsdf');
		//console.log(loadOptions.refresh);
        if (loadOptions.refresh) {
          var resultData;
		  
		  //MongolabDriver.search('intridea').then(function(data) { return data; });
		  
		  var deferred = new $.Deferred();
          //$.get('http://127.0.0.1:8989/gitroot/PhoneJS/ApplicationTemplate/books.xml')
		  $.get('https://api.mongolab.com/api/1/databases/demo_123/collections/geolocations?apiKey=DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_')
           .done(function (result) {

			/*
		   
				var mapped = $.map(result, function (data) {
					return {
						name: data.CategoryName,
						id: data.CategoryID
					}
				});
				
			*/
		
		
			  deferred.resolve(result);
			  //console.log('data loaded!');
			  
              //resultData = result;
            });
          return deferred;
        }
      }
    };
	

	
	var viewModel = {

		dataSourceXML: dataSourceXML,
        selectedTab: ko.observable(0),
		searchQuery: ko.observable('cco').extend({ throttle: 500 }),
		handleClickItem: function (e, itemData) {
			console.log('buttonClick');
            alert('Click for Id=' + itemData._id.$oid + ', Name=' + itemData.latitude);
			return false;
        },	
        tabContent: ko.observable()
    };
	
    return viewModel;
};