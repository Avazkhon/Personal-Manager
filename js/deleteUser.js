module.exports = function deliteUser (req, res, archivem, personal) {
	let index = Number(req.body.index);
	function deletePerson () {
		personal.splice(index, 1)
		console.log(personal, index)
		res.send(personal)
	}deletePerson()
}