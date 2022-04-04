const User = require("../models/User");

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

		newUser.save()
		.then(user => res.send(user))
		.catch(error => res.send(error));

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


}


