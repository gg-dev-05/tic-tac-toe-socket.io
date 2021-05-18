const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
	gameID: {
		type: String,
		required: true,
		unique: true,
	},
	players: {
		type: [
			{
				type: String,
			},
		],
		validate: [arrayLimit, "{PATH} exceeds the limit of 2"],
	},
});

function arrayLimit(val) {
	return val.length <= 2;
}

module.exports = model("Game", gameSchema);
