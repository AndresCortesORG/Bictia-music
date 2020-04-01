import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserI} from '../models/user';
import {JwtResponseI} from '../models/jwt-response';
import {tap} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;
  user: any;

  constructor(private httpClient: HttpClient) {
    this.getDataLocalStorage();
  }

  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          // guardar token
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser);
        }
      })
    );
  }

  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
      (res: JwtResponseI) => {
        // guardar token
        this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser);
      })
    );
  }

  logout(): void {
    this.token = '';
    this.user = null;
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("USER_DATA");
  }

  saveToken(token: string, expiresIn: string, user: any): void {
    this.token = token;
    this.user = user;
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    localStorage.setItem("USER_DATA", JSON.stringify(user));
  }

  getDataLocalStorage() {
    this.user = !this.user ? JSON.parse(localStorage.getItem("USER_DATA")) : null;
    this.token = !this.token ? localStorage.getItem("ACCESS_TOKEN") : null;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

}
