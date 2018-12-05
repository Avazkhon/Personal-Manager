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
		document.getElementById('listScils').innerHTML += `<li class='liscil' name='${scil}'>${scil}</li>`;
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

// // сбор данных и ее фикцация
// function personalNew() {
// 	let newUser = document.getElementById("newUser");
// 		// сбор данных из html
// 	let firstName = document.getElementById('firstName');
// 	let lastName = document.getElementById('lastName');
// 	let familyName = document.getElementById('familyName');
// 	let age = document.getElementById('age');
// 	let profession = document.getElementById('profession');
// 	let education = document.getElementById('education');
// 	let institutionName = document.getElementById('institutionName');
// 	let position = document.getElementById('position');
// 	let wage = document.getElementById('wage');
// 	let subdivision = document.getElementById('subdivision');
// 	let lavel = document.getElementById('lavel');
// 	let listScils = document.getElementById('listScils');
// 	let listLangulares = document.getElementById('listLangulares');

// 	let id = Math.floor(Math.random() * (99999999 - 0 + 1)) + 9998

// 	// добавления в глобальный массив
// 	personal.push({
// 		id: id,
// 		firstName: firstName.value,
// 		lastName: lastName.value,
// 		familyName: familyName.value,
// 		age: age.value,
// 		profession: profession.value,
// 		education: education.value,
// 		institutionName: institutionName.value,
// 		position: position.value,
// 		wage: wage.value,
// 		subdivision: subdivision.value,
// 		lavel: lavel.value,
// 		listScils : obj.scils,
// 		listLangulares : obj.languages
// 	})
// }