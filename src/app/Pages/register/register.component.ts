import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUserDTO } from 'src/app/DTOs/Account/RegisterUserDTO';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public RegisterForm: FormGroup;
  constructor(Formbuilder: FormBuilder, private Accountservice: RegisterService) {
    this.RegisterForm = Formbuilder.group({});
  }

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      email: new FormControl(null,
        [
          Validators.required,
          Validators.email
        ]),
      firstName: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      lastName: new FormControl([
        Validators.required,
        Validators.maxLength(100)
      ]),
      password: new FormControl([Validators.required, Validators.maxLength(100)]),
      confirmPassword: new FormControl([Validators.required, Validators.maxLength(100)]),
      address: new FormControl([Validators.required, Validators.maxLength(500)])
    })
  }

  public submitRegisterForm() {
    const regsterdat = new RegisterUserDTO(
      this.RegisterForm.controls.email.value,
      this.RegisterForm.controls.firstName.value,
      this.RegisterForm.controls.lastName.value,
      this.RegisterForm.controls.password.value,
      this.RegisterForm.controls.confirmPassword.value,
      this.RegisterForm.controls.address.value
    )


    this.Accountservice.RegisterUser(regsterdat).subscribe(res => {
      if (res.status === 'Success') {
        this.RegisterForm.reset()
      } else {
        alert("Error In Register")
      }
    })
  }
}




