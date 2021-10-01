const API_KEY = "47ea09bfdfb94b5dcc76ab76f1b260f9";
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

    temp.innerHTML = busquedaGuardada.main.temp;
    tempMin.innerHTML = busquedaGuardada.main.temp_min;
    tempMax.innerHTML = busquedaGuardada.main.temp_max;
    humedad.innerHTML = busquedaGuardada.main.humidity + "%";
    sensacionT.innerHTML = busquedaGuardada.main.feels_like;
    presionAt.innerHTML = busquedaGuardada.main.pressure;
    velocidadV.innerHTML = busquedaGuardada.wind.speed;
    mapa.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBtauoCs08lNVbY5ST4UqfjkFUjofgoXok&q=${busquedaGuardada.name}&center=${busquedaGuardada.coord.lat},${busquedaGuardada.coord.lon}`;
    buscarGif(busquedaGuardada.weather[0]);
    descripcion.innerHTML = busquedaGuardada.weather[0].description;
    titulo.innerHTML = busquedaGuardada.name;

    divDatos.style.display = 'block';
    sectionMapa.style.display = 'block';
}
btnBuscar.addEventListener('click',  () => {
    console.log("ciudad es", ciudad.value);
    console.log("click buscar xD");
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
                console.log(rta);
                console.log(iconClima);
                temp.innerHTML = rta.main.temp;
                tempMin.innerHTML = rta.main.temp_min;
                tempMax.innerHTML = rta.main.temp_max;
                humedad.innerHTML = rta.main.humidity + "%";
                sensacionT.innerHTML = rta.main.feels_like;
                presionAt.innerHTML = rta.main.pressure;
                velocidadV.innerHTML = rta.wind.speed;
                //iconClima.src = `http://openweathermap.org/img/wn/${rta.weather[0].icon}@2x.png`;
                mapa.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBtauoCs08lNVbY5ST4UqfjkFUjofgoXok&q=${ciudad}&center=${rta.coord.lat},${rta.coord.lon}`;

                buscarGif(rta.weather[0]);
                descripcion.innerHTML = rta.weather[0].description;
                titulo.innerHTML = rta.name;
                showSpinner();
            }
        })
        .catch(function () {
            console.log("Algoo salio mal!");
    });
}

function buscarGif(clima) {
           console.log(clima.main);
           imgClima.src = "img/"+clima.main+".gif";
           imgClima.alt = clima.description;
}

function showSpinner() {
    spinner.classList.toggle('d-none');
}

function guardarBusqueda(ciudadBuscada) {
    localStorage.setItem('busqueda', JSON.stringify(ciudadBuscada));
}