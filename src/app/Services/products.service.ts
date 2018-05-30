import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Product } from '../Objects/Product';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ProductsService{
  private url = 'http://127.0.0.1:8081';
  private products = []

  constructor(private _http: Http) { 
  }

  // public getAllProducts() : Observable<Product[]> {
  //   return this._http.get("/api/products")
  //     .map(result =>
  //       result.json());
  // }

  public getProducts() : Observable<any>{
    let observable = new Observable(observer => {
      var socket = io(this.url);
      var products = []

      socket.on('connect', function(){
        console.log('socket connected');
        socket.emit('send-message', 'store reporting');
      });

      socket.on('new-product', (product) => {
        products.push(product);
        observer.next(products);
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  } 

  public searchProducts(searchProduct: Product) : Observable<Product[]> {
    return this._http.post("/api/products/search", searchProduct)
      .map(result =>
        result.json());
  }

  public productsByCategory() : Observable<Product[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("/api/products-by-category", { headers })
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

  public updateProduct(productToUpdate: Product): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put("/api/products", productToUpdate, { headers: headers });
  }
}
