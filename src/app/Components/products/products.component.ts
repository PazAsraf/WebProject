import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { Product } from '../../Objects/Product';
import { CategoriesService } from '../../Services/categories.service';
import { Category } from '../../Objects/Category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public searchProduct: Product = new Product();
  public categories: Category[];
  public products: Product[];

  constructor(private _productsService: ProductsService, private _categoriesService: CategoriesService) {
    // Get all categories
    this._categoriesService.getAllCategories().subscribe(allCategories => {
          this.categories = allCategories;
        }, (err) => {
          console.log(err);
        });

    // Get all ProductsServic
    this._productsService.getAllProducts().subscribe(allProducts => {
      this.products = allProducts;
    }, (err)=> {
      console.log(err);
    });
  }

  public getCategory(categoryId: string) {
    return this.categories.filter(c=> c._id == categoryId)[0].name;
  }

  // Search
  public Search() {
    this._productsService.searchProducts(this.searchProduct).subscribe(filteredProducts => {
      this.products = filteredProducts;
    }, (err)=> {
      console.log(err);
    });
  }

  public deleteProduct(product: Product) {
    this._productsService.removeProduct(product._id).subscribe(() => {
      this.products.splice(this.products.indexOf(product), 1);
    }, (err)=> {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
