let statusConsumerOnline = false;
function entryUser() {
	if(statusConsumerOnline) {
		document.getElementById("statusConsumerOnline").innerHTML = `<input type="button" name="" class="btn" value="Зарегистрироваться/ войти" onclick="innerUSer()">`;
		document.getElementById("helloName").innerText = "Пользователь не определен";
		statusConsumerOnline = false;
	}
	if(!statusConsumerOnline) {
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
}

function verificationAccount() {
	let obj = document.innerUser;
	let xhr = new XMLHttpRequest();
	let url = "http://localhost:2019/verificationAccount";
	let body = JSON.stringify({
		name: obj.name.value,
		password: obj.password.value
	})
	console.log(body )
	xhr.open("POST", url, )

	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	xhr.onreadystatechange = ()=>{
		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
			statusConsumerOnline = true;
			document.getElementById("helloName").innerText = xhr.response + obj.name.value;
			document.getElementById("content").innerText = "";
			document.getElementById("statusConsumerOnline").innerHTML = `<input type="button" id="statusConsumerOnline" name="" class="btn" value="Выйти" onclick="entryUser()">`;
		}
		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 400){
			console.log(xhr.response)
			document.getElementById("errorEntry").innerText = xhr.response;
		}
	}
	xhr.send(body)
}
