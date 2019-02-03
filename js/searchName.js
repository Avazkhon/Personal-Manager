
module.exports = function searchName (req, res, personal) {
	let namePhoto = req.files.foo.name;
	let user = {
		id: Math.floor(Math.random() * (9999, 9999999)) + 1,
		user: req.body,
		photo: [namePhoto]
	};

	let passNumber = Number(user.user.passNumber);

	function newUser(personal, passNumber) {
		let num = personal.map((item)=>{
			return Number(item.user.passNumber)
		})

		let number = num.some(number=>{
			if(number===passNumber){
				return true
			}
		})

		if(!number) {
			personal.push(user)
			res.redirect('/personalLIst.html')
		}

		else{
			res.sendStatus(404)
		}
		upload()
		
	}newUser(personal, passNumber);

	function upload() {
		let name = req.files.foo.name;
		let foo = req.files.foo;
	  	foo.mv(`/db/photo/${name}.jpg`, function(err) {
	  		console.log(name)
	  });
	}
}