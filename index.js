const botonEscribir = document.getElementById("obtener");

botonEscribir.addEventListener("click", revisarDataStorage);

function revisarDataStorage() {
  const users = localStorage.getItem("users"); 
  if (!users) {
    mostrarUsuarios();
  } else if (users) {
   
    const timeDifference = lifeSpan();
    const usersObject = JSON.parse(users);
    const getTimeActual = usersObject[0].createdAt; 
    var differenceTime = timeDifference - getTimeActual;
    if (differenceTime > 60000) {
      mostrarUsuarios();
    } else if (differenceTime < 60000) {
      printCurrentData(usersObject);
    }
  }
}

async function getData() {
  url = "https://reqres.in/api/users?delay=3";
  try {
    const responseJSON = await fetch(url); 
    const resolve = await responseJSON.json();
    return resolve.data;
  } catch (error) {
    console.log(error);
  }
}

class User {
  constructor(id, first_name, last_name, email, avatar) {
    this.id = id; 
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.image = avatar;
    this.createdAt = new Date().getTime();
  }
}
function lifeSpan() {
  return new Date().getTime();
}

async function mostrarUsuarios() {
  const users = await createUsers(); 
  localStorage.setItem("users", JSON.stringify(users)); 
  printToDom(users);
}

async function createUsers() {
  const users = await getData(); 
  return users.map(
    ({ id, first_name, last_name, email, avatar, createAt }) =>
      new User(id, first_name, last_name, email, avatar, createAt)
  );
}

function printToDom(users) {
const impresion = users.map(
    (user) => `  
             
             <tr>
             <th scope="row">${user.id}</th>
             <td>${user.firstName}</td> 
             <td>${user.lastName}</td> 
             <td>${user.email}</td> 
             <td ><img class="img-from-styles display d-none d-lg-block" src="${user.image}" alt="${user.firstName}-image"></td>
             </tr>
           
             `
             ); 

  const idDom = document.getElementById("datos");
  idDom.innerHTML = impresion;
}

printCurrentData = (data) => {
  let idPeople = "";
  for (const key in data) {
     let info = data[key];
    idPeople += `
                      <tr>
                      <th scope="row">${info.id}</th>
                      <td>${info.firstName}</td> 
                      <td>${info.lastName}</td> 
                      <td>${info.email}</td> 
                      <td ><img class="img-from-styles display d-none d-lg-block" src="${info.image}" alt="${info.firstName}-image">  </td> 
                   </tr>
                 
                   `;
  }

  const idDom = document.getElementById("datos");
  idDom.innerHTML = idPeople;
};
