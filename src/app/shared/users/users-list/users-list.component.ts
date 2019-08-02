import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { SessionService } from "./../../../core/session.service";
import { UserService } from "./../../../core/user.service";
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  title = 'Users List';
  users: any;
  street: any;
  filteredUsers: any;
  
    constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private location: Location,
      public ngProgress: NgProgress,
      private sessionService : SessionService
    ) {}


   filterUsers(users, street, ward){
    let userAddress = JSON.parse(this.sessionService.getLoggedUser())
    let userStreet = userAddress.street.street_name
    let userWard = userAddress.ward.ward_name

    if (this.sessionService.hasRole("weo")) {
      return users.some(user => userWard.toString() == ward.toString())
    } else if(this.sessionService.hasRole("veo")) {
      return users.some(user => userStreet.toString() == street.toString())
    }  
   }
   
   getUsers(): any {
    this.ngProgress.start();
    this.userService.getUsers()
        .subscribe(res => {
          this.users = res;
          this.filteredUsers = this.users.filter((user) => (this.filterUsers(this.users, user.street.street_name, user.ward.ward_name)));
        })
    this.ngProgress.done()
    }
  ngOnInit() {
    this.getUsers();

  }

}