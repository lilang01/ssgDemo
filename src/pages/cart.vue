<template>
  <div>
      cart
      <order-header></order-header>
  </div>
</template>

<script>
import OrderHeader from "./../components/OrderHeader"
export default {
    name:'cart',
    components:{
      OrderHeader
    }
}
</script>