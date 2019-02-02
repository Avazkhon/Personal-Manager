module.exports = function deliteUser (req, res, archivem, personal) {
	let id = Number(req.body.id);
	function deletePerson () {
		let userId;
		for(let i=0; i<personal.length; i++){
			if(personal[i].id === id) {
				userId = personal[i].id;
				archivem.push(userId) // добавить в архив\

				console.log(personal[i], "перемещен в archivem")

				personal.splice(i, 1) // удалить из массива персонала
				res.send(personal) 
			}
		}
	}deletePerson()
}