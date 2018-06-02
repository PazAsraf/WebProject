import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '../Objects/Store';

@Injectable()
export class StoreService {

  constructor(private _http: Http) { }

  public getStore() : Observable<Store> {
    return this._http.get("/api/store")
      .map(result =>
        result.json());
  }

  public getStoreWeather() {
    return (this._http.get("/api/store/weather")
      .map(result => result.json()));
  }
}
