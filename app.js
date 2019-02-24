const express = require ('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs')
const path = require('path')

// мои модули
const searchName = require ('./js/searchName');
const deleteUser = require ('./js/deleteUser');
const countPersonals = require('./js/countPersonals');
const getPhotoUser = require('./js/getPhotoUser');
const correctiveUser = require('./js/correctiveUser');
const getInnerUserScript = require('./js/getInnerUserScript');
const kayConsumer = require('./js/kayConsumer');
const verificationAccount = require('./js/verificationAccount');
const getList = require("./js/getList")

//Типа BD
const consumers = require('./db/consumers/consumers');
const personal = require('./db/PMDB/personals');
const archive = require('./db/PMDB/archive');
let avatar = function (namePhoto) {
				if(namePhoto === undefined && namePhoto === "") {
					return (__dirname+'/db/PMDB/photo/images.jpg')
				}
				return (__dirname+`/db/PMDB/photo/${namePhoto}`)
			}
			
const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}));

const port = 2019;
const dir = __dirname;

app.use(express.static('public'));

	// Главная страница
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/main.html');
});

app.get('/form.html/:list/:key', (req, res) => {
	getList(req, res, consumers, dir)
})


app.get('/reports.html/:list/:key', (req, res) => {
	getList(req, res, consumers, dir)
})

// Список сотрудников
app.get('/personalLIst.html/:list/:key', (req, res) => {
	getList(req, res, consumers, dir)
})

// главная страница
app.get('/main', (req, res) => {
	res.sendStatus(200);
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

// список пользователей
app.get("/consumers", (req, res)=> {
	res.send(consumers)
})

// Количество сотрудников
app.get('/countPersonals/:key', (req, res)=>{
	countPersonals(req, res, getBD(req.params.key, consumers ), dir)
})

// отправить аватарку
app.get('/avatar/:name' , (req, res)=>{
	getPhotoUser(req, res, avatar(req.params.name))
})

// ввод ключа
app.post("/kayConsumer", (req, res) =>{
	kayConsumer(req, res, consumers)
})

// поверка учетной записи в базе
app.post("/verificationAccount", (req, res) =>{
	verificationAccount(req, res, consumers)
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

function getBD (key, consumers) {
	return consumers.map((consumer)=>{
		if(consumer.kay.kay == key) {
			return consumer.company.DB;
		}
	})
}