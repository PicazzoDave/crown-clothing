import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import Button from '../button/button.component';

import { ProductCardContainer } from './product-card.styles';

const ProductCard = ( { product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to Cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard;