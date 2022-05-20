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

  /**
   * llista els mazos del usuario que tiene
   * @var mazos nom del mazo
   */
  ngOnInit(): void {
    // si no te nick el redirecciona al inici
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

  /**
   * seleciona un mazo, lo guardarlo a la datebase para usarlo en el juego
   * @param mazoName nom del mazo
   */
  select(mazoName:any){
    this._userService.getDecks(this.nick)
    .subscribe(mazos=>{
      this.session_storage=Object.values(mazos)[0][mazoName];
      this.mazoName=mazoName;
      this._userService.setDefaultDeck({mazo: this.session_storage},this.nick).subscribe(
        result=>result.toString()
      )
    },
    error=>{
      console.log(error)
    })

  }


}
