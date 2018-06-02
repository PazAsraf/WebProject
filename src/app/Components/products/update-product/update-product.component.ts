import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../Objects/Product';
import { Category } from '../../../Objects/Category';
import { ProductsService } from '../../../Services/products.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  @Input() productToEdit: Product;
  @Input() categories: Category[];
  @Output() onFinish = new EventEmitter();

  isNameError = false;
  isPriceError = false;
  isCategoryError = false;

  constructor(private _productsService: ProductsService) { }

  public editProduct() {
    if (this.productToEdit.name == undefined || this.productToEdit.name == '') {
      this.isNameError = true;
      swal({
        type: 'error',
        title: 'Bad Input!',
        text: 'Please Enter Product Name'
      });
      return;
    } else if (this.productToEdit.price == undefined) {
      this.isNameError = false;
      this.isPriceError = true;
      swal({
        type: 'error',
        title: 'Bad Input!',
        text: 'Please Enter Product Price'
      });
      return;
    } else if (this.productToEdit.price < 1 ) {
      this.isNameError = false;
      this.isPriceError = true;
      swal({
        type: 'error',
        title: 'Bad Input!',
        text: 'Please Enter Positive Product Price'
      });
      return;
    } else if (this.productToEdit.categoryId == undefined) {
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

    this._productsService.updateProduct(this.productToEdit);

    this.onFinish.emit();

    swal({
      title: 'Processing...',
      text: 'Editing Product - ' + this.productToEdit.name,
      timer: 1500,
      onOpen: () => {
        swal.showLoading();
      }
    }).then( () =>
      swal(
        'Done, ',
        'The Product ' + this.productToEdit.name + ' Edited Successfully',
        'success'
      )
    );
  }

  public back() {
    this.onFinish.emit();
  }

  ngOnInit() {
  }

}
