import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./../../core/auth.service";
import { FormErrorsService } from "./../../core/form-errors.service";
import { NgProgress } from 'ngx-progressbar';
import { SessionService } from "./../../core/session.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor (
        private authService: AuthService,
        private formErrorsService: FormErrorsService,
        private router: Router,
        private sessionService: SessionService,
        private ngProgress: NgProgress
      ) { }
  
  loading = false;
  userData: any;
  loginStatus: any;
  theUser: any;
  userName: any;
  userRoles: any;
  user: any = { 'sms_number': '','password': '' };
  err: any;
  loginCalled = false;
  inputsToFormat = {'phone':''};
  countryCode = "255";
  
  formatPhoneNumber(phoneNumber) {
    var formattedNumber: any;
    if(phoneNumber.startsWith("0")) {
      formattedNumber = this.countryCode.concat(phoneNumber.slice(1))
      return formattedNumber;
    }
    else if(phoneNumber.startsWith("+")) {
      formattedNumber = phoneNumber.replace("+","");
      return formattedNumber;
    }
    else {
        return phoneNumber;
    }
  }

  login() {
    this.ngProgress.start();
    this.user.sms_number = this.formatPhoneNumber(this.inputsToFormat.phone);

    this.authService.login(this.user)
    .subscribe(res => {

      this.userData = JSON.parse(this.authService.userdata);
      this.userName = this.userData.users.first_name +" "+ this.userData.users.last_name;
      this.userName = this.userData.users.email;
      this.userRoles = this.userData.roles;
      
      this.loginCalled = true;
      if (this.userData && this.userData.users.authentication_token) {
          localStorage.setItem('currentUser', JSON.stringify(this.userData.users.authentication_token));
          localStorage.setItem('user', this.userName);
          localStorage.setItem('role', this.userRoles);
  
        this.router.navigate(['dashboard/admin']);
        
        
        /*if ((localStorage.getItem("role")) == "3") {
            this.router.navigate(['dashboard/weo']);
            
        } else if (localStorage.getItem("role") == "4") {
            this.router.navigate(['dashboard/meo']);  */
        
      }
    }, error => {
      this.loginCalled = true;
      this.formErrorsService.error(error);
    });
    this.ngProgress.done();
  };
    
  logout() { 
   this.authService.logout();
   this.router.navigateByUrl('/');
  }
  
  closemodal() 
  {
    var modal = document.getElementById('loginmodal');
    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
    }
  }

  closelogin(){ 
    document.getElementById('loginmodal').style.display='none';
  }

  ngOnInit() {
    this.closemodal();
  }
}