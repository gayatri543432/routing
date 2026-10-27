import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDashComponent } from './component/user-dash/user-dash.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RoutingModule } from './routing/routing.module';
import { MaterialModule } from './material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GetConfirmComponent } from './component/get-confirm/get-confirm.component';
import { HTTP_INTERCEPTORS, HttpClientModule  } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProductDashComponent } from './component/product-dash/product-dash.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { MatDividerModule } from '@angular/material/divider';
@NgModule({
  declarations: [
    AppComponent,
    UserDashComponent,
    UserDetailComponent,
    UserFormComponent,
    NavbarComponent,
    GetConfirmComponent,
    ProductDashComponent,
    ProductDetailComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
