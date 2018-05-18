import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

// Components
import { AppComponent } from './app.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { ProductsComponent } from './Components/products/products.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { StatisticsComponent } from './Components/statistics/statistics.component';
import { NewProductComponent } from './Components/new-product/new-product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';

// Services
import { CategoriesService } from './Services/categories.service';
import { ProductsService } from './Services/products.service';
import { StoreService } from './Services/store.service';

// Pipes
import { CategoryPipe } from './Pipes/category.pipe';

// Routes
import { routing } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CategoriesComponent,
    ProductsComponent,
    AboutUsComponent,
    StatisticsComponent,
    CategoryPipe,
    NewProductComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfIZdY2EgLY9FKt1ogJ4uuwHdO4beAT9I'
    })
  ],
  providers: [
    CategoriesService,
    StoreService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
