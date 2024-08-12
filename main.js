function logo() {
  window.open('https://play.max.com/show/ab553cdc-e15d-4597-b65f-bec9201fd2dd');
}

let linkzazo = 'https://rickandmortyapi.com/api/character?page=';
let wipisTodos = [];
let paja = 1;
let pajasTotales;
let wipiPorPaja = 20;
let sinsajo = new Audio('sinsajo-silbido.mp3');
let grito = new Audio('007759446_prev.mp3');
let cancion = new Audio('tevas.mp3');
let homer = new Audio('homer.mp3');

function wii() {
  function agarraInfo(pajaActual = 1) {
    fetch(linkzazo + pajaActual)
      .then(res => res.json())
      .then(data => {
        wipisTodos = wipisTodos.concat(data.results);
        pajasTotales = data.info.pages;
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
    indice.style.marginLeft = '-115px';
    for (let i = 1; i <= pajasTotales; i++) {
      let indicecito = document.createElement('p');
      indicecito.textContent = i;
      indicecito.addEventListener('click', function () {
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
        cubito.addEventListener('click', function () {
          sinsajo.play();
        });
      }
    }

    document.querySelector('.cont').textContent = `${paja}/${pajasTotales}`;
    botones();
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
      cubito.addEventListener('click', function () {
        sinsajo.play();
      });
    });

    if (busqueda === '') {
      izquierda.classList.add('disabled');
      derecha.classList.add('disabled');
      let cont = document.querySelector('.cont');
      cont.innerHTML = '1/1 <br>(Para volver tocá en el índice)';
      cont.style.fontSize = '7.5px';
      document.querySelector('.btn').style.justifyContent = 'center';
      document.querySelector('.indice').style.marginLeft = '-80px';
    } else {
      izquierda.classList.add('disabled');
      derecha.classList.add('disabled');
      document.querySelector('.cont').textContent = '';
      document.querySelector('.indice').style.marginLeft = '-115px';
    }
  }

  cuadro.addEventListener('input', buscar);

  document.querySelectorAll('.leftBtn, .rightBtn').forEach(btn => {
    btn.addEventListener('click', function () {
      if (btn.classList.contains('disabled')) {
        grito.play();
      } else {
        if (btn.classList.contains('leftBtn') && paja > 1) {
          paja--;
          pone();
        } else if (btn.classList.contains('rightBtn') && paja < pajasTotales) {
          paja++;
          pone();
        }
      }
    });
  });

  agarraInfo();
}

let izquierda = document.querySelector('.leftBtn');
let derecha = document.querySelector('.rightBtn');
let cuadro = document.querySelector('input');

function botones() {
  if (paja == 1) {
    izquierda.classList.add('disabled');
  } else {
    izquierda.classList.remove('disabled');
  }
  if (paja == pajasTotales) {
    derecha.classList.add('disabled');
  } else {
    derecha.classList.remove('disabled');
  }
}

botones();

window.onbeforeunload = function (e) {
    cancion.play();
    return confirm;
};


wii();

let curtain = document.querySelector('.curtains');
curtain.addEventListener('click', function () {
  let izq = document.querySelector('.izq');
  let der = document.querySelector('.der');
  izq.style.transform = 'translateX(-100%)';
  der.style.transform = 'translateX(100%)';
  homer.play();
  setTimeout(function () {
    curtain.style.zIndex = '-1';
  }, 1000);
});
