
module.exports = function searchName (req, res, personal) {
	let user = {
		id: Math.floor(Math.random() * (9999, 9999999)) + 1,
		user: req.body
	};

	let passUmber = Number(user.user.passUmber);

	function newUser(personal) {
		personal.push(user)
		res.redirect('/personalLIst.html')
	}newUser(personal);
}