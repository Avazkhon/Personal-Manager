$(document).ready(()=> {
  $("#content").on("click", (personal) => {
    $.get(
        'http://localhost:2019/personal',
        (personal)=> {
          let inner = '';
          inner += `<div class='user'><h3> user :</h3><h3>${personal}</h3></div>`;

           $('.user').html(inner);
        }
      )
  })
})