import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Store } from '@ngrx/store';
import { RegisterUser } from '../../../core/store/actions/user.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<RegComponent>)
  public hide = true;
  regError = '';

  public formGroup: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
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
        this.onCloseRegister();
      }
    });

    this.formGroup.valueChanges.pipe(
      untilDestroyed(this),
    ).subscribe(() => {
      this.regError = '';
    });
  }

  onCloseRegister() {
    this.dialogRef.close();
  }

  onToggleLogin() {
    this.authService.loginForm();
  }

  public submitForm(): void {
    if (this.formGroup.valid) {
      const { username, email, password } = this.formGroup.value;

      this.authService.checkAvailability({ username, email }).subscribe(response => {
        if (!response.available) {
          this.regError = response.message;
        } else {
          this.store.dispatch(new RegisterUser(username, email, password));
          this.onCloseRegister();
        }
      });

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
