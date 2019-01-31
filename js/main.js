module.exports = function countPersonals(req, res, personal) {
	function getPosition() {
			getArr(personal)
	}getPosition()

	function getArr(personal){
		let arr = [{"count" :personal.length}]
		res.send(arr)
	}
}