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

  ngOnInit(): void {
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
    this.nick=localStorage.getItem("nick")
    // peticion de obtener todos los mazos
    this._userService.getDecks(this.nick)
    .subscribe(mazos=>{
      this.mazos=Object.keys(Object.values(mazos)[0]);
      
      console.log(this.mazos)
    },
    error=>{
      console.log(error)
    })
  }

  change(mazo:any){
    localStorage.setItem(this.key, 'Angular');

    console.log(mazo);
    // setTimeout(() =>{
    //   localStorage.getItem("mazoupdate",mazo)
    // },500)

    // this._router.navigate(["/mazo/update"])
  }

}
