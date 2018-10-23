import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class IdleTimeoutService {
  private _count: number = 0;
  private _serviceId: string = 'idleTimeoutSvc-' + Math.floor(Math.random() * 10000);
  private _timeoutSeconds: number = 900;
  private timerSubscription: Subscription;
  private timer: Observable<number>;
  private resetOnTrigger: boolean = false;
  public timeoutExpired: Subject<number> = new Subject<number>();

  constructor() {
    console.log("Constructed idleTimeoutService " + this._serviceId);

    this.timeoutExpired.subscribe(n => {
      console.log("timeoutExpired subject next.. " + n.toString())
    });

    this.startTimer();
  }

  public startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timer = Observable.timer(this._timeoutSeconds * 1000);
    this.timerSubscription = this.timer.subscribe(n => {
      this.timerComplete(n);
    });
  }

  public stopTimer() {
    this.timerSubscription.unsubscribe();
  }

  public resetTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timer = Observable.timer(this._timeoutSeconds * 1000);
    this.timerSubscription = this.timer.subscribe(n => {
      this.timerComplete(n);
    });
  }

  private timerComplete(n: number) {
    this.timeoutExpired.next(++this._count);

    if (this.resetOnTrigger) {
      this.startTimer();
    }
  }

}