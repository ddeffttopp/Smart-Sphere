import { EProductActions, ProductActions } from '../actions/product.actions';
import { initialProductState } from '../state/products.state';

export const productReducers = (state = initialProductState, action: ProductActions): any => {
  switch (action.type) {
    case EProductActions.GetProductSuccess: {
      const [products, productCount] = action.response;
      return {
        ...state,
        product: products,
        productCount: productCount,
      };
    }
    case EProductActions.AddCommentSuccess: {
      const { productId, comment } = action.payload;
      return {
        ...state,
        product: state.product.map(product =>
          product.id === productId
            ? { ...product, comments: [...product.comments, comment] }
            : product
        )
      };
    }
    case EProductActions.DeleteCommentSuccess: {
      const { productId, commentId } = action.payload;
      return {
        ...state,
        product: state.product.map(product =>
          product.id === productId
            ? {
              ...product,
              comments: product.comments.filter(comment => comment._id !== commentId)
            }
            : product
        )
      };
    }
    default :
      return state;
  }
}
