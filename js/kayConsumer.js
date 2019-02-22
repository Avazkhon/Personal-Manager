module.exports = function kayConsumer(req, res, consumers) {
	 consumers.map((consumer)=>{
	  if(consumer.kay.kay == req.body.kay) {
	  	for(let i = 0 ; i < consumers.length ; i++) {
	  		if(consumers[i].id === consumer.id) {
	  			consumers[i].kay.kayStatus = true;
	  			res.send(consumer.kay.kay)
	  			console.log(consumer.comapany.comapanyName, "ввел ключ активации", "kayStatus ", consumers[i].kay.kayStatus )
	  			return
	  		}

	  		else {
	  			res.sendStatus(400);
	  			console.log(consumer.comapany.comapanyName, "ввел ключ активации", "kayStatus ", consumers[i].kay.kayStatus)
	  		}
	  	}
	  }
	 })
	}