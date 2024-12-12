import React, { useContext, useEffect, useState } from 'react'
import './ProductDetails.css'
import { ShopContext } from '../contex/ShopContext';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const { productId } = useParams();
    const { addToCart, url, all_product, currency } = useContext(ShopContext);

    const [item, setItem] = useState(false);
    const [size, setSize] = useState('');

    useEffect(() => {

        all_product.map((items) => {
            if (items._id === productId) {
                setItem(items);
                return items;
            }
        })

    }, [productId, all_product])


    return (
        <div className='product-details'>
            <div className="product-details-container-left">
                <div className="productDetailsImage-list">
                    <img src={url + '/images/' + item.image} alt='image' />
                    <img src={url + '/images/' + item.image} alt='image' />
                    <img src={url + '/images/' + item.image} alt='image' />
                </div>
                <div className="productDisplay-image">
                    <img src={url + '/images/' + item.image} alt="" className='productDisplay-main-image' />
                </div>
            </div>
            <div className="productDetails-right">
                <h1>{item.name}</h1>
                <div className="productDisplay-right-start">
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
                <div className="productDisplay-price">
                    <div className="productDisplay-old-price">{currency}{item.old_price}</div>
                    <div className="productDisplay-new-price">{currency}{item.new_price}</div>
                </div>
                <div className="productDisplay-description">
                    <p>Бански костюм от две части в елегантна цветна комбинация.
                        Регулируеми презрамки. Моделът е декориран с воал на бюста.
                        Долнището е тип бикина, може да се носи с висока талия или подвит навън като колан.</p>
                </div>
                <div className="productDisplay-rigth-size">
                    <h1>Select a size</h1>
                    <div className="productDisplay-rigth-size-1">

                        {item.sizes?.map((sizeItem, i) => (
                            <div
                                key={i}
                                onClick={() => setSize(sizeItem)}
                                className={`${sizeItem === size ? 'active' : ''}`}>
                                {sizeItem}
                            </div>
                        ))}

                    </div>
                </div>
                <button onClick={() => addToCart(item._id, size)}>AD TO CARD</button>
                <div className="productDisplay-rigth-category"></div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProductDetails
