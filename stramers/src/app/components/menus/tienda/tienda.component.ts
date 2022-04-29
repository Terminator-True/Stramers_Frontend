import { Component, OnInit } from '@angular/core';

import { Global } from 'src/app/services/global';
import { CardService } from 'src/app/services/carta.service'; 
import { UsuariService } from 'src/app/services/usuari.service';


import { Injectable } from '@angular/core';




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



  constructor(
    private _cardService:CardService, private _userService:UsuariService
  ) {
    this.url=Global.url
    
  }
  
  ngOnInit(): void {
    this.nick=localStorage.getItem("nick")
    this._userService.getMoney(this.nick).subscribe(moneda=>{
      this.moneda=Object.values(moneda)[0];
    })
    //obtenim un array de todas las cartas
    this._cardService.getCards()
    .subscribe(cards=>{
      this.cards=Object.values(cards)[0]; //obtenemos 3 arrays pero solo queremos la primera con les dades de la carta
    },
    error=>{
      console.log(error)
    })
  }

}
