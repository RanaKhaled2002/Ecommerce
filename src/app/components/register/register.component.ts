import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService,private _Router:Router){}

  MessageError!:string;
  checkCorrectData:boolean = false;

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}/)]),
  },{validators: [this.checkPassword] } as FormControlOptions);

  checkPassword(group:FormGroup)
  {
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if(rePassword?.value=='')
    {
      rePassword.setErrors({required:true});
    }
   else if(password?.value != rePassword?.value)
    {
      rePassword?.setErrors({misMatch:true});
    }
  }


  submit()
  {
    this.checkCorrectData = true;
    console.log(this.registerForm.value);
    this._AuthService.registerData(this.registerForm.value).subscribe({
      next:(data)=>
      {
        this.checkCorrectData = false;
        if(data.message == "success")
        {
          localStorage.setItem("userToken",data.token)
          this._AuthService.decodeToken();
          this._Router.navigate(['/home']);
        }
        
      },
      error:(err)=>
      {
        this.MessageError=err.error.message;
        this.checkCorrectData = false;
      }
    })
  }
}
