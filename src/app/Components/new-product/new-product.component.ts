import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { Product } from '../../Objects/Product';
import { CategoriesService } from '../../Services/categories.service';
import { Category } from '../../Objects/Category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public newProduct: Product = new Product();
  public categories: Category[];

  constructor(private _productsService: ProductsService, private _categoriesService: CategoriesService, private router: Router) {
    // Get all categories
    this._categoriesService.getAllCategories().subscribe(allCategories => {
          this.categories = allCategories;
        }, (err) => {
          console.log(err);
        });
  }

  public addProduct() {
    // Check valid
    if (this.newProduct.name == undefined ||
        this.newProduct.categoryId == undefined ||
        this.newProduct.price == undefined) {
        alert('somethins is wrong ...');
        return;
    }

    this._productsService.addProduct(this.newProduct).subscribe(rep => {
      //return to all products
      this.router.navigate(['/products']);
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
