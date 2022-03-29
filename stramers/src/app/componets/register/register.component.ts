import { Component, OnInit } from '@angular/core';
//form
import { Register } from 'src/app/models/register.usuari';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public iniciUsuari: Register;
  alert = '';

  constructor() {
    this.iniciUsuari = new Register('','','','');
   }

  ngOnInit(): void {
  }
  onSubmit(form:any){
    console.log("Input from capturat");
    console.log(this.iniciUsuari);
    this.alert= "Registrado correctament";
  }
}
