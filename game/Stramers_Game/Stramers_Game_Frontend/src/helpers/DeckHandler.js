import CardBack from "./cards/CardBack"
import Elxokas from "./cards/elxokas"
import Mdlr from "./cards/mdlr"
import Garmy from "./cards/garmy"
import Programador from "./cards/programador"
import Streamer from "./cards/streamer"
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
            }
            let newCard = cards[name];
            //console.log(newCard)
            return (newCard.render(x,y,type))
        }
    }
}