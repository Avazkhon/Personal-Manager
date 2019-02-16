let consumer =  JSON.parse(localStorage.getItem('consumer'))
let kayConsumer =  JSON.parse(localStorage.getItem('kayConsumer'))
let content = document.getElementById("content")

function entrublock(consumer) {
	let inputEntry = `<input type="button" name="" class="btn" value="Зарегистрироваться/ войти" onclick="innerUSer()">`;
	let inputOut = `<input type="button" id="statusConsumerOnline" name="" class="btn" value="Выйти" onclick="entryUser()">`;
	let firstName = consumer === null ? "Пользователь не определен" : consumer.firstName;
	let innerUser = document.getElementById("innerUser");
	let block = `<div id="helloName">${firstName}</div>
					<div id="statusConsumerOnline">
					${consumer === null ? inputEntry : inputOut}
				</div>`;
	innerUser.innerHTML = block;
	if(consumer !== null) {
		inputKayConsumer(kayConsumer)
	}
}entrublock(consumer)

function inputKayConsumer(kayConsumer) {
	let getKay = `<form name="getKayConsumer" class="getKayConsumer">
		<div>Ввидите ваш ключ активации</div>
		<input type="text" name="getKay" id="getKay" class="btn">
		<input type="button" class="btn" onclick="postKayConsumer()" value="Отправить">
	</form>`;

	content.innerHTML = getKay;
}

function postKayConsumer() {
	let kay = document.getElementById("getKay")
	console.log(kay.value)
	content.innerHTML = "";
}

function entryUser() {

	if(consumer === null) {
		let xhr = new XMLHttpRequest();
		let url = "http://localhost:2019/entryUser";

		xhr.open("GET", url, )
		xhr.onreadystatechange = ()=>{
			if(xhr.readyState === XMLHttpRequest.DONE){
				document.getElementById("content").innerHTML = xhr.response;
			}
		}
		xhr.send()
	}
		localStorage.setItem('consumer', "null")
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
		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
			console.log( xhr.response)
			localStorage.setItem("consumer", xhr.response)
			document.getElementById("helloName").innerText = obj.name.value;
			document.getElementById("statusConsumerOnline").innerHTML = `<input type="button" id="statusConsumerOnline" name="" class="btn" value="Выйти" onclick="entryUser()">`;
			if(kayConsumer === null) {
				inputKayConsumer(kayConsumer)
			}
		}
		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 400){
			document.getElementById("errorEntry").innerText = xhr.response;
		}
	}

	xhr.send(body)
}
