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
import { IniciComponent } from './components/inici/inici.component';
import { LobbyComponent } from './components/menus/lobby/lobby.component';
import { MazoComponent } from './components/menus/mazo/mazo.component';
import { TiendaComponent } from './components/menus/tienda/tienda.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/users/register/register.component';
import { MenuComponent } from './components/menus/menu/menu.component';
import { AdminComponent } from './components/admin/admin.component';
import { RuletaComponent } from './components/menus/ruleta/ruleta.component';
import { MazoeditComponent } from './components/menus/mazoedit/mazoedit.component';
import { LoginComponent } from './components/users/login/login.component';
import { EdituserComponent } from './components/users/edituser/edituser.component';

@NgModule({
  declarations: [
    AppComponent,
    IniciComponent,
    LobbyComponent,
    MazoComponent,
    TiendaComponent,
    ErrorComponent,
    RegisterComponent,
    MenuComponent,
    AdminComponent,
    RuletaComponent,
    MazoeditComponent,
    LoginComponent,
    EdituserComponent
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