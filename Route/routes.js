module.exports = function(app,restify) {
	var Menu = require('../Controller/menuController');
	var UserPreferences = require('../Controller/userPreferencesController');
	var FourSquare = require('../Controller/fourSquareController');

	app.get('/', function(req, res, next) {
		return res.send("Can I Eat This? ");
	});

	//Menu
	app.get({path: '/menu/:last_menu_id/:limit', version: '1.0.0'}, Menu.getMenu);

	//User Preferences
	app.get({path: '/user/:id/preferences', version: '1.0.0'}, UserPreferences.getUserPreferences);
	app.put('/user/:id/preferences', UserPreferences.setUserPreferences);

	//Images
	app.get({path: /\/Images\//, version: '1.0.0'}, restify.serveStatic({
	  directory: './Images'
	}));

	//FourSquare
	app.get({path: '/restaurant', version: '2.0.0'}, FourSquare.getRestaurantsExplore);
}