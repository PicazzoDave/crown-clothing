import { useContext } from 'react';

import { createContext, useState, useEffect } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // If found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // Return new array with modified cartItems/new cart items
    return [...cartItems, {...productToAdd, quantity:1}]
}

export const removeCartItem = (cartItems, cartItemToRemove) => {
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
            ? {...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

export const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: () => false,
    setCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    total: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0) 
        setCartCount(newCartCount); 
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0) 
        setCartTotal(newCartTotal); 
    }, [cartItems]);


    // Will recieve a product based on a product card selection.
    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    };

    const removeItemFromCart = (product) => {
        setCartItems(removeCartItem(cartItems, product));
    };

    const clearItemFromCart = (product) => {
        setCartItems(clearCartItem(cartItems, product));
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
}
