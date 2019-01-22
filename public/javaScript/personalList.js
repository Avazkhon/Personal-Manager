let personals;

$(document).ready(()=> {
  $("#listOfEmployees").on("click", (personal) => {
    $.get(
        "http://localhost:2019/personal",
        (personal)=> {
          let inner = "";
          let user = personal;
          personals =personal;

          inner = person(user, inner)

          $("#user").html(inner);
        }
      )
  })
})

function person(user, inner){
  inner +=`<div class="headerPerson" >
              <div class="headerValue" >ID</div>
              <div class="headerValue" >Имя</div>
              <div class="headerValue" >Очество</div>
              <div class="headerValue" >Должность</div>
              <div class="headerValue" >Уровень</div>
          </div>` ;
  for(let i=0; i<user.length; i++){
      inner += `<div class="person" onclick="getCard(${i})" >
      <div class="personValue" >${user[i].id}</div>
      <div class="personValue" >${user[i].user.firstName}</div>
      <div class="personValue" >${user[i].user.lastName}</div>
      <div class="personValue" >${user[i].user.position}</div>
      <div class="personValue" >${user[i].user.lavel}</div>

    </div>`;
 }
 return inner
}


function getCard(i){
  console.log(i, personals[i] )
  $("#user").html(
    `<div class="card">
      <div class="getCardIMG" ><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFaORdmj-6CrbpTkWsgeTr67mI_kBy6bCF_l9WPTDL3yIC_D06" alt="фото"  /></div>
      ${personalInformation() }
      ${workInformation() }
      ${education() }
    </div>`)

  function personalInformation () {
    return (
        `<div class="personalInformation" >
        <h3>Личная информация</h3>
        <div class="getCardFirstName" >${personals[i].user.firstName}</div>
        <div class="getCardLastName" >${personals[i].user.lastName}</div>
        <div class="getCardLastName" >${personals[i].user.familyName}</div>
      </div>`
      )
  }

  function workInformation () {
    return(
        `<div class="workInformation">
        <h3>Служебная информация</h3>
        <div class="getCardID">${personals[i].id}</div>
        <div class="getCardPosition" >${personals[i].user.position}</div>
        <div class="getCardlavel" >${personals[i].user.lavel}</div>
        <div class="getCardSubdivision" >${personals[i].user.subdivision}</div>
        <div class="getCardWage">${personals[i].user.wage}</div>
      </div>`
      )
  }

  function education () {
    return (
     ` <div class="education" >
        <h3>образование</h3>
        <div class="getCardInstitutionName" >${personals[i].user.institutionName}</div>
        <div class="getCardPassUmber" >${personals[i].user.passUmber}</div>
        <div class="getCardProfession" >${personals[i].user.profession}</div>
      </div>`
    )
  }
}

