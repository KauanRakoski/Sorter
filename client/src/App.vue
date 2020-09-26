<template> 

<div class="d-flex flex-column">
  <Header/>
<router-view/>
</div>  
</template>

<script>
import Header from "./components/Header.vue"
export default {
  name: "Index",
  components: {
    Header
  }
}
</script>
<style>

</style>
