let consumer =  JSON.parse(localStorage.getItem('consumer'))
let kayConsumer = localStorage.getItem('kayConsumer')
let content = document.getElementById("content")

function entryblock(consumer) {
	let inputEntry = `<input type="button" name="" class="btn" value="Зарегистрироваться/ войти" onclick="innerUSer()">`;
	let inputOut = `<input type="button" id="statusConsumerOnline" name="" class="btn" value="Выйти" onclick="entryUser()">`;
	let firstName = consumer === null ? "Пользователь не определен" : consumer.firstName;
	let innerUser = document.getElementById("innerUser");
	let block = `<div id="helloName">${firstName}</div>
					<div id="statusConsumerOnline">
					${consumer === null ? inputEntry : inputOut}
				</div>`;
	innerUser.innerHTML = block;
	content.innerHTML = "";
}entryblock(consumer)

function consumerTools () {

	let consumerTools = document.getElementById("consumerTools")
	let tools = `<div>
				<input class='btn' type="button" onclick="reportsList()" value="отчеты">
			</div>
			<div>
				<input class='btn' type="button" onclick="formList()" value="Новый сотрудник">
			</div>
			<div>
				<input class='btn' type="button" onclick="personalLIst()" value="Список сотрудников">
			</div>`;

	consumer === null? consumerTools.innerHTML = "" : consumerTools.innerHTML = tools;

}consumerTools()

function inputKayConsumer(kayConsumer) {
	let getKay = `<form name="getKayConsumer" class="getKayConsumer">
		<div>Ввидите ваш ключ активации</div>
		<input type="text" name="getKay" id="getKay" class="btn">
		<input type="button" class="btn" onclick="postKayConsumer()" value="Отправить">
	</form>`;
	
	if(kayConsumer === 'null') {
		content.innerHTML = getKay;
	}

}

function postKayConsumer() {
	let kay = document.getElementById("getKay")
	if(kayConsumer === 'null') {
		post()
	}
	content.innerHTML = "";

	function post() {
		let xhr = new XMLHttpRequest;
		let url = "http://localhost:2019/kayConsumer";
		let body = JSON.stringify({
			kay: kay.value
		})
		console.log(kay.value)

		xhr.open("POST", url, )
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.onreadystatechange = () =>{
			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
			  localStorage.setItem("kayConsumer", xhr.response)
			  content.innerHTML = "";
			}		}

		xhr.send(body)
	}

}


function entryUser() {

	if(consumer === null) {
		let xhr = new XMLHttpRequest();
		let url = "http://localhost:2019/entryUser";

		xhr.open("GET", url, )
		xhr.onreadystatechange = ()=>{
			if(xhr.readyState === XMLHttpRequest.DONE){
				document.getElementById("content").innerHTML = xhr.response;
				localStorage.setItem("kayConsumer", 'null')
			}
		}
		xhr.send()
	}
		localStorage.setItem('consumer', null)
		localStorage.setItem("kayConsumer", 'null')
		document.getElementById("statusConsumerOnline").innerHTML = `<input type="button" name="" class="btn" value="Зарегистрироваться/ войти" onclick="innerUSer()">`;
		document.getElementById("helloName").innerText = "Пользователь не определен";

	console.log(consumer)
}

function verificationAccount() {
	let obj = document.innerUser;
	let xhr = new XMLHttpRequest();
	let url = "http://localhost:2019/verificationAccount";
	let body = JSON.stringify({
		nameCompany: obj.nameCompany.value,
		password: obj.password.value,
		email: obj.email.value
	})

	xhr.open("POST", url, )

	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	xhr.onreadystatechange = ()=>{
		let kay;
		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
			kay = JSON.parse(xhr.response);
			localStorage.setItem("consumer", xhr.response)
			entryblock(consumer)
			consumerTools()
			console.log(xhr.response)
			if(!kay.kay) {
				inputKayConsumer(kayConsumer)
			}
			console.log(typeof(" "), typeof(kay.kay))
			if(typeof(" ") === typeof(kay.kay)) {
				localStorage.setItem("kayConsumer", kay.kay)
			}
		}
		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 400){
			document.getElementById("errorEntry").innerText = xhr.response;
		}
	}

	xhr.send(body)
}
