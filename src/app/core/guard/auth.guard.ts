import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  
  let _Router:Router = inject(Router);
  let _DataService:AuthService = inject(AuthService);


  if(localStorage.getItem("userToken")==null)
  {
    _Router.navigate(['/login']);
    return false;
  }
  else
  {
    _DataService.decodeToken();
    return true;
  }
};
