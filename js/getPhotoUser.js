module.exports = function getPhotoUser (req, res, avatar) {
	res.sendFile(avatar)
}