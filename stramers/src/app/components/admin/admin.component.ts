import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
//Form
import { Carta } from 'src/app/models/carta'; 

import { CardService } from 'src/app/services/carta.service';
import { UploadService } from 'src/app/services/upload.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public carta: Carta;
  public carta_desada:any;
  public filesToUpload:any;


  constructor(
    private _CardService:CardService,
    private _uploadService:UploadService


  ) {
    this.carta = new Carta('','','',0,0,0,'','','');
  }

  ngOnInit() {
  }
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
  }
}
