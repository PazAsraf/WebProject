import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public statistics: any;

  constructor(private _productsService: ProductsService) {
    this._productsService.productsByCategory().subscribe(grouped => {
      this.statistics = grouped;
    }, (err)=> {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
