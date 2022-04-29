import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router"

@Component({
  selector: 'app-mazo',
  templateUrl: './mazo.component.html',
  styleUrls: ['./mazo.component.css']
})
export class MazoComponent implements OnInit {

  constructor(    private _router: Router
    ) { }

  ngOnInit(): void {
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
  }

}
