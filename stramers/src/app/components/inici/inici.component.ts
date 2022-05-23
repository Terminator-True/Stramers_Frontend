import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.css']
})

export class IniciComponent implements OnInit {
  public nick:any;
  public url:any;

  constructor() { this.url=Global.url }

  ngOnInit(){
    this.nick=localStorage.getItem("nick")
  }

}
