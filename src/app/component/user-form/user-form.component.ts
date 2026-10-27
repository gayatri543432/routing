import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  usersForm!:FormGroup
  isInEditMode:boolean=false
  editId!:string
  userInfo!:User
  constructor( private _service:UsersService,
    private _routes:ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.createForm()
  this.enableAdd()
  
  this.patchAdd()
  this.patchUserById()
  
  }



  createForm(){
    this.usersForm=new FormGroup({
      userName: new FormControl(null,[Validators.required]),
      userRole:new FormControl('Admin'),
      profileDescription:new FormControl(null,[Validators.required]),
      profileImage:new FormControl(null,[Validators.required]),
      skills:new FormArray([new FormControl(null,[Validators.required])]),
      experienceYears:new FormControl(null,[Validators.required]),
      isActive:new FormControl(null,[Validators.required]),
      address:new FormGroup({
          current:new FormGroup({
                city:new FormControl(null,[Validators.required]),
                state:new FormControl(null,[Validators.required]),
                country:new FormControl(null,[Validators.required]),
                zipcode:new FormControl(null,[Validators.required])
          }),
          permanent:new FormGroup({
                city:new FormControl(null,[Validators.required]),
                state:new FormControl(null,[Validators.required]),
                country:new FormControl(null,[Validators.required]),
                zipcode:new FormControl(null,[Validators.required])
          })
    })
    ,
     isAddSame:new FormControl({
  value:false,
  disabled: true
})
    })
   

  }

  enableAdd(){
    this.usersForm.get('address.current')?.valueChanges
      .subscribe(val=>{
        if(this.usersForm.get('address.current')?.valid){
          this.usersForm.get('isAddSame')?.enable()
        }else{
          this.usersForm.get('isAddSame')?.disable()
          this.usersForm.get('isAddSame')?.reset(false)

        }
      })
  }

patchAdd(){
  this.usersForm.get('isAddSame')?.valueChanges
    .subscribe(val=>{
      if(val){
        let currAdd=this.usersForm.get('address.current')?.value
        
        this.usersForm.get('address.permanent')?.patchValue(currAdd)
        this.usersForm.get('address.permanent')?.disable()
      }else if(!val && this.userInfo){
        this.usersForm.get('address.permanent')?.enable()
        this.usersForm.get('address.permanent')?.patchValue(this.userInfo.address.permanent)
      }
      else{
        this.usersForm.get('address.permanent')?.reset()
        this.usersForm.get('address.permanent')?.enable()
      }
    })
}

  get skillsArray(){
    return this.usersForm.get('skills')as FormArray
  }

  addSkills(){
      let control=new FormControl(null,[Validators.required])
      this.skillsArray.push(control)
    
  }

  onRemove(i:number){
    this.skillsArray.removeAt(i)
  }
patchUserById(){
  this.editId=this._routes.snapshot.params['id']
  if(this.editId){
    this.isInEditMode=true
    this._service.fetchUserById(this.editId)
      .subscribe({
        next:res=>{
          this.userInfo=res
          this.usersForm.patchValue(res)
           
          this.skillsArray.clear();

          res.skills.forEach((skill: string) => {
            this.skillsArray.push(
              new FormControl(skill, Validators.required)
            );
          });
            this.usersForm.get('isAddSame')?.enable();

          if (res.isAddSame) {
            this.usersForm.get('isAddSame')?.patchValue(true);
            this.usersForm.get('address.permanent')?.disable()
          }
    

        },
        error:err=>{
          console.log(err)
        }
      })
  }
}

  
  onSignUp(){
    if(this.usersForm.invalid){
      this.usersForm.markAllAsTouched()
    }else{
      let newUser={
        ...this.usersForm.getRawValue()
      }
      this._service.createUser(newUser)
        .subscribe({
          next:res=>{
            console.log(res)
            this._router.navigate(['users'])
          },
          error:err=>{
            console.log(err)
          }
        })
      
    }
  }

  onUpdate(){
      if(this.usersForm.invalid){
      this.usersForm.markAllAsTouched()
    }else{
      let updateUser={
        ...this.usersForm.getRawValue(),
        userId:this.editId
      }
      this._service.updateUser(updateUser)
        .subscribe({
          next:res=>{
            this._router.navigate(['users'])

          },
          error:err=>{
            console.log(err)
          }
        })
    }
  }
}
