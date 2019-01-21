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
  inner +=`<div class='person' id="headerPerson" >
              <div class="personValue" >ID</div>
              <div class="personValue" >Имя</div>
              <div class="personValue" >Очество</div>
              <div class="personValue" >Должность</div>
              <div class="personValue" >Уровень</div>
          </div>` ;
  for(let i=0; i<user.length; i++){
    console.log(user)
      inner += `<div class='person' >
      <div class="personValue" >${user[i].id}</div>
      <div class="personValue" >${user[i].user.firstName}</div>
      <div class="personValue" >${user[i].user.lastName}</div>
      <div class="personValue" >${user[i].user.position}</div>
      <div class="personValue" >${user[i].user.lavel}</div>

    </div>`;
 }
 return inner
}

