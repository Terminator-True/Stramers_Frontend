import { Component, OnInit } from '@angular/core';

import { Global } from 'src/app/services/global';
import { UsuariService } from 'src/app/services/usuari.service';

import { Injectable } from '@angular/core';

import { CardService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-mazoedit',
  templateUrl: './mazoedit.component.html',
  styleUrls: ['./mazoedit.component.css']
})
@Injectable()
export class MazoeditComponent implements OnInit {

  public url:any;
  lista=[];
  public cards:any;


  constructor(
    private _cardService:CardService, private _userService:UsuariService,
  ) {
    this.url=Global.url
    this.lista=[];
  }

  ngOnInit(): void {
    //obtenim un array de todas las cartas del user
    // this._userService.getCards()
    // .subscribe(cards=>{
    //   this.cards=Object.values(cards)[0]; //obtenemos 3 arrays pero solo queremos la primera con les dades de la carta
    // }
    //obtenim un array de todas las cartas TEST 
    this._cardService.getCards()
    .subscribe(cards=>{
      this.cards=Object.values(cards)[0]; //obtenemos 3 arrays pero solo queremos la primera con les dades de la carta
    },
    error=>{
      console.log(error)
    })

  }
  // addcard(card){
    
  // }

}
