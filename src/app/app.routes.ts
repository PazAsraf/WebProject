import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './Components/main-page/main-page.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { ProductsComponent } from './Components/products/products.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { StatisticsComponent } from './Components/statistics/statistics.component';
import { NewProductComponent } from './Components/new-product/new-product.component';

export const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'new-product', component: NewProductComponent },
  { path: '**', component: MainPageComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
