import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';

import { USER } from '../../config/user';

import { COMMON_VALUES } from '../../../shared/config/commonValues';

export const enum PasswordCheckStrength {
  Short,
  Common,
  Weak,
  Ok,
  Strong,
};


@Injectable()


export class UserAdminService {
  options: RequestOptions;


  constructor(private http: Http) { }




  updateUserPassword(params) {
    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let postoptions = new RequestOptions({ headers: headers });


    return this.http.post(URL_CONST.URL_PREFIX + 'api/UserAdmin/UpdateUserPassword', body, postoptions)
      .map((response: Response) => {
        return response;
      })
      .timeout(60000)
      .catch((error: any) => {


        return Observable.throw(new Error(error.status))

      });
  }






  // Expected length of all passwords
  public static get MinimumLength(): number {
    return 5;
  }

  // Regex to check for a common password string - all based on 5+ length passwords
  private commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;

  //
  // Checks if the given password matches a set of common password
  //
  public isPasswordCommon(password: string): boolean {
    return this.commonPasswordPatterns.test(password);
  }

  //
  // Returns the strength of the current password
  //
  public checkPasswordStrength(password: string): PasswordCheckStrength {

    // Build up the strenth of our password
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
    numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
    numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
    numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)
    // Assume we have a poor password already
    let currentPasswordStrength = PasswordCheckStrength.Short;

    // Check then strenth of this password using some simple rules
    if (password === null || password.length < COMMON_VALUES.MIN_PWD_LENGTH) {
      currentPasswordStrength = PasswordCheckStrength.Short;
    } else if (this.isPasswordCommon(password) === true) {
      currentPasswordStrength = PasswordCheckStrength.Common;
    } else if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
      currentPasswordStrength = PasswordCheckStrength.Weak;
    } else if (numberOfElements === 3) {
      currentPasswordStrength = PasswordCheckStrength.Ok;
    } else {
      currentPasswordStrength = PasswordCheckStrength.Strong;
    }
    

    // Return the strength of this password
    return currentPasswordStrength;
  }

}
