import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',

})
export class LoginPageComponent {

constructor(private authService:AuthService,
  private router:Router
){}

  onLogin():void{
this.authService.login('nadiacrasmussen@gmail.com', '123456')
.subscribe(user=>{
  this.router.navigate(['/'])
})
  }
}
