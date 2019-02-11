module.exports = function correctiveUser(req, res, users) {
	let reqUser = req.body;
	for(kay in users) {
		if(users[kay].id === reqUser.id) {
			correctProperties(users[kay], reqUser.user )
		} 
	}
	function correctProperties (properties, newProperties) {
		let bool = false;
		for(newPoint in newProperties){
			for(point in properties.user){
				if(point == newPoint) {
					properties.user[point] = newProperties[newPoint];
					console.log(`свойства ${point} у id: ${properties.id} изменино на ${newProperties[newPoint]}`)
					bool = true;
				}
				properties.user[newPoint] = newProperties[newPoint];
				console.log(`Созданно своисва ${newPoint} у id: ${properties.id} со значением ${newProperties[newPoint]}`)
				bool = true;
				break
				
			}
		}
		if(bool) {
			res.sendStatus(200)
		}
	}
}
