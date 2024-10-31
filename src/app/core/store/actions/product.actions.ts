import { Action } from '@ngrx/store';
import { IProductResponse } from '../../interfaces/product.interface';
import { IProductComment } from '../../interfaces/comment.interface';

export enum EProductActions {
  GetProduct = "[Product] Get Product",
  GetProductSuccess = "[Product] Get Product Success",
  GetSingleProduct = "[Product] Get SingleProduct",
  AddComment = "[Product] Add Comment",
  AddCommentSuccess = "[Product] Add Comment Success",
  DeleteComment = "[Product] Delete Comment",
  DeleteCommentSuccess = "[Product] Delete Comment Success"
}

export class GetProduct implements Action {
  public readonly type = EProductActions.GetProduct;
}

export class GetProductSuccess implements Action {
  public readonly type = EProductActions.GetProductSuccess;

  constructor(
    public response: IProductResponse
  ) {
  }
}

export class GetSingleProduct implements Action {
  public readonly type = EProductActions.GetSingleProduct;

  constructor(public product: IProductResponse) {
  }
}

export class AddComment implements Action {
  public readonly type = EProductActions.AddComment;

  constructor(public payload: { productId: string, comment: IProductComment }) {
  }
}

export class AddCommentSuccess implements Action {
  public readonly type = EProductActions.AddCommentSuccess;

  constructor(public payload: { productId: string, comment: IProductComment }) {
  }
}

export class DeleteComment implements Action {
  public readonly type = EProductActions.DeleteComment;

  constructor(public payload: { productId: string; commentId: string }) {
  }
}

export class DeleteCommentSuccess implements Action {
  public readonly type = EProductActions.DeleteCommentSuccess;

  constructor(public payload: { productId: string, commentId: string }) {
  }
}

export type ProductActions =
  GetProduct
  | GetProductSuccess
  | GetSingleProduct
  | AddComment
  | AddCommentSuccess
  | DeleteComment
  | DeleteCommentSuccess;
