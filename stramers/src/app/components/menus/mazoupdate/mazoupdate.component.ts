import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from "@angular/router"
import { UsuariService } from 'src/app/services/usuari.service';
import { Global } from 'src/app/services/global';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-mazoupdate',
  templateUrl: './mazoupdate.component.html',
  styleUrls: ['./mazoupdate.component.css']
})
@Injectable()
export class MazoupdateComponent implements OnInit {

  public id: any;
  public url:any;
  public lista:any;
  public cards:any;
  public nick:any;
  public deckname:any;
  alert = '';
  public mazos:any={};
  public count:number;
  public mazonum:any;
  // filter
  public abc:boolean;
  public cag:boolean;
  public cost:boolean;

  public deckcard:any;

  constructor(
    private _route: ActivatedRoute,
    private _userService:UsuariService, 
    private _router: Router
  ) {
    this.url=Global.url
    this.lista=[];
    this.count=15;
    // filter
    this.abc=true;
    this.cag=true;
    this.cost=true;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      this.deckname = params['deckname'];
    });
    if (localStorage.getItem("nick")==null) {
      this._router.navigate([""])
    }
    this.nick=localStorage.getItem("nick")
    this._userService.getCards(this.nick)
    .subscribe(cards=>{
      this.cards=Object.values(cards)[0]; //obtenemos 3 arrays pero solo queremos la primera con les dades de la carta
    },
    //obtenim un array de todas las cartas TEST
    // this._cardService.getCards()
    // .subscribe(cards=>{
    //   this.cards=Object.values(cards)[0]; //obtenemos 3 arrays pero solo queremos la primera con les dades de la carta
    // },
    error=>{
      console.log(error)
    }),
    // peticion de obtener todos los mazos, 
    this._userService.getDecks(this.nick)
    .subscribe(mazos=>{
      this.mazos=Object.values(mazos)[0][this.deckname];
      //recoremos con un doble forEach la array de mazos y el otro un array de objectos de cartas
      //para comprar las que tiene el mazo y mostrarlas en la derecha y poderlas editar el user
      this.mazos.forEach((value: any, i: string) => {
        this.cards.forEach( (element: { name: string; }) => {
          if(value==element.name.toLowerCase()){
            this.lista.push(element)
          }
        });
      });
    },
    error=>{
      console.log(error)
    })
  }

  /**
   * añade un objecto de la carta a la llista y muesra el nombre a la llista de crear mazo
   * @param card 
   */
   addcard(card:any){
    if (!this.lista.includes(card) && this.count<=14){
      this.lista.push(card);
      this.count+=1;
      this.cards.splice(this.cards.indexOf(card),1)
      console.log(this.lista)
    }
  }
  /**
   * elimina el objecto de la carta a la llista y la quita el nombre de la llista
   * @param card
   */
  delcard(card:object){
    let index=this.lista.indexOf(card)
    this.cards.push(card)
    this.lista.splice(index,1)
    console.log(card);
    this.count-=1;
  }

  /**
   * get de todos los mazos que tiene el usuario, lo actualitzaos para añadir el nuevo mazo i enviamos el nuevo array assosiatiu de mazos
   */
  updeck(){
    if(this.count==15){
      if (localStorage.getItem("nick")==null) {
        this._router.navigate([""])
      }
      this.nick=localStorage.getItem("nick")

      this.mazos[this.deckname]=this.lista.map(function(card:any){return card.name.toLowerCase() });
      let tmp={mazos:this.mazos}
      console.log(tmp);
      // peticion updatear array mazo
      this._userService.Updeck(tmp,this.nick).subscribe(
        result=>this.alert=result.toString()
      )
    }

  }

  /**
 * filtra afabeticament
 */
    filterAbc(){
    if(this.abc){
      this.abc=false;
      this.cards.sort(function(x:any, y:any) {
        if (x.name < y.name) {
          return -1;
        }
        if (x.name > y.name) {
          return 1;
        }
        return 0;
      });
    }else{
      this.abc=true;
      this.cards.sort(function(x:any, y:any) {
        if (x.name > y.name) {
          return -1;
        }
        if (x.name < y.name) {
          return 1;
        }
        return 0;
      });
    }
    
  }
  /**
   * filtra per categoria
   */
  filterCag(){
    if(this.cag){
      this.cag=false;
      this.cards.sort(function(x:any, y:any) {
        if (x.category < y.category) {
          return -1;
        }
        if (x.category > y.category) {
          return 1;
        }
        return 0;
      });
    }else{
    this.cag=true;
      this.cards.sort(function(x:any, y:any) {
        if (x.category > y.category) {
          return -1;
        }
        if (x.category < y.category) {
          return 1;
        }
        return 0;
      });
    }
  }
  /**
   * filtra per cost
   */
  filterCosts(){
    if(this.cost){
      this.cost=false;
      this.cards.sort(function(x:any, y:any) {
        if (x.coste < y.coste) {
          return -1;
        }
        if (x.coste > y.coste) {
          return 1;
        }
        return 0;
      });
    }else{
      this.cost=true;
      this.cards.sort(function(x:any, y:any) {
        if (x.coste > y.coste) {
          return -1;
        }
        if (x.coste < y.coste) {
          return 1;
        }
        return 0;
      });
    }
    
  }
}
