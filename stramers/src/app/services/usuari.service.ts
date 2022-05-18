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
    /**
     * para gurdar un nuevo usuari a la base de dades con el node
     * @param register 
     * @returns 
     */
    Registrar(register:Register){
        let params = JSON.stringify(register);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'register', params, {headers: headers});
    }
    /**
     * peticio para verificar si existe en la BD
     * @param login
     */
    Login(login:Login){
        let params = JSON.stringify(login);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'login', params, {headers: headers});
    }
    /**
     * peticio para updatear el user a la bd y verificar si el password es ell
     * @param nick 
     * @param register 
     * @returns 
     */
    updateUser(nick:string,register:Register){
        let params = JSON.stringify(register);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'updateCards/'+nick, params, {headers: headers});
    }
    /**
     * obtenir les monedas que te un usuari
     * @param nick 
     * @returns 
     */
    getMoney(nick:string){
        return this._http.get(this.url+'/get-money/'+nick);
    }
    /**
     * modificar las monedas del usuari
     * @param nick
     * @param money
     * @return
     */
    setMoney(nick:string,money:any){
        var monedaOBJ = {"moneda":money}
        let params = JSON.stringify(monedaOBJ);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'new-money/'+nick, params, {headers: headers});
    }
    /**
     * retorna totes les cartas del usuari
     * @param nick 
     */
    getCards(nick:string){
        return this._http.get(this.url+'get-cards/'+nick);
    }
    /**
     * sube les cartas de un mazo a la BD
     * @param updeck les cartas del mazo
     * @param nick
     */
    Updeck(updeck:Object,nick:string){
        console.log(updeck);
        let params = JSON.stringify(updeck);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'updeck/'+nick, params, {headers: headers});

    }
    /**
     * retorna els mazos del usuari
     * @param nick 
     * @returns 
     */
    getDecks(nick:string){
        return this._http.get(this.url+'get-decks/'+nick);
    }
    /**
     * Actualitza les cartas del usuari
     * @param cards
     * @param nick
     */
    SetCard(cards:Object,nick:string){
        let params = JSON.stringify(cards);
        console.log(cards)
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'updateCards/'+nick, params, {headers: headers});
    }
    /**
     * obtenim el mazo seleccionado del usauri
     * @param nick
     * @param updeck
     */
    getDefaultDeck(updeck:Object,nick:string){
        let params = JSON.stringify(updeck);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'get-getDefaultDeck/'+nick, params, {headers: headers});
    }
}
