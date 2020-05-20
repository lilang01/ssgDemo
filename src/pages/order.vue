<template>
  <div>
    home
      <order-header></order-header>
      <router-view></router-view>
  </div>
</template>

<script>
import OrderHeader from "./../components/OrderHeader"
export default {
    name:'order',
    components:{
      OrderHeader
    }
}
</script>