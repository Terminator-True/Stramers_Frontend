import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { UsuariService } from 'src/app/services/usuari.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  public nick:any;
  public mazos:any;
  public session_storage:any;
  public mazoName:any;

  constructor(
    private _router: Router, private _userService:UsuariService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
    this.nick=localStorage.getItem("nick")
    // peticion de obtener todos los mazos
    this._userService.getDecks(this.nick)
    .subscribe(mazos=>{
      this.mazos=Object.keys(Object.values(mazos)[0]);      
    },
    error=>{
      console.log(error)
    })
  }

  select(mazoName:any){
    this._userService.getDecks(this.nick)
    .subscribe(mazos=>{
      this.session_storage=Object.values(mazos)[0][mazoName];
      for (let i = 0; i < mazos; i++) {
        this.session_storage+=this.session_storage
      }
      console.log(this.session_storage)
      setTimeout(() =>{
        localStorage.setItem("mazo",this.session_storage)
        this.mazoName=mazoName;
      },500)

    },
    error=>{
      console.log(error)
    })

  }


}
