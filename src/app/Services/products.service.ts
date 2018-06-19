import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Product } from '../Objects/Product';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ProductsService {
  private url = 'http://127.0.0.1:8081';
  private socket;

  private subject: BehaviorSubject<any[]> = new BehaviorSubject([]);

  private products;
  private productsObservable;

  constructor(private _http: Http) { 
    this.initWebSocket()

    this.products = [];
    
    this.productsObservable = new Observable(observer => {
      this.socket.on('new-product', (product) => {
        if (!this.products.find(prod => prod._id === product._id)){
          this.products.push(product);
          observer.next(this.products);
        }
      });

      this.socket.on('delete-product', (product) => {
        this.products = this.products.filter(prod => prod._id != product._id);
        observer.next(this.products);
      });

      this.socket.on('update-product', (product) => {
        let prod = this.products.find(item => item._id === product._id);
        this.products[this.products.indexOf(prod)] = product;
        // this.products = this.products.filter(prod => prod._id != product._id);
        // this.products.push(product);
        observer.next(this.products);
      });

      return () => {
        this.socket.disconnect();
      };  
    })

    this.productsObservable.subscribe(data => {
      this.subject.next(data);
    });
  }

  initWebSocket(){
    this.socket = io(this.url);
    this.socket.on('connect', function(sock){
      console.log('socket connected');
    });
  }

  public getProducts() : Observable<any>{
    return this.subject.asObservable();
  } 

  public searchProducts(searchProduct: Product) : Observable<Product[]> {
    return this._http.post("/api/products/search", searchProduct)
      .map(result =>
        result.json());
  }

  public productsByCategory() : Observable<any[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get("/api/products-by-category", { headers })
      .map(result =>
        result.json());
  }

  public removeProduct(product: Product){
    this.socket.emit('delete-product', product);
  }

  public addProduct(newProduct: Product){
    this.socket.emit('add-product', newProduct);
  }

  public updateProduct(productToUpdate: Product){
    this.socket.emit('update-product', productToUpdate);
  }

}
