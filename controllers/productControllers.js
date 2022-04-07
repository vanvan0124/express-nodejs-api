const Product = require("../models/Products")

const User = require("../models/User")

module.exports.createProducts = (req, res) => {

			let newProduct = new Product({
					name : req.body.name,
					description : req.body.description,
					price : req.body.price

			});

			newProduct.save()
			.then(user => res.send('Created Product Successfully'))
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

module.exports.findProduct = (req, res) => {

		Product.find({name : {$regex : req.body.name, $options : '$i'}})
		.then( result => {

			if(result.length === 0) {

				return res.send('No product found')
			
			} else {
				return res.send(result)
			}

		})
		.catch(error => res.send(error))

};



module.exports.addToCart = async (req, res) => {

				if(req.user.isAdmin) {
					return res.send("Action Forbidden")

				};



				let isCartUpdated = await User.findById(req.user.id)
				.then(user => {

				let newCart = {

					productId : req.body.productId
				}

				user.cart.push(newCart);

				return user.save().then(user => true).catch(err => err.message)
				});


				if(isCartUpdated !== true){
				return res.send({message : isCartUpdated})	

				};

				if(isCartUpdated) {

				return res.send({message : 'Item added to Cart!'})
				}



};