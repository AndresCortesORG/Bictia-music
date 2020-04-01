import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(form): void {
    if (form.value.name && form.value.email && form.value.password) {
      this.authService.register(form.value).subscribe(res => {
        this.router.navigateByUrl('/auth/login');
      }, ({error}) => alert(error.message));
    } else {
      alert('Datos vacios.');
    }
  }
}
