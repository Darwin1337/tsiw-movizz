<template>
  <div class="home">
    <div class="container">
      <div class="mt-4">
        <b-row align-v="center"> 
          <b-col style="text-align:right; border-right:3px solid #84E296" ><h3 style="color:#84E296;">Movizz<p>Hall of Frame</p></h3></b-col>
          <b-col align-items="center">
            <div class="d-flex align-items-center">
              <b-col>
                <div>
                <img src="../assets/avatar.png" >
                <img src="../assets/coroa.png" style="position: relative;top: -29px;width: 35px;left: -30px;z-index: -1;" >
                <img style="position: relative;top: 19px;width: 20px; left: -46px;" src="../assets/nivel.png" > <span style="position: relative;top: 19px;font-size: 10px;color: black;left: -66px;">45</span>
                <p class="mt-2" style="color:white;">Gonçalo <br><span style="opacity:50%;">Director</span></p>
                </div>
              </b-col>
              <b-col>Antonio</b-col>
              <b-col>Diogo</b-col>
            </div>
          </b-col>
        </b-row>
        <!-- Banner -->
        <b-row class="mt-5" >
          <b-col></b-col>
          <b-col cols="10" id="banner">
            <img class="w-100" src="../assets/banner.png" alt="">
            <p>Quizz of the day</p>
            <h3>Stranger Things</h3>
            <h5>Think you know about the upside down? Think again.</h5>
            <p>10 questions</p>
            <div><router-link :to="{name:''}"><img src="../assets/PLAY.png">  Play</router-link></div>
          </b-col>
          <b-col></b-col>
        </b-row>

        <!-- Top Quizzes -->
        <h4 class="mt-5">Top Quizzes</h4>
        <b-row id="topQuizzes" class="mt-3">
          <b-col cols="2">
            <img class="w-100" id="aa" @mouseover="hover=true" @mouseleave="hover=false" src="../assets/lacasa.png" >
          </b-col>
          <b-col cols="2">
            <img class="w-100" src="../assets/lacasa.png" alt="">
          </b-col>
          <b-col cols="2">
            <img class="w-100" src="../assets/lacasa.png" alt="">
          </b-col>
          <b-col cols="2">
            <img class="w-100" src="../assets/disney_quiz.png" alt="">
          </b-col>
          <b-col cols="2">
            <img class="w-100" src="../assets/disney_quiz.png" alt="">
          </b-col>
          <b-col cols="2">
            <img class="w-100" src="../assets/disney_quiz.png" alt="">
          </b-col>
        </b-row>

        <!-- Top Movies -->
        <h4 class="mt-5">Top Movies</h4>
        <b-carousel controls class="mt-3">
          <b-carousel-slide v-for="(slide,index) in slides" :key="index">
            <template v-slot:img>
              <b-row>
                <b-col cols="12" md="2" class="mb-3" v-for="(imgsrc,index) in slide" :key="index">
                  <b-card :img-src="imgsrc.image" img-top no-body>
                  </b-card>
                </b-col>
              </b-row>
            </template>
          </b-carousel-slide>
        </b-carousel>
        
        <!-- Top Series -->
        <b-row id="topQuizzes" class="mt-3">
          <b-col cols="2">
            <img class="w-100" src="../assets/lacasa.png" alt="">
          </b-col>
          <b-col cols="2">
            <img class="w-100" src="../assets/lacasa.png" alt="">
          </b-col>
          <b-col cols="2">
            <img class="w-100" src="../assets/lacasa.png" alt="">
          </b-col>
          <b-col cols="2">
            <img class="w-100" src="../assets/disney_quiz.png" alt="">
          </b-col>
          <b-col cols="2">
            <img class="w-100" src="../assets/disney_quiz.png" alt="">
          </b-col>
          <b-col cols="2">
            <img class="w-100" src="../assets/disney_quiz.png" alt="">
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
  import image2 from "../assets/disney_quiz.png"
  import image1 from "../assets/lacasa.png"
 
  export default {
    data() {
      return {
        hover: false,
        slides: [
          [
            {image:image2, title:"Fast and Furious", year:2005}, 
            {image:image1, title:"Fast and Furious", year:2005},
            {image:image2, title:"Fast and Furious", year:2005},
            {image:image2, title:"Fast and Furious", year:2005}, 
            {image:image1, title:"Fast and Furious", year:2005},
            {image:image2, title:"Fast and Furious", year:2005}
          ],         
        ]
        
      }
    },
    mounted () {
      if(this.slides.length<2){
        document.getElementsByClassName("carousel-control-prev")[0].style.visibility = "hidden";
        document.getElementsByClassName("carousel-control-next")[0].style.visibility = "hidden";
      };
    },
    watch: {
      hover() {
        if (this.hover) {
          document.getElementById("aa").src=image2
        }
        else{
           document.getElementById("aa").src=image1
        }
      }
    },
    methods: {
      
    },
  }
</script>

<style scoped>
.card {
  position: relative;
    display: flex !important;
    flex-direction: inherit !important;
    min-width: 0;
    height: 240.63px;
    height: 100%;
    min-height: 240.63px;
    word-wrap: break-word;
    background-color: transparent !important;
    background-clip: border-box !important;
    border: none !important;
    border-radius:  0!important;
}
.carousel-control-prev{
  position: absolute;
  top: -378px !important;
  left: 93% !important;
  justify-content: space-between !important;
}
.carousel-control-next{
  position: absolute;
  top: -378px !important;
  left: 97% !important;
  justify-content: space-between !important;
}
.carousel-indicators > li {
  background-color: black !important;
}
#banner p:first-of-type{
  position: absolute;
  top: 70px;
  opacity: 70%;
  left: 50px;
  color: white;
}
#banner p:last-of-type{
  opacity: 70%;
  position: absolute;
  top: 180px;
  left: 50px;
  color: white;
}
#banner h3{
  position: absolute;
  top: 100px;
  left: 50px;
  color: white;
}
#banner h5{
  position: absolute;
  top: 140px;
  left: 50px;
  color: white;
}
#banner div{
  transition: 0.5s;
  position: absolute;
  top: 220px;
  left: 50px;
  color: white;
  opacity: 70%;
}
#banner div:hover{
  opacity: 100%;
  transition: 0.5s;
}
#banner div img{
  width:25px;
  color: white;
}
</style>
