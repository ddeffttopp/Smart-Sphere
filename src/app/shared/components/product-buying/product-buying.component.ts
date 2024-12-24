import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../../services/auth.service';
import { IAppState } from '../../../core/store/state/app.state';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'app-product-buying',
  templateUrl: './product-buying.component.html',
  styleUrls: ['./product-buying.component.scss']
})
export class ProductBuyingComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<ProductBuyingComponent>)
  contactDetails = true;
  regError = '';

  formGroup: FormGroup = new FormGroup({
    tel: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    firstName: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(5)])
  });

  constructor(private authService: AuthService, private store: Store<IAppState>,) {
  }

  ngOnInit() {
    this.authService.isUserDataValid$.pipe(
      untilDestroyed(this),
    ).subscribe(isUserDataValid => {
      if (isUserDataValid) {
        this.dialogRef.close();
      }
    });

    this.formGroup.valueChanges.pipe(
      untilDestroyed(this),
    ).subscribe(() => {
      this.regError = '';
    });
  }

  submitForm() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }

  public getErrorMessage(controlName: string) {
    if (this.formGroup.get(controlName)?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.formGroup.get(controlName)?.hasError('email') ? 'Not a valid email' : '';
  }
}
