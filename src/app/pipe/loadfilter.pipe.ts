import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'loadfilter',
  pure: false
})
export class LoadFilter implements PipeTransform {
  transform(items: any[], callback: (item: any) => boolean): any {
    if (!items || !callback) {
      return items;
    }
    return items.filter(item => {
      item.isFiltered = callback(item.name);
      return item.isFiltered;
    });
  }
}
