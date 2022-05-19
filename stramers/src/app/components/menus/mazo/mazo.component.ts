import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router"
import { UsuariService } from 'src/app/services/usuari.service';


@Component({
  selector: 'app-mazo',
  templateUrl: './mazo.component.html',
  styleUrls: ['./mazo.component.css']
})
export class MazoComponent implements OnInit {

  public nick:any;
  public mazos:any;

  key: string = 'Name';
  public myItem: string;


  constructor(
     private _router: Router, private _userService:UsuariService,
    ) { 
      this.myItem="asdasdadasd";

    }
  /**
   * peticion de obtener todos los mazos
   */
  ngOnInit(): void {
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
    this.nick=localStorage.getItem("nick")
    this._userService.getDecks(this.nick)
    .subscribe(mazos=>{
      this.mazos=Object.keys(Object.values(mazos)[0]);
      
      console.log(this.mazos)
    },
    error=>{
      console.log(error)
    })
  }
  /**
   * extraer el nom del mazo 
   * extraer el nom del mazo y redirecciona al updatear mazos
   */
  change(mazo:any){
    console.log(mazo);
    // this._router.navigate(["/mazo/update"])
  }

}
