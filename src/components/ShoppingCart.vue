<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4" :style="{color: headerColor}">Shopping Cart</h1>

    <form @submit.prevent="addProduct" class="row mb-3">
      <input v-model="newProduct.name" placeholder="Product" class="form-control col" required />
      <input v-model.number="newProduct.price" placeholder="Price" class="form-control col" required />
      <input v-model.number="newProduct.quantity" type="number" placeholder="Qty" class="form-control col" required />
      <button class="btn btn-primary col">Add</button>
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
.container {
  background-image: url('data:image/png;base64,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'); /* Example image URL */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 145px;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.table {
  background-color: rgb(0, 0, 0);
  border-radius: 13px;
}
.flashy {
  animation: flash 1s ease-out;
}

@keyframes flash {
  from {
    background-color: #ffe903;
  }
  to {
    background-color: transparent;
  }
}
</style>
