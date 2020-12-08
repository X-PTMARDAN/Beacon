import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'filter_currentsku',
})
export class CurrentSkuPipe implements PipeTransform {
  transform(items: any[], callback: (item: any) => boolean): any {
    if (!items || !callback) {
      return items;
    }
    return items.filter(item => {
      item.isFiltered = callback(item.skuname);
      return item.isFiltered;
    });
  }
}
