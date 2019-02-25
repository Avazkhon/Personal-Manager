const fs = require('fs')

module.exports = function deliteUser (req, res, getBD, dir) {
	const personal = require(dir +`/db/${getBD}/personals`);
	const archive = require(dir +`/db/${getBD}/archive`);
	let id = Number(req.body.id);
	function deletePerson () {
		let userId;
		for(let i=0; i<personal.length; i++){
			if(personal[i].id === id) {
				userId = personal[i].id;
				archive.push(userId) // добавить в архив\

				deletePhoto(personal[i].photo[0])

				console.log(personal[i], "перемещен в archive")

				personal.splice(i, 1) // удалить из массива персонала
				res.send(personal) 
			}
		}
	}deletePerson()

	function deletePhoto(name) {
		let pathPhoto = `./db/${getBD}/photo/${name}`;
		fs.unlink(pathPhoto, (err)=>{
			if(err) {
				console.log(err)
			}
			console.log(name, "фото удалено")
		})
	}
}