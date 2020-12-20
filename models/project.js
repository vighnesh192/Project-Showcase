const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Project = new Schema(
	{
		projectName: {
			type: String,
			default: "",
		},
		projectDescription: {
			type: String,
			default: "",
		},
		upvotes: {
			type: Number,
			default: 0
		},
		downvotes: {
			type: Number,
			default: 0
		},
		group: {
			type: String,
			default: '',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Project", Project);
