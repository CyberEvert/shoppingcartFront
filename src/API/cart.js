import axios from "axios";

const api = "http://localhost:8089/api/cart";

// Fetch all cart items and the total
export const fetchCartItems = async () => {
    try {
        const cartItems = await axios.get(`${api}/get-all-cart-items`);
        const cartTotal = await axios.get(`${api}/total`);
        return {
            cartItems: cartItems.data,
            cartTotal: cartTotal.data,
        };
    } catch (error) {
        console.error("Error fetching cart data", error);
        throw error;
    }
};

// Add a product to the cart
export const addProductToCart = async (product) => {
    try {
        await axios.post(`${api}/add-product`, product);
    } catch (error) {
        console.error("Error adding product", error);
        throw error;
    }
};

// Remove a product by name
export const removeProductByName = async (productName) => {
    try {
        await axios.delete(`${api}/delete-product-by-name/${productName}`);
    } catch (error) {
        console.error("Error removing product", error);
        throw error;
    }
};
