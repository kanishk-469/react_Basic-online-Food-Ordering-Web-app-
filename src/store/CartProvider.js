import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  //// 1st action
  if (action.type === "ADD_CART_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    
    if (existingCartItem) {
      const updatedItem = {
        // new object where i coppying the existingcartitem but update the amount
        ...existingCartItem,
        amount : existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] =updatedItem;    // picked the old item which we identify in the cart item array and i overrited with this updateditem.
    }  //   above condition when already part of CART items array.
    
    else{
        updatedItems = state.items.concat(action.item);
    }


    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  ///// 2nd action 
  if (action.type === "REMOVE_CART_ITEM") {
    const existingCartItemIndex =  state.items.findIndex( item => item.id === action.id);  
    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount-existingItem.price;
    let updatedItems ;
    if( existingItem.amount === 1){
        updatedItems = state.items.filter( item => item.id !== action.id );
    } else{ 
        const updatedItem ={
            ...existingItem, 
            amount : existingItem.amount - 1 
        }; 

        updatedItems = [...state.items] ;
        updatedItems[existingCartItemIndex] = updatedItem; 
        
    }

    return {
        items: updatedItems,
        totalAmount : updatedTotalAmount,
        };


  }

//// 3rd action 

if (action.type === 'CLEAR') {
  return defaultCartState;
}

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", id: id });      /// removing single item at a time from cart
  };


  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
