import { Component, OnInit } from '@angular/core';

import { Global } from 'src/app/services/global';
import { CardService } from 'src/app/services/carta.service'; 

import { Injectable } from '@angular/core';

import Phaser from 'phaser';



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



  constructor(
    private _cardService:CardService
  ) {
    this.url=Global.url
    
  }
  
  ngOnInit(): void {
    //obtenim un array de todas las cartas
    this._cardService.getCards()
    .subscribe(cards=>{
      this.cards=Object.values(cards)[0]; //obtenemos 3 arrays pero solo queremos la primera con les dades de la carta
      console.log(this.cards)
    },
    error=>{
      console.log(error)
    })
  }

}
