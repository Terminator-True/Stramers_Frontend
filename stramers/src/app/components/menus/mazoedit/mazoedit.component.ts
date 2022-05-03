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
  public decknames:any;
  alert = '';



  constructor(
    private _cardService:CardService, private _userService:UsuariService, private _router: Router

  ) {
    this.url=Global.url
    this.lista=[];
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

  }
  // añade un objecto de la carta a la llista y muesra el nombre a la llista de crear mazo
  addcard(card:any){
    console.log(card);
    if (!this.lista.includes(card)){
      this.lista.push(card);
    }
  }
  // elimina el objecto de la carta a la llista y la quita el nombre de la llista
  delcard(card:object){
    let index=this.lista.indexOf(card)
    this.lista.splice(index,index+1)
    console.log(card);
  }
  // guarda el nombre del input cuando se actulitza i lo guarda en una variable
  // deckname(name:any){
  //   this.decknames=name;
  // }

  updeck(){
    this._userService.Updeck(this.lista).subscribe(
      result=>this.alert=result.toString()
    )
    console.log(this.lista);
  }

}
