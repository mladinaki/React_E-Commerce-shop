import { createContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const url = 'http://localhost:4000';
    const currency = "$"
    const title = "Paynament Method"

    const [all_product, setAll_product] = useState([]);
    const [token, setToken] = useState("");
    const [cartItems, setCartItems] = useState({});

    const getList = async () => {
        const result = await axios.get(url + '/upload/list');
        setAll_product(result.data.products);
    }

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select a size to add to cart');
            return;
        }
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {

            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] -= 1
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData);

        if (token) {
            await axios.post(url + "/shoop/cart", { itemId, size }, { headers: { token } });
            toast.success("Successfully added to cart!");
        }
    }

    const cartTotalAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let result = all_product.find((product) => product._id === items);
            for (const item in cartItems[items]) {

                if (cartItems[items][item] > 0) {
                    totalAmount += result.new_price * cartItems[items][item];
                }
            }
        }
        return totalAmount
    }

    const updateCartItems = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            await axios.post(url + '/shoop/update', { itemId, size, quantity }, { headers: { token } });
        }
    }

    const removeToCart = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        if (cartData[itemId][size] > 0) {
            cartData[itemId][size] -= 1
        }

        if (token) {
            await axios.post(url + '/shoop/remove-cart', { itemId, size, quantity }, { headers: { token } });

        }

        setCartItems(cartData);
        toast.error('Successfully removed from cart!');
    }

    const loadData = async (token) => {
        if (token) {
            const response = await axios.post(url + "/shoop/get", {}, { headers: { token } });
            setCartItems(response.data.cartData);
        }
    }

    const getTotlCartItem = () => {
        let amountShop = 0;

        for (const items in cartItems) {
            for (const item in cartItems[items]) {

                if (cartItems[items][item] > 0) {
                    amountShop += cartItems[items][item];
                }
            }
        }
        return amountShop
    }

    async function dataItemLoaded() {

        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            await loadData(localStorage.getItem('token'));
            // getTotlCartItem(localStorage.getItem('token'));
        }
    }

    useEffect(() => {
        getList();
        dataItemLoaded();
    }, []);

    const contextValue = {
        getTotlCartItem,
        cartTotalAmount,
        url,
        token,
        setToken,
        cartItems,
        currency,
        title,
        all_product,
        addToCart,
        setCartItems,
        removeToCart,
        updateCartItems,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider