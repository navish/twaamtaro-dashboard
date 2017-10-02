import { Component, OnInit } from '@angular/core';
import { DrainsService } from './../drains/drains.service';
import { Drain } from './../drains/drain';

// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  alldrains: Drain[];
  cleandrains: any[];
  helpdrains: any[];
  dirtydrains:Drain[];
  unknowndrains:Drain[];
  //pieChartData:any;

constructor(private drainService: DrainsService) { }
  cleanDrains(): any {
   this.drainService
        .getCleanDrains()
        .subscribe(clean => this.cleandrains)
        .do(this.cleandrains.length);
  }
  dirtyDrains(): void {
    this.drainService
        .getDirtyDrains()
        .subscribe(dirty => this.dirtydrains = dirty);
  }
  helpDrains(): void {
    this.drainService
        .getHelpDrains()
        .subscribe(help => this.helpdrains = help);
  }
  unknownDrains(): any {
     this.drainService
        .getUnknownDrains()
        .subscribe(unknown => this.unknowndrains = unknown);
  }
  
  ngOnInit() {  
   
  }
  pieChartData =  {
    chartType: 'PieChart',
    dataTable: [
      ['Cleanness Feedback', 'Ratio'],
      ['Clean Drains', 65  ],
    ],
    options: {
          'title': 'General Cleanness Report for Drains',
          pieHole: 0.4,
          'height':500 ,
          },
  };
  public tableChartData =  {
    chartType: 'Table',
    dataTable: [
      ['Department', 'Revenues', 'Another column'],
      ['Shoes', 10700, -100],
      ['Sports', -15400, 25],
      ['Toys', 12500, 40],
      ['Electronics', -2100, 889],
      ['Food', 22600, 78],
      ['Art', 1100, 42]
    ],
    formatters: [
      {
        columns: [1, 2],
        type: 'NumberFormat',
        options: {
          prefix: '&euro;', negativeColor: '#FF0000', negativeParens: true
        }
      }
    ],
    options: {title: 'Countries', allowHtml: true}
  };
}
