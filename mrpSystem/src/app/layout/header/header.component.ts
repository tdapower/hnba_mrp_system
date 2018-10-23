import { Component, Input, Injectable, ApplicationRef, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../shared/services/user/authentication.service';
import { IUser } from '../../shared/models/user/user.model';
import { IdleTimeoutService } from '../../shared/services/common/idle-timeout-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  User: IUser;

  UserDisplayName: string;

  isUserCompanyHNBA: boolean = false;




  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;



  constructor(private router: Router, private authenticationService: AuthenticationService,
    private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutService) { }

  ngOnInit() {

    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));
    this.UserDisplayName = this.User.UserDisplayName;



    if (this.User.Company == 'Life') {
      this.isUserCompanyHNBA = true;
    } else {
      this.isUserCompanyHNBA = false;
    }

    this.startCounter();
    this._idleTimerSubscription = this.idleTimeoutSvc.timeoutExpired.subscribe(res => {
      //var modalPromise = this.dialogSvc.open("Session Expiring!", "Your session is about to expire. Do you need more time?", true, "Yes", "No");
      // var newObservable = Observable.fromPromise(modalPromise);
      // newObservable.subscribe(
      //     (res) => {
      //         if (res === true) {
      //             console.log("Extending session...");
      //             this._status = "Session was extended.";
      //             this.idleTimeoutSvc.resetTimer();
      //             this.startCounter();
      //             this.changeRef.markForCheck();

      //         } else {
      //             console.log("Not extending session...");
      //             this._status = "Session was not extended.";
      //             this.changeRef.markForCheck();
      //         }
      //     },
      //     (reason) => {
      //         console.log("Dismissed " + reason);
      //         this._status = "Session was not extended.";
      //         this.changeRef.markForCheck();
      //     }
      // );


      if (confirm('Your session is about to expire. Do you need more time?')) {
        this._status = "Session was extended.";
        this.idleTimeoutSvc.resetTimer();
        this.startCounter();
        this.changeRef.markForCheck();
      } else {
        console.log("Not extending session...");
        this._status = "Session was not extended.";
        this.changeRef.markForCheck();

        this.authenticationService.logout();


        this.router.navigate(['/', 'login']);
      }





    });

  }
  ngOnDestroy() {
    this._idleTimerSubscription.unsubscribe();
  }

  public logout() {
    this.authenticationService.logout();


    this.router.navigate(['/', 'login']);

  }


  public startCounter() {
    if (this._timerSubscription) {
      this._timerSubscription.unsubscribe();
    }

    this._counter = 0;
    this._timer = Observable.timer(1000, 1000);
    this._timerSubscription = this._timer.subscribe(n => {
      this._counter++;
      this.changeRef.markForCheck();
    });
  }

  public reset() {
    this.startCounter();
    this._status = "Initialized.";
    this.idleTimeoutSvc.resetTimer();
  }


}
