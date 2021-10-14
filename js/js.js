const API_KEY = "";
const d = document;
let ciudad = d.getElementById('ciudad');
const btnBuscar = d.getElementById('btnBuscar');

let temp = d.getElementById('temp');
let tempMin = d.getElementById('tempMin');
let tempMax = d.getElementById('tempMax');
let humedad = d.getElementById('humedad');
let sensacionT = d.getElementById('sensacionT');
let presionAt = d.getElementById('presionAt');
let velocidadV = d.getElementById('velocidadV');
let iconClima = d.getElementById('icon-clima');
let imgClima = d.getElementById('img-clima');
let descripcion = d.getElementById('descripcion');
let divDatos= d.querySelector('.datos-clima');
let sectionMapa = d.querySelector('.mapa');
let titulo = d.getElementById('titulo');
const spinner = document.getElementById('spinner');
const mapa = d.getElementById('mapa');

const busquedaGuardada = JSON.parse(localStorage.getItem('busqueda'));

if(busquedaGuardada != null){

    insertarDatos(busquedaGuardada);
    buscarGif(busquedaGuardada.weather[0]);

    divDatos.style.display = 'block';
    sectionMapa.style.display = 'block';
}

btnBuscar.addEventListener('click',  () => {
    //console.log("ciudad es", ciudad.value);
    showSpinner();
    buscarClima(ciudad.value);
    divDatos.style.display = 'block';
    sectionMapa.style.display = 'block';
});

function buscarClima(ciudad) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`)
        .then(response => response.json())
        .then(rta => {
            if(rta.cod !== 200){
                console.log("error miaa");
            } else {
                guardarBusqueda(rta);
                console.log("rta clima",rta);
                //iconClima.src = `http://openweathermap.org/img/wn/${rta.weather[0].icon}@2x.png`;
                insertarDatos(rta);
                buscarGif(rta.weather[0]);
                showSpinner();
            }
        })
        .catch(function () {
            console.log("Algo salio mal!");
    });
}

function buscarGif(clima) {
           //console.log(clima.main);
           imgClima.src = "img/"+clima.main+".gif";
           imgClima.alt = clima.description;
}

function showSpinner() {
    spinner.classList.toggle('d-none');
}

function guardarBusqueda(ciudadBuscada) {
    localStorage.setItem('busqueda', JSON.stringify(ciudadBuscada));
}

function insertarDatos(response) {
    temp.innerHTML = response.main.temp;
    tempMin.innerHTML = response.main.temp_min;
    tempMax.innerHTML = response.main.temp_max;
    humedad.innerHTML = response.main.humidity + "%";
    sensacionT.innerHTML = response.main.feels_like;
    presionAt.innerHTML = response.main.pressure;
    velocidadV.innerHTML = response.wind.speed;
    mapa.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBtauoCs08lNVbY5ST4UqfjkFUjofgoXok&q=${response.name}&center=${response.coord.lat},${response.coord.lon}`;
    descripcion.innerHTML = response.weather[0].description;
    titulo.innerHTML = response.name;
}
