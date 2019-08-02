import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable()
export class UsersUrlService {

  constructor(private _urlService: UrlService) { }
  public apiUrl = 'http://twaamtaro.org/api/v1/';
  public localUrl = 'http://localhost:3000/api/v1/';
  public usersUrl = 'users/';
  public alertUrl = 'users/remind';
  public verifyUrl = 'users/verify';
  public denyUrl = 'users/deny';
  public leaderRequestsUrl = 'users/role_requests';
  public registerUserUrl = 'registrations/';
  public massMessagingUrl = '';

  // connecting user api end points with the current base url
  public allUsers = this._urlService.baseUrl + this.usersUrl;
  public alertUser = this._urlService.baseUrl + this.alertUrl;
  public verifyUser = this._urlService.baseUrl + this.verifyUrl;
  public denyUser = this._urlService.baseUrl + this.denyUrl;
  public roleRequests = this._urlService.baseUrl + this.leaderRequestsUrl;
  public registerUser = this._urlService.baseUrl + this.registerUserUrl;
  public massMessaging = this._urlService.baseUrl + this.massMessagingUrl;


 

}


