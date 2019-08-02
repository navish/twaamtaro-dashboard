
import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { DrainsService } from './../../../core/drains.service';
import { ChartErrorEvent } from 'ng2-google-charts';
import { NgProgress } from 'ngx-progressbar';
import { TranslateService } from "../../../translate/translate.service";

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class ReportComponent implements OnInit, AfterViewInit{
  title = 'Cleanness Reports';
  streets: any;
  region: any = {'name': '' };
  district: any = {'name': '' };
  ward: any = {'name': '' };
  streetname: any = {'name': '' };
  reportBuild = false;
  reportChart: any;
  public translatedText: string;

  constructor(
    private drainService: DrainsService,
    public ngProgress: NgProgress,
    private translateService: TranslateService
  ) { }

  public error(event: ChartErrorEvent) {
    event.id = 'PieChartError';
    event.message = 'There is no suffiecient data to build a pie chart';
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

  buildReport(): any {
    this.reportBuild = true;
    if(this.streetname.name == "all") {
      var clean = 0;
      var unclean = 0; 
      var needHelp = 0;
      
       for (let i = 0; i < this.streets.length; i++) {
        unclean += this.streets[i].details.uncleaned;
      }

       for (let i = 0; i < this.streets.length; i++) {
        needHelp += this.streets[i].details.need_help;
      }

      for (let i = 0; i < this.streets.length; i++) {
        clean += this.streets[i].details.cleaned;
      }
      this.reportChart =  {
        chartType: 'PieChart',
        dataTable: [
          ['Cleanness Feedback', 'Ratio'],
          [this.translateService.instant('clean'), clean ],
          [this.translateService.instant('dirty'), unclean ],
          [this.translateService.instant('need_help'), needHelp],
        ],
        options: {
          'title': this.translateService.instant('general-report-all')+ this.ward.name,
          pieHole: 0.3,
          height: this.graphDim(),
          colors:['#5cb85c','#eea236','#6495ed']
        },
      };

    }
    else {

    this.streets.forEach( street => {
      if(street.street.street_name == this.streetname.name) {
        this.reportChart =  {
          chartType: 'PieChart',
          dataTable: [
            ['Cleanness Feedback', 'Ratio'],
            [this.translateService.instant('clean'), street.details.cleaned ],
            [this.translateService.instant('dirty'), street.details.uncleaned ],
            [this.translateService.instant('need_help'), street.details.need_help],
          ],
          options: {
            'title': this.translateService.instant('general-report-street')+ street.street.street_name,
            pieHole: 0.3,
            height: this.graphDim(),
            colors:['#5cb85c','#eea236','#6495ed'],
            chartArea: {
              height: 'auto',
              float: 'left',
            }
          }, //End Options
        };//End ReportChart
      }
    });
   } //End Else
   this.displayDiv("tablecanvas","show");
  } //End Build Report Function

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

  //Listen for window.resize
  onResize($event) {
    window.addEventListener('resize', this.buildReport());
    this.graphDim()
  }

  //Change graph height based on window width 
  graphDim(): any{
    let w = window.innerWidth;
    let h;
    if (w >= 1024) {
      h = 500
    } else if(w >= 600) {
      h = 350
    } else if(w < 600){
      h = 320;
    } else if(w <= 420){
      h = 220;
    }
    return h;
  }
  /*Translations */
  refreshText() {
    this.buildReport()
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
