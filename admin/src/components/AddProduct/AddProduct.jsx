import React, { useEffect, useState } from 'react'
import "./AddProduct.css"
import { assets } from '../../assets/assets'
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ token,url }) => {

    // const { url } = useContext(ShopContext)

    const [image, setImage] = useState(false)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('Women')
    const [new_price, setNew_price] = useState('')
    const [old_price, setold_price] = useState('')
    const [sizes, setSizes] = useState([])

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", name)
        formData.append("category", category)
        formData.append("image", image)
        formData.append("new_price", new_price)
        formData.append("old_price", old_price)
        formData.append("sizes", JSON.stringify(sizes))

        const response = await axios.post(`${url}/upload/add`, formData, { headers: { token } });

        if (response.data.success) {
            toast.success(response.data.message);
            setName('');
            setNew_price('');
            setold_price('');
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (

        <div className='add-product'>
            <h1>Add Form Shooper</h1>
            <hr />
            <form className='flex-col' onSubmit={onSubmit}>
                <div className="productItem-fields">
                    <p>Product Title</p>
                    <input type="text" name='name' onChange={(e) => setName(e.target.value)} value={name} placeholder='Type here' />
                    <p>Price</p>
                    <input type="text" name='old_price' onChange={(e) => setold_price(e.target.value)} value={old_price} placeholder='Type here' />
                    <p>Offert Price</p>
                    <input type="text" name='new_price' onChange={(e) => setNew_price(e.target.value)} value={new_price} placeholder='Type here' />

                    <p>Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} name='category' value={category} className="categoryItem">
                        <option value="Women">Women</option>
                        <option value="Mens">Mens</option>
                        <option value="Kids">Kids</option>
                    </select>
                    <div className='size-item' >
                        <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                            <p className={`${sizes.includes("S") ? 'bg-red-400' : 'bg-slate-200'}`}>S</p>
                        </div>
                        <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                            <p className={`${sizes.includes("L") ? 'bg-red-400' : 'bg-slate-200'}`}>L</p>
                        </div>
                        <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                            <p className={`${sizes.includes("XL") ? 'bg-red-400' : 'bg-slate-200'}`}>XL</p>
                        </div>
                        <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev, 'XXL'])}>
                            <p className={`${sizes.includes("XXL") ? 'bg-red-400' : 'bg-slate-200'}`}>XXL</p>

                        </div>
                    </div>
                </div>
                <div className="add-product-itemField">
                    <label htmlFor="file-input">
                        <img src={image ? URL.createObjectURL(image) : assets.upload} className='add-product-image' alt="ddddd" />
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" name='image' id='file-input' hidden />
                    </label>
                </div>
                <button type='submit' className='btn-add'>ADD PRODUCT</button>
            </form >
        </div >
    )
}

export default AddProduct
