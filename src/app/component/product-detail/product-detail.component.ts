import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProduct } from 'src/app/model/products';
import { ProdutService } from 'src/app/services/produt.service';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { filter, switchMap } from 'rxjs';
import { __param } from 'tslib';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  prodId!:string
  prodData!:IProduct
  constructor( private _prodService:ProdutService,
    private _route:ActivatedRoute,
    private _router:Router,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
         this._route.params
                  .subscribe((param:Params)=>{
                    this.prodId=param['id']
                    this._prodService.fetchProductById(this.prodId)
                          .subscribe({
                            next:data=>{
                              this.prodData=data
                            },
                            error:err=>{
                              console.log(err)
                            }
                          })
                  })
    
  }

  onRemove(){
    let config=new MatDialogConfig()
    config.data=`Are you want to remove product with id ${this.prodId}`

    let matRef=this.matDialog.open(GetConfirmComponent,config)
    matRef.afterClosed()
      .pipe(
        filter(res=>res),
        switchMap(()=>this._prodService.removeProduct(this.prodId))
      )
      .subscribe({
        next:res=>{
          this._router.navigate(['/products'])
        },
        error:err=>{
          console.log(err)
        }
      })
    
  }

  // onEdit(id:string,canReturnVal:number){
  //   this._router.navigate(['edit'],{
  //     relativeTo:this._route  ,
  //     queryParams:{
  //       canReturn:canReturnVal
  //     }
  //   })
  // }
}
