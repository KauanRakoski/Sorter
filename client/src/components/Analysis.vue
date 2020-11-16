<template>
    <transition name="fade"> 
    <div class="result-container shadow" v-if="score.length > 0">

            <div class="result-name">{{ this.classification[score[0].class] }}</div>
            <div 
            :class="score[0].score < 0.75 ? 'red' : 'green'"
            class="result-score">{{this.decimalToPercent(score[0].score)}} certain</div>
        
    </div>
    </transition>
</template>

<script>
export default {
    name: "Analysis", 
    props: {
        score: Array
    },
    data(){
        return{
            classification: {
          "recycl.zip": "Recyclable",
          "compost.zip": "Compost",
          "landfill.zip": "Landfill"

        }
    }},
    methods: {
        decimalToPercent: function(dec){
        let toString = `${dec}`
        let p = `${toString.substr(2, 2)}%`
        return p
      }
    }
}
</script>

<style scoped>
.result-container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-radius: 4px;
  width: 520px;
  margin: 20px auto;
  padding: 1em;
}
.result-name{
  font-family: 'Montserrat', sans-serif;
  font-size:20px;
}
.result-score{
  font-family: 'Montserrat', sans-serif;
  font-size:20px;
  font-weight: bolder;
  
}
.green{
    color: rgb(95, 250, 95);
}
.red{
    color: #EF5151; 
}
.fade-enter-active, .fade-leave-active {
  transition: all 500ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px)
}
</style>