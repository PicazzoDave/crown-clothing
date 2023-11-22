import { createContext, useState, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils.js';

const addCartItem = (cartItems, productToAdd) => {
    
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // If found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // Return new array with modified cartItems/new cart items
    return [...cartItems, {...productToAdd, quantity:1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // Check if the quantity equals to 1, if so then remove from cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    // Return back cartitems with matching cart item
    return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id
        // Returns new object with reduced quantity
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
  };

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

// Reducer updates the state
const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`unhandled type ${type} in cartReducer`);
    }
};

const clearCartItem = (cartItems, cartItemToClear) => 
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
  });

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(
            cartReducer, 
            INITIAL_STATE
        );

    const updateCartItemsReducer = (cartItems) => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
    
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        const payload = {
            cartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal,
        };
    
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    };

    // Will recieve a product based on a product card selection.
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart,
        clearItemFromCart, 
        cartItems, 
        cartCount, 
        cartTotal,
    };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};