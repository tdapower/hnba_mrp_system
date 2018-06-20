import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/user/authentication.service';
import { IUser } from '../../../shared/models/user/user.model';

import { USER } from '../../../shared/config/user';

import { COMMON_VALUES } from '../../../shared/config/commonValues';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  isLoading: boolean;
  User: IUser;

  UserName: string;
  Password: string;
  message: string;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();

    // this.UserName = "tda";
    // this.Password = "tda";
  }

  public loginWithWindowsUser() {
    this.isLoading = true;
    this.authenticationService.GetWindowsUserName()
      .subscribe((data) => {
        console.log('data   ' + data);


        let windowsUserName: string = data;
        this.isLoading = false;

        this.authenticationService.checkAndLoadWindowsUser(windowsUserName)
          .subscribe((data2) => {


            this.isLoading = false;
            console.log(data2);
            this.User = data2
            if (this.User.UserName != null) {
              USER.USER_AUTH_TOKEN = 'Basic ' + btoa(this.User.UserName + ':' + this.User.Password);
              console.log(USER.USER_AUTH_TOKEN);

              localStorage.setItem("currentMRPUser", JSON.stringify(this.User));
              localStorage.setItem("currentMRPUserToken", USER.USER_AUTH_TOKEN);


              if (this.User.Password == COMMON_VALUES.COMMON_PWD) {
                this.router.navigate(['/', 'passwordChange']);
              } else {
                this.router.navigate(['/', 'mainDashboard']);
              }



            } else {
              this.message = "Invalid User name or Password...";
            }
          }),
          ((err) => {
            console.log(err);
            this.message = "Error while user login...";
          });


      }),
      ((err) => {
        console.log(err);
        this.message = "Error while user login...";
      });



  }

  public validateUser() {



    this.isLoading = true;
    this.authenticationService.CheckAndLoadUser(this.UserName, this.Password)
      .subscribe((data) => {


        this.isLoading = false;
        console.log(data);
        this.User = data
        if (this.User.UserName != null) {
          USER.USER_AUTH_TOKEN = 'Basic ' + btoa(this.User.UserName + ':' + this.User.Password);
          console.log(USER.USER_AUTH_TOKEN);

          localStorage.setItem("currentMRPUser", JSON.stringify(this.User));
          localStorage.setItem("currentMRPUserToken", USER.USER_AUTH_TOKEN);
      
          if (this.User.Password == COMMON_VALUES.COMMON_PWD) {
            this.router.navigate(['/', 'passwordChange']);
          } else {
            this.router.navigate(['/', 'mainDashboard']);
          }

        } else {
          this.message = "Invalid User name or Password...";
        }
      }),
      ((err) => {
        console.log(err);
        this.message = "Error while user login...";
      });




  }
}
