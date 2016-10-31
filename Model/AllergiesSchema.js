module.exports = (function AllergiesSchema() {
	var mongoose = require('../DataAccess/mongoose').mongoose;

	var schema = {
		_id: {type: Number},
		name: String
	};

	var collectionName = 'Allergies';
	var allergiesSchema = new mongoose.Schema(schema, {collection: 'Allergies'});
	var Allergies = mongoose.model(collectionName, allergiesSchema);
	
	return Allergies;
})();