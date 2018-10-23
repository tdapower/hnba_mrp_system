import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';

import { USER } from '../../config/user';

import { INICExtractedData } from '../../../shared/models/nICExtractedData.model';

@Injectable()
export class CommonService {





  options: RequestOptions;
  constructor(private http: Http) { }



  getMedicalTypes() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/MedicalType/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }


  getLoanTypes() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/LoanType/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
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
      .timeout(60000)
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
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

  getBusinessChannels() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/BusinessChannel/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
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
      .timeout(60000)
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
      .timeout(60000)
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
      .timeout(60000)
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
      .timeout(60000)
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
      .timeout(60000)
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
      .timeout(60000)
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
      .timeout(60000)
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
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }


  getChannel() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Channel/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

  getBroker() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Broker/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

  getTPDOption() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/TPDOption/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }



  getUploadDocType() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/UploadDocType/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }



  // extractDataFromNIC(nic) {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('Authorization', USER.USER_AUTH_TOKEN);
  //   let options = new RequestOptions({ headers: headers });

  //   return this.http.get(URL_CONST.URL_PREFIX + 'api/Main/ExtractDataFromNIC?NICNo=' + nic, options)
  //     .map((response: Response) => response.json())
  //     .catch((error: any) => {
  //       this.handleError;
  //       return Observable.throw(new Error(error.status))
  //     });
  // }

  public extractDataFromNIC(NICNo) {


    let Year: string = '';
    let Month: string = '';
    let Day: number = 0;
    let isValid: boolean = false;

    let NICExtractedData = <INICExtractedData>{};


    if (NICNo.length == 10) //Validation 1::Checking The Length Of The NIC Entered
    {
      NICNo = NICNo.substr(0, 9);

      Year = NICNo.substr(0, 2); //Getting The Year

      console.log('aaa  ' + NICNo.substr(2, 2));

      NICNo = NICNo.substr(2, 3);
      Day = NICNo;
      NICExtractedData.Gender = "M";

      if (Day > 500) //Can Be Women's NIC No
      {
        Day = Day - 500;
        NICExtractedData.Gender = "F";
      }

      if (Day > 0 && Day < 367) //Validation 3::Validating The Days In The Entered NIC
      {
        isValid = true;
        if (Day > 335) {
          Day = Day - 335;
          Month = "12";
        }
        else if (Day > 305) {
          Day = Day - 305;
          Month = "11";
        }
        else if (Day > 274) {
          Day = Day - 274;
          Month = "10";
        }
        else if (Day > 244) {
          Day = Day - 244;
          Month = "09";
        }
        else if (Day > 213) {
          Day = Day - 213;
          Month = "08";
        }
        else if (Day > 182) {
          Day = Day - 182;
          Month = "07";
        }
        else if (Day > 152) {
          Day = Day - 152;
          Month = "06";
        }
        else if (Day > 121) {
          Day = Day - 121;
          Month = "05";
        }
        else if (Day > 91) {
          Day = Day - 91;
          Month = "04";
        }
        else if (Day > 60) {
          Day = Day - 60;
          Month = "03";
        }
        else if (Day < 32) {
          Month = "01";
        }
        else if (Day > 31) {
          console.log('aaaaaaas');

          Day = Day - 31;
          Month = "02";
        }
      }


      if (Day.toString().length == 3) {

        Day = Number(Day.toString().substring(1, 3));

      }
      NICExtractedData.DOB = this.padLeft(Day, 2, '0') + "/" + Month + "/19" + Year;



    }
    else if (NICNo.length == 12) //Validation 1::Checking The Length Of The NIC Entered
    {

      console.log('ppppp1');
      console.log(NICNo);



      NICNo = NICNo.substr(0, 12);

      Year = NICNo.substr(0, 4); //Getting The Year
      NICNo = NICNo.substr(4, 3);

      Day = NICNo;
      NICExtractedData.Gender = "M";

      if (Day > 500) //Can Be Women's NIC No
      {
        Day = Day - 500;
        NICExtractedData.Gender = "F";
      }

      if (Day > 0 && Day < 367) //Validation 3::Validating The Days In The Entered NIC
      {
        isValid = true;
        if (Day > 335) {
          Day = Day - 335;
          Month = "12";
        }
        else if (Day > 305) {
          Day = Day - 305;
          Month = "11";
        }
        else if (Day > 274) {
          Day = Day - 274;
          Month = "10";
        }
        else if (Day > 244) {
          Day = Day - 244;
          Month = "09";
        }
        else if (Day > 213) {
          Day = Day - 213;
          Month = "08";
        }
        else if (Day > 182) {
          Day = Day - 182;
          Month = "07";
        }
        else if (Day > 152) {
          Day = Day - 152;
          Month = "06";
        }
        else if (Day > 121) {
          Day = Day - 121;
          Month = "05";
        }
        else if (Day > 91) {
          Day = Day - 91;
          Month = "04";
        }
        else if (Day > 60) {
          Day = Day - 60;
          Month = "03";
        }
        else if (Day < 32) {
          Month = "01";
        }
        else if (Day > 31) {
          Day = Day - 31;
          Month = "02";
        }
      }
      if (Day.toString().length == 3) {

        Day = Number(Day.toString().substring(1, 3));

      }




      NICExtractedData.DOB = this.padLeft(Day, 2, '0') + "/" + Month + "/" + Year;

    }
    console.log(NICExtractedData);


    return NICExtractedData;
  }

  private padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
  }



  public CalculateAge(DOB, CurDate) {
    var dob = new Date(DOB);
    var cur_date = new Date(CurDate);

    var diffInDays = ((cur_date.getTime() - dob.getTime()) / 1000) / (60 * 60 * 24);
    var diffInYears = diffInDays / 365;

    return diffInYears;



  }


  public Days360(StartDate, EndDate) {

    var moment = require('moment');


    var StartDay = moment(StartDate, "DD/MM/YYYY").date();
    var StartMonth = moment(StartDate, "DD/MM/YYYY").month();
    var StartYear = moment(StartDate, "DD/MM/YYYY").year();
    var EndDay = moment(EndDate, "DD/MM/YYYY").date();
    var EndMonth = moment(EndDate, "DD/MM/YYYY").month();
    var EndYear = moment(EndDate, "DD/MM/YYYY").year();


    if (StartDay == 31 || this.IsLastDayOfFebruary(StartDate)) {
      StartDay = 30;
    }

    if (StartDay == 30 && EndDay == 31) {
      EndDay = 30;
    }

    return ((EndYear - StartYear) * 360) + ((EndMonth - StartMonth) * 30) + (EndDay - StartDay);
  }

  IsLastDayOfFebruary(date) {
    return date.Month == 2 && date.Day == this.daysInMonth(date.Year, date.Month);
  }


  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  private handleError(error: Response) {
    console.error('Error occured - ', error);
    return Observable.throw(error.status || ' error');
  }

}
