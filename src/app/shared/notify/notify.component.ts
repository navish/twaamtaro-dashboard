import { Component, OnInit } from '@angular/core';
import { AuthService} from "./../../core/auth.service";
import { NgProgress } from 'ngx-progressbar';
import { SmsService } from "./../../core/sms.service";
import { TranslateService } from "./../../translate/translate.service";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  title: 'Send Mass Notifications';
  
  theMsg: any = {
    'alert': 'Msimu wa mvua umekaribia',
    'awareness': 'Ni muhimu kukumbuka kusafisha mitaro baada ya muda fulani' 
  };

  constructor(
    public authService: AuthService,
    public ngProgress: NgProgress,
    private smsService: SmsService,
    private translateService: TranslateService
  ) { }

  
  hide(element) {
    document.getElementById(element).style.display='none';
  }
  checkBoxes(element1,element2){
    document.getElementById(element1).style.display='block';

    if(document.getElementById(element1).style.display=='block') { 
      document.getElementById(element2).style.display='none'; 
    } 

  }

  deliveryRes: any;
  statusMsg: any;

  sendMessages(msg) {
    this.ngProgress.start();
    console.log(msg);
    this.smsService.sendMassMsg(msg)
      .subscribe(
        res => {
          this.deliveryRes = res;
          if (this.deliveryRes.success) {
            this.statusMsg = 'Messages have been sent';
          } else {
            this.statusMsg = 'Message sending failed';
          }
      });
      this.ngProgress.done();
  }
  msgContent(){
    this.theMsg.alert = this.translateService.instant('alert_msg');
    this.theMsg.awareness = this.translateService.instant('awareness_msg')
  }
  subscribeToLangChanged() {
    return this.translateService.onLangChanged.subscribe(x => this.msgContent());
  }
  ngOnInit() {
    this.hide('alertMsg');
    this.hide('awarenessMsg');
    this.subscribeToLangChanged();
  }

}
