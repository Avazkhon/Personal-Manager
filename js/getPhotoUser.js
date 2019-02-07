module.exports = function getPhotoUser (req, res, name) {
	console.log(req.params.name)
	if(req.params.name === undefined) {
		sendStatus(400)
	}

	res.sendFile(name)
}