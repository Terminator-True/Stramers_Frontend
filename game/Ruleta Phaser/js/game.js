var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//Definicion de variables
var particles;
var aceleracion = -.1;
var velocidad = 0;
var arrow;
var resultado_entregado=true;
const categorias=[
    { id:0, a_i:0, a_f:0, nombre: 'uncommon'},
    { id:1, a_i:0, a_f:0, nombre: 'common'},
    { id:2, a_i:0, a_f:0, nombre: 'legend' }, //-27
    { id:3, a_i:0, a_f:0, nombre: 'retrigger'},
    { id:4, a_i:0, a_f:0, nombre: 'common'},
    { id:5, a_i:0, a_f:0, nombre: 'uncommon'},
    { id:6, a_i:0, a_f:0, nombre: 'epic'},             
]

var intervalo_subdivision = 360/categorias.length;

//Se asignan los valores de angulos a las categorias
//Se usan angulos de 0 a 360 como seria lògico
for (let c=0; c < categorias.length; c++){
    categorias[c].a_i =  c*intervalo_subdivision;
    categorias[c].a_f = (c+1)*intervalo_subdivision;
}

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('fondo', './assets/imagen/wallpaper.jpg');
    this.load.image('arrow', './assets/imagen/select_ruleta.svg');
    this.load.image('ruleta', './assets/imagen/ruleta4.png');
    this.load.image('boton', './assets/imagen/btn_tirar.svg');
    this.load.atlas('flare', './assets/imagen/flares.png',"./assets/json/flares.json");

}

function create (){
    this.add.image(400, 300, 'fondo');
    ruleta = this.add.sprite(400, 300, 'ruleta')
    arrow = this.add.sprite(570, 300, 'arrow');
    arrow.angle+=90;
    boton = this.add.sprite(400, 550, 'boton').setInteractive();
    boton.on('pointerdown', function (pointer) {
        this.setTint(0xff0000);
        tirar();

    });
    boton.on('pointerout', function (pointer) {

        this.clearTint();

    });
    boton.on('pointerup', function (pointer) {

        this.clearTint();

    });
}

function update (){   
    if (velocidad < 0){
        velocidad = 0;
        if (!resultado_entregado) {
            resultado_entregado=true
            result=getResultado()
            if (result=="legend") {
                particles = this.add.particles('flare');
                particles.createEmitter({
                    frame: 'yellow',
                    x: 0,
                    y: 100,
                    lifespan: 2000,
                    speed: { min: 400, max: 600 },
                    angle: 680,
                    gravityY: 1000,
                    scale: { start: 0.4, end: 0 },
                    quantity: 5,
                    blendMode: 'ADD'
                });
                particles.createEmitter({
                    frame: 'yellow',
                    x: 800,
                    y: 100,
                    lifespan: 2000,
                    speed: { min: 400, max: 600 },
                    angle: 930,
                    gravityY: 1000,
                    scale: { start: 0.4, end: 0 },
                    quantity: 5,
                    blendMode: 'ADD'
                });    
                this.time.delayedCall(8000, function() {
                    particles.destroy();
                });   
            }
        }
    }
    ruleta.angle += velocidad;
    velocidad += aceleracion; 
}

function tirar() {
    resultado_entregado=false;
    aceleracion = - ((Math.random() * 3)+3)/30;
    velocidad   = Math.floor(Math.random() * 30)+15;
}

function numeroEntre(n, num1, num2){
    if (num2 < num1){
        let aux = num2;
        num2 = num1;
        num1 = aux;
    }

    if (n >= num1 && n <= num2){
        return true;
    }

    return false;
}

//corrección para basarse en los angulos que usa Phaser :/
// no costaba mucho que se basara en una notacion de 0 a 360º
function anguloComunAPhaser( angulo ){
    if (angulo > 180){
        return 360 - angulo;
    }
    return angulo;
}

function anguloPhaserAComun( angulo ){
    if (angulo < 0){
        return angulo + 360;
    }
    return angulo;
}

function getResultado(){
    //Se le suma 90º por que el selector esta arriba, no a la derecha de la ruleta
    let pos = anguloPhaserAComun( ruleta.angle);

    for (let c=0; c < categorias.length; c++){
        if ( numeroEntre(pos, categorias[c].a_i, categorias[c].a_f) ){
            return categorias[c].nombre;
        }
    }
    return null;
}