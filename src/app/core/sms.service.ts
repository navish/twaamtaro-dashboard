import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable }    from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { UsersUrlService } from "./users-url.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SmsService {
    private headers = new Headers({'Authorization': 'Token token="gM7TM10gfRFZBlkNNcqg9A", email="example-2@twaamtaro.org"', 'Content-Type': ' ' });

    constructor(
      private http: Http, 
      private urlService: UsersUrlService
    ) { }  
    
    alertLeader(street_id): any {
        return this.http.post(this.urlService.alertUser, {street_id}, {headers: this.headers})
            .map(res =>  res.json())
            .catch(this.errorHandler);
        }
    sendMassMsg(msg): any {
        return this.http.post(this.urlService.massMessaging, {msg}, {headers: this.headers})
            .map(res =>  res.json())
            .catch(this.errorHandler);
        }
  errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Sorry, something went wrong');
          
 }
}
