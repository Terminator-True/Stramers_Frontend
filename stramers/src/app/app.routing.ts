//imports de los modulos del router del angular
import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Imports de lso componentes
import { BasegameComponent } from "./componets/basegame/basegame.component";
import { IniciComponent } from "./componets/inici/inici.component";
import { RegisterComponent } from "./componets/register/register.component";
import { LobbyComponent } from "./componets/lobby/lobby.component";
import { MazoComponent } from "./componets/mazo/mazo.component";
import { TiendaComponent } from "./componets/tienda/tienda.component";
import { ErrorComponent } from "./componets/error/error.component";

//Array de routers
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