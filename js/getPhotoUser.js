module.exports = function getPhotoUser (req, res, name) {
	if(req.params.name === undefined) {
		sendStatus(400)
	}

	res.sendFile(name)
}