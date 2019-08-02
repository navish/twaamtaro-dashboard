import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';

import { DrainsService } from './../../../core/drains.service';
import { PagerService } from './../../../core/paging.service';

import { Drain } from './../drain';
import * as _ from 'underscore';

@Component({
  selector: 'clean-drain',
  templateUrl: './clean-drain.component.html',
  styleUrls: ['./clean-drain.component.css'],
  providers: [],
})
export class CleanDrainComponent implements OnInit {
  title = 'Clean Drains';
  drains: any[];
  cleared = true;
  ErrMsg: string;
  pager: any = {}; // pager object
  pagedDrains: any[]; // paged drains
  q: any;
  sErr = false; //Search error


  constructor(private drainService: DrainsService, private pagerService: PagerService, public ngProgress: NgProgress) { }

  cleanDrains(page?: number): void {
    this.ngProgress.start();
    this.drainService
        .getCleanDrains(page,this.pagerService.drainCount)
        .subscribe(
          res => { 
            // get pager object from service
            this.pager = this.pagerService.getPager(res.total, page, this.pagerService.drainCount);
            this.drains = res.drains;
            this.pagedDrains = res.drains;
          this.ngProgress.done();
          }  
        );
  }

  theSearch(query){
    return ((drain) => ((drain.gid.toString().toLowerCase().indexOf(query.toLowerCase()) > -1)||(drain.address.toString().toLowerCase().indexOf(query.toLowerCase()) > -1)))
  }

  //Searches for a drain in the list of clean drains
  searchDrain(query){
    this.ngProgress.start()
    let result = this.drains.filter(this.theSearch(query));
    if (result.length > 0) {
      this.sErr = false;
      this.pagedDrains = result;
    }
    else {
      this.sErr = true;
    }
    this.ngProgress.done()
  }
  
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }
    this.cleanDrains(page);
  } 
  ngOnInit(): void {
    //this.cleanDrains();
    this.setPage(1);
    this.sErr = false; 
    
  }
}
