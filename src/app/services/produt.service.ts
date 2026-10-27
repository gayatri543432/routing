import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../model/products';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutService {
  Base_url:string=environment.base_url
  products_url=`${this.Base_url}/products.json`
  constructor( private _http :HttpClient) { }

  fetchProducts():Observable<IProduct[]>{
    return this._http.get<IProduct[]>(this.products_url)
        .pipe(
          map(obj=>{
            let prodArr:Array<IProduct>=[]
            for (const key in obj) {
              prodArr.push({
                ...obj[key],
                pid:key
              })
            }
            return prodArr
          })
        )
  }

  fetchProductById(id:string):Observable<any>{
    let get_url=`${this.Base_url}/products/${id}.json`
    return this._http.get(get_url)
  }

  createProduct(data:IProduct):Observable<IProduct>{
    return this._http.post<any>(this.products_url,data)
  }

  updateProduct(data:IProduct):Observable<IProduct>{
    let update_url=`${this.Base_url}/products/${data.pid}.json`
    return this._http.patch<any>(update_url,data)
  }

  removeProduct(id:string):Observable<string>{
    let removeUrl=  `${this.Base_url}/products/${id}.json`
    return this._http.delete<any>(removeUrl)
  }
}
