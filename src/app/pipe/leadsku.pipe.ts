import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'filter_leadsku',
})
export class LeadSkuPipe implements PipeTransform {
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
