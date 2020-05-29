import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAutheticated = false;

  constructor() { }

  get userIsAuthenticated() {
    return this._userIsAutheticated;
  }

  login() {
    this._userIsAutheticated = true;
  }

  logout() {
    this._userIsAutheticated = false;
  }
}
