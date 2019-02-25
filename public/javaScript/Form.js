
function newUserFun () {
	let xhr = new XMLHttpRequest;
	let url = 'http://localhost:2019/form.html'+"/"+ localStorage.getItem("kayConsumer")
	let newUser = document.newUser;
	let photo = newUser.foo.files[0];
	let formData = new FormData(newUser);

		xhr.open("POST", url, )

		xhr.onreadystatechange = ()=>{
		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201){
				document.getElementById("content").innerHTML = xhr.response;
				console.log(xhr.status)
			}
		}
		xhr.send( formData )
}


// массив персонала
const personal = []
//объект для добавления методов сотрудника
let obj = {
	scils: [],
	languages: []
	};

// показывает панаель для для заполнения данных о сотруднике
function userNew() {
	let newUser = document.getElementById("newUser");
		// если еще не вывиден на экран
	if (newUser.style.display == "none") {
		newUser.style.display = "block";
		obj = {
			scils: [],
			languages: []
			};
	}
}

// добавить новые умения
function newScils () {
	let scil = document.getElementById('scil').value;
	// если стока не пуста
	if(scil !== '') {
		// то отобразить 
		document.getElementById('listScils').innerHTML += `<li class='liScil' name='${scil}'>${scil}</li>`;
		// удалить содержимое
		document.getElementById('scil').value = '';
		obj.scils.push(scil);
	}
}

// добавить новые языки
function Languages () {
	let newLanguages = document.getElementById('newLanguages').value;

	if(newLanguages !== '') {
		document.getElementById('listLangulares').innerHTML += `<li class='listLangulares' name='${newLanguages}' >${newLanguages}</li>`;
		document.getElementById('newLanguages').value = '';
		obj.languages.push(newLanguages)
	}
}