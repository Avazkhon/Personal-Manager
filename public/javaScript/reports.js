
//вывод report
function reports () {
	let reports = document.getElementById("reports");
	document.getElementById("wagaFunction").onclick = function canvas () {
		const url = "http://localhost:2019/personal";
		const xhr = new XMLHttpRequest();
		let wage = 0;
		let personal = [];
		xhr.open('GET', url, true)
		xhr.onreadystatechange =()=>{
			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
				personal = JSON.parse(xhr.response);
				for(let i=0; i<personal.length; i++) {
					wage += JSON.parse(personal[i].user.wage);
				}
			}
			reports.innerHTML = `<div class="report" >
								<div class="wage" >
									<h3>Сумма ЗП: ${wage}</h3>
									<h3 id="h3WageMid" ></h3>
									<h3>График:</h3>
									<canvas id="wageMid" height="300" width="600">
							 	</div>
							</div>`;
			getCanvas(personal)
		}
		xhr.send()
	}
}

function getCanvas(personal) {
	const canvas = document.getElementById("wageMid");
	const ctx = canvas.getContext("2d");
	let wage = 0;
	let y = 0;
	let x = 0;

	let date = new Date();
	// получть месяц
	let month = date.getUTCMonth() +10 ;
	// отрисовка графика

		// вычесть сумму зп
	for(let i=0; i<personal.length; i++) {
		wage += JSON.parse(personal[i].user.wage);
	}
	// получить значения для графика
	y = Math.floor(wage /personal.length /1000); // ЗП / кол- персонала / масштаб
	// Вывести среднюю. ЗП
	document.getElementById('h3WageMid').innerHTML = `Средняя ЗП: ${y * 1000}`; 
	ctx.moveTo(0, 150);
	function line(x){
		ctx.lineTo(x, y);
		ctx.stroke()
	}
	if(month >= 1) {
		x = x + 50;
		line(x)
	}
	if(month >= 2) {
		x = x + 50;
		line(x)
	}
	if(month >= 3) {
		x = x + 50;
		line(x)
	}
	if(month >= 4) {
		x = x + 50;
		line(x)
	}
	if(month >= 5) {
		x = x + 50;
		line(x)
	}
	if(month >= 6) {
		x = x + 50;
		line(x)
	}
	if(month >= 7) {
		x = x + 50;
		line(x)
	}
	if(month >= 8) {
		x = x + 50;
		line(x)
	}
	if(month >= 9) {
		x = x + 50;
		line(x)
	}
	if(month >= 10) {
		x = x + 50;
		line(x)
	}
	if(month >= 11) {
		x = x + 50;
		line(x)
	}
	if(month == 12) {
		x = x + 50;
		line(x)
	}
}

// document.getElementById("countPersonal").onclick = 
function countPersonal() {
	const reports = document.getElementById("reports");
	const url = "http://localhost:2019/countPersonals";
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true)
	xhr.onreadystatechange =()=>{
		if(xhr.readyState === XMLHttpRequest.DONE){
			let count = JSON.parse(xhr.response)
			let countPersonal = count[0].count;
			reports.innerHTML = `<div id="sumEmployees" ><h3>Кол-во сотрудников : ${countPersonal}</h3></div>`
		}
	}
	xhr.send()
}