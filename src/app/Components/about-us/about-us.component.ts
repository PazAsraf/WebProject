import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../Services/store.service';
import { Store } from '../../Objects/Store';
import {request} from 'request';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  public myStore: Store = new Store();
  public storeWeather;
  public weatherIconURL;

    constructor(private _storeService: StoreService) {
    this._storeService.getStore().subscribe(res => {
          this.myStore = res;
        }, (err) => {
          //this.error = 'error getting store';
          console.log(err);
        });

    this._storeService.getStoreWeather().subscribe(res => {
      this.storeWeather = res;
      const iconCode = this.storeWeather.weather[0].icon;
      this.weatherIconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
