import { Routes } from "@angular/router";
import  { CanActivate } from "@angular/router";
import { AuthGuard } from "./services/guards/auth.guard";
import { LoginGuardGuard } from "./services/guards/login-guard.guard";

import { ToolsComponent } from "./components/tools/tools.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";



export  const ROUTES: Routes = [
  { path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardGuard]
  },
  { path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuard],
    children: [
      { path: 'tools', component: ToolsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'tools'}
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login'}


]
