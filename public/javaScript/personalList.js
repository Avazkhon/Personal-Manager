let personals;
let correctUser;
// вывод перонала
$(document).ready(()=> {
  $("#listOfEmployees").on("click", (personal) => {
    $.get(
        "http://localhost:2019/personal",
        (personal)=> {
          personals = personal;

         person(personals);
        }
      )
  })
})

// шаблон для вывода персонала (лист)
function person(user){
  let inner = "";
  // если массив пустой
  if(user.length == 0) {
    inner =  "<div><h3>Упс.. Мы не нашли искомое!</h3></div>";
  }

  inner +=`<div class="headerPerson" >
              <div class="headerValue" >ID</div>
              <div class="headerValue" >Имя</div>
              <div class="headerValue" >Очество</div>
              <div class="headerValue" >Должность</div>
              <div class="headerValue" >Уровень</div>
          </div>` ;
  for(let i=0; i<user.length; i++){
      inner += `<div class="person" onclick="getCard(${user[i].id})" >
      <div class="personValue" >${user[i].id}</div>
      <div class="personValue" >${user[i].user.firstName}</div>
      <div class="personValue" >${user[i].user.lastName}</div>
      <div class="personValue" >${user[i].user.position}</div>
      <div class="personValue" >${user[i].user.lavel}</div>
    </div>`;
 }
  $("#user").html(inner);
}

// шаблон для вывода определеного сотрудника
function getCard(id){
  let index;
  (function () {
    for(let i=0; i<personals.length; i++) {
      if(personals[i].id === id){
        index = i;
      }
    }
  }())
  console.log(personals[index] )
  $("#user").html(
    `<div class="card">
      <div class="getCardIMG" >
        <img src="/avatar/${personals[index].photo[0]}" alt="фото"  />
        <div class="userTools">
           <input type="button" id="deleteUser" class="btn" value="Удалить" onclick="deleteUser(${personals[index].id})">
          <div id="correct" >
            <input type="button" id="correctUser" class="btn" value="изменить" onclick="correctUser.rending()">
          </div>
        </div>
        </div>
      <div class="information">
        ${personalInformation() }
        ${workInformation() }
        ${education() }
        ${contact() }
      </div>
    </div>`)

  function personalInformation () {
    return (
        `<div class="personalInformation" >
        <h3>Личная информация</h3>
        <div class="getCard" ><h5>Фамилия</h5><div>${personals[index].user.lastName}</div></div>
        <div class="getCard" ><h5>Имя</h5><div>${personals[index].user.firstName}</div></div>
        <div class="getCard" ><h5>Очество</h5><div>${personals[index].user.familyName}</div></div>
        <div class="getCard" ><h5>Номер паспорта</h5><div>${personals[index].user.passNumber}</div></div>
      </div>`
      )
  }

  function workInformation () {
    return(
        `<div class="workInformation">
        <h3>Служебная информация</h3>
        <div class="getCard" ><h5>ID</h5><div>${personals[index].id}</div></div>
        <div class="getCard" ><h5>Должность</h5><div>${personals[index].user.position}</div></div>
        <div class="getCard" ><h5>Уровень</h5><div>${personals[index].user.lavel}</div></div>
        <div class="getCard" ><h5>Напрвления</h5><div>${personals[index].user.subdivision}</div></div>
        <div class="getCard" ><h5>Зароботная плата</h5><div>${personals[index].user.wage}</div></div>
      </div>`
      )
  }

  function education () {
    return (
     ` <div class="education" >
        <h3>Образование</h3>
        <div class="getCard" ><h5>Название учебного учереждения</h5><div>${personals[index].user.institutionName}</div></div>
        <div class="getCard" ><h5>Профессия</h5><div>${personals[index].user.profession}</div></div>
        <div class="getCard" ><h5>Вид учереждения</h5><div>${personals[index].user.education}</div></div>
      </div>`
    )
  }

  function contact() {
    return(
        `<div class="contact">
           <h3>Контакты</h3>
          <div class="getCard" ><h5>Телефон</h5><div>${personals[index].user.numberPhon}</div></div>
          <div class="getCard" ><h5>эл. Почта</h5><div>${personals[index].user.mail}</div></div>
          <div class="getCard" ><h5>Домашний адрес</h5><div>${personals[index].user.homeAddress}</div></div>
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
        personals = personal;

        function result (personal) {
          for(let i=0; i<=personal.length - 1; i++) {
             for(let j in personal[i].user) {
              let arr= [];
                if(personal[i].user[j] == value && value !== ""){
                  arr.push = personal[i].user[j];
                  search.push(personal[i])
                  console.log(search.length, personal[i].user[j])
                }
             }
          }
          person(search)
        }result(personal)
      }
    )
}

// удаления сотрудника
function deleteUser (id) {
  let xhr = new XMLHttpRequest();

  var body = 'id=' + encodeURIComponent(id);

  xhr.open("POST", 'http://localhost:2019/deliteUser', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = ()=> {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            person(JSON.parse(xhr.responseText))
        };
    };

  xhr.send(body);
}

class CorrectUser{
  constructor() {
  }

  correctUser() {
    return (
      `<div>
        <input type="button" id="dontCorrect" class="btn" value="Отмена"  onclick="correctUser.dontCorrect()" >
        <input type="button" id="saveCorrect" class="btn" value="Сохранить" onclick="correctUser.saveCorrect()" >
      </div>`
    )
  }

  dontCorrect() {
   document.getElementById('correct').innerHTML = `<input type="button" id="correctUser" class="btn" value="изменить" onclick="correctUser.rending()">`;
   console.log("dontCorrect")
  }

  saveCorrect() {
    document.getElementById('correct').innerHTML = `<input type="button" id="correctUser" class="btn" value="изменить" onclick="correctUser.rending()">`;
    console.log("saveCorrect")
  }

  rending() {
    document.getElementById('correct').innerHTML = this.correctUser()
  }
}

correctUser = new CorrectUser();