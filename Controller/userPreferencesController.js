function userPreferencesController() {
	var UserPreferences = require('../Model/UserPreferencesSchema');

	this.getUserPreferences = function(req, res, next) {
		var user_id = parseInt(req.params.id);

		UserPreferences.find({_id : user_id})
			.populate('allergies.allergy_id')
			.exec(function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				return res.send(result);
			}
		});
	};

	this.setUserPreferences = function(req, res, next) {
		var user_id = parseInt(req.params.id);

		UserPreferences.findOneAndUpdate({_id : user_id}, 
			{
				_id : user_id,
				allergies : req.body.allergies
			}, {upsert: true, runValidators: true}, function(err, result)
			{
				if(err) {
					console.log(err);
				}
				else {
					return res.send(200);
				}
			});
	};

	return this;
}

module.exports = new userPreferencesController();