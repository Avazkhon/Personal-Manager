let personals;

$(document).ready(()=> {
  $("#listOfEmployees").on("click", (personal) => {
    $.get(
        'http://localhost:2019/personal',
        (personal)=> {
          let inner = '';
          let user = personal;
          personals =personal;

          inner = person(user, inner)

          $('.user').html(inner);
        }
      )
  })
})

function person(user, inner){
  for(let i=0; i<user.length; i++){
      inner += `<div class='person' >
      <div class="personValue" >id: ${user[i].id}</div>
      <div class="personValue" >${user[i].user.firstName}</div>
      <div class="personValue" >${user[i].user.lastName}</div>
    </div>`;
 }
 return inner
}

