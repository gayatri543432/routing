import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  Base_url:string=environment.base_url
  User_url:string=`${this.Base_url}/users.json`
// users: User[] = [

//   {
//     userName: 'Rahul Sharma',
//     userId: 'USR001',
//     userRole: 'Candidate',
//     profileDescription: 'Frontend Developer with experience in Angular and TypeScript.',
//     profileImage: 'https://i.pravatar.cc/300?img=12',
//     skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
//     experienceYears: 3,
//     isActive: true,

//     address: {
//       current: {
//         city: 'Nagpur',
//         state: 'Maharashtra',
//         country: 'India',
//         zipcode: '440001'
//       },

//       permanent: {
//         city: 'Nagpur',
//         state: 'Maharashtra',
//         country: 'India',
//         zipcode: '440001'
//       }
//     },

//     isAddSame: true
//   },


//   {
//     userName: 'Priya Patil',
//     userId: 'USR002',
//     userRole: 'Candidate',
//     profileDescription: 'UI Developer specializing in responsive web applications.',
//     profileImage: 'https://i.pravatar.cc/300?img=47',
//     skills: ['Angular', 'React', 'JavaScript', 'Bootstrap'],
//     experienceYears: 2,
//     isActive: true,

//     address: {
//       current: {
//         city: 'Pune',
//         state: 'Maharashtra',
//         country: 'India',
//         zipcode: '411001'
//       },

//       permanent: {
//         city: 'Nashik',
//         state: 'Maharashtra',
//         country: 'India',
//         zipcode: '422001'
//       }
//     },

//     isAddSame: false
//   },


//   {
//     userName: 'Amit Verma',
//     userId: 'USR003',
//     userRole: 'Admin',
//     profileDescription: 'Application administrator.',
//     profileImage: 'https://i.pravatar.cc/300?img=11',
//     skills: ['Angular', 'TypeScript', 'Node.js'],
//     experienceYears: 5,
//     isActive: true,

//     address: {
//       current: {
//         city: 'Mumbai',
//         state: 'Maharashtra',
//         country: 'India',
//         zipcode: '400001'
//       },

//       permanent: {
//         city: 'Mumbai',
//         state: 'Maharashtra',
//         country: 'India',
//         zipcode: '400001'
//       }
//     },

//     isAddSame: true
//   },


//   {
//     userName: 'Sneha Joshi',
//     userId: 'USR004',
//     userRole: 'Candidate',
//     profileDescription: 'Full Stack Developer looking for new opportunities.',
//     profileImage: 'https://i.pravatar.cc/300?img=44',
//     skills: ['Angular', 'Java', 'Spring Boot', 'MySQL'],
//     experienceYears: 4,
//     isActive: false,

//     address: {
//       current: {
//         city: 'Bangalore',
//         state: 'Karnataka',
//         country: 'India',
//         zipcode: '560001'
//       },

//       permanent: {
//         city: 'Indore',
//         state: 'Madhya Pradesh',
//         country: 'India',
//         zipcode: '452001'
//       }
//     },

//     isAddSame: false
//   }

// ];


  constructor( private _http:HttpClient) { }

  fetchData():Observable<User[]>{
      return this._http.get<any>(this.User_url)
        .pipe(
          map(obj =>{
            let usersArr : Array<User>=[]
            for (const key in obj) {
              usersArr.push({
                ...obj[key],
                userId:key
              })
            }
            return usersArr
          })
        )
  }

  fetchUserById(id:string):Observable<User>{
    let url=`${this.Base_url}/users/${id}.json`
    return this._http.get<User>(url)
   
  }

  createUser(data:User):Observable<User>{
    return this._http.post<User>(this.User_url,data)
    
  }

  updateUser(data: User): Observable<User> {

    let update_url=`${this.Base_url}/users/${data.userId}.json`
    return this._http.patch<User>(update_url,data)
   
  }

  removeUser(id:string){
    let remove_url=`${this.Base_url}/users/${id}.json`
    return this._http.delete<any>(remove_url)
  }
}
