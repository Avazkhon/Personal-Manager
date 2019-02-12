module.exports = function getInnerUserScript(req, res, consumers ) {
		let consumer = req.body;

		let newEmail = consumers.map((item)=>{
			return item.user.email;
		})
		// вернуть истину если нашел
		let newConsumers = consumers.some(getEmail=>{
			if(getEmail.email == consumer[0].email){
				return true
			}
		})

		if(newConsumers) {
			console.log(newEmail + " уже существует", newConsumers)
			res.status(400).send(`${consumer[0].email} уже существует`)
		}
		if(!newConsumers) {
			consumers.push({
				id: new Date(),
				user: consumer[0],
				photo: ["images.jpg"],
				kay: getkay()
			})
			console.log(consumer[0] + " не существует")
			res.status(201).send(`${consumer[0].email}  не существует`)
		}

		function getkay() {
			let randomkay = [];
			let arr = [
					'A', 'a', 'B', 'b' , 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm',
					'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z',
					 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
			]

			for(let i = 0; i < 16; i++) {
				randomkay += arr[Math.floor(arr.length * Math.random())];
			}
			console.log(randomkay.length)
			if(randomkay.length == 16) {
				return randomkay;
			}
		}
		console.log(consumers)
	}