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
const getInnerUserScript = require('./js/getInnerUserScript')

//Типа BD
let consumers = [
	{id: 123,
	user: {firstName: "Avazkhon", lastName: "Kamalkhanov", password: 123123, email: "kamalxanovavazxon@gmail.com"},
	photo: ["images.jpg"],
	kay: null
	}
];
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

// html для регистрации
app.get('/innerUser', (req, res) =>{
	res.sendFile(__dirname + '/html/innerUser.html')
})


// html для входа
app.get('/entryUser', (req, res) =>{
	res.sendFile(__dirname + '/html/entryUser.html')
})

// Список сотрудников JSON
app.get('/personal', (req, res)=> {
	res.send(personal);
})

// регистрация пользователя res.script
app.get("/innerUserScript", (req, res)=>{
	res.sendFile(__dirname + '/resSendScript/innerUserScript.js')
})

// вход пользователя
app.get("/entryUserScript", (req, res) =>{
	res.sendFile(__dirname + '/resSendScript/entryUserScript.js')
})

// Количество сотрудников
app.get('/countPersonals', (req, res)=>{
	countPersonals(req, res, personal)
})

// отправить аватарку
app.get('/avatar/:name' , (req, res)=>{
	getPhotoUser(req, res, avatar(req.params.name))
})

// поверка учетной записи в базе
app.post("/verificationAccount", (req, res) =>{
	function verificationAccount(req, res, consumers) {
		let resConsumer;
		let consumer = consumers.some((item)=>{
			console.log(item.user.nameCompany,  req.body.nameCompany)
			if(item.user.nameCompany == req.body.nameCompany ) {
				if(Number(item.user.password) === Number(req.body.password)) {
					console.log(item.user.email,  req.body.email)
					if(item.user.email == req.body.email) {
						resConsumer = item.user
						console.log("consumer", true)
						return true
					}
				}
			}
		})
		console.log(resConsumer)
		if(consumer) {
			res.status(200).send(resConsumer)
			return
		}
		if(!consumer) {
			res.status(400).send("Попробуйте еще раз!")
			return
		}
	}verificationAccount(req, res, consumers)
})

// прием нового ползователя JSON
app.post("/innerUserScript", (req, res)=>{
	getInnerUserScript(req, res, consumers)
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