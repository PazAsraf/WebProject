import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';
import { Category } from '../../Objects/Category';
import swal from 'sweetalert2';

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
  errorCatInput: Boolean = false;

  constructor(private _categoriesService: CategoriesService) {
    // Get all categories
    this._categoriesService.getAllCategories().subscribe(allCategories => {
          this.categories = allCategories;
        }, (err) => {
          this.error = 'error getting categories';
          console.log(err);
        });
  }

  public deleteCategory(category: Category) {
    swal({
      title: 'Are you sure You Want To Delete ' + category.name + ' ?',
      text: 'Think About It',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._categoriesService.removeCategory(category._id)
          .subscribe(() => {
            this.categories.splice(this.categories.indexOf(category), 1);
          }, err => {
            this.error = 'error deleting category';
          });

        swal({
          title: 'Processing...',
          text: 'Deleting The Category - ' + category.name,
          timer: 1500,
          onOpen: () => {
            swal.showLoading();
          }
        }).then(() => {
          swal(
            'Done, ',
            'The Category ' + category.name + ' Deleted Successfuly',
            'success'
          );
        });
      }
    });
  }

  public addCategory() {
    const newCat = this.newCategory;
    // Check if not valid
    if (!this.newCategory || this.newCategory.length > 50) {
      this.errorCatInput = true;
        swal({
          type: 'error',
          title: 'Bad Input!',
          text: 'Please Insert New Category Name'
        });
        return;
    }
    // Check if exist
    if (this.categories.findIndex(c => c.name === this.newCategory) !== -1) {
      this.errorCatInput = true;
      swal({
        type: 'error',
        title: 'Bad Input!',
        text: 'Category Name Already Exists'
      });
      return;
    }

    // Add
    this.errorCatInput = false;
    this._categoriesService.addCategory(this.newCategory)
          .subscribe(res => {
            this.categories.push(res.json());
            this.newCategory = '';
            //app.server.emit('categories', self.categories);
          }, err => {
            this.error = 'error adding category';
          });

    swal({
      title: 'Processing...',
      text: 'Adding Category - ' + this.newCategory,
      timer: 1500,
      onOpen: () => {
        swal.showLoading();
      }
    }).then(() => {
      swal(
        'Done, ',
        'The Category ' + newCat + ' Added Successfuly',
        'success'
      );
    });

  }

  ngOnInit() {
  }

}
