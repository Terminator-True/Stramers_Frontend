import GameHandler from "../helpers/GameHandler"
import DeckHandler from "../helpers/DeckHandler"
import InteractiveHandler from "../helpers/InteractiveHandler"
import SocketHandler from "../helpers/SocketHandler"
import UIHandler from "../helpers/UIHandler"
var path = require('path');
export default class Game extends Phaser.Scene{
    
    constructor(){
        super({
            key: 'Game'
        })
        this.url="https://10.42.17.150"
        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);

        const nick = urlParams.get('nick')
        console.log(nick)
        fetch(this.url+"/api/get-getDefaultDeck/"+nick)
            .then(response=>response.json())
            .then(data => { 
                setTimeout(() => {
                    this.aggregate(data.mazo)
                }, 500);
            })


    }
    aggregate(data){
        this.deck=data
        console.log(this.deck)

    }
    preload(){
        var progressBar = this.add.graphics();
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;

            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(width, height, 300 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });
            this.load.on('complete', function () {
                progressBar.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
        /**
         * -------------------------------
         */

        this.load.bitmapFont('text', 'src/assets/atari-smooth.png', 'src/assets/atari-smooth.xml');

        /**
         * Corazon para la vida del jugador y del oponente
         */
         this.load.image("corazon","src/assets/corazon.png") 
         this.load.image("mana","src/assets/Mana.png") 


        /**
         * dorsos de las cartas 
         * @luna player
         * @sol opponent
         */
        this.load.image("dorso_luna","src/assets/Dorso_luna.png")
        this.load.image("dorso_sol","src/assets/Dorso_Sol.png")
        //Cartas
        this.load.image("alexelcapo_san","src/assets/cartas/alexelcapo-san.png") 
        this.load.image("andiamo","src/assets/cartas/andiamo.png") 
        this.load.image("andorra","src/assets/cartas/andorra.png") 
        this.load.image("asmr","src/assets/cartas/asmr.png") 
        this.load.image("auronplay","src/assets/cartas/auronplay.png") 
        this.load.image("barbeq","src/assets/cartas/barbeq.png") 
        this.load.image("bigchungus","src/assets/cartas/big_chungus.png") 
        this.load.image("callate","src/assets/cartas/callate.png") 
        this.load.image("camera_cafe_100","src/assets/cartas/camera_cafe_100.png") 
        this.load.image("chusomontero","src/assets/cartas/chusomontero.png") 
        this.load.image("dalas","src/assets/cartas/dalasreview.png") 
        this.load.image("dross","src/assets/cartas/dross.png") 
        this.load.image("elmillor","src/assets/cartas/elmillor.png") 
        this.load.image("elxokas","src/assets/cartas/elxokas.png") 
        this.load.image("espectador","src/assets/cartas/espectador.png")
        this.load.image("esportmaniacos","src/assets/cartas/esportmaniacos.png") 
        this.load.image("facturas","src/assets/cartas/facturas.png")  
        this.load.image("garmy","src/assets/cartas/garmy.png")  
        this.load.image("golemNFT","src/assets/cartas/golemNFT.png")  
        this.load.image("horcus","src/assets/cartas/horcus.png")  
        this.load.image("hot_tub_streamer","src/assets/cartas/hot_tub_streamer.png") 
        this.load.image("ibai","src/assets/cartas/ibai.png")  
        this.load.image("illojuan","src/assets/cartas/illojuan.png")  
        this.load.image("impuestos","src/assets/cartas/impuestos.png")  
        this.load.image("jordi_wild","src/assets/cartas/jordi_wild.png") 
        this.load.image("knekro","src/assets/cartas/knekro.png")  
        this.load.image("lag","src/assets/cartas/lag.png") 
        this.load.image("lmdshow","src/assets/cartas/lmdshow.png")  
        this.load.image("lucille","src/assets/cartas/lucille.png") 
        this.load.image("mdlr","src/assets/cartas/mdlr.png") 
        this.load.image("mixwell","src/assets/cartas/mixwell.png")
        this.load.image("momoladinastia","src/assets/cartas/momoladinastia.png")
        this.load.image("mr_jagger","src/assets/cartas/mr_jagger.png")
        this.load.image("otaku","src/assets/cartas/otaku.png")
        this.load.image("paracetamor","src/assets/cartas/paracetamor.png")
        this.load.image("patentado","src/assets/cartas/patentado.png")
        this.load.image("pionera_del_clan_pambisito","src/assets/cartas/pionera_del_clan_pambisito.png")
        this.load.image("piromancia","src/assets/cartas/piromancia.png")
        this.load.image("podcast","src/assets/cartas/podcast.png")
        this.load.image("polimorf","src/assets/cartas/polimorf.png")
        this.load.image("politica","src/assets/cartas/politica.png")
        this.load.image("programador","src/assets/cartas/programador.png")
        this.load.image("raid","src/assets/cartas/raid.png")
        this.load.image("roedor","src/assets/cartas/roedor.png")
        this.load.image("shylily","src/assets/cartas/shylily.png")
        this.load.image("streamer","src/assets/cartas/streamer.png")
        this.load.image("suckway","src/assets/cartas/suckway.png")
        this.load.image("thegrefg","src/assets/cartas/thegrefg.png")
        this.load.image("tonacho_terrorista","src/assets/cartas/tonacho_terrorista.png")
        this.load.image("tonacho","src/assets/cartas/tonacho.png")
        this.load.image("twitch","src/assets/cartas/twitch.png")
        this.load.image("willyrex","src/assets/cartas/willyrex.png")
    }
    create(){
        this.matter.world.setBounds().disableGravity();
        this.circ = this.matter.add.image(200, 50, 'mana');

        // Le asignamos un cuerpo con un radio de 180 px
        this.circ.setBody({
            type: 'circle',
            radius: 180,
        });
    
        //Le asignamos velocidad, rebote y quitamos toda fricción
        
        this.circ.setVelocity(6, 3);
        this.circ.setAngularVelocity(0.01);
        this.circ.setBounce(1);
        this.circ.setFriction(0, 0, 0);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        this.buscant = this.add.bitmapText(width/2-250,height/2-50,"text","Buscando Partida...").setFontSize(24);
        this.InfoText = this.add.bitmapText(width/2-350,height/2-50,"text","").setFontSize(64)   
        this.InfoText.setDepth(1)

        this.DeckHandler = new DeckHandler(this)
        this.GameHandler = new GameHandler(this)
        this.SocketHandler = new SocketHandler(this);
        this.UIHandler = new UIHandler(this);
    }
    update() {
        
    }

}