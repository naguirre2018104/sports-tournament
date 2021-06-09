import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private restUser: RestUserService) {
    this.user = new User("", "", "", "", "ROLE_CLIENT", "", [], [], [])
  }

  ngOnInit(): void {
  }

  onSubmit(login: NgForm){
    this.restUser.login(this.user).subscribe((res:any) => {
      if(res.token){
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido!',
          text: 'Datos correctos'
        })
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Datos incorrectos!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    })
  }

}
