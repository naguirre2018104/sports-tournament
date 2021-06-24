import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User;
  userId: string = "";
  users: any = [];
  roles: Array<String> = ["ROLE_CLIENT", "ROLE_ADMIN"];

  constructor(private restUser: RestUserService) { 
    this.user = new User("", "", "", "", "ROLE_CLIENT", "", [], []);
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.restUser.getUsers().subscribe((resp: any)=>{
      if(resp.users){
        this.users = resp.users;
        console.log(this.users);
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

  onSubmit(saveUserByAdmin: NgForm){
    console.log(this.user);
    this.restUser.register(this.user).subscribe((resp:any)=>{
      if(resp.user){
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado exitosamente'
        })
        saveUserByAdmin.reset();
      }
    },
    (error:any)=>
    Swal.fire({
      icon: 'error',
      title: '¡Ups!',
      text: error.error.message
    })
    )
  }

  updateUserByAdmin(updateUser: NgForm){
    let userToUpdate:any = this.user;
    delete userToUpdate.password;
    delete userToUpdate.__v;
    delete userToUpdate._id;
    this.restUser.updateUser(userToUpdate, this.userId).subscribe((resp:any)=>{
      if(resp.user){
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado exitosamente'
        })
        updateUser.reset();
        this.user = new User("", "", "", "", "ROLE_CLIENT", "", [], []);
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

  setUserInfo(user:any){
    this.user = user;
    this.userId = user._id;
  }

  deleteUserInfo(){
    this.user = new User("", "", "", "", "ROLE_CLIENT", "", [], []);
  }

}
