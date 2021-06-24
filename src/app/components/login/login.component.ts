import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  token: string = "";
  userLogged: any;


  constructor(private restUser: RestUserService, private router: Router) {
    this.user = new User("", "", "", "", "ROLE_CLIENT", "", [], []);
  }

  ngOnInit(): void {
  }

  onSubmit(login: NgForm){
    this.restUser.login(this.user).subscribe((res:any) => {
      if(res.token){
        this.userLogged = res.user;
        delete this.userLogged.password;
        localStorage.setItem("token",res.token);
        localStorage.setItem("user",JSON.stringify(this.userLogged));
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido!',
          text: 'Datos correctos'
        })
        this.router.navigateByUrl('home');
      }
    },
    (error:any) => 
    Swal.fire({
      icon: 'error',
      title: '¡Ups!',
      text: error.error.message
    })
    )
  }

}
