import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'propercase',
  pure: false
})
export class PropercasePipe implements PipeTransform {
  transform(text: string): any {
    return text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
