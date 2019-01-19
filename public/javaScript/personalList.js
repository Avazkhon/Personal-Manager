$(document).ready(()=> {
  $("#content").on("click", (personal) => {
    $.get(
        'http://localhost:2019/personal',
        (personal)=> {
          let inner = '';
          let user = personal;
          inner += `<div class='user'><h3>id: ${user[2].id}</h3></div>`;
          inner += `<div class='user'><h3>passport ID: ${user[2].user.passUmber}</h3></div>`;
          inner += `<div class='user'><h3>first name: ${user[2].user.firstName}</h3></div>`;
          inner += `<div class='user'><h3>family name: ${user[2].user.familyName}</h3></div>`;
          inner += `<div class='user'><h3>last name: ${user[2].user.lastName}</h3></div>`;
          inner += `<div class='user'><h3>age: ${user[2].user.age}</h3></div>`;
          inner += `<div class='user'><h3>profession: ${user[2].user.profession}</h3></div>`;
          inner += `<div class='user'><h3>education: ${user[2].user.education}</h3></div>`;
          inner += `<div class='user'><h3>institution name: ${user[2].user.institutionName}</h3></div>`;
          inner += `<div class='user'><h3>position: ${user[2].user.position}</h3></div>`;
          inner += `<div class='user'><h3>wage": ${user[2].user.wage}</h3></div>`;
          inner += `<div class='user'><h3>subdivision: ${user[2].user.subdivision}</h3></div>`;
          inner += `<div class='user'><h3>lavel: ${user[2].user.lavel}</h3></div>`;


          console.log(user[2])
           $('.user').html(inner);
        }
      )
  })
})