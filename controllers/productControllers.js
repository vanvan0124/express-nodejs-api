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

		 Product.find({isActive : true})
		 .then(products => res.send(products))
		 .catch(error => res.send(error));
};

module.exports.getSingleProduct = (req, res) => {

		Product.findById(req.params.id)
		.then(result => res.send(result))
		.catch(error => res.send(error));

};

module.exports.updateProductDetails = (req, res) => {

		let updates = {

			name : req.body.name,
			description : req.body.description,
			price : req.body.price

		}

		Product.findByIdAndUpdate(req.params.id, updates, {new :true})
		.then(result => res.send(result))
		.catch(error => res.send(error));

};

module.exports.archiveProduct = (req, res) => {

	let update = {

		isActive : false
	}
	Product.findByIdAndUpdate(req.params.id, update, {new : true})
	.then(result => res.send(result))
	.catch(error => res.send(error));
};



module.exports.viewArchive = (req, res) => {

	Product.find({isActive : false})
	.then(result => res.send(result))
	.catch(error => res.send(error));

};

module.exports.activateProduct = (req, res) => {

		let update = {
			isActive : true
		};
		Product.findByIdAndUpdate(req.params.id, update, {new : true})
		.then(result => res.send(result))
		.catch(error => res.send(error));

};
