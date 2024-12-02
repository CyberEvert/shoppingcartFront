<template>
  <div class="table-container">

    <table class="table table-dark table-striped table-bordered">
      <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cartItems" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
        <td>${{ item.price.toFixed(2) }}</td>
        <td>
          <button @click="onRemove(item.name)" class="btn btn-danger btn-sm flashy">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: Array,
  },
  methods: {
    onRemove(name) {
      this.$emit("remove-product", name);
    },
  },
};
</script>

<style scoped>
.table-container {
  margin-top: 0;
  display: flex;
  justify-content: center; /* Centers the table horizontally */
  align-items: center;     /* Centers the table vertically */
  height: 48vh;           /* Full viewport height */
}

.table {
  width: 80%;              /* Makes the table larger */
  margin-bottom: 0;
  background-color: rgba(140, 140, 140, 0.8); /* Semi-transparent for readability */
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table th, .table td {
  padding: 1rem;           /* Adds padding for better readability */
  text-align: center;      /* Centers the text in the columns */
  font-size: 1.1rem;       /* Slightly increases font size for readability */
}

.table th {
  background-color: #343a40; /* Darker background for the header */
  color: #ffffff;            /* White text in the header */
  font-weight: bold;         /* Bold font for headers */
  text-transform: uppercase; /* Makes the headers uppercase */
}

.table tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Light hover effect for rows */
}

.table button {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table button:hover {
  background-color: #ffffff; /* Slightly darker red for hover effect */
}
</style>
