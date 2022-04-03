import { Component, OnInit } from '@angular/core';
//Form
import { Carta } from 'src/app/models/carta'; 

import { CardService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public cartas: Carta;


  constructor(
    private _CardService:CardService

  ) {
    this.cartas = new Carta('','','',0,0,0,'','','');
  }

  ngOnInit() {
  }
  onSubmit(form:any){
    this._CardService.saveCard(this.cartas).subscribe(
      card_data=>console.log(card_data)
    )
  }

}
