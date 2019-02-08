const express = require ('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs')

// мои модули
const searchName = require ('./js/searchName');
const deleteUser = require ('./js/deleteUser')
const countPersonals = require('./js/main')
const getPhotoUser = require('./js/getPhotoUser')

//Типа BD
const personal = require('./db/personals');
const archive = require('./db/archive');
let avatar = function (namePhoto) {
				if(namePhoto === undefined && namePhoto === "") {
					return (__dirname+'/db/photo/images.jpg')
				}
				return (__dirname+`/db/photo/${namePhoto}`)
			}

const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}));

const port = 2019;

app.use(express.static('public'));

	// Главная страница
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/main.html');
});

// app.get('/index.html', (req, res) => {
// 	res.sendFile(__dirname + '/public/index.html');
// })

	// Список сотрудников
app.get('/personalLIst.html', (req, res) => {
	res.sendFile(__dirname + '/public/personalLIst.html');
	// res.send(personal);
})

	// Список сотрудников
app.get('/main', (req, res) => {
	res.sendStatus(200)
	// res.send(personal);
})

// Список сотрудников
app.get('/personal', (req, res)=> {
	res.send(personal);
})

// Количество сотрудников
app.get('/countPersonals', (req, res)=>{
	countPersonals(req, res, personal)
})

// отправить аватарку
app.get('/avatar/:name' , (req, res)=>{
	getPhotoUser(req, res, avatar(req.params.name))
})

// Новый сотрудник
app.post('/form.html',(req, res) => {
	searchName(req, res, personal)

});

app.post('/correctiveUser', (req, res)=>{
	function correctiveUser(req, res, users) {
		let reqUser = req.body;
		for(kay in users) {
			if(users[kay].id === reqUser.id) {
				correctProperties(users[kay], reqUser.user )
			} 
		}
	}correctiveUser(req, res, personal);

	function correctProperties (properties, newProperties) {
		let bool = false;
		for(newPoint in newProperties){
			for(point in properties.user){
				if(point == newPoint) {
					properties.user[point] = newProperties[newPoint]
					console.log(`свойства ${point} у id: ${properties.id} изменино на ${newProperties[newPoint]}`)
					bool = true;
				}
			}
		}
		if(bool) {
			res.sendStatus(200)
		}
	}
})

// удаления сотрудника и переменения в архив
app.post('/deliteUser', (req, res)=> {
	deleteUser(req, res, archive, personal)
})

app.listen(port, () => {
	console.log(`app starting. localhost:${port}`);
});