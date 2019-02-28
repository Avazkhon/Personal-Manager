const newConsumerFun = require('../js/newConsumerFun')

exports.all = function (req, res) {
  newConsumerFun.all((err, doc)=>{
  	if(err) {
  	  console.log(err)
  	}

  	res.send(doc)
  });
};

exports.create = function (req, res) {
  let consumers = req.body;
  console.log(consumers)
  newConsumerFun.create(consumers, (err, result)=>{
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
  newConsumerFun.delete(req.params.id, (err, result)=>{
    if(err) {
      console.log(err)
      return res.sendStatus(500);
    }
    res.sendStatus(200)
  });
};