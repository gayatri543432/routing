import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loadingStataus :BehaviorSubject<boolean>=new BehaviorSubject(false);
  loader$ : Observable<boolean> =this.loadingStataus.asObservable()
  constructor() { }
  show() {
  this.loadingStataus.next(true);
}
  hide() {
  this.loadingStataus.next(false);
}

}
