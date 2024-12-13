import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import deleteicon from '../../assets/delete_icon.png'

const ListProduct = ({ url }) => {
    const [list, setProduct] = useState([])

    const fectList = async () => {
        const response = await axios.get(`${url}/upload/list`);

        if (response.data.success) {
            setProduct(response.data.products);
        }
    }

    const ListRemove = async (productId) => {
        const response = await axios.post(`${url}/upload/remove-product`, { id: productId });
        fectList();

        if (response.data.success) {
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        fectList()
    }, [])

    return (
        <div className='list-product'>
            <div className="listProduct-form-main-1">
                <h2>List Product</h2>
                <div className="listProduct-form-main">
                    <p>Product</p>
                    <p>Title</p>
                    <p>Old Price</p>
                    <p>New Price</p>
                    <p>Category</p>
                    <p>Remove</p>
                </div>
                <div className='item-image-main'>
                    <hr />
                    {list.map((item, index) => {
                        return <div key={index} className='item-main-item'>
                            <img src={`${url}/images/` + item.image} alt="" className='image-format' />
                            <p className='name-item'>{item.name.toString().toUpperCase()}</p>
                            <p>${item.old_price.toFixed(2)}</p>
                            <p>${item.new_price.toFixed(2)}</p>
                            <p>{item.category}</p>
                            <p className='remove-btn' onClick={() => ListRemove(item._id)}><img src={deleteicon} /></p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ListProduct
