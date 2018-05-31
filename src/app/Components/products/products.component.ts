import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { Product } from '../../Objects/Product';
import { CategoriesService } from '../../Services/categories.service';
import { Category } from '../../Objects/Category';
import swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public searchProduct: Product = new Product();
  public categories: Category[];
  public products: Product[];
  public selectedProduct: Product = new Product();
  public updateMode: boolean = false;

  constructor(private _productsService: ProductsService, private _categoriesService: CategoriesService) {
    // Get all categories
    this._categoriesService.getAllCategories().subscribe(allCategories => {
          this.categories = allCategories;
        }, (err) => {
          console.log(err);
        });

    this._productsService.getProducts().subscribe(result => {
      console.log("update to products: ", result.length);
      this.products = result;
    }, (err) => {
      console.log(err);
    });
  }

  public getCategory(categoryId: string) {
    if (this.categories){
      return this.categories.filter(c=> c._id == categoryId)[0].name;
    } else {
      return "not loaded yet";
    }
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
    swal({
      title: 'Are you sure You Want To Delete ' + product.name + ' ?',
      text: 'Think About It',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        // this._productsService.removeProduct(product._id).subscribe(() => {
        //   this.products.splice(this.products.indexOf(product), 1);
        // }, (err) => {
        //   console.log(err);
        // });

        this._productsService.removeProduct(product);

        swal({
          title: 'Processing...',
          text: 'Deleting The Category - ' + product.name,
          timer: 1500,
          onOpen: () => {
            swal.showLoading();
          }
        }).then(() => {
          swal(
            'Done, ',
            'The Category ' + product.name + ' Deleted Successfuly',
            'success'
          );
        });
      }
    });
  }

  public updateProduct(product: Product) {
    this.selectedProduct = product;
    this.updateMode = true;
  }

  public finishUpdate() {
    this.updateMode = false;
    // Get all ProductsServic

    // this._productsService.getAllProducts().subscribe(allProducts => {
    //   this.products = allProducts;
    //   this.updateMode = false;
    // }, (err)=> {
    //   console.log(err);
    // });
  }
  ngOnInit() {
  }

}
