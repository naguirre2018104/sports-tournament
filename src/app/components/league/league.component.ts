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
    if(this.filesImage.length == 0 || null || undefined){
      Swal.fire({
        icon: 'error',
        title: '¡No hay imagen!',
        text: "Debe ingresar una imagen para poder agregar el equipo"
      })
    }else{
      if(league.teams.length < 10){
        this.restTeam.createTeam(this.team,league._id).subscribe((resp:any)=>{
          if(resp.team){
            let teamId = resp.team._id;
            this.restTeam.addTeamImage(teamId,[],this.filesImage,"img").then((resp:any)=>{
              if(resp.team){
                Swal.fire({
                  icon: 'success',
                  title: 'Equipo creado exitosamente'
                })
                teamForm.reset();
                this.restLeague.getLeague(league._id).subscribe((resp: any)=>{
                  if(resp.league){
                    localStorage.setItem("league",JSON.stringify(resp.league));
                  }else{
                    Swal.fire({
                      icon: 'error',
                      title: '¡Ups!',
                      text: "Error al refrescar"
                    })
                  }
                })
              }else{
                Swal.fire({
                  icon: 'error',
                  title: '¡Ups!',
                  text: resp.message
                })
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
      }else{
        Swal.fire({
          icon: 'warning',
          title: '¡Ups!',
          text: "Una liga no puede tener más de 10 equipos"
        })
      }
    }
  }

  createMatchDay(match_dayForm: NgForm){
    console.log(match_dayForm);
  }

  fileChange(fileInput){
    this.filesImage = <Array<File>>fileInput.target.files;
    Swal.fire({
      icon: 'success',
      title: 'Imagen cargada'
    })
  }
}
