import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipe implements PipeTransform {

  transform(items: any, filter: string): any {
    if (!items || !filter) {
      return items;
    }
    
    return items.filter(cat => cat.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

}
