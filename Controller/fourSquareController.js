function fourSquareController() {
	var request = require('request');
	var config = require('../config')

	this.getRestaurantsExplore = function(req, res, next) {
		var params = {
			//from config
			client_id: config.foursquare_client_id,
			client_secret: config.foursquare_client_secret,
			near: config.foursquare_location,
			section: "food",
			v: config.foursquare_version,
			//user supplied
			limit: req.params.limit,
			offset: req.params.offset,
			time: req.params.time,
			day: req.params.day,
			openNow: req.params.openNow,
			venuePhotos: req.params.photos,
			price: req.params.price,
			specials: req.params.specials
		};

		request.get({url: 'https://api.foursquare.com/v2/venues/explore', qs: params}, function(error,r,result){
			if(error) console.log(error);
			else
				res.send(JSON.parse(result));
		});
	};

	return this;
}

module.exports = new fourSquareController();