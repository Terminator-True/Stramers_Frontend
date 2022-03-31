import { Component, OnInit } from '@angular/core';
//Form
import { Login } from 'src/app/models/inici.usuari';

import { UsuariService } from 'src/app/services/usuari.service';

@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.css']
})
export class IniciComponent implements OnInit {

  public iniciUsuari: Login;

  constructor(
    private _UsuariService:UsuariService

  ) {
    this.iniciUsuari = new Login('','');

   }

  ngOnInit(){
  }

  onSubmit(form:any){
    this._UsuariService.Login(this.iniciUsuari).subscribe(
      user_data=>console.log(user_data)
    )
  }

}
