import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { Product } from '../../Objects/Product';
import { CategoriesService } from '../../Services/categories.service';
import { Category } from '../../Objects/Category';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public newProduct: Product = new Product();
  public categories: Category[];
  isNameError = false;
  isPriceError = false;
  isCategoryError = false;

  constructor(private _productsService: ProductsService, private _categoriesService: CategoriesService, private router: Router) {
    // Get all categories
    this._categoriesService.getAllCategories().subscribe(allCategories => {
          this.categories = allCategories;
        }, (err) => {
          console.log(err);
        });
  }

  public addProduct() {
    if (this.newProduct.name == undefined) {
      this.isNameError = true;
      swal({
        type: 'error',
        title: 'Bad Input!',
        text: 'Please Enter Product Name'
      });
      return;
    } else if (this.newProduct.price == undefined) {
      this.isNameError = false;
      this.isPriceError = true;
      swal({
        type: 'error',
        title: 'Bad Input!',
        text: 'Please Enter Product Price'
      });
      return;
    } else if (this.newProduct.price < 1 ) {
      this.isNameError = false;
      this.isPriceError = true;
      swal({
        type: 'error',
        title: 'Bad Input!',
        text: 'Please Enter Positive Product Price'
      });
      return;
    } else if (this.newProduct.categoryId == undefined) {
      this.isNameError = false;
      this.isPriceError = false;
      this.isCategoryError = true;
      swal({
        type: 'error',
        title: 'Bad Input!',
        text: 'Please Choose A Category'
      });
      return;
    }

    this.isCategoryError = false;

    this._productsService.addProduct(this.newProduct);
    this.router.navigate(['/products']);

    // swal({
    //   title: 'Processing...',
    //   text: 'Adding Product - ' + this.newProduct.name,
    //   timer: 1500,
    //   onOpen: () => {
    //     swal.showLoading();
    //   }
    // }).then( () =>
    //   swal(
    //     'Done, ',
    //     'The Product ' + this.newProduct.name + ' Added Successfully',
    //     'success'
    //   )
    // );
  }

  ngOnInit() {
  }

}
