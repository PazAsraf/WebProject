import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../Services/store.service';
import { Store } from '../../Objects/Store'

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  public myStore: Store;

  constructor(private _storeService: StoreService) {
    this._storeService.getStore().subscribe(res => {
          this.myStore = res;
        }, (err) => {
          //this.error = 'error getting store';
          console.log(err);
        });
  }

  ngOnInit() {
  }

}
