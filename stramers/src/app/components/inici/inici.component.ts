import { Component, OnInit } from '@angular/core';
//Form
import { Login } from 'src/app/models/inici.usuari';

@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.css']
})
export class IniciComponent implements OnInit {

  public iniciUsuari: Login;

  constructor() {
    this.iniciUsuari = new Login('','');

   }

  ngOnInit(){
  }

  onSubmit(form:any){
    console.log("Input from capturat");
    console.log(this.iniciUsuari);
  }

}
