let db = require('../db/db');

exports.countUser = function (colB, key) {
  let getUser = (nameCompany)=> {db.get().collection("Users"+nameCompany).find().toArray((err, doc)=>{
    colB(err, [{"count" :doc.length}])
  })}

  db.get().collection("consumers").find().toArray((err, doc)=>{
    if(doc.length === 0) {
      colB(err, 418)
    }
    doc.some((user)=>{
      if(user.keys.key == key) {
        getUser(user.company.nameCompany)
        return 
      }
      else colB(err, 400)
    })
  })
}

exports.getUsers = function (colB, key) {
  let getUser = (nameCompany)=> {db.get().collection("Users"+nameCompany).find().toArray((err, doc)=>{
    colB(err, doc)
  })}

  db.get().collection("consumers").find().toArray((err, doc)=>{
    if(doc.length === 0) {
      colB(err, 418)
    }
    doc.some((user)=>{
      if(user.keys.key == key) {
        getUser(user.company.nameCompany)
        return 
      }
      else colB(err, 400)
    })
  })
};

exports.create = function (colB, req) {
  const photo = req.files.foo;
  const reqKey = req.params.key;
  db.get().collection("consumers").find().toArray((err, doc)=>{
    let newUser = {
      user: req.body,
      photo: [photo.name]
    };

    let newPassNumber = Number(newUser.user.passNumber);
    let passNumber = doc.map((consumer) => {
      if(consumer.keys.key === reqKey) {
        add(newUser, consumer.company)
        return consumer
      }
    })

    function add (newUser, company) {
      db.get().collection("Users"+company.nameCompany).find().toArray((err, doc)=>{
        if(doc.length === 0) {
          addMongo(newUser)
          upload(company)
        }

        let status =  doc.some((item)=> {
          if(Number(item.user.passNumber) === Number(newUser.user.passNumber)) {
            console.log(Number(item.user.passNumber),  Number(newUser.user.passNumber))
            return true
          }
        })
        if(status) {
          colB(err, 400)
          console.log("Паспорт ужу зарегистрирован")
          return
        }
        if(!status) {
          addMongo(newUser)
          upload(company)
          return
        }
      })

      function addMongo (newUser) {

          db.get().collection("Users"+company.nameCompany).insert(newUser), (err, result)=> {
            if(err) {
              console.log(err)
              return 
            }
          }
          console.log("Сотрудник успешно зарегистрирован")
            colB(err, 201)
        }

      function upload(company) {

        let pathPhoto = `./db/${company.DB}/photo/${photo.name}`
        let foo = req.files.foo;
        foo.mv(pathPhoto, function(err) {
        if(err) {
            console.log(err)
          }
        });
      }
    } 
  })
}