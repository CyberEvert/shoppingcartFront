<template>
  <div>
    <h3 class="mt-4">Total: ${{ cartTotal.toFixed(2) }}</h3>
    <h4>Tax (22%): ${{ taxAmount.toFixed(2) }}</h4>
    <h3 class="mt-4">Total with tax: ${{ (cartTotal + taxAmount).toFixed(2) }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    cartTotal: Number,
  },
  computed: {
    // Calculate the tax amount (22% of the cartTotal)
    taxAmount() {
      return this.cartTotal * 0.22;
    }
  },
};
</script>

<style scoped>
h3, h4 {
  font-size: 1.5rem;
  color: #191717;
  margin: 10px 0;
}
</style>
