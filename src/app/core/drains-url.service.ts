import { Injectable }    from '@angular/core';
import { UrlService } from './url.service'

@Injectable()
export class DrainsUrlService {

  constructor(private _urlService: UrlService) { }



  public apiUrl = 'http://twaamtaro.org/api/v1/';
  public localUrl = 'http://localhost:3000/api/v1/';
  public drainsUrl = 'drains/?type=all';
  public cleanDrainsUrl = 'drains/?type=cleaned';
  public dirtyDrainsUrl = 'drains/?type=uncleaned';
  public helpDetailsUrl = 'need_helps';
  public helpDrainsUrl = 'drains/?type=need_help';
  public unknownDrainsUrl = 'drains/?type=unknown';
  public drainDataUrl = 'drains/data';
  public ranksDataUrl = 'drains/ranking';
  public verifyUrl = 'users/verify';
  public status = 'need_helps/status';
  public filter = 'need_helps/filter';
  public search = 'need_helps/search';
  public autocomplete = 'need_helps/autocomplete';

  // connecting base url with api end points
  public allDrains = this._urlService.baseUrl + this.drainsUrl;
  public cleanDrains = this._urlService.baseUrl + this.cleanDrainsUrl;
  public uncleanDrains = this._urlService.baseUrl + this.dirtyDrainsUrl;
  public needHelps = this._urlService.baseUrl + this.helpDetailsUrl;
  public needHelpDrains = this._urlService.baseUrl + this.helpDrainsUrl;
  public unkonwnDrains = this._urlService.baseUrl + this.unknownDrainsUrl;
  public dataForDrains = this._urlService.baseUrl + this.drainDataUrl;
  public drainRanks = this._urlService.baseUrl + this.ranksDataUrl;
  public verifyUser = this._urlService.baseUrl + this.verifyUrl;
  public needHelpStatus = this._urlService.baseUrl + this.status;
  public needHelpSearch = this._urlService.baseUrl + this.search;
  public needHelpfilter = this._urlService.baseUrl + this.filter;
  public needHelpAutoComplete = this._urlService.baseUrl + this.autocomplete;





}


