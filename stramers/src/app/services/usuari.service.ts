import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Global } from "./global";
import { Register } from "../models/register.usuari";
import { Login } from "../models/inici.usuari";

@Injectable({
    providedIn:'root'
})

export class UsuariService{

    public url:string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }
    //para gurdar un nuevo usuari a la base de dades con el node
    Registrar(register:Register){
        let params = JSON.stringify(register);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        console.log(this.url+'register');
        return this._http.post(this.url+'register', params, {headers: headers});
    }
    Login(login:Login){
        let params = JSON.stringify(login);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        console.log(this.url+'login');
        return this._http.post(this.url+'login', params, {headers: headers});
    }
}