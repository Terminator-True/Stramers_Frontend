import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
//Form
import { Carta } from 'src/app/models/carta'; 
import { CardService } from 'src/app/services/carta.service';
<<<<<<< HEAD
import { UploadService } from 'src/app/services/upload.service';
=======

import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global'; 

>>>>>>> 62b3e830d8d2e2be90cd02c29ddcefdda923bcee
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [CardService, UploadService]

})
export class AdminComponent implements OnInit {

<<<<<<< HEAD
  public carta: Carta;
  public carta_desada:any;
  public filesToUpload:any;


  constructor(
    private _CardService:CardService,
    private _uploadService:UploadService


=======
  public cartas: Carta;
  public guardat = '';
  public filesToUpload:any;
  public card_desat: any;

  constructor(
    private _CardService:CardService, private _uploadService: UploadService
>>>>>>> 62b3e830d8d2e2be90cd02c29ddcefdda923bcee
  ) {
    this.carta = new Carta('','','',0,0,0,'','','');
  }
  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    // obtenemos un array de ficheros para hacer upload de mas de un fichero
    // pero para nosotros solo hacemos uno
    this.filesToUpload = <Array<File>>fileInput.target.files;
}
  ngOnInit() {
  }
<<<<<<< HEAD
  fileChangeEvent(fileInput: any){
    console.log(fileInput)
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  onSubmit(form:any){
    this._CardService.saveCard(this.carta).subscribe(
      result=>{          
      this.carta_desada=result
      console.log(result)
      if( this.carta_desada.project._id !="") {
          /*this._uploadService.makeFileRequest(
          Global.url+'/upload-image/'+this.carta_desada._id,
          [],
          this.filesToUpload,
          'image'
        ).then((res:any) => {
          console.log(res)
        });*/
      }
      });
=======

  onSubmit(form:any){
    this._CardService.saveCard(this.cartas).subscribe(
      response => {
        this.card_desat= response;
        console.log(this.card_desat);
        this._uploadService.makeFileRequest(
          Global.url+'upload-image/'+this.card_desat, //ruta de lbackend
          [],
          this.filesToUpload, // array de ficheros que subimos
          'image' // Nombre del campo que recive el campo en el modelo del backend "image" 
        ).then((result:any)=>{
          console.log(result);
        });
        this.guardat= "guardat correctament ";
        form.reset();
      },
      error => {
        console.log(error);
      }
    );  
>>>>>>> 62b3e830d8d2e2be90cd02c29ddcefdda923bcee
  }
}
