import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { StatisticsComponent } from './statistics/statistics.component';

// Routes
import { routing } from "./app.routes";


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CategoriesComponent,
    ProductsComponent,
    AboutUsComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    routing 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
