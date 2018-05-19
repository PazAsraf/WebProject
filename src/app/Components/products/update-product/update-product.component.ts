import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../Objects/Product';
import { Category } from '../../../Objects/Category';
import { ProductsService } from '../../../Services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  @Input() productToEdit: Product;
  @Input() categories: Category[];
  @Output() onFinish = new EventEmitter();

  constructor(private _productsService: ProductsService) { }

  public editProduct() {
    this._productsService.updateProduct(this.productToEdit).subscribe(() => {
      this.onFinish.emit();
    }, (err)=> {
      console.log(err);
    });
  }

  public back() {
    this.onFinish.emit();
  }

  ngOnInit() {
  }

}
