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