<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4" :style="{color: headerColor}">Shopping Cart</h1>

    <form @submit.prevent="addProduct" class="row mb-3">
      <input v-model="newProduct.name" placeholder="Product" class="form-control col" required />
      <input v-model.number="newProduct.price" placeholder="Price" class="form-control col" required />
      <input v-model.number="newProduct.quantity" type="number" placeholder="Qty" class="form-control col" required />
      <button class="btn add-btn col">Add</button>
    </form>

    <table class="table table-dark table-sm">
      <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cartItems" :key="item">
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
        <td>${{ item.price }}</td>
        <td>
          <button @click="removeProduct(item.name)" class="btn btn-danger btn-sm flashy">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>

    <h3 class="mt-4">Total with tax: ${{ cartTotal.toFixed(2) }}</h3>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    api: "http://localhost:8089/api/cart",
    newProduct: { name: "", price: 0, quantity: 1 },
    cartItems: [],
    cartTotal: 0,
    latestProductName: null,
  }),
  methods: {
    fetchCart() {
      axios
          .all([
            axios.get(`${this.api}/get-all-cart-items`).then((res) => (this.cartItems = res.data)),
            axios.get(`${this.api}/total`).then((res) => (this.cartTotal = res.data)),
          ])
          .catch(console.error);
    },
    addProduct() {
      axios
          .post(`${this.api}/add-product`, this.newProduct)
          .then(() => {
            this.latestProductName = this.newProduct.name;
            this.fetchCart();
          })
          .catch(console.error);

      this.newProduct = { name: "", price: null, quantity: null };
    },
    removeProduct(name) {
      axios
          .delete(`${this.api}/delete-product-by-name/${name}`)
          .then(this.fetchCart)
          .catch(console.error);
    },
    clearFlash() {
      this.latestProductName = null;
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
  border-radius: 8px;
  box-shadow: 0 2px 10px rgb(0, 0, 0);
  backdrop-filter: blur(5px); /* Add slight blur effect to make text pop */
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #917373;
  margin-bottom: 10px;
}

form .btn {
  background-color: #120806; /* Deep earthy tones */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form .btn:hover {
  background-color: #353130;
}

/* Table Styling */
.table {
  margin-bottom: 0;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent for readability */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table th {
  background-color: #bdbaba;
  color: #000000;
}

/* Add Button Specific Styles */
.add-btn {
  background-color: #4e6572;
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
}

.add-btn:hover {
  background-color: #3b4c54;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.add-btn:active {
  transform: translateY(1px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 600px) {
  .container {
    padding: 10px;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>