//Imports del angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Import routing
import { routing,appRoutingProviders } from './app.routing';
//impost form
import { FormsModule } from '@angular/forms';

//Modulos necesarios para ahcer peticiones http
import { HttpClientModule } from '@angular/common/http';
//Imports componentes
import { AppComponent } from './app.component';
import { BasegameComponent } from './components/basegame/basegame.component';
import { IniciComponent } from './components/inici/inici.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { MazoComponent } from './components/mazo/mazo.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    BasegameComponent,
    IniciComponent,
    LobbyComponent,
    MazoComponent,
    TiendaComponent,
    ErrorComponent,
    RegisterComponent,
    MenuComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }