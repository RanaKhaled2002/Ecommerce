import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService,private _Router:Router){}

   // variabels for login form
   correctData:boolean = false;
   messageError!:string;
   doneMessage!:string;
 
   // variabels for forget form
   passwordCorrectData:boolean = false;
   forgetPasswordError!:string;
   forgetPasswordFlag:boolean = true;
 
   // variabels for verfiy form
   verfiyCorrectData:boolean = false;
   verfiyPasswordError!:string;
   verfiyPasswordFlag:boolean = false;
 
   // variabels for reset form
   resetCorrectData:boolean = false;
   resetPasswordError!:string;
   resetPasswordFlag:boolean = false;
 
   // ========================= Login Form =========================
   loginForm : FormGroup = new FormGroup({
     email:new FormControl(null,[Validators.required,Validators.email]),
     password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/)]),
   });
 
   submit()
   {
     this.correctData = true;
     this._AuthService.loginData(this.loginForm.value).subscribe({
       next:(data)=>
       {
        console.log(data);
         this.correctData = false;
         if(data.message == "success")
         {
           localStorage.setItem("userToken",data.token)
           this._AuthService.decodeToken();
           this._Router.navigate(['/home']);
         }
       },
       error:(err)=>
       {
         this.messageError = err.error.message
         this.correctData = false;
       }
     })
   }
 
   // ========================= Forget Form =========================
   forgetPasswordForm : FormGroup = new FormGroup({
     email:new FormControl(null,[Validators.required,Validators.email]),
   });
 
   forgetPassword()
   {
     this.passwordCorrectData = true;
     this._AuthService.forgetPassword(this.forgetPasswordForm.value).subscribe({
       
       next:(data)=>
       {
         this.passwordCorrectData = false;
         if(data.statusMsg == "success")
         {
           console.log(data.message)
           this.forgetPasswordFlag = false;
           this.verfiyPasswordFlag = true;
         }
       },
       error:(err)=>
       {
         this.forgetPasswordError = err.error.message
         this.passwordCorrectData = false;
       }
     })
   }
 
   // ========================= Verfiy Form =========================
   verfiyPasswordForm : FormGroup = new FormGroup({
     resetCode:new FormControl(null,[Validators.required]),
   });
 
   verfiyPassword()
   {
     this.verfiyCorrectData = true;
     this._AuthService.verfiyPassword(this.verfiyPasswordForm.value).subscribe({
       
       next:(data)=>
       {
         console.log(data);
         this.verfiyCorrectData = false;
         if(data.status== "Success")
         {
           this.verfiyPasswordFlag = false;
           this.resetPasswordFlag = true;
         }
       },
       error:(err)=>
       {
         this.verfiyPasswordError = err.error.message
         this.verfiyCorrectData = false;
       }
     })
   }
 
   // ========================= Reset Form =========================
   resetPasswordForm : FormGroup = new FormGroup({
     email:new FormControl(null,[Validators.required,Validators.email]),
     newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/)]),
   });
 
   resetPassword()
   {
     this.resetCorrectData = true;
     this._AuthService.resetPassword(this.resetPasswordForm.value).subscribe({
       
       next:(data)=>
       {
         if(data.token)
         {
           this.doneMessage = "Done!!";
           this.resetCorrectData = true;
         }
       },
       error:(err)=>
       {
         this.resetPasswordError = err.error.message;
         this.resetCorrectData = false;
       }
     })
   }
}
