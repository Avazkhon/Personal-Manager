$(document).ready(()=> {
  $("#content").on("click", (personal) => {
    $.get(
        'http://localhost:2019/personal',
        (personal)=> {
          let inner = '';
          let user = personal;
          function person(user){
            for(let i=0; i<user.length; i++){
              console.log(user[i].user)
              inner += `<div class='person'>
                <div class="personValue" >id: ${user[i].id}</div>
                <div class="personValue" >${user[i].user.firstName}</div>
                <div class="personValue" >${user[i].user.lastName}</div>
              </div>`;
           }
          }person(user)
           $('.user').html(inner);
        }
      )
  })
})