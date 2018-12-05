const express = require ('express');
const bodyParser = require('body-parser');

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}));

let port = 2019;

const personal = []

app.use(express.static('public'));
	// Гоавная страница
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/main.html');
});

app.get('/index.html', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
})

	// Список сотрудников
app.get('/personalLIst.html', (req, res) => {
	res.sendFile(__dirname + '/public/personalLIst.html');
	res.send(personal);
})

	// Новый сотрудник
app.post('/form.html', function(req, res) {
	let user = {
		id: Math.floor(Math.random() * (9999, 9999999)) + 1,
		user: req.body
	}
	res.sendFile(__dirname + '/public/personalLIst.html');
	personal.push(user);
	console.log(personal);

});

app.listen(port, () => {
	console.log(`app starting. localhost:${port}`);
});