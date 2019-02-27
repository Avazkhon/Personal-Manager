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
  let consumers = {
    user: req.body
  };

  newConsumerFun.create(consumers, (err, doc)=>{
    if(err) {
      console.log(err)
      return res.sendStatus(500);
    }
    res.send(doc)
  });
};