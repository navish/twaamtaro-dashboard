import { DataService } from './../../core/data.service';
import { DrainsService } from './../../core/drains.service';
import { NgProgress } from 'ngx-progressbar';
import { Component, OnInit, Output, Input,  EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-needhelp-search',
  templateUrl: './needhelp-search.component.html',
  styleUrls: ['./needhelp-search.component.css']
})
export class NeedhelpSearchComponent implements OnInit {
  @Input() query: any;
  @Output() searchQuery = new EventEmitter<any>()

  category_bool: boolean = false;
  street_bool: boolean = false;
  drains_bool: boolean = false;
  show_results: boolean = false;
  autoCompleteData: any = {};
  
  constructor(
    private ngProgress: NgProgress,
    private drainService: DrainsService,
    private dataService: DataService
  ) { }

  streets: any;
  q: any = {'value': '' };
  thedrains: any; 

  //This function emits the input value to be used in another component
  emitValue($event)
  {
    this.query = this.q.value;
    this.searchQuery.emit(this.query);
  }

  // passes search key to the DataService
  // data service will do the searching
  passSearchKey(column, key){
    console.log('passKey called');
    this.show_results = false;
    this.dataService.searchNeedHelpRequests({column: column, key: key});
  }

  // provides results
  // for autocompleting search
  autoComplete(q: any){
    this.show_results = this.show_results? this.show_results: true;
    console.log('yap search key');
    this.drainService.searchAutoComplete(q)
    .subscribe( res => {
      this.autoCompleteData = res;
      this.category_bool = res.categories.length != 0? true: false;
      this.street_bool = res.streets.length != 0? true: false;
      this.drains_bool = res.drains.length != 0? true: false;
    });
  }

  ngOnInit() {
  }

}
