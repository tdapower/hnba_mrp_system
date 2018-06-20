import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../shared/services/user/authentication.service';

import { UserAdminService } from '../../../shared/services/userAdmin/user-admin.service';


import { IUser } from '../../../shared/models/user/user.model';

import { ToastrService, ToastrConfig } from 'toastr-ng2';

import { COMMON_VALUES } from '../../../shared/config/commonValues';
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  isLoading: boolean;

  User: IUser;
  UserName: string;
  UserDisplayName: string;
  Password: string;
  RePassword: string;

  constructor(private router: Router,
    private toastrService: ToastrService,
    private userAdminService: UserAdminService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));
    this.UserName = this.User.UserName;


  }


  changePassword() {
    if (this.Password == null || this.Password == "") {
      this.showError("Please enter password");
    }

    if (this.Password != this.RePassword) {
      this.showError("Passwords not matching");
    }







    if (this.userAdminService.checkPasswordStrength(this.Password) < 3) {
      this.showError("Entered Password is too simple");
    } else {
      this.isLoading = true;
      let obj: IUser = {
        UserName: this.UserName,
        Password: this.Password,
        UserDisplayName: 'a',
        Company: 'a',
        BranchCode: 'a',
        Epf: '0',
        UserRoleCode: 'a',
      }

      this.userAdminService.updateUserPassword(obj).subscribe((data: any) => {


        if (data.status == 200) {

          this.isLoading = false;
          this.showSuccess("User Password Successfully Updated. Please re-log in ");



          this.authenticationService.logout();
          this.router.navigate(['/', 'login']);
        }
      },
        (err) => {
          // alert(err);
          console.log(err);

          this.isLoading = false;
          this.showError("Error updating User Password");
        },
        () => console.log('done'));

    }


  }




  showSuccess(message) {
    this.toastrService.success(message, 'Success!');
  }

  showError(message) {
    this.toastrService.error(message, 'Oops!');
  }

  showWarning(message) {
    this.toastrService.warning(message, 'Alert!');
  }

  showInfo(message) {
    this.toastrService.info(message);
  }

}
