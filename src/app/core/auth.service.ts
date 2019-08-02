import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {UrlService } from './url.service';

import {Router} from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {

  private headers = new Headers({'Content-Type': 'application/json'});
  loggedIn: any;
  loginRes: any;
  userdata: any;
  loggedUser: any;
  userName: any;
  userRole: any;
  errStatus: any;
  constructor(
        private http: Http,
        private router: Router,
        private _urlService: UrlService
    ) { }

    login(user): any {
        return this.http.post(this._urlService.loginUrl, { user }, { headers: this.headers })
            .map(res => {
                this.loginRes = true;
                this.userdata = res.json().users;
            })
            .catch(this.handleError);
    }

    isLoggedIn() {
        if (localStorage.getItem("currentUserToken") == null) {
            this.loggedIn == false;
            return this.loggedIn;            }
        else {
            return true;
        }
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.loggedIn = false;
    }

    private handleError(error: any): any {
        this.loginRes = false;
        console.error('An error occurred', error);
    }


}
