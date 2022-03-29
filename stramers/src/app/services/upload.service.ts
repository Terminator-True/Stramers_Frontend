import { Injectable } from "@angular/core";
import { Global } from "./global";

@Injectable()
export class UploadService{
    public url: string;
    public filesToUpload: File[]=[];

    constructor(){
        this.url = Global.url;
    }
    //hacemos una peticio AJAX para subir un arxiu al servidor 
    makeFileRequest(url: string, params: Array<string>, files: Array <any>, name:string){
        return new Promise(function(resolve,reject){
            // crer formulario
            var formData:any=new FormData();
            //objecto para la peticion AJAX
            var xhr=new XMLHttpRequest();
            //For para recorrer la array
            for (var i=0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }
            // la peticion AJAX
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4){
                    resolve(JSON.parse(xhr.response));
                }else{
                    reject(xhr.response);
                }
            }
            xhr.open('POST',url,true);
            xhr.send(formData);
        })
    }
}