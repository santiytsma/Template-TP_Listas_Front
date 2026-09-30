/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data; 
    mostrarComidas(comidas);                  // Asignar el JSON a la variable comidas
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');
const formComidaNueva = document.getElementById('agregarComida')

function mostrarComidasFor(){
  for (let i = 0; i < comidas.length; i++){
    container.innerHTML +=
    `
    <article class="card">
   <h2 class="comida">${comidas[i].nombre}</h2>
    <p>${comidas[i].categoria}</p>
    <p>${comidas[i].provincia}</p>
    <p>${comidas[i].ingredientes}</p>
    </article>
    `
  }
}
function mostrarComidas(){
  comidas.forEach(comida => {
    container.innerHTML +=
    `
    <article class="card">
    <p class="categoria">${comida.categoria}</p>
    <h2 class="comida">${comida.nombre}</h2>
    <p class="provincia">${comida.provincia}</p>
    <p>${comida.ingredientes}</p>
    </article>
    `
  })
}
formComidaNueva.addEventListener("submit", (e) =>{
  alert('Comida nueva recibida: '+ e.target.nombre.value)
})
