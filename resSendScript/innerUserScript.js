function innerUserScript() {
	let firstName = document.innerUser.firstName.value !== "" ? dontUndefined(document.innerUser.firstName.value, "firstName") : dontUndefined(document.innerUser.firstName.value, "firstName") ;
	let lastName = document.innerUser.lastName.value !== "" ? dontUndefined(document.innerUser.lastName.value, "lastName") : dontUndefined(document.innerUser.lastName.value, "lastName") ;
	let password = document.innerUser.password.value.length >= 6 ? nimPassword(document.innerUser.password.value) : nimPassword(document.innerUser.password.value);
	let email = document.innerUser.email.value !== "" ? dontUndefined(document.innerUser.email.value, "email") : dontUndefined(document.innerUser.email.value, "email") ;

	let obj = [
		{firstName, lastName, password, email}
	]
	// роверка на длинну пароля
	function nimPassword(ifValue) {
		if (ifValue.length <= 5) {
			document.getElementById("password").innerText = "Минимальноя длинна 6 цифр";
			return ifValue
		}
		if (ifValue.length > 5) {
			document.getElementById("password").innerText = "";
			return ifValue
		}
	}
	//проверка да ввод данных
	function dontUndefined(value, id) {
		if(value === "" ) {
			document.getElementById(id).innerText = "Ввидите "+ id;
			return value
		}
		if(value !== "" ) {
			document.getElementById(id).innerText = "";
			return  value
		}
	}

	// если ввиденные данные соотвествуют требованием 
	if(firstName !== "" && lastName !== ""  && email !== "" && password.length > 5) {
		resInnerUser(obj)
	}

	function resInnerUser (obj) {
		let body = JSON.stringify(obj);
		let xhr = new XMLHttpRequest();
		let url = "http://localhost:2019/innerUserScript";

		xhr.open("POST", url, )
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.onreadystatechange = ()=>{
			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201){
				console.log(xhr.response)
			}
		}
		xhr.send(body)
	}

}