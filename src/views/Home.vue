<template>
  <div class="home">
    <div class="container">
      <div class="mt-4">
        <b-row align-v="center"> 
          <b-col style="text-align:right; border-right:3px solid #84E296" ><h1 style="color:#84E296;">Movizz<p>Hall of Frame</p></h1></b-col>
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
        <b-row class="mt-5" >
          <b-col></b-col>
          <b-col cols="10" id="banner">
            <img class="w-100" src="../assets/banner.png" alt="">
            <p s>Quizz of the day</p>
            <h4>Stranger Things</h4>
            <h5>Think you know about the upside down? Think again.</h5>
            <p>10 questions</p>
            <div><img src="../assets/PLAY.png">  Play</div>
          </b-col>
          <b-col></b-col>
        </b-row>
        <h4>Top Quizzes</h4>
        <b-row id="topQuizzes">
          <b-col cols="2">
            <img class="w-100" src="../assets/disney_quiz.png" alt="">
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

<style>
#banner p,#banner h4,#banner h5,#banner div{
  position: relative;
  top: -220px;
  left: 34px;
  color: white;
}
#banner div img{
  width: 25px;
  margin-right: 5px;
}
body{
  color: white !important;
}
</style>
