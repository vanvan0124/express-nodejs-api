const Product = require("../models/Products")

module.exports.createProducts = (req, res) => {

			let newProduct = new Product({
					name : req.body.name,
					description : req.body.description,
					price : req.body.price

			});

			newProduct.save()
			.then(user => res.send(user))
			.catch(error => res.send(error));

};

module.exports.getAllProducts = (req, res) => {

	 Product.find({})
	 .then(products => res.send(products))
	 .catch(error => res.send(error));
};