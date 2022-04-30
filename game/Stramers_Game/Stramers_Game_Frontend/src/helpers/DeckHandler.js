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
                Elxokas: new Elxokas(scene),
                Mdlr: new Mdlr(scene),
                Garmy: new Garmy(scene),
                Programador: new Programador(scene),
                Streamer: new Streamer(scene),
            }
            let newCard = cards[name];
            //console.log(newCard)
            return (newCard.render(x,y,type))
        }
    }
}
