module.exports = function verificationAccount(req, res, consumers) {
		let resConsumer;
		let consumer = consumers.some((item)=>{
			if(item.user.nameCompany == req.body.nameCompany ) {
				if(Number(item.user.password) === Number(req.body.password)) {
					if(item.user.email == req.body.email) {
						if(item.kay.kaystatus) {
						  resConsumer = item.user;
						  return true
						}

						resConsumer = item.user;
						resConsumer.kay = item.kay.kayStatus;
						return true
					}
				}
			}
		})

		console.log(resConsumer)
		if(consumer) {
			res.status(200).send(resConsumer)
			return
		}
		if(!consumer) {
			res.status(400).send("Попробуйте еще раз!")
			return
		}
	}