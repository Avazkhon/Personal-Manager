const express = require ('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// мои модули
const searchName = require ('./js/searchName');
const deleteUser = require ('./js/deleteUser')
const countPersonals = require('./js/main')
const getPhotoUser = require('./js/getPhotoUser')

//Типа BD
let personal = require('./db/personals');
let archive = require('./db/archive');
let avatar = function (namePhoto) {
				if(namePhoto === undefined) {
					return (__dirname+'/db/photo/images.jpg')
				}
				return (__dirname+`/db/photo/${namePhoto}.jpg`)
			}

const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}));

let port = 2019;

app.use(express.static('public'));
	// Главная страница
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/main.html');
});

app.get('/index.html', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
})

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

app.get('/avatar/:name' , (req, res)=>{
	getPhotoUser(req, res, avatar(req.params.name))
})

	// Новый сотрудник
app.post('/form.html',(req, res) => {
	searchName(req, res, personal)

});

app.post('/deliteUser', (req, res)=> {
	deleteUser(req, res, archive, personal)
})

app.listen(port, () => {
	console.log(`app starting. localhost:${port}`);
});