import { Injectable } from '@angular/core';
import { Place } from '../place.model';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private _offers: Place[] = [];

  constructor() { }

  getoffers() {
    return [ ...this._offers];
  }

}
