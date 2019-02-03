module.exports = function getPhotoUser (req, res) {
	let namePhoto = req.params.name;
	res.send(namePhoto)
}