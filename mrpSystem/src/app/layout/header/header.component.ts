import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../../shared/services/user/authentication.service';
import { IUser } from '../../shared/models/user/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  User: IUser;

  UserDisplayName: string;
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));
    this.UserDisplayName = this.User.UserDisplayName;
  }


  public logout() {
    this.authenticationService.logout();

  
    this.router.navigate(['/', 'login']);
    
  }



}
