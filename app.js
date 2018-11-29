const express = require ('express');

const app = express();

let port = 2019;

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
	console.log(`app starting. localhost:${port}`)
});