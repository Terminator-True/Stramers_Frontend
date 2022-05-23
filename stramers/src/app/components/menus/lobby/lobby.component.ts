import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { UsuariService } from 'src/app/services/usuari.service';

import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  public nick:any;
  public mazos:any;
  public llistaCards:any;
  public mazoName:any;
  public url:any;
  public win: any;
  public moneda:any;

  constructor(
    private _router: Router, 
    private _userService:UsuariService,
    private route: ActivatedRoute
  ) {
    this.url=Global.url
  }

  /**
   * llista els mazos del usuario que tiene
   * @var mazos nom del mazo
   */
  ngOnInit(): void {
    // si no te nick, te redirecciona al inici
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
    // Obtenemos las monedas qeu tiene el usuario
    this._userService.getMoney(this.nick).subscribe(ok=>{
      var moneda = Object.values(ok)[0]
      sessionStorage.setItem("moneda",moneda)
    })
    // obtiene las monedas de la partida el usuario
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { win: "fiction" }
        this.win = params['win'];
        console.log(this.win); // fiction
        this.moneda = sessionStorage.getItem("moneda")
        if(this.win==true){
          this.moneda = this.moneda+500
          this._userService.setMoney(this.nick,this.moneda == null ? "null": this.moneda).subscribe(ok=>{
            if (ok) {
                sessionStorage.clear()
                this._router.navigate(["lobby"])
            }
        })
        }else if (this.win==false) {
          this.moneda = this.moneda+100
          this._userService.setMoney(this.nick,this.moneda == null ? "null": this.moneda).subscribe(ok=>{
            if (ok) {
                sessionStorage.clear()
                this._router.navigate(["lobby"])
            }
          })
        }
      }
    );
  }

  /**
   * seleciona un mazo, lo guardarlo a la datebase para usarlo en el juego
   * @param mazoName nom del mazo
   * @var llistaCards llista de las cartas del mazo
   */
  select(mazoName:any){
    this._userService.getDecks(this.nick)
    .subscribe(mazos=>{
      this.llistaCards=Object.values(mazos)[0][mazoName];
      this.mazoName=mazoName;
      this._userService.setDefaultDeck({mazo: this.llistaCards},this.nick).subscribe(
        result=>result.toString()
      )
    },
    error=>{
      console.log(error)
    })
  }
}
