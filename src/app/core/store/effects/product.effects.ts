import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of, switchMap } from 'rxjs';
import {
  AddComment,
  AddCommentSuccess,
  DeleteComment,
  DeleteCommentSuccess,
  EProductActions,
  GetProduct,
  GetProductSuccess
} from '../actions/product.actions';
import { ProductsService } from '../../../shared/services/products.service';
import { CommentService } from '../../../shared/services/comment.service';

@Injectable()
export class ProductEffects {
  getProduct = createEffect(() => this.actions$.pipe(
    ofType<GetProduct>(EProductActions.GetProduct),
    switchMap(() => this.productService.getProducts()),
    switchMap((res) => of(new GetProductSuccess(res)))
  ));

  addComment$ = createEffect(() => this.actions$.pipe(
    ofType<AddComment>(EProductActions.AddComment),
    switchMap(action => combineLatest(of(action), this.commentService.addComment(action.payload.productId, action.payload.comment))),
    switchMap(([action, res]) =>
      of(new AddCommentSuccess({ productId: action.payload.productId, comment: res })))
  ));

  deleteComment$ = createEffect(() => this.actions$.pipe(
    ofType<DeleteComment>(EProductActions.DeleteComment),
    switchMap(action => combineLatest(of(action), this.commentService.deleteComment(action.payload.productId, action.payload.commentId))),
    switchMap(([action]) =>
      of(new DeleteCommentSuccess({ productId: action.payload.productId, commentId: action.payload.commentId })))
  ));

  constructor(
    private productService: ProductsService,
    private commentService: CommentService,
    private actions$: Actions,
  ) {
  }
}
