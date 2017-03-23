import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';

import { USER } from '../../config/user';


@Injectable()
export class CommonService {

  options: RequestOptions;
  constructor(private http: Http) { }


  getLoanTypes() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/LoanType/get', options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

  getProposalStatuses() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/ProposalStatus/get', options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }
  


  getBank() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Bank/get', options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }


    getBankBranch() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/BankBranch/get', options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }


    getBankBranchByBankId(bankId) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', USER.USER_AUTH_TOKEN);
      let options = new RequestOptions({ headers: headers });

      return this.http.get(URL_CONST.URL_PREFIX + 'api/BankBranch/GetBranchByBankId/' + bankId, options)
        .map((response: Response) => response.json())
        .catch((error: any) => {
          this.handleError;
          return Observable.throw(new Error(error.status))
        });
    }


  getCompanyBuffer() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/CompanyBuffer/get', options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

  getCurrency() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Currency/get', options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

  getHnbaBranch() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/HnbaBranch/get', options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

   getNationality() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Nationality/get', options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

  getPending() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Pending/get', options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }


  getReInsuranceCompany() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/ReInsuranceCompany/get', options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

  






  private handleError(error: Response) {
    console.error('Error occured - ', error);
    return Observable.throw(error.status || ' error');
  }
  
}
