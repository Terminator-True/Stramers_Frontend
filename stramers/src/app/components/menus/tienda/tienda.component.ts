import { Component, OnInit } from '@angular/core';

import { Global } from 'src/app/services/global';
import { CardService } from 'src/app/services/carta.service';
import { UsuariService } from 'src/app/services/usuari.service';

import { Injectable } from '@angular/core';

import {Router} from "@angular/router"

// import { CompileFunctionOptions } from 'vm';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})

@Injectable()


export class TiendaComponent implements OnInit {

  public url:any;
  public projects:any;
  public cards:any;
  public nick:any;
  public moneda:any;
  public userCards:any;
  public cardsnum:any;
  public cardsNumAll:any;
  // categorias
  public comun:string;
  public raro:string;
  public epica:string;
  public legend:string;

  public categcards:any;
  // cartas de las tiendas
  public epica1cards:any;
  public raro1cards:any;
  public raro2cards:any;
  public comun1cards:any;
  public comun2cards:any;

  alert = '';


  constructor(
    private _cardService:CardService, private _userService:UsuariService,
    private _router: Router
) {
    this.url=Global.url
    this.comun="Comun"
    this.raro="Raro"
    this.epica="Epica"
    this.legend="Legend"

    setInterval(()=>{
      this.moneda=sessionStorage.getItem("moneda")
    }, 1000);
    }

  ngOnInit(): void {
    console.log(localStorage.getItem("nick")==null && localStorage.getItem("email")==null)
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }

    this._cardService.getDailyCards().subscribe(cards=>{
        this.cards=Object.values(cards)[0];
        console.log(this.cards)
    })

    this.nick=localStorage.getItem("nick")
    this._userService.getMoney(this.nick).subscribe(ok=>{
      var moneda = Object.values(ok)[0]
      sessionStorage.setItem("moneda",moneda)
    })

    //get user cards
    this._userService.getCards(this.nick)
    .subscribe(mazos=>{
      this.userCards=Object.values(mazos)[0];
      this.cardsnum=Object.keys(Object.values(mazos)[0]);
      this.cardsnum=this.cardsnum.length == null ? 0:this.cardsnum.length;
    },
    error=>{
      console.log(error)
    })

    setTimeout(() => {
      this.comun1cards=this.cards[0][0]
      this.comun2cards=this.cards[0][1]

      this.raro1cards=this.cards[1][0]
      this.raro2cards=this.cards[1][1]

      this.epica1cards=this.cards[2][0]



    }, 1000);

  }


  buy(card:any){
    let coste=0;
    switch (card.category) {
      case "Comun":
        coste=600;
        break;
      case "Raro":
          coste=800;
          break;
      case "Epica":
        coste=2000;
        break;
    }
    var moneda = sessionStorage.getItem("moneda");

    let names=this.userCards.map( (carta:any)=>{
      return carta.name
    })

    if (!names.includes(card.name)) {
      //Si la variable moneda al local storage es null retorna 0 si no
      // retorna el valor indicat
      if (moneda==null ? null:parseInt(moneda) >= coste) {
          setTimeout(() => {
              sessionStorage.setItem("moneda",(parseInt(typeof(moneda)=="string"? moneda:"null")-coste).toString())
              this.userCards[this.cardsnum]=card;
              var cartas = {cartas: this.userCards}
              // peticion updatear array mazo
              this._userService.BuyCard(cartas,this.nick).subscribe(
                result=>this.alert=result.toString()
              )
          }, 500);
      }
    }else{
      console.log("ja tens la carta")
    }
  }

  salir(){
        var moneda=sessionStorage.getItem("moneda")
        this._userService.setMoney(this.nick,moneda == null ? "null": moneda).subscribe(ok=>{
            if (ok) {
                console.log(ok)
                sessionStorage.clear()
            }else{
                console.log(ok)
            }
        })

  }

}

