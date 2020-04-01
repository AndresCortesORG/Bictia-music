import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UsersService} from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: any = {};
  avatar: File;

  constructor(private authService: AuthService, private router: Router, private usersService: UsersService) {
    this.user = this.authService.user;
  }

  onSubmit(form, type: string) {
    switch (type) {
      case 'all':
        this.user.avatar = this.avatar;
        this.usersService.updateUser(this.user);
        break;
      case 'password':
        if (form.value.password2 && form.value.password2r && form.value.password2 === form.value.password2r) {
          this.usersService.updatePassword({password: form.value.password2, id: this.user.id});
        } else {
          alert('Las contraseñas no coinciden.');
        }
        break;
    }
  }

  updateImage(event) {
    this.avatar = event.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = function (e: any) {
      document.querySelector('#preview').setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(this.avatar);
  }

  exit() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

