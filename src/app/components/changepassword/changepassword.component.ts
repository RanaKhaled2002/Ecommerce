import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {

  constructor(private _AuthService:AuthService,private _Router:Router,private _ToastrService:ToastrService){}

  MessageError!:string;
  checkCorrectData:boolean = false;

  

  updateForm:FormGroup = new FormGroup({
    currentPassword: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/)]),
    rePassword: new FormControl(null),
  },{validators:[this.checkPassword]} as FormControlOptions);

 
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
    this._AuthService.updatePassword(this.updateForm.value).subscribe({
      next:(data)=>
      {
        if(data.message == "success")
        {
          this.checkCorrectData = false;
          this._ToastrService.success("Password Change Successfully Please Login Again");
          this._Router.navigate(['/login']);
        }
        
      },
      error:(err)=>
      {
        console.log(err);
        this.MessageError=err.error.errors.msg;
        this.checkCorrectData = false;
      }
    })
  }
}
