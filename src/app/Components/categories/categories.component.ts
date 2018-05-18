import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';
import { Category } from '../../Objects/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories: Category[];
  public error: string;
  public newCategory: string;
  filter: string;

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

  public deleteCategory(category: Category) {
    this._categoriesService.removeCategory(category._id)
          .subscribe(() => {
            this.categories.splice(this.categories.indexOf(category), 1);
          }, err => {
            this.error = 'error deleting category';
          });
  }

  public addCategory() {

    // Check if not valid
    if (!this.newCategory || this.newCategory.length > 50){
        alert('name not valid');
        return;
    }
    // Check if exist
    if (this.categories.findIndex(c => c.name === this.newCategory) !== -1){
        alert('name already exists!');
        return;
    }

    // Add
    this._categoriesService.addCategory(this.newCategory)
          .subscribe(res => {
            this.categories.push(res.json());
            this.newCategory = "";
            //app.server.emit('categories', self.categories);
          }, err => {
            this.error = 'error adding category';
          });
  }

  ngOnInit() {
  }

}
