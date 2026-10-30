import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { IProduct } from 'src/app/model/products';
import { ProdutService } from 'src/app/services/produt.service';

@Component({
  selector: 'app-product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.scss']
})
export class ProductDashComponent implements OnInit {
  prodArr:IProduct[]=[]
  constructor( private _prodService: ProdutService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.getProducts()
    
      this._router.events.pipe(
    filter(event =>
      event instanceof NavigationEnd &&
      event.urlAfterRedirects === '/products'
    )
  ).subscribe(() => {
    this.getProducts();
  });
    
  }

  getProducts(){

    this._prodService.fetchProducts()
      .subscribe({
        next:data=>{
          this.prodArr=data
        },
        error:err=>{
          console.log(err)
        }
      })
      
  }
  
}
