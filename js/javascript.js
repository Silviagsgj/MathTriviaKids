/*************************    DECLARO VARIABLES    ************************/
let contenedor = document.getElementById("contenedor");
let entrada = document.getElementById("entrada");
let salida = document.getElementById("salida");
let puntos = document.getElementById("puntos");
let cajavidas = document.getElementById("cajavidas");
let error = document.getElementById("error");
let cajapregunta = document.getElementById("cajapregunta");
let contrespuestas = document.getElementById("contrespuestas");
let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let signo_juego = document.getElementById("signo_juego");
let igual = document.getElementById("igual");
let resultado = document.getElementById("resultado");
let resultado2 = document.getElementById("resultado2");
let resultado3 = document.getElementById("resultado3");
let jugar = document.getElementById("jugar");
let siguiente = document.getElementById("siguiente");
let tipojuego = document.getElementById("tipojuego");
let caja__img = document.getElementById("caja__img");
let cajaanimacion = document.getElementById("cajaanimacion");

let conterror=0;
let aleatorio1;
let aleatorio2;
let resto;
let ruta;
let result;
let aleresp1;
let aleresp2;
let aleresp3;
let puntuacion=0;
let vidas=3; 

/*************************    CARGA INICIAL    ************************/
const cargaInicial = (event) => {
    //cargo las imagenes en cajavidas
    for(let i=0; i<3; i++){
        let imagenvida = document.createElement("IMG");
        imagenvida.setAttribute("src", "image/vida.png");
        imagenvida.setAttribute("class", "imagenvidas");
        cajavidas.appendChild(imagenvida);
    }
   
    //cargo las imagenes en contrespuestas
    for(let i=0; i<4; i++){
        let resp = document.createElement("BUTTON");
        resp.setAttribute("class", "btnresp");
        contrespuestas.appendChild(resp);
    }
    //oculto elementos sobrantes 
    jugar.style.display="none";
    resultado2.style.display="none";
    resultado3.style.display="none";
    cajaanimacion.style.display="none";
}
document.addEventListener("DOMContentLoaded", cargaInicial);


/*************************    CONTROL ERRORES FORMULARIO    ************************/
const validoNombre = (event) => {
    let elemento = event.target;
    if(entrada.value.length>=8){
        error.textContent="¡Nombre incorrecto!";
        conterror=1;
    }   
    else{
        error.textContent=" ";   
         conterror=0;
    }
}

const controlVacios = (event) => {
    if(entrada.value==""){
        error.textContent="¡Introduce tu nombre!";
        conterror++;
    }
}
contenedor.addEventListener("keydown", validoNombre);
tipojuego.children[1].addEventListener("click", controlVacios); 


/*************************    ELIGE TIPO DE JUEGO    ************************/
const eligeoperacion = (event) => {
    let elemento = event.target;
    if(elemento.classList.contains("contenedortipo__signos")  && conterror==0){
        salida.textContent=entrada.value;
        entrada.disabled=true;
        if(elemento.nodeName=="IMG"){
            ruta = elemento.getAttribute("src");
            signo_juego.setAttribute("src", ruta);
        }
        jugar.style.display="block"; 
    }
}
contenedor.addEventListener("click", eligeoperacion);


/*************************    INICIA JUEGO    ************************/
const comienzajuego = (event) =>{   
    //desactivo click en parte derecha      
    contenedor.removeEventListener("click", eligeoperacion);
    inicializovariables();  
    ponerrespuesta();
}
jugar.addEventListener("click",  comienzajuego);  

/*************************    INICIALIZA VARIABLES    ************************/
const divisionenteras = () =>{
    aleatorio1 = Math.floor(Math.random()*10+1); 
    aleatorio2 = Math.floor(Math.random()*10+1);
    resto=aleatorio1%aleatorio2;     
    while(resto!=0){
        aleatorio1 = Math.floor(Math.random()*10+1); 
        aleatorio2 = Math.floor(Math.random()*10+1);
        resto=aleatorio1%aleatorio2;
    }
    num1.setAttribute("src", "image/numeros/"+aleatorio1+".png");
    num2.setAttribute("src", "image/numeros/"+aleatorio2+".png"); 
}

const restasnonegativas = () =>{
    aleatorio1 = Math.floor(Math.random()*10+1); 
    aleatorio2 = Math.floor(Math.random()*10+1);
    while(aleatorio1<aleatorio2){
        aleatorio1 = Math.floor(Math.random()*10+1); 
        aleatorio2 = Math.floor(Math.random()*10+1);
    }
    num1.setAttribute("src", "image/numeros/"+aleatorio1+".png");
    num2.setAttribute("src", "image/numeros/"+aleatorio2+".png"); 
}

