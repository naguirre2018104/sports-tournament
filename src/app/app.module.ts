import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LeagueComponent } from './components/league/league.component';
import { FormsModule } from '@angular/forms';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HistoryComponent } from './components/history/history.component';
import { UsersComponent } from './components/users/users.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { LoginComponent } from './components/login/login.component';
import { StadisticsComponent } from './components/stadistics/stadistics.component';
import { TeamsComponent } from './components/teams/teams.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    LeagueComponent,
    LeaguesComponent,
    RegisterComponent,
    HomeAdminComponent,
    HistoryComponent,
    UsersComponent,
    TournamentsComponent,
    LoginComponent,
    StadisticsComponent,
    TeamsComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
