import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';

import { USER } from '../../config/user';

@Injectable()
export class ProposalRegisterService {


  options: RequestOptions;
  constructor(private http: Http) { }


  saveProposalDetails(params) {
    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let postoptions = new RequestOptions({ headers: headers });

    return this.http.post(URL_CONST.URL_PREFIX + 'api/Main/AddProposalDetails', body, postoptions)
      .map((response: Response) => JSON.stringify(response.json()))
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }
  updateProposalDetails(params) {
    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let postoptions = new RequestOptions({ headers: headers });

    return this.http.put(URL_CONST.URL_PREFIX + 'api/Main/UpdateProposalDetails', body, postoptions)
      .map((response: Response) => {
        return response;
      })
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }
 


  getProposalDetailsBySeqId(SeqId) {
    console.log('seq id  ' + SeqId);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });


    return this.http.get(URL_CONST.URL_PREFIX + 'api/Main/Get/' + SeqId, options)
      .map((response: Response) => JSON.stringify(response.json()))
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
