function innerUSer() {
	const xhr = new XMLHttpRequest();
	const url = "http://localhost:2019/innerUSer";

	xhr.open("GET", url, )
  	xhr.onreadystatechange =()=>{
	    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
	     document.getElementById('content').innerHTML = xhr.response;
    	}
 	}
  xhr.send()
}

function formList() {
	const xhr = new XMLHttpRequest();
	const url = "http://localhost:2019/form.html/formList"+"/"+ localStorage.getItem("kayConsumer");

	xhr.open("GET", url, )
  	xhr.onreadystatechange =()=>{
	    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
	     document.getElementById('content').innerHTML = xhr.response;
    	}
 	}
  xhr.send()
}

function reportsList() {
	const xhr = new XMLHttpRequest();
	const url = "http://localhost:2019/reports.html/reportsList"+"/"+ localStorage.getItem("kayConsumer");

	xhr.open("GET", url, )
  	xhr.onreadystatechange =()=>{
	    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
	     document.getElementById('content').innerHTML = xhr.response;
    	}
 	}
  xhr.send()
}

function personalLIst() {
	const xhr = new XMLHttpRequest();
	const url = "http://localhost:2019/personalLIst.html/personalLIst"+"/"+ localStorage.getItem("kayConsumer");

	xhr.open("GET", url, )
  	xhr.onreadystatechange =()=>{
	    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
	     document.getElementById('content').innerHTML = xhr.response;
    	}
 	}
  xhr.send()
}