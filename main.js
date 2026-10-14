/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
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

function mostrarComidas(lista){
  container.innerHTML = '';

  lista.forEach(comida => {
    container.innerHTML +=
    `
    <article class="card">
    <p class="categoria">${comida.categoria}</p>
    <h2 class="comida">${comida.nombre}</h2>
    <p class="provincia">  ${comida.provincia}</p>
    <ul class="ingre">
      ${comida.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
    </ul>
    </article>
    
    `
  })
}


const formComidaNueva = document.getElementById('agregarComida');

formComidaNueva.addEventListener("submit", (event) =>{
  //alert('Comida nueva recibida: '+ e.target.nombre.value);}
  event.preventDefault();
  let nuevaComida ={
    nombre: event.target.nombre.value,
    categoria: event.target.Categoría.value,
    provincia: event.target.provincia.value,
    ingredientes: event.target.ingredientes.value.split(","),
  }
  comidas.push(nuevaComida);

  mostrarComidas(comidas);
})

let buscador = document.getElementById('buscador');
let filtroCategoria = document.getElementById('filtroCategoria');
let filtroProvincia = document.getElementById('filtroProvincia');

function filtrar(){
  const comidasFiltradas = comidas.filter(comida => {
    return comida.categoria.includes(filtroCategoria.value)
    && comida.provincia.includes(filtroProvincia.value)
     
  })
  mostrarComidas(comidasFiltradas);
}


function buscar(){
  const texto = buscador.value.toLowerCase()

  const comidasFiltradas = comidas.filter( comida => {
    return comida.nombre.toLowerCase().includes(texto)
      ||comida.provincia.toLowerCase().includes(texto)
      ||comida.categoria.toLowerCase().includes(texto)
  });
  mostrarComidas(comidasFiltradas);
  
}

filtroCategoria.addEventListener('change', filtrar);
filtroProvincia.addEventListener('change', filtrar);
buscador.addEventListener('change', buscar);
