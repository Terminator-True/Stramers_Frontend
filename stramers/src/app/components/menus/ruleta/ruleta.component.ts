import { Component, OnInit, OnDestroy } from '@angular/core';
import { Global } from 'src/app/services/global';
import { CardService } from 'src/app/services/carta.service';
import { Injectable } from '@angular/core';
import { UsuariService } from 'src/app/services/usuari.service';
import {Router} from "@angular/router"

import Phaser from 'phaser';

/**
 * Clase de la ruleta
 */
class Roulete extends Phaser.Scene{

    //Definicion de variables
    public carta:any;
    public cartas:any;
    public cards:any;
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
        { id:0, a_i:0, a_f:0, nombre: 'raro_1'},
        { id:1, a_i:0, a_f:0, nombre: 'comun_1'},
        { id:2, a_i:0, a_f:0, nombre: 'legend' },
        { id:3, a_i:0, a_f:0, nombre: 'retrigger'},
        { id:4, a_i:0, a_f:0, nombre: 'comun_2'},
        { id:5, a_i:0, a_f:0, nombre: 'raro_2'},
        { id:6, a_i:0, a_f:0, nombre: 'epica'},
    ];
    public intervalo_subdivision = 360/this.categorias.length;
    constructor(){
        super({key: 'Game'})

        //Éste for hace los cálculos con el intervalo de subdivision
        //para que el programa sepa de manera exacta los ángulos de
        //cada categoría.
        //a_i: representa donde empieza el ángulo
        //a_f: representa donde termina
        //Ejemplo:
        //Si raro_1 tiene un  a_i:110º y un a_f:160º, si al girar
        //la ruleta queda entre esas dos posiciones, te devolverá una carta rara

        for (let c=0; c < this.categorias.length; c++){
            this.categorias[c].a_i =  c*this.intervalo_subdivision;
            this.categorias[c].a_f = (c+1)*this.intervalo_subdivision;
        }
        var tmp = sessionStorage.getItem("Ruleta")
        this.cards = JSON.parse(typeof(tmp)=="string"? tmp:"null")
        this.cartas={
          comun_1:this.cards[0][0],
          comun_2:this.cards[0][1],
          raro_1:this.cards[1][0],
          raro_2:this.cards[1][1],
          epica:this.cards[2][0],
          legend:this.cards[3][0]
        }
    }

    preload ()
    {
        this.load.image('comun_1',Global.url+"/get-image/"+this.cartas.comun_1.img)
        this.load.image('comun_2',Global.url+"/get-image/"+this.cartas.comun_2.img)

        this.load.image('raro_1',Global.url+"/get-image/"+this.cartas.raro_1.img)
        this.load.image('raro_2',Global.url+"/get-image/"+this.cartas.raro_2.img)
        this.load.image('epic',Global.url+"/get-image/"+this.cartas.epica.img)
        this.load.image('legend',Global.url+"/get-image/"+this.cartas.legend.img)




        this.load.image('arrow', Global.url+'/get-image-roulete/select_ruleta.svg');
        this.load.image('ruleta', Global.url+'/get-image-roulete/ruleta4.png');
        this.load.image('boton',Global.url+'/get-image-roulete/btn_tirar.svg');
        this.load.image('boton_sig', Global.url+'/get-image-roulete/btn_sig.svg');

        this.load.atlas('flare', Global.url+'/get-image-roulete/flares.png', Global.url+"get-image-roulete/flares.json");
        //Carga imagenes de las cartas

    }

    create (){
        var that=this;
        this.ruleta = this.add.sprite(600, 300, 'ruleta')
        this.arrow = this.add.sprite(770, 300, 'arrow');
        this.arrow.angle+=90;
        this.boton = this.add.sprite(600, 550, 'boton').setInteractive();

        /**
         * Si haces click al botón, llama a la función tirar
         */
        this.boton.on('pointerdown', function () {
          that.tirar();

        });

        //Se crea el botón siguiente, necesario para cuando te toca una carta
        this.boton_sig = this.add.sprite(600, 550, 'boton_sig').setInteractive();
        //Lo hacemos invisible
        this.boton_sig.visible=false
        //Indicamos que hace el botón al ser clicado
        this.boton_sig.on('pointerdown',  () => {
            this.siguiente();
            });
    }

    override update (){
      //Antes de que la ruleta comience a girar al revés
      //la detiene(debido a que en la ruleta siempre se le resta velociad cuando se hace una tirada
      // es necesario si no, no pararía nunca si no que aceleraría a la inversa perpetuamente)
        if (this.velocidad < 0){
            this.velocidad = 0;
            if (!this.resultado_entregado) {
                this.resultado_entregado=true
                this.result=this.getResultado()
                /**
                 * Según el resultado hará:
                 *  -Legendaria: crea unas particulas doradas y te muestra la carta
                 *  -Épica: crea unas particulas moradas y te muestra la carta
                 *  -Rara: Solamente te muestra la carta
                 *  -Común Solamente te muestra la carta
                 */
                switch (this.result) {
                    case "legend":
                        this.particles = this.add.particles('flare');
                        this.particles.createEmitter({
                            frame: 'yellow',
                            x: { min: 0, max: 1200 },
                            y: 0,
                            lifespan: 2000,
                            speed: { min: 400, max: 600 },
                            angle: 450,
                            gravityY: 1000,
                            scale: { start: 0.4, end: 0 },
                            quantity: 5,
                            blendMode: 'ADD'
                        });

                        this.boton_sig.visible=true
                        this.boton.visible=false
                        this.boton_sig.setDepth(1)
                        this.carta=this.add.image(600, 300, 'legend');
                        this.carta.scaleX=0.15
                        this.carta.scaleY=0.15

                        break;
                    case "epica":
                        this.particles = this.add.particles('flare');
                        this.particles.createEmitter({
                            frame: 'red',
                            x: { min: 0, max: 1200 },
                            y: 0,
                            lifespan: 2000,
                            speed: { min: 400, max: 600 },
                            angle: 450,
                            gravityY: 1000,
                            scale: { start: 0.4, end: 0 },
                            quantity: 5,
                            blendMode: 'ADD'
                        });
                        this.boton_sig.visible=true
                        this.boton.visible=false
                        this.boton_sig.setDepth(1)

                        this.carta=this.add.image(600, 300, 'epic');
                        this.carta.scaleX=0.15
                        this.carta.scaleY=0.15

                        break;
                    case "retrigger":
                        this.time.delayedCall(500, () => {this.tirar(true)});
                        break;
                    case "comun_1":
                      this.carta=this.add.image(600, 300, 'comun_1');
                      this.carta.scaleX=0.15
                      this.carta.scaleY=0.15
                      this.boton_sig.visible=true
                      this.boton_sig.setDepth(1)

                        break;
                    case "raro_1":
                      this.carta=this.add.image(600, 300, 'raro_1');
                      this.carta.scaleX=0.15
                      this.carta.scaleY=0.15
                      this.boton_sig.visible=true
                      this.boton_sig.setDepth(1)

                        break;
                    case "comun_2":
                      this.carta=this.add.image(600, 300, 'comun_2');
                      this.carta.scaleX=0.15
                      this.carta.scaleY=0.15

                      this.boton_sig.visible=true
                      this.boton_sig.setDepth(1)

                        break;
                    case "raro_2":
                      this.carta=this.add.image(600, 300, 'raro_2');
                      this.carta.scaleX=0.15
                      this.carta.scaleY=0.15
                      this.boton_sig.visible=true
                      this.boton_sig.setDepth(1)

                      break;
                }
            }
        }
        //actualiza el angulo de la ruleta(hace que gire)
        this.ruleta.angle += this.velocidad;
        //Actualiza la velocidad(hace que se frene)
        this.velocidad += this.aceleracion;
    }
    /**
     *
     * @param auto si la tirada es automática, la tirada es gratis
     */
    tirar(auto=false) {
        if (auto) {
            this.resultado_entregado=false;
            //genera una deceleración aleatoria
            this.aceleracion = - ((Math.random() * 3)+3)/30;
            //genera una velociad aleatoria
            this.velocidad   = Math.floor(Math.random() * 30)+15;
        }else{
            var moneda = sessionStorage.getItem("moneda")
            //Si la variable moneda en el local storage es null devuelve 0 si no
            // devuelve el valor indicado
            if (moneda==null ? null:parseInt(moneda) >= 1000) {
                setTimeout(() => {
                  //se actualiza el sessionStorage  con la moneda ya gastada
                    sessionStorage.setItem("moneda",(parseInt(typeof(moneda)=="string"? moneda:"null")-1000).toString())
                }, 500);
                this.resultado_entregado=false;
                 //genera una deceleración aleatoria
                this.aceleracion = - ((Math.random() * 3)+3)/30;
                  //genera una velociad aleatoria
                this.velocidad   = Math.floor(Math.random() * 30)+15;
            }
        }
    }
    /**
     * Devuelve si un número n está entre num1 y num2
     * @param n
     * @param num1
     * @param num2
     * @returns Boolean
     */
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
    /**
     * Según el ángulo, calcula que carta te ha tocado
     * @returns el tipo de carta que te ha de tocar
     */
    getResultado(){
        let pos = this.anguloPhaserAComun(this.ruleta.angle);

        for (let c=0; c < this.categorias.length; c++){
            if (this.numeroEntre(pos, this.categorias[c].a_i, this.categorias[c].a_f) ){
                return this.categorias[c].nombre;
            }
        }
        return null;
    }
    /**
     * Al darle al botón siguiente cuando se te muestra la carta
     * destruye la imagen hace el botón siguiente invisible,
     * para que se pueda seguir con las tiradas
     */
    siguiente() {
        this.carta.destroy()
        this.boton_sig.visible=false
        this.boton.visible=true
        if (this.particles) {
          this.particles.destroy()
        }
        sessionStorage.setItem("carta",JSON.stringify(this.cartas[this.result]))
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
  public nick:any;
  public moneda:any;
  public carta:any;
  public userCards:any;
  public cardsnum:any;

  constructor(
    private _cardService:CardService, private _userService:UsuariService,
    private _router: Router
  ) {
    this.url=Global.url
    this.config={
      type: Phaser.CANVAS,
      backgroundColor: '#2c3e50',
      parent: "gameContainer",
      scale:{
        mode:Phaser.Scale.FIT,
        width:"100%",
        height:"150%"
      },
      scene: [Roulete]
  };
    setInterval(()=>{
        this.moneda=sessionStorage.getItem("moneda")
        let carta = sessionStorage.getItem("carta")
        this.carta=JSON.parse(carta===null ? "null":carta)
        sessionStorage.removeItem("carta")
        if (this.carta && this.carta!=="null") {
          this.guardaCarta()
        }
    }, 1000);

   }

  ngOnInit(): void {
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
    this.nick=localStorage.getItem("nick")
    let nickT = localStorage.getItem("nick")
        this._userService.getCards(this.nick)
    .subscribe(mazos=>{
      this.cardsnum=Object.keys(Object.values(mazos)[0]);
      this.cardsnum=this.cardsnum.length == null ? 0:this.cardsnum.length;
      this.userCards=Object.values(mazos)[0];
    },
    error=>{
      console.log(error)
    })

    setTimeout(() => {
      this.phaserGame=new Phaser.Game(this.config);
    }, 750);

    this.nick = nickT==null ? "null":nickT;
    if (sessionStorage.getItem("moneda")) {
        this.salir()
    }
    setTimeout(() => {
      this._userService.getMoney(this.nick).subscribe(ok=>{
        var moneda = Object.values(ok)[0]
        sessionStorage.setItem("moneda",moneda)
    })
    }, 500);

    setTimeout(() => {
      this._cardService.getRouletteCards().subscribe(cards=>{
        sessionStorage.setItem("Ruleta",JSON.stringify(cards))
      })
    }, 500);
  }
  guardaCarta(){
    let names=this.userCards.map( (carta:any)=>{
      return carta.name
    })
    if (!names.includes(this.carta.name)) {
      this.userCards[this.cardsnum]=this.carta;
      var cartas = {cartas: this.userCards}
      this._userService.SetCard(cartas,this.nick).subscribe()
    }else{
      let coste=0;
      switch (this.carta.category) {
        case "Comun":
          coste=300;
          break;
        case "Raro":
            coste=400;
            break;
        case "Epica":
          coste=1000;
          break;
        case "Legend":
          coste=2000;
          break;
      }
      setTimeout(() => {
        var moneda = sessionStorage.getItem("moneda")
        var tmp = parseInt(moneda == null ? "0": moneda)+coste
        sessionStorage.setItem("moneda",tmp.toString())
      }, 500);
    }
  }
  salir(){
        this.phaserGame.destroy(true)
        var moneda=sessionStorage.getItem("moneda")
        sessionStorage.clear()
        this._userService.setMoney(this.nick,moneda == null ? "null": moneda).subscribe(ok=>{
            if (ok) {
                sessionStorage.clear()
            }
        })
  }

}
