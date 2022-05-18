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
  /**
   * recive una array con informacion de la img dentro de la primera array esta
   * array "File"
   * @param fileInput
   */
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  /**
   * Recive toda la informacion de una carta para añadirla
   * a la base de datos
   * @param form:
   * @var name
   * @var category la rareza
   * @var type hechizo o unidad
   * @var coste
   * @var dmg
   * @var vida
   * @var text es una descripcion de si tiene pasiba
   * @var obtenible para las cartas que no puedan tener los users
   * @var img
   */
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
      },
      error => {
        console.log(error);
      }
    );  
  }
}
