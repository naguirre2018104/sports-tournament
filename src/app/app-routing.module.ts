import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LeagueComponent } from './components/league/league.component';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "", redirectTo: "home", pathMatch: "full"
  },
  {
    path: "league", component: LeagueComponent
  },
  {
    path: "leagues", component: LeaguesComponent
  },
  {
    path: "register", component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
