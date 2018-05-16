import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../Services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories: any;
  public error: string;

  constructor(private _categoriesService: CategoriesService)
  {
    // Get all categories
    this._categoriesService.getAllCategories().subscribe(allCategories => {
          this.categories = allCategories;
        }, (err) => {
          this.error = 'error getting categories';
          console.log(err);
        });
  }

  public deleteCategory(category: any) {
    this._categoriesService.removeCategory(category.id)
          .subscribe(() => {
            this.categories.splice(this.categories.indexOf(category), 1);
          }, err => {
            this.error = 'error deleting category';
          });
  }

  public addCategory(newCategory: string) {

    // Check if not valid
    if (!newCategory || newCategory.length > 50){
        alert('name not valid');
        return;
    }
    // Check if exist
    if (this.categories.findIndex(c => c.name === newCategory) !== -1){
        alert('name already exists!');
        return;
    }

    // Add
    this._categoriesService.addCategory(newCategory)
          .subscribe(res => {
            this.categories.push(res.data);
            //app.server.emit('categories', self.categories);
          }, err => {
            this.error = 'error adding category';
          });
  }

  ngOnInit() {
  }

}
