import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  loggedIn = false;
  currentUser:any;

  constructor() { }
  setCurrentUser(user){
    localStorage.setItem("currentUserToken",JSON.stringify(user.authentication_token));
    localStorage.setItem('loggedUser', JSON.stringify(user));
    localStorage.setItem('roles', JSON.stringify(user.roles));
    localStorage.setItem('street', JSON.stringify(user.street));
  }

  getLoggedUser() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedUser"));
    return loggedInUser;
  }
  getUserToken() {
    let userToken = JSON.parse(localStorage.getItem("currentUserToken"));
    return userToken;
  }

  getUserRole() {
    let userRoles = JSON.parse(localStorage.getItem("roles"));
    return userRoles;
  }

  getUserStreet() {
    var userStreet = JSON.parse(localStorage.getItem("street"));
    return userStreet;
  }

  hasRole(roleName: string): boolean{
    let boolValue: boolean;
    if(this.getUserRole()){
      console.log('the roles');

      let roleArray: any = this.getUserRole();
      boolValue = roleArray.some((data) => data.name == roleName );
      console.log(roleArray);
    }
    else{
      boolValue = false;
    }

    return boolValue;

  }

}
