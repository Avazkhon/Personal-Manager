module.exports = function getInnerUserScript(req, res, consumers) {
		let consumer = req.body;

		let newEmail = consumers.map((item)=>{
			return item.user.email;
		})
		// вернуть истину если нашел
		let newConsumers = consumers.some(getEmail=>{
			console.log(getEmail.user.email , consumer[0].email)
			if(getEmail.user.email == consumer[0].email){

				return true
			}
			else return false
		})

		if(newConsumers) {
			res.status(400).send(`Вы регистрировались рание?`)
		}
		if(!newConsumers) {
			consumers.push({
				id: new Date(),
				user: consumer[0],
				photo: ["images.jpg"],
				kay: getkay()
			})
			
			res.status(201).send("Добро пожаловать!")
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