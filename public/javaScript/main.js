
// получить от сервера date по умолчанию при загрузки
document.addEventListener('DOMContentLoaded', ()=>{
	const url = "http://localhost:2019/main";
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, )
	xhr.onreadystatechange =()=>{
		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
			console.log(xhr.responseText)
			main()
		}
	}
	xhr.send()
})

//вывод report
function main () {
	let main = document.getElementById("main");
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
					wage += personal[i].user.wage;
				}
			}
			main.innerHTML = `<div class="report" >
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
	// отрисовка графика
	function line(){
		// вычесть сумму зп
		for(let i=0; i<personal.length; i++) {
			wage += personal[i].user.wage;
		}
		// получить значения для графика
		y = wage /personal.length /1000; // ЗП / кол- персонала / масштаб
		document.getElementById('h3WageMid').innerHTML = `средняя ЗП: ${y * 1000}`; 
		ctx.moveTo(0, 150);
		ctx.lineTo(25, y), ctx.lineTo(50, y), ctx.lineTo(75, y), ctx.lineTo(100, y);
		ctx.stroke()
	}line()
}