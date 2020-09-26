<template>
  <div class="home" >
    
    <div class="cointainer w-100 pt-5 d-flex justify-content-center align-items-center">
    <div class='shadow rounded py-4 mt-3 px-3 d-flex flex-column align-items-center'>

    <h1 class="mt-5 pb-1 h4 jet">Is this recyclable? Check it out!</h1>
    <p class="text-muted h5 mb-5 pb-2">Drop a file and you are ready to go...</p>
    <vue-dropzone class="dropper rounded" ref="imgDropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone> 

    

    </div>

    <div class="result-container" v-if="this.res.length > 0">
      
        <div class="result-name">{{this.res[0].class}}</div>
        <div class="result-score">{{this.res[0].score}}</div>
      
    </div>
  </div>
  </div>
</template>

<script>
  import firebase from "firebase"
  import vue2Dropzone from 'vue2-dropzone'
  import "vue2-dropzone/dist/vue2Dropzone.min.css"
  const uuid = require("uuid");
  

  export default {
    name: 'App',
    components: {
      vueDropzone: vue2Dropzone,
      
    },
    data(){
      return{
        images: [],
        dropzoneOptions: {
          url: "https://httpbin.org/post",
          thumbnailWidth: 100,
          thumbnailHeight: 150,
          addRemovedLinks: false,
          maxFilesize: 0.5,
          acceptedFiles: ".png, .jpg, .jpg",
          dictDefaultMessage: `
           <span class='h5'>Drop a file.</span> <br><br> <button class='btn btn-success'>Or Browse</button>`,
        },
        res: []
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
          

            const response = await fetch(`http://localhost:3030/api/${downloadUrl.substr(76)}`, {
              method: 'GET'
            });

            this.res = []
            const myJson = await response.json();  
            this.res.unshift(myJson.images[0].classifiers[0].classes[0]); 
            
          this.images.push({src: downloadUrl})
          this.$refs.imgDropzone.removeFile(file)
        }
        catch(e){
          console.error(e)
        }
      }
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
.result-container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-radius: 4px;
  width: 500px;
  margin: 20px auto;
  padding: 1em;
  box-shadow: 2px 2px 3px rgba(10, 10, 10, 0.4), -2px -2px 2px rgba(10, 10, 10, 0.3);
}
.result-name{
  font-family: 'Montserrat', sans-serif;
  font-size:20px;
}
.result-score{
  font-family: 'Montserrat', sans-serif;
  font-size:20px;
  font-weight: bolder;
  color: rgb(95, 250, 95);
}
.jet{
  font-family: 'JetBrains Mono', sans-serif;
}

</style>
