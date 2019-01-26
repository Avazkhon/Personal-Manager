const express = require ('express');
const bodyParser = require('body-parser');

const searchName = require ('./js/searchName');
const deleteUser = require ('./js/deleteUser')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}));

let port = 2019;

const archive = [];

const personal = [
	{
		id: 0,
		user: {
			age: "1992",
			education: "college",
			familyName: "Усупханович",
			firstName: "Avazkhon",
			institutionName: "СибУПК",
			lastName: "Kamalkhanov",
			lavel: "Junior",
			passNumber: "999",
			position: "JavaScript-developer",
			profession: "Юрист",
			subdivision: "frontend",
			wage: "80000"
		}
	},
	{id: 1, user: {passNumber: 123}}
]

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
app.get('/personalLIst.html', (req, res) => {
	res.sendFile(__dirname + '/public/personalLIst.html');
	// res.send(personal);
})

// Список сотрудников
app.get('/personal', (req, res)=> {
	res.send(personal);
})

	// Новый сотрудник
app.post('/form.html',(req, res) => {
	searchName(req, res, personal)
	// res.redirect('/personal');

});

app.post('/deliteUser', (req, res)=> {
	deleteUser(req, res, archive, personal)
})

app.listen(port, () => {
	console.log(`app starting. localhost:${port}`);
});