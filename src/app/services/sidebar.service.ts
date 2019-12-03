import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private eventsSubject: Subject<any> = new Subject<any>();

  constructor() {
  }

  public emit(data) {
    this.eventsSubject.next(data);
  }

  public getSideBarClickEvent$() {
    return this.eventsSubject.asObservable();
  }
}
