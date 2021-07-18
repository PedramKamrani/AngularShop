import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrentUser } from 'src/app/DTOs/Account/CurrentUser';
import { LoginUserDTO } from 'src/app/DTOs/Account/LogingUserDTO';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public LoginForm: FormGroup;
  constructor(FormBuilder: FormBuilder, private Accountservice: RegisterService) {
    this.LoginForm = FormBuilder.group({});
  }

  ngOnInit(): void {

    this.LoginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
      ])
    });
  }


  public submitLoginForm() {
    
    if (this.LoginForm.valid) {
      
      const LoginForm = new LoginUserDTO(
        this.LoginForm.controls.email.value,
        this.LoginForm.controls.password.value
      )
      this.Accountservice.LoginUser(LoginForm).subscribe(res => {
       const currentuser =new CurrentUser(res.data.UserId,
        res.data.FirstName,res.data.LostName,
        res.data.Address);
        this.Accountservice.SetCurrentUser(currentuser);
        this.Accountservice.getCurrentUser().subscribe(user=>{
          console.log(user);
          
        })
      })
    }

  }

}
