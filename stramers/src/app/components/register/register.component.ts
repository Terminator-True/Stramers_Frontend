import { Component, OnInit } from '@angular/core';
//form
import { Register } from 'src/app/models/register.usuari';

import { UsuariService } from 'src/app/services/usuari.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public iniciUsuari: Register;
  alert = '';

  constructor(
    private _UsuariService:UsuariService
  ) {
    this.iniciUsuari = new Register('','','','');
   }
  ngOnInit(): void {
  }
  onSubmit(form:any){
    this._UsuariService.Registrar(this.iniciUsuari).subscribe(
      result=>this.alert=result.toString()
    )
    console.log(this.iniciUsuari);
    this.alert= "Registrado correctament";
  }
}
