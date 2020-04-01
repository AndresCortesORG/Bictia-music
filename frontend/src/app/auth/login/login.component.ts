import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin(form): void {
    if (form.value.email && form.value.password) {
      this.authService.login(form.value).subscribe(res => {
       this.router.navigateByUrl('/escritorio');
      }, ({error}) => {
        alert(error.message);
      });
    } else {
      alert('Datos vacios');
    }
  }
}
