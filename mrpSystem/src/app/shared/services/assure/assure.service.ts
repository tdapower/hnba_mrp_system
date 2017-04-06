import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';

import { USER } from '../../config/user';

@Injectable()
export class AssureService {


  options: RequestOptions;
  constructor(private http: Http) { }

  saveAssureDetails(params) {
    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let postoptions = new RequestOptions({ headers: headers });

    return this.http.post(URL_CONST.URL_PREFIX + 'api/AssureDetail/SaveAssureDetail', body, postoptions)
      .map(res => res)
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

  

  updateAssureDetail(params) {
    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let postoptions = new RequestOptions({ headers: headers });

    return this.http.put(URL_CONST.URL_PREFIX + 'api/AssureDetail/UpdateAssureDetail', body, postoptions)
      .map(res => res)
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }


  getAssureDetailsByMainSeqId(SeqId, AssureType) {
    console.log('seq id  ' + SeqId);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });


    return this.http.get(URL_CONST.URL_PREFIX + 'api/AssureDetail/GetAssureDetailByMainSeqId?mainSeqId=' + SeqId + '&assureType=' + AssureType, options)
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
