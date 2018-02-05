import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { ChartErrorEvent } from 'ng2-google-charts';
import { NgProgress } from 'ngx-progressbar';

import { DrainsService } from './../../../core/drains.service';
import { StreetService } from "./../../../core/streets.service";
import { TranslateService } from "../../../translate/translate.service";
import { element } from 'protractor';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportComponent implements OnInit, AfterViewInit{
  title = 'Cleanness Reports';
  municipals: any;
  reportBuild = false;
  reportChart: any;
  streets: any;
  wards: any;

  public translatedText: string;

  constructor(
    private drainService: DrainsService,
    public ngProgress: NgProgress,
    public streetService: StreetService,
    private translateService: TranslateService
  ) { }

  public error(event: ChartErrorEvent) {
    event.id = 'PieChartError';
    event.message = 'There is no sufficient data to build a pie chart';
    event.detailedMessage = 'Details about the error';
  }

  streetData(): void {
    this.ngProgress.start();
    this.drainService
      .getRanksData()
      .subscribe( data => {
        this.streets = this.drainService.ranksData;
        this.ngProgress.done();
      });
  }
  buildReport($event){
    this.reportBuild = true;
    if($event.municipal_name != null){
      console.log("This is "+ $event.municipal_name + " with ID "+ $event.id) 
    }
    if($event.ward_name != null){
      console.log("This is "+ $event.ward_name+ " with ID "+ $event.id)
    }
    if($event.street_name != null){
      this.streetsReport(this.streets,$event.street_name)
    }  
  }

  streetsReport(areas,userArea){
    areas.forEach( area => {
      if(area.street.street_name == userArea) {
        this.reportChart =  {
          chartType: 'PieChart',
          dataTable: [
            ['Cleanness Feedback', 'Ratio'],
            [this.translateService.instant('clean'), area.details.cleaned ],
            [this.translateService.instant('dirty'), area.details.uncleaned ],
            [this.translateService.instant('need_help'), area.details.need_help],
          ],
          options: {
            'title': this.translateService.instant('general-report-street')+" "+ area.street.street_name,
            pieHole: 0.3,
            width: 800,
            height: 500,
            colors:['#5cb85c','#eea236','#6495ed'],
            chartArea: {
              height: 'auto',
              float: 'left',
            }
          }, //End Options
        };//End ReportChart
      }
    });
   this.displayDiv("tablecanvas","show");
  } //End Build Street Report Function


  calcPercentage(value,total){
    var percent = (value/total) * 100;
    return percent;
  }
  displayDiv(id,value)
  {
    var element = document.getElementById(id);
    if (value == "hide") {
      element.style.display = "none";
      }
      else if (value == "show") {
        element.style.display = "block";
        }
  }

  /* Print Functions*/
  tableReport(){
    this.displayDiv("tablecanvas","show");
  }
  printReport(){
    var reportsArea = document.getElementById("reports");
    reportsArea.classList.remove("box", "w3-border", "w3-card-2", "w3-border-teal");
    document.getElementById("content-wrapper").classList.remove("content-wrapper")
    window.print();
  }

  /*Translations */
  refreshText() {
    //this.buildReport()
  }

  subscribeToLangChanged() {
    return this.translateService.onLangChanged.subscribe(x => this.refreshText());
  }
  
  ngOnInit() {
    this.displayDiv("tablecanvas","hide");
    this.subscribeToLangChanged()
    this.streetData();
    window.onafterprint = function restoreStyles(){
    document.getElementById("reports").classList.add("box", "w3-border", "w3-card-2", "w3-border-teal");
    document.getElementById("content-wrapper").classList.add("content-wrapper")
    }
  }
    ngAfterViewInit(){
  }


}
