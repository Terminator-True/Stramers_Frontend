import Phaser from "phaser";
class Roulete extends Phaser.Scene{
     
    //Definicion de variables
    public config={
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'phaser-example',
        scene: {
            preload: this.preload,
            create: this.create,
            update: this.update
        }
    };
    public result;
    public boton;
    public ruleta;
    public particles;
    public aceleracion = -.1;
    public velocidad = 0;
    public arrow;
    public resultado_entregado=true;
    public categorias=[
        { id:0, a_i:0, a_f:0, nombre: 'uncommon'},
        { id:1, a_i:0, a_f:0, nombre: 'common'},
        { id:2, a_i:0, a_f:0, nombre: 'legend' }, //-27
        { id:3, a_i:0, a_f:0, nombre: 'retrigger'},
        { id:4, a_i:0, a_f:0, nombre: 'common'},
        { id:5, a_i:0, a_f:0, nombre: 'uncommon'},
        { id:6, a_i:0, a_f:0, nombre: 'epic'},             
    ];
    public intervalo_subdivision = 360/this.categorias.length;

    constructor(){
        super({key: 'Game'})
        for (let c=0; c < this.categorias.length; c++){
            this.categorias[c].a_i =  c*this.intervalo_subdivision;
            this.categorias[c].a_f = (c+1)*this.intervalo_subdivision;
        }
    }

    //Se asignan los valores de angulos a las categorias
    //Se usan angulos de 0 a 360 como seria lògico

    public game = new Phaser.Game(this.config);

    preload ()
    {
        this.load.image('fondo', './assets/imagen/wallpaper.jpg');
        this.load.image('arrow', './assets/imagen/select_ruleta.svg');
        this.load.image('ruleta', './assets/imagen/ruleta4.png');
        this.load.image('boton', './assets/imagen/btn_tirar.svg');
        this.load.atlas('flare', './assets/imagen/flares.png',"./assets/json/flares.json");

    }

    create (){
        this.add.image(400, 300, 'fondo');
        this.ruleta = this.add.sprite(400, 300, 'ruleta')
        this.arrow = this.add.sprite(570, 300, 'arrow');
        this.arrow.angle+=90;
        this.boton = this.add.sprite(400, 550, 'boton').setInteractive();
        this.boton.on('pointerdown', function (pointer) {
            this.setTint(0xff0000);
            this.tirar();

        });
        this.boton.on('pointerout', function (pointer) {

            this.clearTint();

        });
        this.boton.on('pointerup', function (pointer) {

            this.clearTint();

        });
    }

    update (){   
        if (this.velocidad < 0){
            this.velocidad = 0;
            if (!this.resultado_entregado) {
                this.resultado_entregado=true
                this.result=this.getResultado()
                if (this.result=="legend") {
                    this.particles = this.add.particles('flare');
                    this.particles.createEmitter({
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
                    this.particles.createEmitter({
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
                        this.particles.destroy();
                    });   
                }
            }
        }
        this.ruleta.angle += this.velocidad;
        this.velocidad += this.aceleracion; 
    }

    tirar() {
        this.resultado_entregado=false;
        this.aceleracion = - ((Math.random() * 3)+3)/30;
        this.velocidad   = Math.floor(Math.random() * 30)+15;
    }

    numeroEntre(n, num1, num2){
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
    anguloComunAPhaser( angulo ){
        if (angulo > 180){
            return 360 - angulo;
        }
        return angulo;
    }

    anguloPhaserAComun( angulo ){
        if (angulo < 0){
            return angulo + 360;
        }
        return angulo;
    }

    getResultado(){
        let pos = this.anguloPhaserAComun(this.ruleta.angle);

        for (let c=0; c < this.categorias.length; c++){
            if (this.numeroEntre(pos, this.categorias[c].a_i, this.categorias[c].a_f) ){
                return this.categorias[c].nombre;
            }
        }
        return null;
    }
}