import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
import { CardService } from 'src/app/services/carta.service'; 

import { Injectable } from '@angular/core';

import Phaser from 'phaser';

export class Roulete extends Phaser.Scene{
     
    //Definicion de variables
    public boton_sig:any;
    public result:any;
    public boton:any;
    public ruleta:any;
    public particles: any;
    public aceleracion = -.1;
    public velocidad = 0;
    public arrow:any;
    public resultado_entregado=true;
    public categorias=[
        { id:0, a_i:0, a_f:0, nombre: 'raro'},
        { id:1, a_i:0, a_f:0, nombre: 'comun'},
        { id:2, a_i:0, a_f:0, nombre: 'legend' }, //-27
        { id:3, a_i:0, a_f:0, nombre: 'retrigger'},
        { id:4, a_i:0, a_f:0, nombre: 'comun'},
        { id:5, a_i:0, a_f:0, nombre: 'raro'},
        { id:6, a_i:0, a_f:0, nombre: 'epica'},           
    ];
    public intervalo_subdivision = 360/this.categorias.length;

    constructor(private _cardService:CardService){
        super({key: 'Game'})
        for (let c=0; c < this.categorias.length; c++){
            this.categorias[c].a_i =  c*this.intervalo_subdivision;
            this.categorias[c].a_f = (c+1)*this.intervalo_subdivision;
        }
    }

    //Se asignan los valores de angulos a las categorias
    //Se usan angulos de 0 a 360 como seria lògico

    preload ()
    {
        this.load.image('fondo', Global.url+'/get-image-roulete/wallpaper.jpg');
        this.load.image('arrow', Global.url+'/get-image-roulete/select_ruleta.svg');
        this.load.image('ruleta', Global.url+'/get-image-roulete/ruleta4.png');
        this.load.image('boton',Global.url+'/get-image-roulete/btn_tirar.svg');
        this.load.image('boton_sig', Global.url+'/get-image-roulete/btn_sig.svg');

        this.load.atlas('flare', Global.url+'/get-image-roulete/flares.png', Global.url+"get-image-roulete/flares.json");
        
        //Carga imagenes de las cartas

    }

    create (){
        var that=this;
        //this.add.image(400, 300, 'fondo');
        this.ruleta = this.add.sprite(400, 300, 'ruleta')
        this.arrow = this.add.sprite(570, 300, 'arrow');
        this.arrow.angle+=90;
        this.boton = this.add.sprite(400, 550, 'boton').setInteractive();
        this.boton.on('pointerdown', function () {
          //that.setTint(0xff0000);
          that.tirar();

        });
        this.boton.on('pointerout', function () {

            //that.clearTint();

        });
        this.boton.on('pointerup', function () {

            //that.clearTint()

        });

        this.boton_sig = this.add.sprite(400, 550, 'boton_sig').setInteractive();
        this.boton_sig.visible=false
        this.boton_sig.on('pointerdown',  () => {
            this.siguiente();
            });
    }

    override update (){   
        if (this.velocidad < 0){
            this.velocidad = 0;
            if (!this.resultado_entregado) {
                this.resultado_entregado=true
                this.result=this.getResultado()
                console.log(this.result)
                switch (this.result) {
                    case "legend":
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
    
                        this.boton_sig.visible=true
                        this.boton.visible=false
                        //this.carta.visible=true
                        break;
                    case "epica":
                        this.particles = this.add.particles('flare');
                        this.particles.createEmitter({
                            frame: 'red',
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
                            frame: 'red',
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
                        this.boton_sig.visible=true
                        this.boton.visible=false
                        //this.carta.visible=true
                        break;
                    case "retrigger":
                        this.time.delayedCall(500, () => {this.tirar(true)});   
                       
                        break;
                    case "comun":
                        break;
                    case "raro":
                        break;

                    default:
                        break;
                }
                   
                
            }
        }
        this.ruleta.angle += this.velocidad;
        this.velocidad += this.aceleracion; 
    }

    tirar(auto=false) {
        console.log(auto)
        if (auto) {
            this.resultado_entregado=false;
            this.aceleracion = - ((Math.random() * 3)+3)/30;
            this.velocidad   = Math.floor(Math.random() * 30)+15;   
        }else{
            console.log(Global.url+'get-money/'+localStorage.getItem("nick"))
            if ("") {
                
            }
            this.resultado_entregado=false;
            this.aceleracion = - ((Math.random() * 3)+3)/30;
            this.velocidad   = Math.floor(Math.random() * 30)+15;   
        }
    }

    numeroEntre(n: number, num1: number, num2: number){
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
    anguloComunAPhaser( angulo: number ){
        if (angulo > 180){
            return 360 - angulo;
        }
        return angulo;
    }

    anguloPhaserAComun( angulo: number ){
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

    siguiente() {
        //this.carta.visible=false
        this.boton_sig.visible=false
        this.boton.visible=true
        this.particles.destroy()
    }
}
@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.css']
})
export class RuletaComponent implements OnInit {
  config: Phaser.Types.Core.GameConfig;
  phaserGame:any;
  public url:any;

  constructor() {
    this.url=Global.url
    this.config={
      type: Phaser.CANVAS,
      width: 800,
      height: 600,
      parent: "gameContainer",
      scene: [Roulete]
  };
   }

  ngOnInit(): void {
    this.phaserGame=new Phaser.Game(this.config);

  }

}
