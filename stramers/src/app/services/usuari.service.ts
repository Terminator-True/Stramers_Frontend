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
    updateUser(nick:string,register:Register){
        let params = JSON.stringify(register);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'updateCards/'+nick, params, {headers: headers});
    }
    logout() {
        // remove user from local storage and set current user to null
    }
    getMoney(nick:string){
        return this._http.get(this.url+'/get-money/'+nick);

    }
    setMoney(nick:string,money:any){
        var monedaOBJ = {"moneda":money}
        let params = JSON.stringify(monedaOBJ);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'new-money/'+nick, params, {headers: headers});
    }
    getCards(nick:string){
        return this._http.get(this.url+'get-cards/'+nick);
    }
    Updeck(updeck:Object,nick:string){
        console.log(updeck);
        let params = JSON.stringify(updeck);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'updeck/'+nick, params, {headers: headers});

    }

    getDecks(nick:string){
        return this._http.get(this.url+'get-decks/'+nick);
    }

    SetCard(cards:Object,nick:string){
        let params = JSON.stringify(cards);
        console.log(cards)
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'updateCards/'+nick, params, {headers: headers});
    }
}
