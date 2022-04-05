const Order = require("../models/Orders")



module.exports.retrieveAllOrders = (req, res) => {

		Order.find({})
		
		.then(result => res.send(result))
		.catch(error => res.send(error));

};