<template>
  <div class="container mt-4">
    <h1 class="shopping-cart-title">🛒 Shopping Cart</h1>

    <AddProductForm @add-product="addProduct" />

    <CartTable :cartItems="cartItems" @remove-product="removeProduct" />

    <CartSummary :cartTotal="cartTotal" />

  </div>
</template>

<script>
import { fetchCartItems, addProductToCart, removeProductByName } from "@/API/cart";
import AddProductForm from "@/components/cart/AddProductForm.vue";
import CartTable from "@/components/cart/CartTable.vue";
import CartSummary from "@/components/cart/CartSummary.vue";

export default {
  components: {
    AddProductForm,
    CartTable,
    CartSummary,
  },
  data: () => ({
    cartItems: [],
    cartTotal: 0,
  }),
  methods: {
    async fetchCart() {
      try {
        const { cartItems, cartTotal } = await fetchCartItems();
        this.cartItems = cartItems;
        this.cartTotal = cartTotal;
      } catch (error) {
        console.error("Error fetching cart", error);
      }
    },
    async addProduct(newProduct) {
      try {
        await addProductToCart(newProduct);
        this.fetchCart();
      } catch (error) {
        console.error("Error adding product", error);
      }
    },
    async removeProduct(name) {
      try {
        await removeProductByName(name);
        this.fetchCart();
      } catch (error) {
        console.error("Error removing product", error);
      }
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>

<style scoped>
/* Apply night sky background */
.container {
  background-size: cover;
  background-position: center center;
  background-attachment: fixed; /* Keeps the background fixed when scrolling */
  color: #000000;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(255, 0, 0, 0.1);
  backdrop-filter: blur(5px); /* Add slight blur effect to make text pop */
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 10px;
}
.shopping-cart-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center all elements horizontally */
  padding: 20px;
  gap: 20px; /* Space between header and other components */
}

/* Styling the H1 title */
.shopping-cart-title {
  font-size: 2.5rem; /* Larger font size for emphasis */
  font-family: "Georgia", "Times New Roman", serif; /* Elegant serif font */
  font-weight: bold;
  color: #0078AA; /* Vibrant blue tone */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Soft shadow for depth */
  text-align: center; /* Center text alignment */
  margin: 20px 0; /* Adds spacing around the title */
  letter-spacing: 2px; /* Adds spacing between characters for style */
  background: linear-gradient(45deg, #7ba8bc, #4099b1); /* Gradient background */
  -webkit-background-clip: text; /* Clip background to text */
  -webkit-text-fill-color: transparent; /* Makes the background visible through text */
}
</style>
