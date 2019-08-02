import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable }    from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { StreetsUrlService } from "./streets-url.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class StreetService {
  private headers = new Headers({'Authorization': 'Token token="gM7TM10gfRFZBlkNNcqg9A", email="example-2@twaamtaro.org"', 'Content-Type': ' ' });
  constructor(private http: Http, private urlService: StreetsUrlService) { }
  streetName: any;
  getStreets(): any {
    return this.http.get(this.urlService.allStreets,
      {headers: this.headers})
           .map((response: Response) => response.json().streets)
           .catch(this.errorHandler);
          }
// gets all municiplas
  getMunicipals(): any {
    return this.http.get(this.urlService.allMunicipals,
      {headers: this.headers})
           .map((response: Response) => response.json().municipals)
           .catch(this.errorHandler);
          }
  getwards(): any {

    return this.http.get(this.urlService.allWards,
      {headers: this.headers})
      .map((response: Response) => response.json().wards)
      .catch(this.errorHandler);
  }
    getStreet(id):any {
            return this.getStreets()
            .map(streets => streets.find(street => street.id === id))
            .catch(this.errorHandler);
      }
    getStreetName(id){
      return this.getStreets()
        .map(streets =>streets.find(street => {street.id === id;
                this.streetName = street.street_name;
                return this.streetName;
            })
        )
        .catch(this.errorHandler);
      }

      // gets all wards by municipal id
   getMunicipalWards(id: number){
     const url = `${this.urlService.allMunicipals}/${id}/${'wards'}`;
     return this.http.get(url,{headers: this.headers})
     .map((response: Response) => response.json().wards)
     .catch(this.errorHandler);
   }
   // get all streets by ward id
   getWardStreets(id: number){
    const url = `${this.urlService.allWards}/${id}/${'streets'}`;
    return this.http.get(url,{headers: this.headers})
    .map((response: Response) => response.json().streets)
    .catch(this.errorHandler);
  }
  errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Sorry, something went wrong');
 }
}
