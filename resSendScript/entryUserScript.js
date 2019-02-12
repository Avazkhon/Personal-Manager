function entryUser() {
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