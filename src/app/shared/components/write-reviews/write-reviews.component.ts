import { Component, Inject, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../core/store/state/app.state';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddComment } from '../../../core/store/actions/product.actions';
import { IProduct } from '../../../core/interfaces/product.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IUserState } from '../../../core/store/state/user.state';
import { userInfo } from '../../../core/store/selectors/user.selectors';
import { ActivatedRoute } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-write-reviews',
  templateUrl: './write-reviews.component.html',
  styleUrls: ['./write-reviews.component.scss']
})
export class WriteReviewsComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<WriteReviewsComponent>);
  stars: number[] = [1, 2, 3, 4, 5];
  selectedStars = 0;
  hoveredStars = 0;
  selectedCard!: IProduct;
  userInfo!: IUserState;

  public formGroup: FormGroup = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { selectedCard: IProduct },
    private store: Store<IAppState>,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.selectedCard = data.selectedCard;
  }

  ngOnInit() {
    this.store.select(userInfo).pipe(untilDestroyed(this)).subscribe(user => {
      this.userInfo = user;
    });
  }

  selectStars(star: number) {
    this.selectedStars = star;
    console.log(this.formGroup.value)
  }

  hoverStars(star: number) {
    this.hoveredStars = star;
  }

  resetHover() {
    this.hoveredStars = 0;
  }

  isStarFilled(star: number): boolean {
    return star <= (this.hoveredStars || this.selectedStars); // отображает золотые звёзды либо по наведению, либо по выбранному количеству
  }

  isFormValid(): boolean {
    return this.selectedStars > 0 && this.formGroup.valid;
  }

  submitReview() {
    if (this.isFormValid()) {
      const comment = {
        text: this.formGroup.value.comment,
        stars: this.selectedStars,
        username: this.userInfo?.name,
        userId: this.userInfo?.id,
      };


      this.store.dispatch(new AddComment({ productId: this.selectedCard.id, comment }));
      this.dialogRef.close();
    }
  }
}
