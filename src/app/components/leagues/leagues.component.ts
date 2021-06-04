import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(leagueForm: NgForm){
    console.log(leagueForm);
  }

}
