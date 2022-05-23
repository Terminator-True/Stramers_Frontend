import { Component, OnInit } from '@angular/core';

import { UsuariService } from 'src/app/services/usuari.service';
import { Register } from 'src/app/models/register.usuari';
import { ChangePass } from 'src/app/models/changePassword.usuari';

import { Global } from 'src/app/services/global';

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

  public passw:any;
  public passwN:any;
  public passwC:any;

  public url:any;

  constructor(
    private _UsuariService:UsuariService,
    private _router: Router

  ) {
    this.edituser=true
    this.iniciUsuari = new Register('','','');
    this.changepass = new ChangePass('','','');
    this.error_status="";
    this.url=Global.url
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
   * @var passw antic password de confirmacio
   * @var passw1 nou password
   * Es necesario pasar todo el objeto de usuario por parametro para que se actualice
   *
   */
  onSubmit(form:any){
    if (this.changepass.paswC === this.changepass.paswN || this.changepass.paswC!=="" && this.changepass.paswN!==""
    ) {
      this._UsuariService.updatePassword(this.nick,this.changepass).subscribe(result=>{
        this.alert=result.toString()
        console.log(result)
        form.reset()

      })
    }else if(this.iniciUsuari.email!=="" || this.iniciUsuari.nick!==""){
      this.iniciUsuari.email = this.iniciUsuari.email === "" ? this.email: this.iniciUsuari.email
      this.iniciUsuari.nick = this.iniciUsuari.nick === "" ? this.nick: this.iniciUsuari.nick
      this._UsuariService.updateUser(this.nick,this.iniciUsuari).subscribe(result=>{
        // this.session_storage=result
        this.alert=result.toString()
        localStorage.clear()
        setTimeout(() =>{
          localStorage.setItem("email",this.iniciUsuari.email)
          localStorage.setItem("nick",this.iniciUsuari.nick)
          window.location.reload();
        },500)
      },error=>{
        this.alert=error.error.message
        this.error_status=""
      })
      console.log(this.nick);
      this.alert= "User editat correctament";
      form.reset()

  }
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
