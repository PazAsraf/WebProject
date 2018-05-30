import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../Services/products.service';
import {CategoriesService} from "../../Services/categories.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  public pieChartLabels: string[] ;
  public pieChartData: number[];
  public barChartLabels: string[] ;
  public barChartData: number[];

  constructor(private _productsService: ProductsService,
              private _categoriesService: CategoriesService) {
    this._productsService.productsByCategory().subscribe(grouped => {
      this.pieChartData = grouped.map((item) => item.count);
      this.pieChartLabels = grouped.map((item) => item.name);
    }, (err) => {
      console.log(err);
    });

    this._categoriesService.getAvgPrice().subscribe(grouped => {
      this.barChartLabels = grouped.map((item) => item.name);
      this.barChartData = grouped.map((item) => item.avg);
    }, (err) => {
      console.log(err);
    });
  }
}
