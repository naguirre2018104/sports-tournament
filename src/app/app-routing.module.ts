import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LeagueComponent } from './components/league/league.component';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HistoryComponent } from './components/history/history.component';
import { UsersComponent } from './components/users/users.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { LoginComponent } from './components/login/login.component';
import { StadisticsComponent } from './components/stadistics/stadistics.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
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
  },
  {
    path:"account", component: AccountComponent
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path:"homeAdmin", component: HomeAdminComponent
  },
  {
    path:"history", component: HistoryComponent
  },
  {
    path:"users", component: UsersComponent
  },
  {
    path:"tournaments", component: TournamentsComponent
  },
  {
    path:"login", component: LoginComponent
  },
  {
    path:"stadistics", component: StadisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
