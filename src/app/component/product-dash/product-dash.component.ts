import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/model/products';
import { ProdutService } from 'src/app/services/produt.service';

@Component({
  selector: 'app-product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.scss']
})
export class ProductDashComponent implements OnInit {
  prodArr:IProduct[]=[]
  constructor( private _prodService: ProdutService) { }

  ngOnInit(): void {
    this.getProducts()
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
