const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

		firstName : {
			type : String,
			required : [true, "First name is required"]
		},

		lastName : {
			type : String,
			required : [true, "Last name is required"]

		},

		email : {
			type : String,
			required : [true, "Email is required"]
		},

		password : {
			type : String,
			required : [true, "Password is required"]
		},

		phone : {
			type : String,
			required : [true, "Phone number is required"]
		},

		isAdmin : {
			type : Boolean,
			default : false

		},

		orders : [
			{
				productId : {
					type : String,
					required : [true, "ProductId is required"]

				},

				name : {
					type : String,
					required : [true, " Name is required"]

				},

				quantity : {
					type : Number,
					required : [true, "Quantity is required"] 
				},

				price : {
					type : Number,
					required : [true, "Price is required"]
				},

				datePurchased : {
					type : Date,
					default : new Date()
				}

			}

		]

});

module.exports = mongoose.model("User", userSchema);