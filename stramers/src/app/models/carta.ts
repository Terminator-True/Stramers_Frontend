export class Carta{
    constructor(
        public name:String,
        public category:String,
        public type: String,
        public coste: Number,
        public dmg: Number,
        public vida: Number,
        public text: String,
        public obtenible: Boolean,
        public img:String
    ){}
}