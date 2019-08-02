import { Injectable }    from '@angular/core';
import { UrlService } from './url.service'

@Injectable()
export class StreetsUrlService {

  constructor(private _urlService: UrlService) { }
  
  public apiUrl = 'http://twaamtaro.org/api/v1/'; 
  public localUrl = 'http://localhost:3000/api/v1/'; 
  public streetsUrl = 'streets';
  public municipalsUrl = 'municipals';
  public wardsUrl = 'wards';
  public streetRanksUrl = 'drains/ranking'; 

  // connecting api end points with the base url
  public allStreets = this._urlService.baseUrl + this.streetsUrl;
  public allMunicipals = this._urlService.baseUrl + this.municipalsUrl;
  public allWards = this._urlService.baseUrl + this.wardsUrl;
  public streetRanks = this._urlService.baseUrl + this.streetRanksUrl;
}


