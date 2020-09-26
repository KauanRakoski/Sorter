<template>
 <div class="app"> 
<nav class="navbar navbar-expand-lg navbar-light bg-light mt-0">
  <router-link class="navbar-brand" to="/">
      <Logo/>
    </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/" class="nav-link">App</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link" href="#">About</router-link>
      </li>
      </ul>
      
  </div>
</nav>
</div>
</template>

<script>
import Logo from "./Logo.vue"
export default {
  name: 'Header',
  components: {
    Logo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
