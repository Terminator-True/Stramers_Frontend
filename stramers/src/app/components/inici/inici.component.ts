import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.css']
})

export class IniciComponent implements OnInit {

  public nick:any;

  constructor() {  }

  ngOnInit(){
    this.nick=localStorage.getItem("nick")
  }

}
