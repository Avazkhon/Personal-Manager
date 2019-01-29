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

	main.innerHTML = `<div class="report" >
							${canvas()}
						</div>`;

	function canvas () {
		const url = "http://localhost:2019/personal";
		const xhr = new XMLHttpRequest();
		let wage = 0;
		xhr.open('GET', url, )
		xhr.onreadystatechange =()=>{
			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
				let personal = JSON.parse(xhr.response);
				for(let i=0; i<personal.length; i++) {
					wage += personal[i].user.wage
					console.log(wage)
				}
			}
		}
		xhr.send()
		return (
			`<div class="wage" >
				<h3>${wage}</h3>
				<canvas id="wageMid" heigth="400" width="800">
			</div>`
		)
	}
}