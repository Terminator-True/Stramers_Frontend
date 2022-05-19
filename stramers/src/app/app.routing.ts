//imports de los modulos del router del angular
import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Imports de los componentes
import { IniciComponent } from "./components/inici/inici.component";
import { LoginComponent } from "./components/users/login/login.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { EdituserComponent } from "./components/users/edituser/edituser.component";
import { MenuComponent } from "./components/menus/menu/menu.component";
import { LobbyComponent } from "./components/menus/lobby/lobby.component";
import { MazoComponent } from "./components/menus/mazo/mazo.component";
import { MazoeditComponent } from "./components/menus/mazoedit/mazoedit.component";
import { MazoupdateComponent } from "./components/menus/mazoupdate/mazoupdate.component";
import { TiendaComponent } from "./components/menus/tienda/tienda.component";
import { RuletaComponent } from "./components/menus/ruleta/ruleta.component";
import { AdminComponent } from "./components/admin/admin.component";
import { ErrorComponent } from "./components/error/error.component";

//Array de routas
const appRoutes: Routes = [
    {path: '', component: IniciComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'edituser', component: EdituserComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'lobby', component: LobbyComponent},
    {path: 'mazo', component: MazoComponent},
    {path: 'mazo/edit', component: MazoeditComponent},
    {path: 'mazo/update/:deckname', component: MazoupdateComponent},
    {path: 'tienda/cartas', component: TiendaComponent},
    {path: 'tienda/ruleta', component: RuletaComponent},
    {path: 'lmta', component: AdminComponent},
    {path: '**', component: ErrorComponent}
]

//Exportar el modul
export const appRoutingProviders: any[]=[];
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);