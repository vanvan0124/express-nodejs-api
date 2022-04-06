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

		cart : [

			{

					productId : {
					type : String,
					required : [true, "product id i required"]
				},

					dateAddedtoCart : {
						type : Date,
						default :new Date()
				}
				
			}

		],

		purchased : [
			{
				productId : {
					type : String,
					required : [true, "ProductId is required"],
					
				},

				datePurchased : {
					type : Date,
					default : new Date()
				}

			}

		]

});

module.exports = mongoose.model("User", userSchema);