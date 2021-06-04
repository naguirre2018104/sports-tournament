import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(leagueForm: NgForm){
    console.log(leagueForm);
  }

  createMatchDay(match_dayForm: NgForm){
    console.log(match_dayForm);
  }

}
