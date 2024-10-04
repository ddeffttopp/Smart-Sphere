import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Store } from '@ngrx/store';
import { LoginUser } from '../../../core/store/actions/user.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<LoginComponent>);
  public hide = true;
  loginError = false;

  public formGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private authService: AuthService,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.authService.isUserDataValid$.pipe(
      untilDestroyed(this),
    ).subscribe(isUserDataValid => {
      if (isUserDataValid) {
        this.onCloseLogin();
      } else {
        this.loginError = true;
      }
    });

    this.formGroup.valueChanges.pipe(
      untilDestroyed(this),
    ).subscribe(() => {
      this.loginError = false;
    });
  }

  onCloseLogin() {
    this.dialogRef.close();
  }

  onToggleRegister() {
    this.authService.registerForm();
  }

  public submitForm(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(new LoginUser(this.formGroup.value.email, this.formGroup.value.password));
      this.onCloseLogin();
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched() {
    Object.keys(this.formGroup.controls).forEach(control => {
      this.formGroup.get(control)?.markAsTouched();
    });
  }

  public getErrorMessage(controlName: string) {
    if (this.formGroup.get(controlName)?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.formGroup.get(controlName)?.hasError('email') ? 'Not a valid email' : '';
  }
}
