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