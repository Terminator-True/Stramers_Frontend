import CardBack from "./cards/CardBack"
import Elxokas from "./cards/elxokas"
import Mdlr from "./cards/mdlr"
import Garmy from "./cards/garmy"
import Programador from "./cards/programador"
import Streamer from "./cards/streamer"
import Alexelcapo_san from "./cards/alexelcapo_san"
import Andiamo from "./cards/andiamo"
import Andorra from "./cards/andorra"
import Auronplay from "./cards/auronplay"
import Barbeq from "./cards/barbeq"
import Big_chungus from "./cards/big_chungus"
import Camera_cafe_100 from "./cards/camera_cafe_100"
import Chusomontero from "./cards/chusomontero"
import Dalasreview from "./cards/dalasreview"
import Dross from "./cards/dross"
import Elmillor from "./cards/elmillor"
import Espectador from "./cards/espectador"
import Esportmaniacos from "./cards/esportmaniacos"
import Asmr from "./cards/asmr"
import Callate from "./cards/callate"
import Facturas from "./cards/facturas"
import GolemNFT from "./cards/golemNFT"
import Horcus from "./cards/horcus"
import Hot_tub_streamer from "./cards/hot_tub_streamer"
import Ibai from "./cards/ibai"
import Illojuan from "./cards/illojuan"
import Impuestos from "./cards/impuestos"
import Jordi_wild from "./cards/jordi_wild"
import Knekro from "./cards/knekro"
import Lag from "./cards/lag"
import Lmdshow from "./cards/lmdshow"
import Mixwell from "./cards/mixwell"
import Mr_jagger from "./cards/mr_jagger"
import Paracetamor from "./cards/paracetamor"
import Patentado from "./cards/patentado"
import Pionera_del_clan_pambisito from "./cards/pionera_del_clan_pambisito"
import Piromancia from "./cards/piromancia"
import Polimorf from "./cards/polimorf"
import Podcast from "./cards/podcast"
import Politica from "./cards/politica"
import Raid from "./cards/raid"
import Roedor from "./cards/roedor"
import Shylily from "./cards/shylilly"
import Suckway from "./cards/suckway"
import Thegrefg from "./cards/thegrefg"
import Tonacho from "./cards/tonacho"
import Tonacho_terrorista from "./cards/tonacho_terrorista"
import Twitch from "./cards/twitch"
import Willyrex from "./cards/willyrex"
import Otaku from "./cards/otaku"
import Lucille from "./cards/lucille"
import Momoladinastia from "./cards/momoladinastia"
export default class DeckHandler{
    constructor(scene){
        this.dealCard = (x, y, name, type) => {
            let cards = {
                cardBack: new CardBack(scene),
                elxokas: new Elxokas(scene),
                mdlr: new Mdlr(scene),
                garmy: new Garmy(scene),
                programador: new Programador(scene),
                streamer: new Streamer(scene),
                alexelcapo_san: new Alexelcapo_san(scene),
                andiamo: new Andiamo(scene),
                andorra: new Andorra(scene),
                auronplay: new Auronplay(scene),
                barbeq: new Barbeq(scene),
                bigchungus: new Big_chungus(scene),
                camera_cafe_100: new Camera_cafe_100(scene),
                chusomontero: new Chusomontero(scene),
                dalas:new Dalasreview(scene),
                dross:new Dross(scene),
                elmillor:new Elmillor(scene),
                espectador:new Espectador(scene),
                esportmaniacos:new Esportmaniacos(scene),
                callate:new Callate(scene),
                asmr:new Asmr(scene),
                facturas:new Facturas(scene),
                golemNFT:new GolemNFT(scene),
                horcus:new Horcus(scene),
                hot_tub_streamer:new Hot_tub_streamer(scene),
                ibai:new Ibai(scene),
                illojuan:new Illojuan(scene),
                impuestos:new Impuestos(scene),
                jordi_wild:new Jordi_wild(scene),
                knekro:new Knekro(scene),
                lag:new Lag(scene),
                lmdshow:new Lmdshow(scene),
                mixwell:new Mixwell(scene),
                mr_jagger:new Mr_jagger(scene),
                paracetamor:new Paracetamor(scene),
                patentado:new Patentado(scene),
                pionera_del_clan_pambisito:new Pionera_del_clan_pambisito(scene),
                piromancia:new Piromancia(scene),
                polimorf:new Polimorf(scene),
                podcast:new Podcast(scene),
                politica:new Politica(scene),
                raid:new Raid(scene),
                rodeor:new Roedor(scene),
                shylily:new Shylily(scene),
                suckway:new Suckway(scene),
                thegrefg:new Thegrefg(scene),
                tonacho:new Tonacho(scene),
                tonacho_terrorista:new Tonacho_terrorista(scene),
                twitch:new Twitch(scene),
                willyrex:new Willyrex(scene),
                otaku: new Otaku(scene),
                lucille: new Lucille(scene),
                momoladinastia: new Momoladinastia(scene),
            }
            let newCard = cards[name];
            //console.log(newCard)
            return (newCard.render(x,y,type))
        }
    }
}