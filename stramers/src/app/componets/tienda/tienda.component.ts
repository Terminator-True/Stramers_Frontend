import { Component, OnInit } from '@angular/core';

import { Global } from 'src/app/services/global';
import { CardService } from 'src/app/services/carta.service'; 

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

  constructor(
    private _cardService:CardService
  ) {
    this.url=Global.url
  }
  ngOnInit(): void {
    //obtenim un array de todas las cartas
    this._cardService.getCards()
    .subscribe(cards=>{
      this.projects=Object.values(cards)[0]; //obtenemos 3 arrays pero solo queremos la primera con les dades del proyecto
      console.log(this.projects.image)
    },
    error=>{
      console.log(error)
    })
  }

}
