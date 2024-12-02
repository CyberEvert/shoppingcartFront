<template>
  <form @submit.prevent="onSubmit" class="form-container">
    <div class="input-group">
      <input v-model="newProduct.name" placeholder="Product" class="form-control form-input" required />
      <input v-model.number="newProduct.price" placeholder="Price" class="form-control form-input" required />
      <input v-model.number="newProduct.quantity" type="number" placeholder="Qty" class="form-control form-input" required />
    </div>
    <button class="btn add-btn">Add</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newProduct: {name: "", price: 0, quantity: 1},
    };
  },
  methods: {
    onSubmit() {
      this.$emit("add-product", this.newProduct);
      this.newProduct = {name: "", price: 0, quantity: 1}; // Reset form
    },
  },
};
</script>

<style scoped>
from {
  margin-bottom: 0;
}
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.input-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem; /* Space between inputs */
}

.form-input {
  flex: 1;
  font-size: 1.1rem;
  border-radius: 8px;
  padding: 0.8rem;
}

.add-btn {
  background-color: #7dadc8;
  color: #000000;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  margin-top: 1rem;
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

/* Responsive Design for smaller screens */
@media (max-width: 600px) {
  .form-container {
    padding: 10px;
  }

  .input-group {
    flex-direction: column; /* Stack inputs vertically on small screens */
  }

  .form-input {
    width: 100%;
  }

  .add-btn {
    width: 100%;
  }
}
</style>
