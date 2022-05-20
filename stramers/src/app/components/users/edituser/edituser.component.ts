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
  public error_status: string;
  public session_storage: any;

  constructor(
    private _UsuariService:UsuariService,
    private _router: Router

  ) { 
    this.edituser=true
    this.iniciUsuari = new Register('','','');
    this.changepass = new ChangePass('','');
    this.error_status="";
  }

  /**
   * obtenim el nick y el email per mostrarlos al form
   */
  ngOnInit(): void {
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
    this.nick=localStorage.getItem("nick")
    this.email=localStorage.getItem("email")
  }

  /**
   * formularis per editar user
   * @param form
   * @var nick
   * @var email
   * @var passw password de confirmacio
   * o
   * @var passw antic password de confirmacio
   * @var passw1 nou password
   */
  onSubmit(form:any){
    this._UsuariService.updateUser(this.nick,this.iniciUsuari).subscribe(result=>{
      // this.session_storage=result
      this.alert=result.toString()
      setTimeout(() =>{
        localStorage.setItem("email",this.session_storage.session.user.email)
        localStorage.setItem("nick",this.session_storage.session.user.nick)
      },500)
    },error=>{
      this.alert=error.error.message
      this.error_status=""
    })
    console.log(this.iniciUsuari);
    this.alert= "User editat correctament";
  }

  /**
   * cambiar de form de editar nick y email a password y viceversa
   */
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
