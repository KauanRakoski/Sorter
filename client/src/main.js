import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'

Vue.config.productionTip = false

var firebaseConfig = {
    
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

window.addEventListener('load', function(){
  new Vue({
    render: h => h(App),
  }).$mount('#app') 
})

