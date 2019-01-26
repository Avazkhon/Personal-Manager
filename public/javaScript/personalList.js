let personals;
// вывод перонала
$(document).ready(()=> {
  $("#listOfEmployees").on("click", (personal) => {
    $.get(
        "http://localhost:2019/personal",
        (personal)=> {
          let inner = "";
          let user = personal;
          personals = personal;

          inner = person(user, inner)

          $("#user").html(inner);
        }
      )
  })
})

// шаблон для вывода персонала (лист)
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

// шаблон для вывода определеного сотрудника
function getCard(i){
  console.log(i, personals[i] )
  $("#user").html(
    `<div class="card">
      <div class="getCardIMG" >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFaORdmj-6CrbpTkWsgeTr67mI_kBy6bCF_l9WPTDL3yIC_D06" alt="фото"  />
        <input type="button" id="deleteUser" value="Удалить" onclick="deleteUser(${i})">
        </div>
      <div class="information">
        ${personalInformation() }
        ${workInformation() }
        ${education() }
      </div>
    </div>`)

  function personalInformation () {
    return (
        `<div class="personalInformation" >
        <h3>Личная информация</h3>
        <div class="getCard" ><h5>Фамилия</h5><div>${personals[i].user.lastName}</div></div>
        <div class="getCard" ><h5>Имя</h5><div>${personals[i].user.firstName}</div></div>
        <div class="getCard" ><h5>Очество</h5><div>${personals[i].user.familyName}</div></div>
        <div class="getCard" ><h5>Номер паспорта</h5><div>${personals[i].user.passNumber}</div></div>
      </div>`
      )
  }

  function workInformation () {
    return(
        `<div class="workInformation">
        <h3>Служебная информация</h3>
        <div class="getCard" ><h5>ID</h5><div>${personals[i].id}</div></div>
        <div class="getCard" ><h5>Должность</h5><div>${personals[i].user.position}</div></div>
        <div class="getCard" ><h5>Уровень</h5><div>${personals[i].user.lavel}</div></div>
        <div class="getCard" ><h5>Напрвления</h5><div>${personals[i].user.subdivision}</div></div>
        <div class="getCard" ><h5>Зароботная плата</h5><div>${personals[i].user.wage}</div></div>
      </div>`
      )
  }

  function education () {
    return (
     ` <div class="education" >
        <h3>образование</h3>
        <div class="getCard" ><h5>Название учебного учереждения</h5><div>${personals[i].user.institutionName}</div></div>
        <div class="getCard" ><h5>Профессия</h5><div>${personals[i].user.profession}</div></div>
        <div class="getCard" ><h5>Вид учереждения</h5><div>${personals[i].user.education}</div></div>
      </div>`
    )
  }
}
/// Поисковие
function userSearch() {
  let value = document.getElementById("userSearchText").value
  let search= [];
  $.get(
      "http://localhost:2019/personal",
      (personal)=> {
        let inner = "";
        personals = personal;
        function result (personal) {
          for(let i=0; i<=personal.length - 1; i++) {
             for(let j in personal[i].user) {
              let arr= [];
                if(personal[i].user[j] == value){
                  arr.push = personal[i].user[j];
                  search.push(personal[i])
                  console.log(search.length)
                  inner = "";
                }
                if(search.length == 0) {
                  inner = `<div><h3>Упс.. Мы не нашли искомое!</h3></div>`;
                }
             }
          }
          inner = person(search, inner)
        }result(personal)

        $("#user").html(inner);
      }
    )
}

// удаления сотрудника
function deleteUser (user) {
  let xhr = new XMLHttpRequest();

  var body = 'index=' + encodeURIComponent(user);

  xhr.open("POST", 'http://localhost:2019/deliteUser', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = ()=> {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
        };
    };

  xhr.send(body);
}