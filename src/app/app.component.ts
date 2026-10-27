import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  // isLoading!:boolean
  title = 'routing';
  private spinnerService =inject(SpinnerService)
  isLoading$:Observable<boolean> =this.spinnerService.loader$
  constructor( private _cdr :ChangeDetectorRef){}
  ngOnInit(): void {
    // this.spinnerService.loader$.subscribe((status) => {
    //   this.isLoading = status;

    //   // Manually Angular ko UI update karne ke liye bolna
    //   this._cdr.detectChanges();
    // });
  }
}
