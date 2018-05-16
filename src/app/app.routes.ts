import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { StatisticsComponent } from './statistics/statistics.component';

export const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', component: MainPageComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
