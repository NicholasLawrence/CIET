module.exports = (function menuSchema() {
	var mongoose = require('../DataAccess/mongoose').mongoose;
	var Allergies = require('./AllergiesSchema');

	var schema = {
		_id: {type: Number},
		items: [{
			name: String,
			image: String,
			description: String,
			ingredients: [{type: String}],
			allergy_risks: [
				{ 
					allergy_id: {type: Number, ref: 'Allergies'}, 
					severity: String 
				}
			]
		}]
	};

	var collectionName = 'Menu';
	var menuSchema = new mongoose.Schema(schema, {collection: 'Menu'});
	var Menu = mongoose.model(collectionName, menuSchema);
	
	return Menu;
})();