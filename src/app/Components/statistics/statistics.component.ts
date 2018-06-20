import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../Services/products.service';
import {CategoriesService} from "../../Services/categories.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  objectKeys = Object.keys;

  public pieChartLabels: string[] ;
  public pieChartData: number[];
  public barChartLabels: string[] ;
  public barChartData: any[] = [];
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public seasonalPopularCategories: {};

  constructor(private _productsService: ProductsService,
              private _categoriesService: CategoriesService) {
    this.seasonalPopularCategories = {"winter": "unknown", "spring": "unknown", "summer": "unknown", "autumn": "unknown"};

    this.subscribeToProductsByCategory();
    // this._productsService.productsByCategory().subscribe(grouped => {
    //   this.pieChartData = grouped.map((item) => item.count);
    //   this.pieChartLabels = grouped.map((item) => item.name);
    // }, (err) => {
    //   console.log(err);
    // });

    this._categoriesService.getAvgPrice().subscribe(grouped => {
      this.barChartLabels = grouped.map((item) => item.name);
      this.barChartData[0] = {data: grouped.map((set) => set.avg)} ;
        // grouped.map((item) => ({data: [item.avg,20,20], label: item.name}))
    }, (err) => {
      console.log(err);
    });

    this.objectKeys(this.seasonalPopularCategories).forEach(season => {
      this._categoriesService.getMostPopularBySeason(season).subscribe(res => {
        this.seasonalPopularCategories[season] = res['name'];
      }, (err) => {
        console.log(err);
      });
    });

    this._productsService.getProducts().subscribe(update => {
      this.subscribeToProductsByCategory();
    });
  }

  subscribeToProductsByCategory(){
    this._productsService.productsByCategory().subscribe(grouped => {
      this.pieChartData = grouped.map((item) => item.count);
      this.pieChartLabels = grouped.map((item) => item.name);
    }, (err) => {
      console.log(err);
    });
  }
}
