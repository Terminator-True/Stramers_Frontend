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
        return this._http.post(this.url+'register', params, {headers: headers});
    }
    Login(login:Login){
        let params = JSON.stringify(login);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'login', params, {headers: headers});
    }
    getMoney(nick:string){
        console.log(this.url+'/get-money/'+nick);
        return this._http.get(this.url+'/get-money/'+nick);

    }
    setMoney(nick:string,money:any){
        var monedaOBJ = {"moneda":money}
        let params = JSON.stringify(monedaOBJ);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'new-money/'+nick, params, {headers: headers});
    }
}