import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriesService {

  constructor(private _http: Http) { }

  public getAllCategories() {
    return this._http.get("/api/categories")
      .map(result =>
        result.json());
  }

  public removeCategory(categoryId: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.delete("/api/categories" + categoryId, { headers });
  }

  public addCategory(category: string): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/categories/" + category, { headers: headers });
  }
}
