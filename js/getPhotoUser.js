module.exports = function getPhotoUser (req, res, avatarName) {
	if(req.params.name === undefined || req.params.key === undefined) {
		sendStatus(400)
	}

	res.sendFile(avatarName)
}