const express = require ('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs')

// мои модули
const searchName = require ('./js/searchName');
const deleteUser = require ('./js/deleteUser')
const countPersonals = require('./js/main')
const getPhotoUser = require('./js/getPhotoUser')
const correctiveUser = require('./js/correctiveUser')

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

app.get('/reports.html', (req, res) => {
	res.sendFile(__dirname + '/public/reports.html');
})

// Список сотрудников
app.get('/personalLIst.html', (req, res) => {
	res.sendFile(__dirname + '/public/personalLIst.html');
	// res.send(personal);
})

// главная страница
app.get('/main', (req, res) => {
	res.sendStatus(200)
	// res.send(personal);
})

app.get('/innerUser', (req, res) =>{
	res.sendFile(__dirname + '/html/innerUser.html')
})

// Список сотрудников JSON
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

// изменения свойств сотрудника
app.post('/correctiveUser', (req, res)=>{
	correctiveUser(req, res, personal);
})

// удаления сотрудника и переменения в архив
app.post('/deliteUser', (req, res)=> {
	deleteUser(req, res, archive, personal)
})

app.listen(port, () => {
	console.log(`app starting. localhost:${port}`);
});