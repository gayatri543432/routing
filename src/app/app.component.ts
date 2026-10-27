import {Component, inject } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  
  title = 'routing';
  private spinnerService =inject(SpinnerService)
  isLoading$:Observable<boolean> =this.spinnerService.loader$

}
