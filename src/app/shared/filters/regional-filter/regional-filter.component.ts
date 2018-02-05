import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StreetService } from "./../../../core/streets.service";
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'regional-filter',
  templateUrl: './regional-filter.component.html',
  styleUrls: ['./regional-filter.component.css']
})

export class RegionalFilterComponent implements OnInit {
  @Input() area: any;
  @Output() selectedArea = new EventEmitter<any>()

  constructor(
    private streetService: StreetService
  ) {}

  municipals: any
  wards: any;
  streets:any;

  emitValue($event){
    if($event.municipal_name){
      this.getMunicipalWards($event.id);
    }
    else if($event.ward_name){
      this.getWardStreets($event.id);
    }
    this.selectedArea.emit($event);
  }

  getMunicipals(){
    this.streetService.getMunicipals()
    .subscribe(res =>{
      this.municipals = res
    },
    err => {
      console.log("Something went wrong when loading the municipals/districts")
   })
  }
  getMunicipalWards(municipalId){
    this.streetService.getMunicipalWards(municipalId)
    .subscribe(res =>{
      this.wards = res
    },
     err => {
       console.log("Something went wrong when loading the wards")
    })
  }
  getWardStreets(wardId){
    this.streetService.getWardStreets(wardId)
    .subscribe(res =>{
      this.streets = res
    },
    err => {
      console.log("Something went wrong when loading the streets")
   })
  }
  ngOnInit() {
    this.getMunicipals()
  }

}
