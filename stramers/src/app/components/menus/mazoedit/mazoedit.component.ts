import { Component, OnInit } from '@angular/core';

import { Global } from 'src/app/services/global';
import { UsuariService } from 'src/app/services/usuari.service';

import { Injectable } from '@angular/core';

import { CardService } from 'src/app/services/carta.service';

import {Router} from "@angular/router"


@Component({
  selector: 'app-mazoedit',
  templateUrl: './mazoedit.component.html',
  styleUrls: ['./mazoedit.component.css']
})
@Injectable()
export class MazoeditComponent implements OnInit {

  public url:any;
  public lista:any;
  public cards:any;
  public nick:any;
  public deckname:any;
  alert = '';
  public mazos:any={};
  public count:number;
  public mazonum:any;
  // filter
  public abc:boolean;
  public cag:boolean;
  public cost:boolean;

  constructor(
    private _cardService:CardService, private _userService:UsuariService, private _router: Router

  ) {
    this.url=Global.url
    this.lista=[];
    this.deckname="New Deck";
    this.count=0;
    // filter
    this.abc=true;
    this.cag=true;
    this.cost=true;
  }

  ngOnInit(): void {
    //obtenim un array de todas las cartas del user
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
    this.nick=localStorage.getItem("nick")
    this._userService.getCards(this.nick)
    .subscribe(cards=>{
      this.cards=Object.values(cards)[0]; //obtenemos 3 arrays pero solo queremos la primera con les dades de la carta
    },

    //obtenim un array de todas las cartas TEST
    // this._cardService.getCards()
    // .subscribe(cards=>{
    //   this.cards=Object.values(cards)[0]; //obtenemos 3 arrays pero solo queremos la primera con les dades de la carta
    // },
    error=>{
      console.log(error)
    })

    // peticion de obtener todos los mazos del user
    this._userService.getDecks(this.nick)
    .subscribe(mazos=>{
      this.mazos=Object.values(mazos)[0];
      this.mazonum=Object.keys(Object.values(mazos)[0]);
      this.mazonum=this.mazonum.length;
      this.deckname="New Deck "+(this.mazonum+1);
    },
    error=>{
      console.log(error)
    })
  }
  // añade un objecto de la carta a la llista y muesra el nombre a la llista de crear mazo
  addcard(card:any){
    if (!this.lista.includes(card) && this.count<=14){
      this.lista.push(card);
      this.count+=1;
      this.cards.splice(this.cards.indexOf(card),1)
    }
  }
  // elimina el objecto de la carta a la llista y la quita el nombre de la llista
  delcard(card:object){
    let index=this.lista.indexOf(card)
    this.cards.push(card)
    this.lista.splice(index,1)
    console.log(card);
    this.count-=1;
  }

  // get de todos los mazos que tiene el usuario, lo actualitzaos para añadir el nuevo mazo i enviamos el nuevo array assosiatiu de mazos
  updeck(){
    if(this.count==15){
      if (localStorage.getItem("nick")==null) {
        this._router.navigate([""])
      }
      this.nick=localStorage.getItem("nick")


      this.mazos[this.deckname]=this.lista.map(function(card:any){return card.name.toLowerCase() });
      let tmp={mazos:this.mazos}
      console.log(tmp);
      // peticion updatear array mazo
      this._userService.Updeck(tmp,this.nick).subscribe(
        result=>this.alert=result.toString()
      )
    }

  }

  filterAbc(){
    if(this.abc){
      this.abc=false;
      this.cards.sort(function(x:any, y:any) {
        if (x.name < y.name) {
          return -1;
        }
        if (x.name > y.name) {
          return 1;
        }
        return 0;
      });
    }else{
      this.abc=true;
      this.cards.sort(function(x:any, y:any) {
        if (x.name > y.name) {
          return -1;
        }
        if (x.name < y.name) {
          return 1;
        }
        return 0;
      });
    }
    
  }

  filterCag(){
    if(this.cag){
      this.cag=false;
      this.cards.sort(function(x:any, y:any) {
        if (x.category < y.category) {
          return -1;
        }
        if (x.category > y.category) {
          return 1;
        }
        return 0;
      });
    }else{
    this.cag=true;
      this.cards.sort(function(x:any, y:any) {
        if (x.category > y.category) {
          return -1;
        }
        if (x.category < y.category) {
          return 1;
        }
        return 0;
      });
    }
  }

  filterCosts(){
    if(this.cost){
      this.cost=false;
      this.cards.sort(function(x:any, y:any) {
        if (x.coste < y.coste) {
          return -1;
        }
        if (x.coste > y.coste) {
          return 1;
        }
        return 0;
      });
    }else{
      this.cost=true;
      this.cards.sort(function(x:any, y:any) {
        if (x.coste > y.coste) {
          return -1;
        }
        if (x.coste < y.coste) {
          return 1;
        }
        return 0;
      });
    }
    
  }
}
