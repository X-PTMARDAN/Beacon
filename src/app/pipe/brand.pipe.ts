import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'filter_brand',
})
export class CPGPipe implements PipeTransform {
  transform(items: any[], callback: (item: any) => boolean): any {
    if (!items || !callback) {
      return items;
    }
    return items.filter(item => {
      item.isChecked = callback(item.name);
      return item.isChecked;
    });
  }
}
