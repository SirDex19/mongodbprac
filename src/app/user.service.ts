import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { map } from 'rxjs/operators' 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseURL = 'http://localhost:3000/api/actionitems';


  constructor(private http: HttpClient) { 
    
  } 
  
  getActionItems = () => {
    console.log('get action-items')
    return this.http.get<{ message: string; documents: any }>(
      `${this.baseURL}`+ "/getActionItems",
      { observe: 'response' }
    );
  };


  addActionItem = (formData: FormData) => {
    console.log(formData);
  
    return this.http.post<any>(this.baseURL + "/saveActionItem", formData, { observe: 'response' });
    // console.log('create ticket');
    // return "create ticket";
  };


  
  updateActionItem = (id:any, user:User) => {
    return this.http.patch<any>(`http://localhost:3000/api/actionitems/editActionItem/${id}`, user, { observe: 'response' });
    // console.log('create ticket');
    // return "create ticket";
  };

  deleteActionItem = (id:number) => {
    return this.http.delete<any>(`http://localhost:3000/api/actionitems/deleteActionItem/${id}`, { observe: 'response' });
    // console.log('create ticket');
    // return "create ticket";
  };



}






//  addUser = (userObj:any ) => {
 

//     return this.http.post<any>(this.baseURL+ "/addUser", userObj, { observe: 'response' });
//     // console.log('create ticket');
//     // return "create ticket";
//   };
// };
  
//   // deleteUser = (id: number) =>
//   // this.http.delete(this.baseURL + '/' + id, { observe: 'response' });

  
//   // updateUser = (data:any, id: any) =>
//   // this.http.put(this.baseURL + '/' + id, data, { observe: 'response' });

// }

