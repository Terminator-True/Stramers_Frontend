import { Component, OnInit } from '@angular/core';

import { UsuariService } from 'src/app/services/usuari.service';
import { Register } from 'src/app/models/register.usuari';

import {Router} from "@angular/router"

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  alert = '';
  public iniciUsuari: Register;

  constructor(
    private _UsuariService:UsuariService,
    private _router: Router

  ) { 
    this.iniciUsuari = new Register('','','');

  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._UsuariService.Registrar(this.iniciUsuari).subscribe(
      result=>this.alert=result.toString()
    )
    console.log(this.iniciUsuari);
    this.alert= "User editat correctament";
    this._router.navigate(["login"])
  }
}
