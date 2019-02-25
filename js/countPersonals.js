module.exports = function countPersonals(req, res, getBD, dir) {
	const personal = require(dir +`/db/${getBD}/personals`);
	let paramsKey = req.params.key;
	console.log(getBD)
	function getPosition() {
		getArr(personal)
	}getPosition()

	function getArr(personal){
		let arr = [{"count" :personal.length}]
		res.send(arr)
	}
}