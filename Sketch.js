//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//erro da raquete do oponente
let chanceDeErrar = 0;

function preload () {
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
  
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background (0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete (xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete (xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  fill (color(255,255,0))
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda (){
   if (xBolinha + raio > width || 
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
       yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }  
}

function mostraRaquete (x,y){
  fill ('white');
  rect (x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete (){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
     if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  }

function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente +     chanceDeErrar
  calculaChanceDeErrar()
}

function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento
        && yBolinha - raio < yRaquete + raqueteAltura
        && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function incluiPlacar() {
    stroke ('white');
    textAlign (CENTER);
    textSize (16);
    fill(color(244,164,96));
    rect(150, 10, 40, 20);
    fill('white');
    text(meusPontos, 170, 26);
    fill(color(244,164,96));
    rect(450, 10, 40, 20);
    fill('white');
    text(pontosDoOponente, 470, 26);  
  
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
      ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
      ponto.play();
    }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}
