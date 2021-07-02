import { Component, OnInit, DoCheck } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  myAccount: any;

  constructor(private resUser: RestUserService, private router: Router) {}

  ngOnInit() {
    this.myAccount = this.resUser.getUserLS().then(user => {
      this.myAccount = user
    });
  }

  updateMyAccount(myAccountForm: NgForm){
    let userId: string = this.myAccount._id;
    delete this.myAccount._id;
    delete this.myAccount.__v;

    this.resUser.updateUser(this.myAccount, userId).subscribe((resp:any) => {
      if(resp.user){
        delete  resp.user.password;
        delete resp.user.__v;

        this.myAccount = resp.user;
        localStorage.setItem('user', JSON.stringify(this.myAccount));

        Swal.fire({
          icon: 'success',
          title: 'Actualizado!',
          text: 'Datos actualizados correctamente'
        });
      }else {
        Swal.fire({
          icon: 'warning',
          title: 'Upps!',
          text: 'Datos no se actualizaron correctamente'
        });
      }
    })
  }

  deleteAccountUser(){
    let userId = this.myAccount._id || null;

    this.resUser.deleteUser(userId).subscribe((resp:any) => {
      if(resp.user){
        Swal.fire({
          icon: 'success',
          title: 'Cuenta Eliminada!',
          text: 'Fue un gusto que usaras esta aplicación :)'
        }).then(() => {
          localStorage.clear();
          this.router.navigateByUrl('')
        })
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Ups!',
          text: 'Algo salió mal :('
        });
      }
    })

  }

}
