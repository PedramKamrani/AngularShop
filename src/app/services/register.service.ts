import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUserDTO } from '../DTOs/Account/RegisterUserDTO';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }


  RegisterUser(registerData:RegisterUserDTO):Observable<any>
  {
    return this.http.post("/api/Account/Register",registerData)
  }
}
