const express = require ('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// мои модули
const searchName = require ('./js/searchName');
const deleteUser = require ('./js/deleteUser');
const getPhotoUser = require('./js/getPhotoUser');
const correctiveUser = require('./js/correctiveUser');
const kayConsumer = require('./js/kayConsumer');
const verificationAccount = require('./js/verificationAccount');
const getList = require("./js/getList");
const urlMongo = require('./urlMongo');

const ControllConsumers = require("./controls/consumers");
const Users = require("./controls/Users");
let db = require("./db/db");

//Типа BD
const consumers = require('./db/consumers/consumers');
let avatar = function (namePhoto, getBD) {
	return (__dirname+`/db/${getBD}/photo/${namePhoto}`)
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
// форма заполнения нового сотрудника
app.get('/form.html/:list/:key', (req, res) => {
	getList(req, res, consumers, dir)
})

// отчеты
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
app.get('/personal/:key', Users.getUsers)

// регистрация пользователя res.script
app.get("/innerUserScript", (req, res)=>{
	res.sendFile(__dirname + '/resSendScript/innerUserScript.js')
})

// вход пользователя
app.get("/entryUserScript", (req, res) =>{
	res.sendFile(__dirname + '/resSendScript/entryUserScript.js')
})

// список пользователей
app.get("/consumers", ControllConsumers.all)

// Количество сотрудников
app.get('/countPersonals/:key', Users.countUser)

// отправить аватарку
app.get('/avatar/:name/:key' , (req, res)=>{
	let nameDB = getBD(req.params.key, consumers );
	let avatarName = avatar(req.params.name, nameDB)
	getPhotoUser(req, res, avatarName)
})

// ввод ключа
app.post("/kayConsumer", (req, res) =>{
	kayConsumer(req, res, consumers)
})

// поверка учетной записи в базе
app.post("/verificationAccount", (req, res) =>{
	verificationAccount(req, res, consumers)
})

// Прием нового ползователя JSON
app.post("/innerUserScript", ControllConsumers.create)

// Удаления нового ползователя JSON
app.delete("/innerUserScript/:id", ControllConsumers.delete)


// Новый сотрудник
app.post('/form.html/:key', Users.create)

// изменения свойств сотрудника
app.post('/correctiveUser/:key', (req, res)=>{
	correctiveUser(req, res, getBD(req.params.key, consumers ), dir);
})

// удаления сотрудника и перемещения в архив
app.post('/deliteUser/:key', (req, res)=> {
	deleteUser(req, res, getBD(req.params.key, consumers ), dir)
})

function getBD (key, consumers) {
	let nameDB
	consumers.map((consumer)=>{
		if(consumer.kay.kay == key) {
			return nameDB = consumer.company.DB;
		}
	})
	return nameDB
}

db.connect(urlMongo, function(err) {
	if(err) {
		return console.log(err)
	}
	app.listen(port, () => {
		console.log(`app starting. localhost:${port}`);
	});

});