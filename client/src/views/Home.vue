<template>
  <div class="home" >
    
    <div class="cointainer w-100 pt-5 d-flex flex-column justify-content-center align-items-center">
    <div class='shadow rounded py-4 mt-3 px-3 d-flex flex-column align-items-center'>

    <h1 class="mt-5 pb-1 h4 jet">Is this recyclable? Check it out!</h1>
    <p class="text-muted h5 mb-5 pb-2">Drop a file and you are ready to go...</p>
    <vue-dropzone class="dropper rounded" ref="imgDropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone> 

    

    </div>

    <transition name="fade">
    <Analysis v-bind:score="res"/>
    </transition>
    
  </div>
  </div>
</template>

<script>
  import firebase from "firebase"
  import vue2Dropzone from 'vue2-dropzone'
  import "vue2-dropzone/dist/vue2Dropzone.min.css"
  const uuid = require("uuid");
  import Analysis from "../components/Analysis.vue"
  

  export default {
    name: 'App',
    components: {
      vueDropzone: vue2Dropzone,
      Analysis
    },
    data(){
      return{
          dropzoneOptions: {
            url: "https://httpbin.org/post",
            thumbnailWidth: 100,
            thumbnailHeight: 150,
            addRemovedLinks: false,
            maxFilesize: 10,
            acceptedFiles: ".png, .jpg, .jpg",
            dictDefaultMessage: `
            <span class='h5'>Drop a file.</span> <br><br> <button class='btn btn-success'>Or Browse</button>`,
        },
        res: [],
        
      }
    },
    methods: {
      async afterComplete(file){
        try{
          const imageName = uuid.v1()
          const metaData = {
            contentType: "image/png"
          }

          const storageRef = firebase.storage().ref()
          const imageRef = storageRef.child(`images/${imageName}.png`);

          await imageRef.put(file, metaData)

          const downloadUrl = await imageRef.getDownloadURL()
          

            const response = await fetch(`https://sorter-backend.herokuapp.com/api/${downloadUrl.substr(76)}`, {
              method: 'GET'
            });

            this.res = []
            const myJson = await response.json();  
            this.res.unshift(myJson.images[0].classifiers[0].classes[0]); 
            
          
          this.$refs.imgDropzone.removeFile(file);

          await imageRef.delete()
        }
        catch(e){
          console.error(e)
        }
      },
      
    }
  }
</script>

<style>
#app{
  background-color: #f5f5f5 ;
  height: 100vh;
}
h1{
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
}
.dropper{
  width: 490px;
  height: 200px;
}

.jet{
  font-family: 'JetBrains Mono', sans-serif;
}

</style>
