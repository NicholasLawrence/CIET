function menuController() {
	var Menu = require('../Model/MenuSchema');
	var UserPreferences = require('../Model/UserPreferencesSchema');
	var _ = require('underscore');

	this.getMenu = function(req, res, next) {
		var last_id = req.params.last_menu_id;
		var limit = req.params.limit;
		var user_id = parseInt(req.params.user_id);
		
		if(!user_id)res.send(404);

		Menu.find({_id : { $gt: last_id }})
			.limit(parseInt(limit))
			.sort({_id : 1})
			.populate({
				path: 'items.allergy_risks.allergy_id'
				
			})
			.lean()
			.exec(function(err, menuResult) {
				if(err) {
					console.log(err);
				}
				else {
					UserPreferences.findOne({_id: user_id}, function(err,userPrefResult){
						if(err) console.log(err)
						else {
							if(!userPrefResult.allergies) res.send(404);
							menuResult.forEach(function(menu){
								menu.items.forEach(function(item){
									item.allergy_risks.forEach(function(allergy) {
										var match = _.find(userPrefResult.allergies, function(userAllergy){
											return allergy.allergy_id._id === userAllergy.allergy_id
										});

										if(match){
											allergy.userHasAllergy = true;
											allergy.userAllergySeverity = match.severity;	
										} 
									});
								});
							});
							return res.send(menuResult);
						}
					})
				}
			});
	};


	return this;
};

module.exports = new menuController();