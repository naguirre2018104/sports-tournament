import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { League } from 'src/app/models/league';
import { Team } from 'src/app/models/team';
import { RestLeagueService } from 'src/app/services/restLeague/rest-league.service';
import { RestTeamService } from 'src/app/services/restTeam/rest-team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  league: League;
  team: Team;
  filesImage: Array<File> = [];

  constructor(private restLeague: RestLeagueService, private restTeam: RestTeamService) { 
    this.league = new League("",[],[],[]);
    this.team = new Team("","");
  }

  ngOnInit(): void {
    this.league = JSON.parse(localStorage.getItem("league")!);
  }

  onSubmit(teamForm: NgForm){
    let league = JSON.parse(localStorage.getItem("league")!)
    console.log(this.team);
    this.restTeam.createTeam(this.team,league._id).subscribe((resp:any)=>{
      if(resp.team){
        let teamId = resp.team._id;
        this.restTeam.addTeamImage(teamId,[],this.filesImage,"image").then((resp:any)=>{
          if(resp.team){
            Swal.fire({
              icon: 'success',
              title: 'Equipo creado exitosamente'
            })
            console.log(resp.team);
            teamForm.reset();
          }
        },
        (error: any) =>{
          Swal.fire({
            icon: 'error',
            title: '¡Ups!',
            text: error.error.message
          })
        }
        )
      }
    },
    (error: any) =>{
      Swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: error.error.message
      })
    }
    )
  }

  createMatchDay(match_dayForm: NgForm){
    console.log(match_dayForm);
  }

  fileChange(fileInput){
    this.filesImage = <Array<File>>fileInput.target.files;
    console.log(this.filesImage);
  }
}
