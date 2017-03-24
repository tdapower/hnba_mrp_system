import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';

import { USER } from '../../config/user';


@Injectable()
export class QuotationService {
  options: RequestOptions;
  constructor(private http: Http) { }


  addQuotationDetails(params) {
    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let postoptions = new RequestOptions({ headers: headers });

    return this.http.post(URL_CONST.URL_PREFIX + 'api/Quotation/AddQuotation', body, postoptions)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }



  calculateQuotation(params) {
    let body = params.toString();
    // let headers = new Headers({ 'Content-Type': '' });
    //headers.append('Authorization', USER.USER_AUTH_TOKEN);
    // let postoptions = new RequestOptions({ headers: headers });

    return this.http.post(URL_CONST.CALCULATION_URL + body, '')
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

  searchQuotationDetails(searchObject) {
    let body = searchObject;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });


    return this.http.post(URL_CONST.URL_PREFIX + 'api/Quotation/SearchQuotations', body, options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }


  getQuotationByQuotationId(quotationNo) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });


    return this.http.get(URL_CONST.URL_PREFIX + 'api/Quotation/GetQuotationByQuotationNo?quotationNo=' + quotationNo, options)
      .map((response: Response) => JSON.stringify(response.json()))
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }


  getQuotationDocument(params) {
    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let postoptions = new RequestOptions({ headers: headers });

    return this.http.post(URL_CONST.URL_PREFIX + 'api/Quotation/GetQuotationDocument/' + params, body, postoptions)
      .map(
      (response: Response) => {
        console.log('respone - '+response);
        console.log('respone status- ' + response.status);
        console.log('came here service 1');
      }

      )
      .timeout(60000)
      .catch((error: any) => {
        console.log(error);

        console.log('error status - '+error.status);
        console.log('came here service error 1');
       // this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

  private handleError(error: Response) {
    console.error('Error occured - ', error);
    return Observable.throw(error.status || ' error');
  }
}
