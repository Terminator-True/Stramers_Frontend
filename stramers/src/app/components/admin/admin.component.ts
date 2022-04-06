import { Component, OnInit } from '@angular/core';
//Form
import { Carta } from 'src/app/models/carta'; 
import { CardService } from 'src/app/services/carta.service';

import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global'; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [CardService, UploadService]

})
export class AdminComponent implements OnInit {

  public cartas: Carta;
  public guardat = '';
  public filesToUpload:any;
  public card_desat:any;

  constructor(
    private _CardService:CardService, 
    private _uploadService: UploadService
  ) {
    this.cartas = new Carta('','Comun','Esbirro',0,0,0,'-',true,"null");
  }
  ngOnInit() {
  }
  fileChangeEvent(fileInput: any){
    // obtenemos un array de ficheros para hacer upload de mas de un fichero
    // pero para nosotros solo hacemos uno
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  onSubmit(form:any){
    this._CardService.saveCard(this.cartas).subscribe(
      response => {
        this.card_desat = response;
        if (this.card_desat.card._id!="") {
          this._uploadService.makeFileRequest(
            Global.url+'upload-image/'+this.card_desat.card._id, //ruta del backend
            [],
            this.filesToUpload, // array de ficheros que subimos
            'img' // Nombre del campo que recive el campo en el modelo del backend "image" 
          ).then((result:any)=>{
            console.log(result);
          });
        }
        this.guardat= "guardat correctament ";
        //form.reset();
      },
      error => {
        //console.log(error);
      }
    );  
  }
}
