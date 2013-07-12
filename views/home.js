MyApp.home = function (params) {

    var viewModel = {
//  Put the binding properties here
		messaggio: ko.observable('Gestione posizione gps'),
		titolo: 'Titolo',
		gotoSavePosition: function(){},
		gotoSearchPosition: function(){
			MyApp.app.navigate('geopositionsList');
		},
		gotoGeolocation: function(){
			MyApp.app.navigate('geolocation');
		},
		gotoDemo: function(){
			MyApp.app.navigate('geolocator/51de5f6be4b0d57a4b05316b');
		},
		
		gotoCompass: function(){
			MyApp.app.navigate('compass');
		}
		
    };

    return viewModel;
};