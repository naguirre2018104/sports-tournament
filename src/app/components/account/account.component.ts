import { Component, OnInit, DoCheck } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CONNECTION } from '../../services/global';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  myAccount: any;
  public filesToUpload: Array<File> = [];
  uri: string;

  constructor(private resUser: RestUserService, private router: Router) {
    this.myAccount = {}
    this.uri = CONNECTION.URI
  }

  ngOnInit() {
    this.resUser.getUserLS().then(user => {
      this.myAccount = user
    });
  }

  // ngDoCheck(){
  //   this.resUser.getUserLS().then(user => {
  //     this.myAccount = user
  //   });
  // }

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
          this.router.navigateByUrl('login');
        })
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Ups!',
          text: 'Algo salió mal :('
        });
      }
    },
    err => {
      Swal.fire({
        icon: 'error',
        title: 'Ups!',
        text: err.error.message
      });
    })
  }

  uploadUserImage(uploadUserImageForm){
    console.log(this.filesToUpload);
    this.resUser.addImageUser(this.myAccount._id, [], this.filesToUpload, "img")
    .then((resp:any) => {
      console.log(resp);
      if(resp.userImage){
        localStorage.setItem('user', JSON.stringify(resp.user))
        this.myAccount.img = resp.userImage;
        Swal.fire({
          icon: 'success',
          title: 'Images subida!',
          text: 'Has actualizado tu imagen de perfil'
        })
        uploadUserImageForm.reset();
      }else{
        Swal.fire({
          icon: 'error',
          title: '¡Ups!',
          text: resp.message
        })
      }
    }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: '¡Ups!',
          text: err.error.message
        })
    })
  }

  fileChange(userImage){
    this.filesToUpload = <Array<File>> userImage.target.files;
  }

}
