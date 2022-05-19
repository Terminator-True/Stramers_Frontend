import { Component, OnInit } from '@angular/core';
//Form
import { Login } from 'src/app/models/inici.usuari';


import { UsuariService } from 'src/app/services/usuari.service';

import {Router, ActivatedRoute} from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public iniciUsuari: Login;
  public session_storage:any;
  public game:any;
  public error_status: string;
  public alert:any;
  constructor(
    private _UsuariService:UsuariService,
    private _router: Router

  ) {
    this.iniciUsuari = new Login('','');
    this.error_status="none";


   }

  ngOnInit(){
  }
  /**
   * formulari per logearte y si es correcta guarda el nick y email al localstorage redireccionan al menu
   * @param form:
   * @var email
   * @var passw
   */
  onSubmit(form:any){
    this._UsuariService.Login(this.iniciUsuari).subscribe(user_data =>{
      this.session_storage=user_data
      setTimeout(() =>{
        localStorage.setItem("email",this.session_storage.session.user.email)
        localStorage.setItem("nick",this.session_storage.session.user.nick)
        this._router.navigate(["menu"])
      },500)
    },error=>{
      this.alert=error.error.message
      this.error_status=""
    })
  }
  tanca(){
    this.error_status="none"
  }

}
