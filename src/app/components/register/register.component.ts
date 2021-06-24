import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;

  constructor(private restUser: RestUserService) {
    this.user = new User("", "", "", "", "ROLE_CLIENT", "", [], []);
  }

  ngOnInit(): void {
  }


  onSubmit(registerForm: NgForm){
    console.log(this.user);
    this.restUser.register(this.user).subscribe((res:any)=>{
      if(res.user){
        Swal.fire({
          icon: 'success',
          title: '¡Gracias por registrarse!',
          text: 'Ahora puede iniciar sesión con sus credenciales'
        })
        registerForm.reset();
      }
      console.log(res);
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
