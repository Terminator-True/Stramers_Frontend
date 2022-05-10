import { Component, OnInit } from '@angular/core';
//form
import { Register } from 'src/app/models/register.usuari';

import { UsuariService } from 'src/app/services/usuari.service';

import { Validators,FormControl,FormGroup } from "@angular/forms";

import {Router} from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
// VALIDAR EN TS, REDIRECCION SI ES REGISTRADO, VALIDAR GMAILS/NICKS YA GUARDADOS
export class RegisterComponent implements OnInit {

  public iniciUsuari: Register;
  alert = '';
  public pasw2:string;
  public error_status:string;
  public nickForm:any;

  public formAll: FormGroup = new FormGroup({});//declaracion de todo el form

  constructor(
    private _UsuariService:UsuariService,
    private _router: Router

  ) {
    this.pasw2="";
    this.iniciUsuari = new Register('','','');
    this.error_status="none";

   }
  ngOnInit(): void {
    this.initFormValid()
  }
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
  onSubmit(form:any){
    this._UsuariService.Registrar(this.iniciUsuari).subscribe(
      result=>this.alert=result.toString()
    )
    console.log(this.iniciUsuari);
    this.alert= "Registrado correctament";
    this._router.navigate(["login"])
  }
}
