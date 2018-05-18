import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Product } from '../Objects/Product';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProductsService {

  constructor(private _http: Http) { }

  public getAllProducts() : Observable<Product[]> {
    return this._http.get("/api/products")
      .map(result =>
        result.json());
  }

  public searchProducts(searchProduct: Product) : Observable<Product[]> {
    return this._http.post("/api/products/search", searchProduct)
      .map(result =>
        result.json());
  }

  public removeProduct(productId: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.delete('/api/products/' + productId, { headers });
  }

  public addProduct(newProduct: Product): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/products", newProduct, { headers: headers });
  }

}
