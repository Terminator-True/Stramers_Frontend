import { Component, OnInit } from '@angular/core';
//Form
import { Login } from 'src/app/models/inici.usuari';


import { UsuariService } from 'src/app/services/usuari.service';

import {Router, ActivatedRoute} from "@angular/router"
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

  public formAll: FormGroup = new FormGroup({});//declaracion de todo el form

  constructor(
    private _UsuariService:UsuariService,
    private _router: Router

  ) {
    this.iniciUsuari = new Login('','');
    this.error_status="none";


   }

  ngOnInit(){
    this.initFormValid()
  }
  /**
  * valida el formulari
  */
  initFormValid():void{
    this.formAll = new FormGroup(
      {
        email: new FormControl('',[Validators.required,Validators.email]),
        pasw: new FormControl('',[Validators.required,Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")])
      }
    )
  }

  /**
   * formulari per logearte y si es correcta guarda el nick y 
   * email al localstorage redireccionan al menu
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