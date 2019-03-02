const Users = require('../js/Users')

exports.countUser = function (req, res) {
  let key = req.params.key
   Users.countUser((err, doc)=>{
    if(err) {
      console.log(err)
    }
    if(doc === 400 || doc === 418) {
      res.sendStatus(doc)
    }
    res.send(doc)
  },
  key);
} 

exports.getUsers = function (req, res) {
  let key = req.params.key
  Users.getUsers((err, doc)=>{
    if(err) {
      console.log(err)
    }
    res.send(doc)
  },
  key)
}

exports.create = function (req, res) {
  Users.create((err, result)=>{
    if(err) {
      console.log(err)
    }
    res.sendStatus(result)
  },req)
}