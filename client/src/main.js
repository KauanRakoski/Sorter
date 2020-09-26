import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
    apiKey: "AIzaSyD_vpGb36FyOoHMuVcbYXkrYRZlZKCD5uU",
    authDomain: "sorterapp1.firebaseapp.com",
    databaseURL: "https://sorterapp1.firebaseio.com",
    projectId: "sorterapp1",
    storageBucket: "sorterapp1.appspot.com",
    messagingSenderId: "549332382017",
    appId: "1:549332382017:web:f024b01db3289fb47031c0",
    measurementId: "G-9JJZ5V8Q3C",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

window.addEventListener('load', function(){
  new Vue({
    render: h => h(App),
  }).$mount('#app') 
})