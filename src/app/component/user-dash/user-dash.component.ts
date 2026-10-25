import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.scss']
})
export class UserDashComponent implements OnInit {
  usersArr:User[]=[]
  constructor( private _service :UsersService) { }

  ngOnInit(): void {
    this.getData()
  }
  trackById(index:number,user:User){
    return user.userId
  }
  getData(){
    this._service.fetchData()
      .subscribe({
        next:res=>{
          this.usersArr=res
        },
        error:err=>{
          console.log(err)
        }
      })
  }
}
