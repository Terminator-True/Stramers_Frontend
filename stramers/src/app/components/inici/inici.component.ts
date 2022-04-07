import { Component, OnInit } from '@angular/core';
//Form
import { Login } from 'src/app/models/inici.usuari';

import { UsuariService } from 'src/app/services/usuari.service';

import {Router} from "@angular/router"


@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.css']
})
export class IniciComponent implements OnInit {

  public iniciUsuari: Login;
  public session_storage:any;
  constructor(
    private _UsuariService:UsuariService,
    private _router: Router

  ) {
    this.iniciUsuari = new Login('','');

   }

  ngOnInit(){
  }

  onSubmit(form:any){
    this._UsuariService.Login(this.iniciUsuari).subscribe(user_data =>{
      this.session_storage=user_data
    })
      setTimeout(() =>{
        localStorage.setItem("email",this.session_storage.session.user.email)
        localStorage.setItem("nick",this.session_storage.session.user.nick)
        localStorage.setItem("moneda",this.session_storage.session.user.moneda)

        this._router.navigate(["menu"])
      },500) 
  }

}
