import { DataService } from './../../../core/data.service';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {AuthService} from "./../../../core/auth.service";
import { DrainsService } from './../../../core/drains.service';
import { PagerService } from './../../../core/paging.service';
import { SessionService } from '../../../core/session.service'

import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'help-drains',
  templateUrl: './help-drain.component.html',
  styleUrls: ['./help-drain.component.css'],
  providers: []
})
export class HelpDrainComponent implements OnInit {

  created: any;
  daysGone: any;
  dateCreated: any;
  drains: any = [];
  errMsg: any; // Error Message
  helpCategory : any;
  helpNeeded : any;
  loggedIn: any;
  need_help = true;
  pager: any = {}; // pager object
  pagedDrains: any[]; // paged drains
  thedrain: any;
  today: any;
  searchKey: any;
  weoStatusColumn: boolean = false;
  meoStatusColumn: boolean = false;
  disableWardSelect: boolean = true;
  disableStreetSelect: boolean = true;
  filterObject: any = {};
  searchInfo: any;
  description: any;
  needHelpData: any = {};
  needHelpObject: any = {};
  needHelpCategory: any ={};
  baseUrl:any;
  needhelp:boolean =true;
  lat:any;
  long:any;
  gid:any;

  constructor(
    private drainService: DrainsService,
    public authService: AuthService,
    private pagerService: PagerService,
    public ngProgress: NgProgress,
    private sessionService: SessionService,
    private dataService: DataService
  ) { }

  getDuration(d)
  {
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;

    this.dateCreated = new Date("d");

    this.daysGone = Math.floor((this.today - this.dateCreated) / days);

  }
//Fetches all drains in need of help and their details
  getFilteredDrains(status?): any {
    this.ngProgress.start();
    this.drainService
      .getFilteredHelp(status)
      .subscribe(
        drains => {
          this.drains = this.drainService.helpDrains;
          this.dataService.storeNeedHelpRequests(this.drains);
    this.setPage(1);
    this.ngProgress.done();
    });
  }

  // filters need help drains based on their regions(stree,ward, municipal)
  // and Status
  needHelpFilter(data: any){

    if(data.from == 'regional-filters'){
      if(data.municipal_name) this.disableWardSelect = false;
      if(data.ward_name) this.disableStreetSelect = false;

      this.filterObject.street_name = data.street_name;
      this.filterObject.ward_name = data.ward_name;
      this.filterObject.municipal_name = data.municipal_name;
    }
    if(data.from == 'status-filters'){
      this.filterObject.status = data.status;
    }
    this.searchNeedHelp(this.filterObject);

  }

  updateStatus(){
    this.drainService.update_status({
      need_help_id: this.needHelpData.data.id,
       status: this.needHelpData.statusValue,
       description: this.description
    })
    .subscribe( res => {
      if(this.searchInfo){
        this.searchNeedHelp(this.searchInfo);
      }
      else{
        this.getFilteredDrains();
      }
    this.closeDescriptionModal();
    }, err => {
      this.closeDescriptionModal();
    })
  }

  // searches needhelps using either
  // street_name, ward_name, municipal_name or status
  //of the need help
  searchNeedHelp(data){
    this.searchInfo = data;
    this.drainService.filterNeedHelps(data)
      .subscribe(res => {
        this.pagedDrains = res
      });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // Get pager object from service
    this.pager = this.pagerService.getPager(this.drains.length, page, 50);

    // Get current page of items
    this.pagedDrains = this.drains.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  //Get extra details of the requested help


  helpmodal(drain:any)
  {
    this.needHelpObject = drain;
    this.needHelpCategory = drain.need_help_category
    document.getElementById('helpdetails').style.display='block'
  }

//  displays popup for status change description
  descriptionModal(data: any, statusValue: string)
  {
    this.needHelpData.data = data;
    this.needHelpData.statusValue = statusValue;
    document.getElementById('description_modal').style.display='block'
  }

  //Close the helpmodal by clicking anywhere else in the page
  closedetails()
  {
    var modal = document.getElementById('helpdetails');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
  }

  // closes popup for status change description
  closeDescriptionModal()
  {
    document.getElementById('description_modal').style.display='none';
  }

  //Close helpmodal by clicking the close button
  closemodal()
  {
    document.getElementById('helpdetails').style.display='none';
  }
  showFilters()
  {
    var x = document.getElementById("mobileFilters");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
  }

  isLoggedIn()
  {
      this.loggedIn = this.authService.isLoggedIn();
  }

  // initilizes varible which hides or shows status column
  // in the html template
  conditionalInitializer(){
    this.needhelp = true;
    this.baseUrl = 'http://twaamtaro.org';

    if(this.sessionService.hasRole("meo")){
      this.meoStatusColumn = this.sessionService.hasRole("meo");
    }
    else if(this.sessionService.hasRole("weo")){

      this.weoStatusColumn = this.sessionService.hasRole("weo");
    }

  }

  // subscribing to need help requests
  // search results
  subscribeToSearchResults(){
    this.dataService.onSearchResultsReady
    .subscribe( results => {
      this.pagedDrains = results
    });
  }


  ngOnInit(): void {
    this.subscribeToSearchResults();
    this.getFilteredDrains();
    this.closedetails();
    this.closemodal();
    this.conditionalInitializer();
  }
}
