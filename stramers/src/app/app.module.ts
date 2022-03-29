//Imports del angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Import routing
import { routing,appRoutingProviders } from './app.routing';
//impost form
import { FormsModule } from '@angular/forms';

//Imports componentes
import { AppComponent } from './app.component';
import { BasegameComponent } from './componets/basegame/basegame.component';
import { IniciComponent } from './componets/inici/inici.component';
import { LobbyComponent } from './componets/lobby/lobby.component';
import { MazoComponent } from './componets/mazo/mazo.component';
import { TiendaComponent } from './componets/tienda/tienda.component';
import { ErrorComponent } from './componets/error/error.component';
import { RegisterComponent } from './componets/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    BasegameComponent,
    IniciComponent,
    LobbyComponent,
    MazoComponent,
    TiendaComponent,
    ErrorComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }