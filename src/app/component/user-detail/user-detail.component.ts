import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/services/users.service';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userDetails!:User
  userId!:string
  constructor( private _service :UsersService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _MatDialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.userId=this._route.snapshot.params['id']
    if(this.userId){
      this._service.fetchUserById(this.userId)
        .subscribe({
          next:res=>{
            this.userDetails=res
          },
          error:err=>{
            console.log(err)
          }
        })
    }
  }

  onRemove(){
    let config=new MatDialogConfig()
    config.data=`Are you Sure you want remove User with Id ${this.userId}?`
    let matRef=this._MatDialog.open(GetConfirmComponent,config)
    matRef.afterClosed()
      .pipe(
        tap(res=>console.log(`Before filter`,res)),
        filter(res=>res),
        tap(res=>console.log(`After filter`,res)),

        switchMap(()=>this._service.removeUser(this.userId))
      )
      .subscribe({
        next:res=>{
        this._router.navigate(['/users']);
        },
        error:err=>{
          console.log(err)
        }
      })
        
      
  }
}
