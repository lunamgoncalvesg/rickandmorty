function logo(){
  window.open('https://play.max.com/show/ab553cdc-e15d-4597-b65f-bec9201fd2dd');
}

let linkzazo = 'https://rickandmortyapi.com/api/character?page=';
let wipisTodos = [];
let paja = 1;
let pajasTotales;
let wipiPorPaja = 20;
let audio = new Audio('sinsajo-silbido.mp3');

function wii() {
  function agarraInfo(pajaActual = 1) {
    fetch(linkzazo + pajaActual)
      .then(res => res.json())
      .then(data => {
        wipisTodos = wipisTodos.concat(data.results);
        pajasTotales=data.info.pages;
        indizazo();
        if (pajaActual < pajasTotales) {
          agarraInfo(pajaActual + 1);
        } else {
          pone();
        }
      });
  }

  function indizazo() {
    let indice = document.querySelector('.indice');
    indice.innerHTML = '';

    for (let i = 1; i <= pajasTotales; i++) {
      let indicecito = document.createElement('p');
      indicecito.textContent = i;
      indicecito.addEventListener('click', function() {
        paja = i;
        pone();
      });
      indice.append(indicecito);
    }
  }

  function pone() {
    let cubazo = document.querySelector('.container');
    cubazo.innerHTML = '';

    let inicio = (paja - 1) * wipiPorPaja;
    let fin = inicio + wipiPorPaja;

    for (let i = inicio; i < fin; i++) {
      if (wipisTodos[i]) {
        let wipi = wipisTodos[i];
        let cubito = document.createElement('div');
        let nombre = document.createElement('p');
        let foto = document.createElement('img');
        foto.src = wipi.image;
        nombre.textContent = wipi.name;
        cubito.append(foto);
        cubito.append(nombre);
        cubazo.append(cubito);
        cubito.addEventListener('click', function(){
        audio.play();
        });
      }
    }

document.querySelector('.cont').textContent = `${paja}/${pajasTotales}`;
    botones();
  }

  function botones() {
    if(paja==1) izquierda.disabled=true;
    else izquierda.disabled=false;
    if(paja==pajasTotales) derecha.disabled=true;
    else derecha.disabled=false;
  }


  function buscar() {
    let busqueda = cuadro.value.toLowerCase();
    let buscados = wipisTodos.filter(wipi =>
      wipi.name.toLowerCase().includes(busqueda)
    );
    let cubazo = document.querySelector('.container');
    cubazo.innerHTML = '';

    buscados.forEach(wipi => {
      let cubito = document.createElement('div');
      let nombre = document.createElement('p');
      let foto = document.createElement('img');
      foto.src = wipi.image;
      nombre.textContent = wipi.name;
      cubito.append(foto);
      cubito.append(nombre);
      cubazo.append(cubito);
      cubito.addEventListener('click', function(){
      audio.play();
});
    });
      if (busqueda === '') {
    izquierda.disabled = (paja === 1);
    derecha.disabled = (paja === pajasTotales);
    document.querySelector('.cont').textContent = `${paja}/${pajasTotales}`;
  } else {
    izquierda.disabled = true;
    derecha.disabled = true;
    document.querySelector('.cont').textContent = '';
  }
  }

  izquierda.addEventListener('click', function () {
    if (paja > 1) {
      paja--;
      pone();
    }
  });

  derecha.addEventListener('click', function () {
    if (paja < pajasTotales) {
      paja++;
      pone();
    }
  });

  cuadro.addEventListener('input', buscar);

  agarraInfo();
}

let izquierda = document.querySelector('.leftBtn');
let derecha = document.querySelector('.rightBtn');
let cuadro = document.querySelector('input');


wii();
