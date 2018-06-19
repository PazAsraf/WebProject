import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Category } from '../Objects/Category';

@Injectable()
export class CategoriesService {

  constructor(private _http: Http) { }

  public getAllCategories() : Observable<Category[]> {
    return this._http.get("/api/categories")
      .map(result =>
        result.json());
  }

  public removeCategory(categoryId: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.delete("/api/categories/" + categoryId, { headers });
  }

  public addCategory(category: string): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/categories/" + category, { headers: headers });
  }

  public getAvgPrice() : Observable<any[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get("/api/avg-by-category", { headers })
      .map(result =>
        result.json());
  }

  public getMostPopularBySeason(season) : Observable<any[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get("/api/categories/popularBySeason/"+season, { headers }).map(result => result.json());
  }
}
