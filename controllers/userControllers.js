const User = require("../models/User");

const Order = require("../models/Orders");

const bcrypt = require("bcrypt");

const auth = require("../auth")


module.exports.registerUser = (req, res) => {

		console.log(req.body);

		const hashedPW = bcrypt.hashSync(req.body.password, 10);

		let newUser = new User({

			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
			phone : req.body.phone,
			password : hashedPW
		});

		User.findOne({email : req.body.email})
		.then( result => {

			if(result === null){

				 newUser.save()
				 return res.send("Registration Successful")
			} else {
				return res.send("Email is already taken")
			}

		});


		/*newUser.save()
		.then(user => res.send(user))
		.catch(error => res.send(error));
*/
};

module.exports.userLogIn = (req, res) => {


		User.findOne({email: req.body.email})
		.then(foundUser => {

			if(foundUser === null){
				return res.send("Incorrect email");
			} else {

				const isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.password)

				if(isPasswordCorrect) {

					return res.send({accessToken: auth.createAccessToken(foundUser)})

				} else {

					return res.send("Password is incorrect")
				}

			}
		})
		.catch(err => res.send(err));


};


//view all users
module.exports.viewAllUsers = (req, res) => {

			User.find({})
			.then(users => res.send(users))
			.catch(error => res.send(error));


};



//update regular user to admin
module.exports.updateToAdmin = (req, res) => {

		let update = {

			isAdmin : true
		};

		User.findByIdAndUpdate(req.params.id, update, {new : true})
		.then(result => res.send(result))
		.catch(error => res.send(error));

};

module.exports.order = async (req, res) => {

				if(req.user.isAdmin) {
					return res.send("Action Forbidden")

				};



				let isUserUpdated = await User.findById(req.user.id)
				.then(user => {

				let newPurchased = {

					productId : req.body.productId
				}

				user.purchased.push(newPurchased);

				return user.save().then(user => true).catch(err => err.message)
				});


				if(isUserUpdated !== true){
				return res.send({message : isUserUpdated})	

				};

				let newOrder = await new Order({

					buyerId : req.user.id,
					productId : req.body.productId
				})

				newOrder.save()
				.then(result =>{

					if(isUserUpdated) {
					return res.send({message : 'Order Successful!'})
				}	

				})
				.catch(err => res.send(err))

	};


module.exports.retrieveOrders = (req, res) => {

		User.findById(req.user.id)
		.then(result => res.send(result.purchased))
		.catch(err => res.send(err));
};

