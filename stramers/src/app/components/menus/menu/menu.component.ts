import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(    private _router: Router
    ) { }

  /**
   * Redirrecciona al inici si no esta logeado
   */
  ngOnInit(): void {
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
  }
  /**
   * Elimina el localStorage y sessionStorage
   */
  rmlocal(){
    localStorage.clear();
    sessionStorage.clear();
  }
}
