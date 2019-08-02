import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from "./../../../core/user";
import { UserService } from "./../../../core/user.service";
import { StreetVEOPipe, UserStreetPipe } from "./../../../core/user.pipe";
import { Ng2GoogleChartsModule, ChartSelectEvent } from 'ng2-google-charts';

import { NgProgress } from 'ngx-progressbar';
import { AuthService } from "./../../../core/auth.service";
import { TranslateService } from "../../../translate/translate.service";
import { StreetService } from "./../../../core/streets.service";
import { DrainsService } from "./../../../core/drains.service";
import { SessionService } from "./../../../core/session.service";
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  title = 'Citizens';
  areaCount: any = [];
  errMsg: any;
  error: any;
  street: any[];
  streets: any;
  streetLeadersCount: any = 0;
  streetId: any;streetName: any;
  treeChart: any;
  users: User[];
  userCount: any;
  usersCount: any = 0;
  volunteersCount: any = 0;
  wardLeadersCount: any = 0;
  municipalLeadersCount: any = 0;
  veos = [];
  weos = [];

  constructor(
    public authService:  AuthService,
    private userService: UserService,
    public ngProgress: NgProgress,
    public drainService: DrainsService,
    public sessionService: SessionService,
    public streetService: StreetService,
    private _translate: TranslateService
  ) { }

  //Creates an array of VEOs
  getVeos(users){
    for (let i = 0; i < users.length; i++) {
      if (this.userService.checkRole(users[i].roles, '2')) {
        this.veos.push(users[i])
      }
  };
  return this.veos;
  }

  //Creates an array of WEOs
  getWeos(users){
    for (let i = 0; i < users.length; i++) {
      if (this.userService.checkRole(users[i].roles, '3')) {
        this.weos.push(users[i])
      }
  };
  return this.weos;
  }


  //Get the population of users in a particular street
  getStreetsPopulation(users): Observable<any> {
    this.streetService.getStreets()
    .subscribe(res => {
      this.streets = res
      //this.countUsers(this.streets.id,users)
        this.streets.forEach(street => {
        var userCount = 0;
     for (let i = 0; i < users.length; i++) {       
      if(street.id == users[i].street.id) {
       userCount++
      }
    } 
    this.areaCount.push({'"ward"':street.ward_name, '"street"':street.street_name, '"population"':userCount},)
    });
     
    })
    return this.areaCount;
  }
  showFullToolTip(row,size,value){
    return '<div class="w3-card-2 w3-padding w3-white"  style="width:98%"><h4>'+ size +' Citizens </h4></div>';
  }
  getUsers(): any {
    this.ngProgress.start();
    this.userService
        .getUsers()
        .subscribe(user => {
          this.users = user;
      this.getStreetsPopulation(this.users) 
      this.getVeos(this.users);
      this.getWeos(this.users);

    //Get Number of registered users based on roles
    for (var i = 0; i < this.users.length; i++) {
      this.getStreetName(user[i].street_id);
      
      if (this.userService.checkRole(this.users[i].roles, '5')){
          this.volunteersCount++;  
        }
      else if (this.userService.checkRole(this.users[i].roles, '4')){
          this.municipalLeadersCount++;  
        }
      else if (this.userService.checkRole(this.users[i].roles, '3')) {
          this.wardLeadersCount++;
        }
      else if (this.userService.checkRole(this.users[i].roles, '2')){
          this.streetLeadersCount++;
        }
      else if(this.userService.checkRole(this.users[i].roles, '1')){
          this.usersCount++;
        }
      }

    // TODO remove this once the dashboard is live
    this.usersCount = this.users.length - (this.wardLeadersCount + 
      this.streetLeadersCount + this.municipalLeadersCount + this.volunteersCount)
    
    //Get the number of citizens in each street
          this.treeChart =  {
            chartType: 'TreeMap',
            options: {
                'title': '',
                'minColor': '#b7fff8',
                'midColor': '#008578',
                'maxColor': '#00685d',
                'headerHeight': 40,
                'showTooltips': true,
                'generateTooltip': this.showFullToolTip,
              },
              dataTable: [
                [this._translate.instant('street'), this._translate.instant('ward'), this._translate.instant('citizens')],
                ['Hananasif Ward', null, this.users.length],
                ],
            };
            
            this.areaCount.forEach(area => {
              this.treeChart.dataTable.push([area.ward, area.street, area.population]);
            });
        });
    this.ngProgress.done();
  }

    //Get Street Name
    getStreetName(street) {
      this.streetService.getStreetName(street)
      .subscribe(street => {
        this.streetName = this.streetService.streetName;
      })

    }
  refreshText(){
    //this.getUsers();
  }
  subscribeToLangChanged() {
    return this._translate.onLangChanged.subscribe(x => this.refreshText());
  }
  ngAfterViewInit() {            
  }
  
  ngOnInit() {
    var loggedUser = this.sessionService.getLoggedUser();
    this.getUsers();
    this.subscribeToLangChanged();

  }

}