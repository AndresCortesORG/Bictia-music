import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  async updateUser(data) {
    const formData = new FormData();
    formData.set('id', data.id);
    formData.set('avatar', data.avatar);
    formData.set('name', data.name);
    formData.set('email', data.email);

    this.httpClient.post(`${this.authService.AUTH_SERVER}/update-user`, formData)
      .subscribe((res: any) => {
        alert(res.message);
      }, error => {
        console.log(error.error.message);
      });
  }

  updatePassword(data) {
    this.httpClient.post(`${this.authService.AUTH_SERVER}/update-password`, data)
      .subscribe((res: any) => {
        alert(res.message);
      }, error => {
        console.log(error.error.message);
      });
  }
}