const inicializovariables = () =>{ 
    //oculto el boton jugar
    jugar.style.display="none";
    //muestro la animacion
    cajaanimacion.style.display="flex";
    //muestro las respuestas
    contrespuestas.style.display="grid";
    //muestro el boton siguiente desactivado
    siguiente.style.display="block";
    siguiente.disabled="true";

    let randomigual =  Math.floor(Math.random()*2+1); //1 al 2
    igual.setAttribute("src", "image/numeros/igual"+randomigual+".png");
    resultado.setAttribute("src", "image/numeros/interrogacion.png");
    resultado2.style.display="none";
    resultado3.style.display="none";

    ruta = (signo_juego.getAttribute("src"));
    //Establezco condicion para que las divisiones sean enteras
    if(ruta.substring(ruta.lastIndexOf("/")+1,ruta.lastIndexOf("."))=="divide"){
       divisionenteras();
    //Establezco condicion para que las restas no sean negativas
    }else if(ruta.substring(ruta.lastIndexOf("/")+1,ruta.lastIndexOf("."))=="resta"){
        restasnonegativas();
    }else{
        aleatorio1 = Math.floor(Math.random()*10+1); 
        aleatorio2 = Math.floor(Math.random()*10+1);
        num1.setAttribute("src", "image/numeros/"+aleatorio1+".png");
        num2.setAttribute("src", "image/numeros/"+aleatorio2+".png");  
    }
}

/*************************    PONER RESPUESTAS ALEATORIAS    ************************/
const aleatoriosuma = () =>{   
    result = (aleatorio1+aleatorio2); 
    //genero 3 respuestas aleatorias- Maximo de la suma 20
    aleresp1= Math.floor(Math.random()*20);
    aleresp2= Math.floor(Math.random()*20);
    aleresp3= Math.floor(Math.random()*20);  
    while(aleresp1==aleresp2 || aleresp1==aleresp3 || aleresp2==aleresp3
    || result == aleresp1 || result == aleresp2 || result == aleresp3){
        aleresp1= Math.floor(Math.random()*20);
        aleresp2= Math.floor(Math.random()*20);
        aleresp3= Math.floor(Math.random()*20);
    }
}

const aleatorioresta = () => {
    result = (aleatorio1-aleatorio2);
    //genero 3 respuestas aleatorias- Maximo de la resta 9
    aleresp1= Math.floor(Math.random()*10);
    aleresp2= Math.floor(Math.random()*10);
    aleresp3= Math.floor(Math.random()*10);
    while(aleresp1==aleresp2 || aleresp1==aleresp3 || aleresp2==aleresp3
    || result == aleresp1 || result == aleresp2 || result == aleresp3){
        aleresp1= Math.floor(Math.random()*10);
        aleresp2= Math.floor(Math.random()*10);
        aleresp3= Math.floor(Math.random()*10);
    }  
}

const aleatoriomultiplica = () => {
    result = (aleatorio1*aleatorio2);
    //genero 3 respuestas aleatorias- Tabla de multiplicar del 1 al 10
    aleresp1= Math.floor(Math.random()*99);
    aleresp2= Math.floor(Math.random()*99);
    aleresp3= Math.floor(Math.random()*99);
    while(aleresp1==aleresp2 || aleresp1==aleresp3 || aleresp2==aleresp3
    || result == aleresp1 || result == aleresp2 || result == aleresp3){
        aleresp1= Math.floor(Math.random()*99);
        aleresp2= Math.floor(Math.random()*99);
        aleresp3= Math.floor(Math.random()*99);
    }
}

const aleatoriodivide = () => {
    result = (aleatorio1/aleatorio2);
    //genero 3 respuestas aleatorias- Maximo de la division 10
    aleresp1=  Math.floor((Math.random()*10));
    aleresp2=  Math.floor((Math.random()*10));
    aleresp3=  Math.floor((Math.random()*10));
    while(aleresp1==aleresp2 || aleresp1==aleresp3 || aleresp2==aleresp3
    || result == aleresp1 || result == aleresp2 || result == aleresp3){
        aleresp1=  Math.floor((Math.random()*10));
        aleresp2=  Math.floor((Math.random()*10));
        aleresp3=  Math.floor((Math.random()*10));
    }
}

const ponerrespuesta = () =>{
    ruta = (signo_juego.getAttribute("src"));
    //genero aleatorios dependiendo del signo elegido
    if(ruta.substring(ruta.lastIndexOf("/")+1,ruta.lastIndexOf("."))=="suma"){
        aleatoriosuma();
    }else if(ruta.substring(ruta.lastIndexOf("/")+1,ruta.lastIndexOf("."))=="resta"){
        aleatorioresta();
    }else if(ruta.substring(ruta.lastIndexOf("/")+1,ruta.lastIndexOf("."))=="multiplica"){
        aleatoriomultiplica();
    }else{
        aleatoriodivide();
    }
    //array de respuestas
    let respuestas = [result,aleresp1,aleresp2,aleresp3];
    //Ordeno el array aleatoriamente
    respuestas.sort(function() { return Math.random() - 0.5 });    
    //Pongo las respuestas a cada boton  
    for (let i = 0; i < contrespuestas.children.length; i++) {
        contrespuestas.children[i].setAttribute("value", respuestas[i]);
        contrespuestas.children[i].textContent=respuestas[i];        
    }    
}


