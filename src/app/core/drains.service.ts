import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable }    from 'rxjs/Observable';
import { DrainsUrlService } from "./drains-url.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/filter';

import { Drain } from './../shared/drains/drain';
import {NeedHelpUrlParam} from "./user";
import { of } from 'rxjs/observable/of';


@Injectable()
export class DrainsService {

  private headers = new Headers({'Accept': 'application/json', 'charset': 'utf-8'});
  private headersCustom = new Headers({'Content-Type': 'application/json'});
  private options: RequestOptions = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private urlService: DrainsUrlService) { }
  drainData: any;
  ranksData: any;
  helpDrains: any;
  err: any;


  // gets all drains
  getDrains(page?: number, count?: number): Observable<any> {
    return this.http.get(this.urlService.allDrains + this.drainUrlParams(page,count))
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  // gets all unknown drains
  getUnknownDrains(page?: number, count?: number):Observable<any> {
    return this.http.get(this.urlService.unkonwnDrains + this.drainUrlParams(page,count))
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  // gets all clean drains
  getCleanDrains(page?: number, count?: number):Observable<any>  {
    return this.http.get(this.urlService.cleanDrains + this.drainUrlParams(page,count))
      .map((response: Response) =>  response.json())
      .catch(this.errorHandler);
  }

 // gets all unclean drains
  getDirtyDrains(page?: number, count?: number): Observable<any> {
    return this.http.get(this.urlService.uncleanDrains + this.drainUrlParams(page,count))
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  getHelpDetails(): any {
    return this.http.get(this.urlService.needHelps, this.options)
      .map((response: Response) => {
        this.helpDrains = response.json();
      })
      .catch(this.errorHandler);
  }
  getHelpDrains(): Observable<any[]> {
    return this.http.get(this.urlService.needHelpDrains, this.options)
      .map((response: Response) => response.json().drains)
      .catch(this.errorHandler);
  }

  getFilteredHelp(status?) {
    if (status == null ) {

      return this.getHelpDetails();
    }
    else {

      return this.getHelpDetails()
        .map(drains => drains.find(drain => drain.status === status))
        .catch(this.errorHandler);
    }

  }

    // appends url parameters for pagination of drains
    drainUrlParams(page: number, count: number): string{
      return `&&page=${page}&&count=${count}`
    }


  getDrainData():Observable<any> {
    return this.http.get(this.urlService.dataForDrains)
      .map((response: Response) => this.drainData = response.json() )
      .catch(this.errorHandler);

  }
  getRanksData():Observable<any[]> {
    return this.http.get(this.urlService.drainRanks)
      .map((response: Response) => {
        this.ranksData = response.json().ranking;
      })
      .catch(this.errorHandler);

  }
  alertVEO(street): any {
    return this.http.post(street, {headers: this.headers})
      .subscribe(res => {
        let alertData = res.json();
      });
  }


  status(roleRequest): any {

    return this.http.post(this.urlService.verifyUser, roleRequest, {headers: this.headers})
      .map(res => {

      })
      .catch(this.errorHandler);
  }

  update_status(data): any {
    return this.http.post(this.urlService.needHelpStatus, JSON.stringify(data), {headers: this.headersCustom})
      .map(res => { res.json();
      })
      .catch(this.errorHandler);
  }

  filterNeedHelps(data): Observable<any[]>{

    return this.http.post(this.urlService.needHelpfilter, JSON.stringify(data), {headers: this.headersCustom})
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  searchNeedHelps(data: NeedHelpUrlParam): Observable<any[]>{
    let urlParams = `/?column=${data.column}&&key=${data.key}`
    return this.http.get(this.urlService.needHelpSearch + urlParams)
      .map(res => res.json())
      .catch(this.errorHandler)
  }

  searchAutoComplete(q: any): Observable<any>{
    if (!q.trim()) {
      // if not search term, return empty hero array.
      return of();
    }
    let urlParam = `/?q=${q}`;
   return this.http.get(this.urlService.needHelpAutoComplete + urlParam)
    .map( res => res.json())
    .catch(this.errorHandler)
  }




  filterDrains(data):any{
    //To be worked on after API updates.
  }

  errorHandler(error: Response) {
    return Observable.throw(error || 'Sorry, something went wrong');

  }




}


