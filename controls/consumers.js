const Consumers = require('../js/Consumers')

exports.all = function (req, res) {
  Consumers.all((err, doc)=>{
  	if(err) {
  	  console.log(err)
  	}

  	res.send(doc)
  });
};

exports.create = function (req, res) {
  let consumers = req.body;
  console.log(consumers)
  Consumers.create(consumers, (err, result)=>{
    if(err) {
      console.log(err)
      return res.sendStatus(500);
    }
    else {
      res.sendStatus(result)
      return
    }
  });
};

exports.delete = function (req, res) {
  Consumers.delete(req.params.id, (err, result)=>{
    if(err) {
      console.log(err)
      return res.sendStatus(500);
    }
    res.sendStatus(200)
  });
};