module.exports = (function userPreferencesSchema() {
	var mongoose = require('../DataAccess/mongoose').mongoose;
	var Allergies = require('./AllergiesSchema');

	var schema = {
		_id: {type: Number},
		allergies: [{
			allergy_id: {type: Number, ref: 'Allergies'},
			severity: String
		}],
		information_is_useful : Boolean,
		will_use_app_in_future : Boolean
	};

	var collectionName = 'UserPreferences';
	var userPreferencesSchema = new mongoose.Schema(schema, {collection: 'UserPreferences'});
	var UserPreferences = mongoose.model(collectionName, userPreferencesSchema);
	
	return UserPreferences;
})();