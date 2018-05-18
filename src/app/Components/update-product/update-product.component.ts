import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  @Input() currProduct: Product;

  constructor() { }

  ngOnInit() {
  }

}
