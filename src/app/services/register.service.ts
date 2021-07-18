import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { __values } from 'tslib';
import { CurrentUser } from '../DTOs/Account/CurrentUser';
import { ILogingUser } from '../DTOs/Account/ILoginUserAccount';
import { LoginUserDTO } from '../DTOs/Account/LogingUserDTO';
import { RegisterUserDTO } from '../DTOs/Account/RegisterUserDTO';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  private CurrentUser: BehaviorSubject<CurrentUser|null> = new BehaviorSubject<CurrentUser|null>(null);

  constructor(private http: HttpClient) { }

  public SetCurrentUser(CurrentUser: CurrentUser) {
    return this.CurrentUser.next(CurrentUser);
  }

  public getCurrentUser() {
    return this.CurrentUser;
  }
  RegisterUser(registerData: RegisterUserDTO): Observable<any> {
    return this.http.post("/api/Account/Register", registerData)
  }

  LoginUser(logingData: LoginUserDTO): Observable<ILogingUser> {
    return this.http.post<ILogingUser>('/api/Account/login', logingData)
  }
}
