import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/user/authentication.service';
import { CommonService } from '../../../shared/services/common/common.service';
import { IUser } from '../../../shared/models/user/user.model';
import { IUserCompany } from '../../../shared/models/user/userCompany.model';
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

  companyList: Array<IUserCompany> = [];

  UserName: string;

  UserCompany: string;
  Password: string;
  message: string;
  EnteredRanNo: number;
  ranNo: number = 0;
  IsValid: boolean = true;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private commonService: CommonService) { }

  ngOnInit() {

    this.getUserCompanies();
    this.UserCompany = "Company";

    let atCount = Number(localStorage.getItem('attemptCount'));
    if (atCount != null) {
      if (atCount == 0) {
        localStorage.setItem("attemptCount", "0");
      }
    } else {
      localStorage.setItem("attemptCount", "0");
    }


    this.authenticationService.logout();
    this.ranNo = this.getRandomInt(1, 25);
    // this.UserName = "tda";
    // this.Password = "tda";
  }


  getUserCompanies() {
    this.isLoading = true;
    this.authenticationService.getUserCompany()
      .subscribe((data) => {
        this.companyList = data
        this.isLoading = false;
      },
        (err) => {
          console.log(err);
          this.isLoading = false;
        });
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


              if (this.User.PasswordStatus == COMMON_VALUES.PWD_INITIAL_STATUS) {
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


  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  public validateUser() {

    if (this.UserName == null || this.Password == null) {
      this.message = "Enter user name and password";
    } else {
      if (this.EnteredRanNo != this.ranNo) {
        this.message = "Incorrect validation number.";
      } else {
        this.checkUser();

      }
    }

  }


  private checkUser() {
    this.isLoading = true;


    // let obj = {
    //   zorro: "User1",
    //   guuguu: this.UserName,
    //   gaagaa: "qwer@123",
    //   bikezorro: this.Password,
    //   userName: "User1",
    //   Password: "qwer@123"
    // }

    let obj = {
      UserName: this.UserName,
      Company: this.UserCompany,
      Password: this.Password

    }
    this.authenticationService.CheckAndLoadUser(obj)
      .subscribe((data: any) => {


        this.isLoading = false;
        // console.log(data);
        //this.User = data;
        this.User = null;

        this.User = JSON.parse(data);


        if (this.User.UserName != null) {
          USER.USER_AUTH_TOKEN = 'Basic ' + btoa(this.User.UserName + ':' + this.User.Password + ':' + this.User.Company);
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

          let atCount = Number(localStorage.getItem('attemptCount'));
          atCount = atCount + 1;

          localStorage.setItem("attemptCount", atCount.toString());


          if (atCount >= 3) {
            this.message = "Maximum invalid login attempts reached, Try again in 30 seconds...";
            this.IsValid = false;

            this.UserName = null;
            this.Password = null;
            this.EnteredRanNo = null;

            this.ranNo = this.getRandomInt(1, 25);

            setTimeout(() => {
              this.IsValid = true;
              this.message = "";
              localStorage.setItem("attemptCount", "0");
            }, 30000)


            // this.isLoading = true;
            // setTimeout(() => {
            //   this.isLoading = false;
            //   localStorage.setItem("attemptCount", "0");
            // }, 20000)


          }

        }
      }),
      ((err) => {
        console.log(err);
        this.message = "Error while user login...";
      });
  }
}
