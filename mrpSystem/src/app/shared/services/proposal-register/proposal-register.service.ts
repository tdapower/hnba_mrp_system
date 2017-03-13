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

}
