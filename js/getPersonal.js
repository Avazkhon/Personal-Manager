module.exports = function getPersonal (req, res, getBD, dir) {
	const personal = require(dir +`/db/${getBD}/personals`);
	res.send(personal)
}
