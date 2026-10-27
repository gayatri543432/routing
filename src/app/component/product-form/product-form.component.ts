import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/model/products';
import { ProdutService } from 'src/app/services/produt.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  isInEditMode:boolean=false
  ProductForm!:FormGroup
  editId!:string
  constructor(private _prodService:ProdutService,
    private router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productForm()

    this.onEdit()
  }

  productForm(){
    this.ProductForm=new FormGroup({
        pname:new FormControl(null,Validators.required),
        pstatus:new FormControl('In-Progress'),
        canReturn:new FormControl(null,Validators.required)
    })
  }
  onSubmit(){
    if(this.ProductForm.invalid){
       return this.ProductForm.markAllAsTouched()
    }
    let new_product:IProduct=this.ProductForm.value
    
    this._prodService.createProduct(new_product)
      .subscribe({
        next:res=>{
          this.router.navigate(['/products'])
        },
        error:err=>{
          console.log(err)
        }
      })
  }

  onEdit(){
    this.editId=this._route.snapshot.params['id']
    if (!this.editId) {
      return;
    }
    this._prodService.fetchProductById(this.editId)
      .subscribe({
       next: res=>{
            this.isInEditMode=true
            this.ProductForm.patchValue(res)
        },
        error:err=>{
          console.log(err)
        }
      })
  }

  onUpdate(){
     if(this.ProductForm.invalid){
       return this.ProductForm.markAllAsTouched()
    }
    let update_prod:IProduct={
      ...this.ProductForm.value,
      pid:this.editId
    }
    this._prodService.updateProduct(update_prod)
      .subscribe({
        next:res=>{
          this.router.navigate(['products'])
        },
        error:err=>{

        }
      })
  }
}