/*************************    FUNCION PARA MOSTRAR LA SOLUCION CORRECTA EN CAJA PREGUNTA    ************************/
const solucioncorrecta = () =>{  
    let arrayresultado = Array.from(result.toString());
    if(arrayresultado.length==1){
        resultado.setAttribute("src", "image/numeros/"+result+".png");  
    }
    if(arrayresultado.length==2){
        resultado.setAttribute("src", "image/numeros/"+arrayresultado[0]+".png");
        resultado2.setAttribute("src", "image/numeros/"+arrayresultado[1]+".png"); 
        resultado2.style.display="inline-block"; 
    }
    if(arrayresultado.length==3){
        resultado.setAttribute("src", "image/numeros/"+arrayresultado[0]+".png");
        resultado2.setAttribute("src", "image/numeros/"+arrayresultado[1]+".png"); 
        resultado2.style.display="inline-block"; 
        resultado3.setAttribute("src", "image/numeros/"+arrayresultado[2]+".png"); 
        resultado3.style.display="inline-block"; 
    }
}

/*************************    FUNCION PARA FIN DE JUEGO   ************************/
const finaljuego = () => {
    if(vidas==0){
        //oculto todo el contenido de la seccion izquierda
        contenedor.children[1].children[1].style.display="none";
        contenedor.children[1].children[2].style.display="none";
        contenedor.children[1].children[3].style.display="none";
        contenedor.children[1].children[4].style.display="none";
        //creo una caja contenedora de estrellas
        let cajaestrellas = document.createElement("DIV");
        cajaestrellas.classList.add("cajaestr");        
        cajaestrellas.textContent="¡ "+entrada.value+" has conseguido "+ Math.floor(puntuacion/10)+" estrellas ! ";
        let insignia;
        //limito max estrellas a 5
        if(puntuacion>50){
            insignia=5;
        }else{       
            insignia = Math.floor(puntuacion/10);
        }
        for(let i=0; i<insignia; i++){
            //añado las imagenes
            let imagenestrella = document.createElement("IMG");    
            imagenestrella.classList.add("imagenest");    
            imagenestrella.setAttribute("src", "image/estrella.png");
            cajaestrellas.appendChild(imagenestrella);
        }     
        contenedor.children[1].appendChild(cajaestrellas);     
        //creo una caja nueva con game over
        let finjuego = document.createElement("DIV");
        finjuego.classList.add("cajafinal");
        finjuego.innerHTML ="GAME OVER";
        contenedor.children[1].appendChild(finjuego);
        //creo un boton volver a jugar
        let volverajugar = document.createElement("BUTTON");
        volverajugar.textContent="Volver a jugar";
        volverajugar.classList.add("btn_jugar");
        contenedor.children[1].appendChild(volverajugar);
        volverajugar.addEventListener("click", ()=>{location.reload(true)});
    }
}


/*************************    RESPUESTAS CORRECTAS/INCORRECTAS    ************************/
const seleccionarespuesta = (event) =>{
    let elemento = event.target;    
    if(elemento.nodeName=="BUTTON"){
        //muestro en la caja de preguntas la solucion correcta
        solucioncorrecta();
        if(elemento.getAttribute("value")==result){
            //si respuesta correcta pongo boton a verde
            elemento.classList.add("verde");
            //aumento puntuacion y la muestro      
            puntuacion++;
            puntos.textContent=puntuacion;            

            //animacion
            caja__img.classList.add("animacion");
            
            //desactivo botones
            for(let i=0; i<contrespuestas.children.length; i++){           
                contrespuestas.children[i].disabled=true;              
            }
            siguiente.disabled=false;
        }
        else{
            //si respuesta incorrecta quito vida
            vidas--;
            cajavidas.children[vidas].style.display="none";
            //pongo el boton a rojo
            elemento.classList.add("rojo");
            //desactivo los demas botones
            for(let i=0; i<contrespuestas.children.length; i++){           
                contrespuestas.children[i].disabled=true;              
            }
            siguiente.disabled=false;
        }
    }
    //PARTE FINAL JUEGO
    finaljuego();    
}
contrespuestas.addEventListener("click", seleccionarespuesta);


/*************************    SIGUIENTE PREGUNTA    ************************/
siguiente.addEventListener("click", ()=>{  
    inicializovariables();  
    ponerrespuesta();  
   //activo los botones de respuestas
   for(let i=0; i<contrespuestas.children.length; i++){           
        contrespuestas.children[i].disabled=false;              
    }
    //quito la animacion
    if(caja__img.classList.contains("animacion")){
        caja__img.classList.remove("animacion");
    }

    //quito la clase color verde/rojo al boton que la tenga     
    for(let i=0; i<contrespuestas.children.length; i++){
        if(contrespuestas.children[i].classList.contains("verde") || contrespuestas.children[i].classList.contains("rojo")){
        contrespuestas.children[i].classList.remove("verde", "rojo");
        }
    }       
    
});



