import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Global } from "./global";
import { Carta } from "../models/carta";

@Injectable({
    providedIn:'root'
})

export class CardService{

    public url:string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }
    //Guardar carta al BD
    saveCard(carta:Carta){
        let params = JSON.stringify(carta);
        let headers =new HttpHeaders().set('Content-Type', 'application/json');

        console.log(this.url+'save-carta');
        return this._http.post(this.url+'save-carta', params, {headers: headers});
    }
    // obtenemos todos los cartas
    getCards(){
        return this._http.get(this.url+'cartas/');
    }
    //obtenir carta por id
    getCard(id:string){
        return this._http.get(this.url+'cartas/'+id);
    }
    //Obtener carta por type(Legend,epic...)
    getCardsByType(type:string){
        return this._http.get(this.url+'get-card-type/'+type);
    }
    //Obtener carta por type(Legend,epic...)
    getCardsByCateg(category:string){
        return this._http.get(this.url+'get-card-category/'+category);
    }
    //elimiar carta
    deleteCard(id:string){
        return this._http.delete(this.url+'cartas/'+id);
    }
    //Editar carta
    updateCard( carta:Carta, id:string){
        let params = JSON.stringify(carta)
        let headers = new HttpHeaders().set('Content-Type','application/json')
        console.log(params)
        return this._http.put(this.url+'modifica/'+id, params, {headers: headers})
    }
}