const fs = require('fs')
const ObjectID = require('mongodb').ObjectID;
let db = require('../db/db');

exports.all = function (colB) {
  db.get().collection("consumers").find().toArray((err, doc)=>{
    colB(err, doc)
  })
}

exports.create = function (consumer, colB) {

  (db.get().collection("consumers").find().toArray((err, doc)=>{
    let newNameCompany = consumer.nameCompany;
    let newEmail = consumer.email;

    if(doc.length === 0) {
      newConsumerFun(newNameCompany);
      return
    }

    let status = doc.some((item)=>{
      console.log(item.user.email,  newEmail, item.user.nameCompany,  newNameCompany)
      if(item.user.email == newEmail || item.user.nameCompany == newNameCompany) {
        return true
      }
      else false
    })
    if(status) {
      colB(err, 400);
    }
    if(!status) {
      newConsumerFun (newNameCompany);
      return
    }

  }))

 function newConsumerFun (newNameCompany) {
  let user = {
    user: consumer,
    photo: ["images.jpg"],
    kay: {
      kay: getkay(),
      kayStstus: false
    },
    company: {
      nameCompany: newNameCompany,
      DB: newDB(newNameCompany),
    }
  }

  function getkay() {
  let randomkay = [];
  let arr = [
      'A', 'a', 'B', 'b' , 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm',
      'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z',
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ]

  for(let i = 0; i < 16; i++) {
    randomkay += arr[Math.floor(arr.length * Math.random())];
  }
  if(randomkay.length == 16) {
    return randomkay;
  }
}

function newDB (newNameCompany) {
   let DB = newNameCompany + "DBPhto";
   fs.mkdir(db.dir()+"/"+DB, (err) => {
     if(err) {
       console.log(err);
       return
     }
   })
   return DB
 }

  db.get().collection("consumers").insert(user, (err, result)=>{
    if(err) {
      console.log(err)
      return
    }
    console.log(`Новый пользователь ${newNameCompany} успешно зарегистрирован`)
    colB(err, 201)
    return
  })

 }

}

exports.delete = function (id, colB) {
  db.get().collection("consumers").deleteOne({_id: ObjectID(id)}, (err, result)=>{
    if(err) {
      console.log(err)
      return
    }
    colB(err, result)
  })
}


exports.countUser = function (colB, key) {
  let getUser = ()=> {db.get().collection("user").find().toArray((err, doc)=>{
    colB(err, [{"count" :doc.length}])
  })}

  db.get().collection("consumers").find().toArray((err, doc)=>{
    if(doc.length === 0) {
      colB(err, 418)
    }
    doc.some((user)=>{
      if(user.kay.kay == key) {
        getUser()
        return 
      }
      else colB(err, 400)
    })
  })
}