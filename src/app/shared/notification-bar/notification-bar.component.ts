import { Component, OnInit } from '@angular/core';
import { User } from "./../../core/user";
import { UserService } from "./../../core/user.service";
import { DrainsService } from './../../core/drains.service';
import { Drain } from './../drains/drain';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent implements OnInit {
  users: User[];
  alldrains: Drain[];
  cleandrains: Drain[];
  helpdrains: Drain[];
  dirtydrains:Drain[];
  unknowndrains:Drain[];
  summaryData: any;

constructor(private drainService: DrainsService, private userService: UserService) { }
 getUsers(): void {
    this.userService
        .getUsers()
        .subscribe(users => this.users = users);
  }
  getDrains(): any {
    this.drainService
        .getDrains()
        .subscribe(drains => this.alldrains = drains);
  }

  cleanDrains(): any {
    this.drainService
        .getCleanDrains()
        .subscribe(cleanDrains => this.cleandrains = cleanDrains);
  }
  dirtyDrains(): any {
    this.drainService
        .getDirtyDrains()
        .subscribe(dirtyDrains => this.dirtydrains = dirtyDrains);
  }
  helpDrains(): any {
    this.drainService
        .getHelpDrains()
        .subscribe(helpDrains => this.helpdrains = helpDrains);
  }
  unknownDrains(): any {
    this.drainService
        .getUnknownDrains()
        .subscribe(unknownDrains => this.unknowndrains = unknownDrains);
  }

  summaryInfo(){
    this.drainService.getDrainData()
      .subscribe( res => { this.summaryData = res; }) 
    }


  ngOnInit() {
    this.summaryInfo();
  }

}
