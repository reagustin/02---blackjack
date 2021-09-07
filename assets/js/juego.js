/**
 * 2C = Two of clubs (treboles)
 * 2D = Two of diamonds 
 * 2H = Two of hearts
 * 2S = Two of spades
 */


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
//console.log (btnPedir);  // es solo para asegurarnos que la referencia es correcta, aparece en consola y si nos posicionamos sobre el elemento nos lo señala

const divJugadorCartas = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

// ejercicio, no usamos ID, la web no la modificamos, entonces tenemos smalls fijos
const puntosHTML = document.querySelectorAll('small');


// esta funcion crea una nueva baraja
const crearDeck = () => {

for(let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
        deck.push(i + tipo);
    }
}

for (let tipo of tipos){
    for (let esp of especiales){
        deck.push( esp + tipo);
    }
}


deck = _.shuffle(deck);
console.log(deck);

return deck;
}

crearDeck(); 

//esta funciona me permite tomar una carta

const pedirCarta = () => {

    if (deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();


 
    return carta;
}


// pedirCarta();

const valorCarta = (carta)=> {

    //necesito extrae la letra y quedarme con el valor
    const valor = carta.substring(0, carta.length - 1 );
    return (isNaN (valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    
}

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {

    do {

    const carta = pedirCarta();
    
    puntosComputadora = puntosComputadora + valorCarta (carta);
    
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img') //crea la imagen sin nada, le falta la clase y el source
    imgCarta.src = `assets/cartas/${ carta }.png`; //los apostrofes se cambian por back tics que ya me permiten insertar en el string un bloque de codigo de JS
    imgCarta.classList.add('carta'); // la clase carta viene de CSS donde estan los styles

    
    divCartasComputadora.append(imgCarta);
    
    if (puntosMinimos > 21) {
        break;
    }

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if ( puntosComputadora === puntosMinimos) {
            alert('Nadie gana');
        } else if (puntosMinimos > 21) {
            alert('computadora gana');
        } else if (puntosComputadora > 21) {
            alert('Jugador gana');
        } else {
            alert('computadora gana');
        }
    }, 100);

    

}


// Eventos

// 1ro tengo que estar escuchando quien pide una carta, y como?
// Tengo que hacer una referencia al boton HTML
// Para eso tengo que ir al HTML y asignarles un ID de forma unica

// al trabajar con un boton mas de una vez, es conveniente poner ese elemento en una variable




btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    //ahora tengo que ir sumando el valor de las cartas, voy arriba y creo 2 variables de puntos
    puntosJugador = puntosJugador + valorCarta (carta);
    //luego de crear la variable para ambos smalls, tengo que agregarle los puntos a la misma, el [0] es un indice de orden de aparicion
    puntosHTML[0].innerText = puntosJugador;

    // ahora tienen que aparecer las cartas, cada vez que quiera que aparezca una carta, tengo que crear una
    // CLASE 55 crea la cartas
    // vamos a tomar referencias de jugador carta y luego de computador cartas, y arriba de todo creamos una constante que tiene la referencia

    // <img class="carta" src="assets/cartas/2C.png" alt=""></img>
    // tenemos que crear la carta en el html, y como? creamos la constante, y luego el create element (dentro del parentesis el objeto que queremos crear)
    const imgCarta = document.createElement('img') //crea la imagen sin nada, le falta la clase y el source

    //creamos el source
    imgCarta.src = `assets/cartas/${ carta }.png`; //los apostrofes se cambian por back tics que ya me permiten insertar en el string un bloque de codigo de JS
    imgCarta.classList.add('carta'); // la clase carta viene de CSS donde estan los styles


    // tenemos la carta y hay que insertarla en el HTML, como OLVIDE LA CLASE, aparece gigante
    
    divJugadorCartas.append(imgCarta);
    // le agrego la clase y se ajusta el tamaño abajo de imgCarta.src

    if (puntosJugador > 21) {
        console.warn('Perdiste'); //una vez que el jugador pierde, hay que bloquear el boton
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, Ganaste!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }


});  
//sintaxis para escucha de evento, puede ser click o doubleclick, focus, etc
// luego del evento que escucho, va la funcion llamada CallBack, es una funcion que se esta mandado como argumento
// puede ser funcion tradicional o de flecha-- quiere decir que cuando el evento ocurra se dispara esa funcion que voy a definir

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);

})

btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divJugadorCartas.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})
