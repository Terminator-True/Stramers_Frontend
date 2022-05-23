import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router"
import { UsuariService } from 'src/app/services/usuari.service';

import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-mazo',
  templateUrl: './mazo.component.html',
  styleUrls: ['./mazo.component.css']
})
export class MazoComponent implements OnInit {

  public nick:any;
  public mazos:any;
  public url:any;

  constructor(
     private _router: Router, private _userService:UsuariService,
    ) {
      this.url=Global.url
    }
  /**
   * peticion de obtener todos los mazos del User
   */
  ngOnInit(): void {
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
    this.nick=localStorage.getItem("nick")
    this._userService.getDecks(this.nick)
    .subscribe(mazos=>{
      this.mazos=Object.keys(Object.values(mazos)[0]);
    },
    error=>{
      console.log(error)
    })
  }
}
