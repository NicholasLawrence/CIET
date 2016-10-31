module.exports = function(app,restify) {
	var Menu = require('../Controller/menuController');
	var UserPreferences = require('../Controller/userPreferencesController');

	app.get('/', function(req, res, next) {
		return res.send("Can I Eat This? ");
	});

	//Menu
	app.get('/menu/:last_menu_id/:limit', Menu.getMenu);

	//User Preferences
	app.get('/user/:id/preferences', UserPreferences.getUserPreferences);
	app.put('/user/:id/preferences', UserPreferences.setUserPreferences);

	//Images
	app.get(/\/Images\//, restify.serveStatic({
	  directory: './Images'
	}));
}