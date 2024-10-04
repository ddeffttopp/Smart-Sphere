import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoginComponent } from '../../main/auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegComponent } from '../../main/auth/reg/reg.component';
import { Store } from '@ngrx/store';
import { SignOutUser } from '../../core/store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserDataValid = new Subject<boolean>();
  public isUserDataValid$ = this.isUserDataValid.asObservable();

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private store: Store
  ) {
  }

  public setUserDataValid(value: boolean) {
    this.isUserDataValid.next(value);
  }

  public userReg(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/registration', data);
  }

  public userLog(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', data);
  }

  public checkAvailability(data: { username: string, email: string }): Observable<any> {
    return this.http.post('http://localhost:3000/auth/check-availability', data);
  }

  public loginForm() {
    this.dialog.open(LoginComponent, {});
  }

  public registerForm() {
    this.dialog.open(RegComponent, {});
  }

  public signOut() {
    localStorage.removeItem('authToken');
    this.store.dispatch(new SignOutUser());
  }

  generateColor(letter: string): string {
    const charCode = letter.charCodeAt(0);
    let r = (charCode * 17) % 256;
    let g = (charCode * 31) % 256;
    let b = (charCode * 47) % 256;

    const brightness = (r + g + b) / 3;
    if (brightness > 200) {
      r = Math.floor(r * 0.7);
      g = Math.floor(g * 0.7);
      b = Math.floor(b * 0.7);
    }
    return `rgb(${r}, ${g}, ${b})`;
  }
}
