import { Injectable } from '@angular/core';
import { Http, Headers }       from '@angular/http';
//import { Headers } from "module";
import { UrlService } from './url.service';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class UserSearchService {
  private headers = new Headers({'Authorization': 'Token token="gM7TM10gfRFZBlkNNcqg9A", email="example-2@twaamtaro.org"'});
  
  constructor(private http: Http, private _urlService: UrlService) {}
  searchedUser : User[];
  search(searchkey: string): Observable<User[]> {
    return this.http
               .get(this._urlService.baseUrl + `users/?first_name=${searchkey}`,
               {headers: this.headers})
               .map(response => response.json().user.data as User[]);
  }
}
