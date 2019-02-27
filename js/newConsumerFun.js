const fs = require('fs')
const ObjectID = require('mongodb').ObjectID;
let db = require('../db/db');

exports.all = function (colB) {
  db.get().collection("consumers").find().toArray((err, doc)=>{
    colB(err, doc)
  })
}

exports.create = function (consumer, colB) {
  db.get().collection("consumers").insert(consumer, (err, result)=>{
    if(err) {
      console.log(err)
    }
    colB(err, result)
  })
}


// создания нового пользователя
// module.exports = function newConsumerFun(req, res, consumers, dir) {
// 	let consumer = req.body;
// 	let nameBD = [consumer[0].nameCompany]

// 	let newEmail = consumers.map((item)=>{
// 		return item.user.email;
// 	})
// 	// вернуть истину если нашел
// 	let newConsumers = consumers.some(getEmail=>{
// 		if(getEmail.user.email == consumer[0].email || getEmail.user.nameCompany == consumer[0].nameCompany){

// 			return true
// 		}
// 		else return false
// 	})

// 	if(newConsumers) {
// 		res.status(400).send(`Вы регистрировались рание?`)
// 	}
// 	if(!newConsumers) {
// 		consumers.push({
// 			id: new Date(),
// 			user: consumer[0],
// 			photo: ["images.jpg"],
// 			kay: {
// 			  kay: getkay(),
// 			  kayStstus: false
// 			},
// 			company: {
// 				nameCompany: consumer[0].nameCompany,
// 				DB: newDB(nameBD),
// 			}
// 		})
		
// 		res.status(201).send("Зарегистрирован новый пользователь!")
// 	}

// 	function getkay() {
// 		let randomkay = [];
// 		let arr = [
// 				'A', 'a', 'B', 'b' , 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm',
// 				'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z',
// 				 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
// 		]

// 		for(let i = 0; i < 16; i++) {
// 			randomkay += arr[Math.floor(arr.length * Math.random())];
// 		}
// 		if(randomkay.length == 16) {
// 			return randomkay;
// 		}
// 	}
	
// 	function newDB (nameBD) {
// 		let DB = nameBD.join()+"DB";
// 		fs.mkdir(dir+"/db/"+DB, (err) => {
// 			if(err) console.log(err);

// 			fs.mkdir(dir+"/db/"+DB+"/photo", (err) => {
// 				if(err) console.log(err);
// 				console.log("созданна новая папка" , DB)
// 			})

// 			fs.writeFile(dir+"/db/"+DB+"/archive.js", "module.exports = []", (err)=>{
// 				if(err) console.log(err);
// 				console.log("Создан Архив")
// 			})

// 			fs.writeFile(dir+"/db/"+DB+"/personals.js", "module.exports = []", (err)=>{
// 				if(err) console.log(err);
// 				console.log("Создана DB для персонала")
// 			})

// 		})
// 		return DB
// 	}
// }
