import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { StatisticsComponent } from './statistics/statistics.component';

// Services
import { CategoriesService } from './Services/categories.service';

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
    CategoryPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule
  ],
  providers: [
    CategoriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
