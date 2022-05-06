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
    this.cards=[];
  }

  ngOnInit(): void {
    console.log(localStorage.getItem("nick")==null && localStorage.getItem("email")==null)
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
    this.nick=localStorage.getItem("nick")
    this._userService.getMoney(this.nick).subscribe(moneda=>{
      this.moneda=Object.values(moneda)[0];
    })
    //obtenim un array de todas las cartas
    this._cardService.getCards()
    .subscribe(cards=>{
      this.cards=Object.values(cards)[0]; //obtenemos 3 arrays pero solo queremos la primera con les dades de la carta
      this.cardsNumAll=Object.keys(Object.values(cards)[0]);
      this.cardsNumAll=this.cardsNumAll.length;
    },
    error=>{
      console.log(error)
    })
    //carta categori comun
    this._cardService.getCardsByCateg(this.comun)
    .subscribe(cards=>{
      this.comun1cards=Object.values(cards)[0][0]; //obtenemos 3 arrays pero solo queremos la primera con les dades de la carta
      this.comun2cards=Object.values(cards)[0][1];
    },
    error=>{
      console.log(error)
    })
    //carta categori raro
    this._cardService.getCardsByCateg(this.raro)
    .subscribe(cards=>{
      this.raro1cards=Object.values(cards)[0][0];
      this.raro2cards=Object.values(cards)[0][1];
    },
    error=>{
      console.log(error)
    })
    //carta categori epica
    this._cardService.getCardsByCateg(this.epica)
    .subscribe(cards=>{
      this.epica1cards=Object.values(cards)[0][0];
    },
    error=>{
      console.log(error)
    })

    //get user cards
    this._userService.getCards(this.nick)
    .subscribe(mazos=>{
      this.userCards=Object.values(mazos)[0];
      this.cardsnum=Object.keys(Object.values(mazos)[0]);
      this.cardsnum=this.cardsnum.length;

    },
    error=>{
      console.log(error)
    })
    // rotacio de las cartas por date
    // const date1 = new Date('5/5/2022');
    // const date2 = new Date();
    // var diff =Math.abs(date1.getTime()-date2.getTime())
    // var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    // console.log(diffDays);
    // if (this.cardsNumAll/2 <= diffDays){
    //   diffDays= diffDays-this.cardsNumAll
    // }
    // Between 0 and max
    
    const diff=Math.floor(Math.random() * (this.cardsNumAll/2 + 1));
    console.log(diff);
  }

  buy(card:any){
    if (localStorage.getItem("nick")==null) { 
        this._router.navigate([""])
      }
      this.nick=localStorage.getItem("nick")
      
      this.userCards[this.cardsnum]=card;
      console.log(this.userCards);
      // peticion updatear array mazo
      this._userService.BuyCard(this.userCards,this.nick).subscribe(
        result=>this.alert=result.toString()
      )
    }
    
}

