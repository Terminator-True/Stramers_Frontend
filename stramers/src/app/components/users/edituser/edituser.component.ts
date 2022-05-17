import { Component, OnInit } from '@angular/core';

import { UsuariService } from 'src/app/services/usuari.service';
import { Register } from 'src/app/models/register.usuari';
import { ChangePass } from 'src/app/models/changePassword.usuari';

import {Router} from "@angular/router"

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  alert = '';
  public iniciUsuari: Register;
  public changepass: ChangePass;
  public nick:any;
  public email:any;

  public edituser:boolean

  constructor(
    private _UsuariService:UsuariService,
    private _router: Router

  ) { 
    this.edituser=true
    this.iniciUsuari = new Register('','','');
    this.changepass = new ChangePass('','');
  }

  ngOnInit(): void {
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
    this.nick=localStorage.getItem("nick")
    this.email=localStorage.getItem("email")
  }

  onSubmit(form:any){
    this._UsuariService.updateUser(this.nick,this.iniciUsuari).subscribe(
      result=>this.alert=result.toString()
    )
    console.log(this.iniciUsuari);
    this.alert= "User editat correctament";
    this._router.navigate(["menu"])
  }

  change(){
    if(this.edituser){
      console.log(this.edituser)
      this.edituser=false;
    }else{
      console.log(this.edituser)
      this.edituser=true;
    }
  }
}
