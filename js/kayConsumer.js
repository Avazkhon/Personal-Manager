module.exports = function kayConsumer(req, res, consumers) {
	 consumers.map((consumer)=>{
	  if(consumer.kay.kay == req.body.kay) {
	  	let id = consumer.id
	  	for(let i = 0 ; i < consumers.length ; i++) {
	  		if(consumers[i].id === id) {
	  			consumers[i].kay.kayStatus = true;
	  			console.log(consumers[i].kay.kayStatus = true)
	  		}
	  	}
	  	res.send(consumer.kay.kay)
	  	console.log(consumer.comapany.comapanyName, "ввел ключ активации")
	  }
	 })
	}