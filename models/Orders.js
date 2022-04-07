const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

		
		
				buyerId : {
					type : String,
					required : [true, "order id is required"]
				},
				
				buyerEmail : {
					type : String,
					required : [true, "email is required"]

				},

				productId : {
					type : String,
					required : [true, "product id is required"],

				},

				orderDate : {
					type : Date,
					default : new Date()
				}

				
});

module.exports = mongoose.model("Order", orderSchema);