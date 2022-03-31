//imports de los modulos del router del angular
import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Imports de los componentes
import { BasegameComponent } from "./components/basegame/basegame.component";
import { IniciComponent } from "./components/inici/inici.component";
import { RegisterComponent } from "./components/register/register.component";
import { LobbyComponent } from "./components/lobby/lobby.component";
import { MazoComponent } from "./components/mazo/mazo.component";
import { TiendaComponent } from "./components/tienda/tienda.component";
import { ErrorComponent } from "./components/error/error.component";

//Array de routas
const appRoutes: Routes = [
    {path: '', component: IniciComponent},
    {path: 'lobby', component: LobbyComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'mazo', component: MazoComponent},
    {path: 'tienda', component: TiendaComponent},
    {path: 'game', component: BasegameComponent},
    {path: '**', component: ErrorComponent}
]

//Exportar el modul
export const appRoutingProviders: any[]=[];
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);