import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashComponent } from '../component/user-dash/user-dash.component';
import { UserFormComponent } from '../component/user-form/user-form.component';
import { UserDetailComponent } from '../component/user-detail/user-detail.component';
import { ProductDashComponent } from '../component/product-dash/product-dash.component';
import { ProductFormComponent } from '../component/product-form/product-form.component';
import { ProductDetailComponent } from '../component/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },

  {
    path: 'users',
    component: UserDashComponent
  },

  {
    path:'users/add',
    component:UserFormComponent
  },
  {
    path:'users/:id',
    component:UserDetailComponent
  },
  {
    path:'users/:id/edit',
    component:UserFormComponent
  },
  {
    path:'products',
    component:ProductDashComponent
  },
  {
    path:'products/add',
    component:ProductFormComponent
  },
  {
    path:'products/:id',
    component:ProductDetailComponent
  },
  {
    path:'products/:id/edit',
    component:ProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule { }
