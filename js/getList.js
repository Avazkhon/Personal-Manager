const path = require('path')
module.exports = function getList(req, res, consumers, dir) {
	let paramKey = req.params.key;
	let paramList = req.params.list;
	const listObj = {
		reportsList: '/htmlList/reports.html',
		formList: '/htmlList/form.html',
		personalLIst: '/htmlList/personalList.html'
	}
	let list = "";
	let kayStatus = false;

	consumers.map((consumer)=>{
		if(consumer.kay.kay === paramKey) {
			if(paramList == "reportsList") {
				kayStatus = true;
				list = listObj.reportsList;
				return
			}
			if(paramList == "formList") {
				kayStatus = true;
				list = listObj.formList;
				return
			}
			if(paramList == "personalLIst") {
				kayStatus = true;
				list = listObj.personalLIst;
				return
			}
			else kayStatus = false;
		}
		else kayStatus = false;
	})

	if(kayStatus) {
	  res.sendFile(dir+list);
  	  res.status(200)
	}
	else {
		res.status(400);
		res.send("Нет доступа!")
	}
}