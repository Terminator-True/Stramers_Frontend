import { Component, OnInit } from '@angular/core';
//form
import { Register } from 'src/app/models/register.usuari';

import { UsuariService } from 'src/app/services/usuari.service';

import { Validators,FormControl,FormGroup } from "@angular/forms";

import {Router} from "@angular/router"

import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public iniciUsuari: Register;
  public alert:any;
  public pasw2:string;
  public error_status:string;
  public nickForm:any;

  public formAll: FormGroup = new FormGroup({});//declaracion de todo el form

  public url:any;
  constructor(
    private _UsuariService:UsuariService,
    private _router: Router

  ) {
    this.pasw2="";
    this.iniciUsuari = new Register('','','');
    this.error_status="none";
    this.url=Global.url

   }
  /**
   * llama la funcion de validar formulari
   */
  ngOnInit(): void {
    this.initFormValid()
  }
  /**
   * valida el formulari
   */
  initFormValid():void{
    this.formAll = new FormGroup(
      {
        nick: new FormControl('', [Validators.required]),
        email: new FormControl('',[Validators.required,Validators.email]),
        pasw: new FormControl('',[Validators.required,Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")])
      }
    )
  }

  tanca(){
    this.error_status="none"
  }
  /**
   * formulari per registrarse y te redirecciona al login
   * @param form:
   * @var nick
   * @var email
   * @var passw
   */
  onSubmit(form:any){
    this._UsuariService.Registrar(this.iniciUsuari).subscribe(
      result=>{
        if (result) {
          this._router.navigate(["login"])
        }
      },
      error=>{
        console.log(error.error.message)
        this.alert=error.error.message
        this.error_status=""
      }
    )
  }
}
