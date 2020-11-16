import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import router from './router'

Vue.config.productionTip = false

var firebaseConfig = {
    
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

window.addEventListener('load', function(){
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app') 
})