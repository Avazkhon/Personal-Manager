module.exports = function deliteUser (req, res, archivem, personal) {
	let index = Number(req.body.index);
	function deletePerson () {
		let deleteUser = personal[index];
		archivem.push(deleteUser) // добавить в архив
		personal.splice(index, 1) // удалить из массива персонала
		res.send(personal) 
		console.log(deleteUser, "перемещен в archivem")
	}deletePerson()
}