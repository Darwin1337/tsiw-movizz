<template>
  <div>
    <div class="container">
      <div class="mt-4">
        <b-row class="mt-5" >
            
            <b-col cols="8" md="8" id="banner">
              <img class="w-100" src="../assets/banner.png" alt="">
              <p>Quizz of the day</p>
              <h3>Stranger Things</h3>
              <h5>Think you know about the upside down? Think again.</h5>
              <p>10 questions</p>
              <div><router-link :to="{name:''}"><img src="../assets/PLAY.png">  Play</router-link></div>
            </b-col>
            <b-col cols="4" md="4">
              <h5>Top 10 Leaderboard</h5>
              <b-row id="leaderboard">
                <img src="../assets/avatar.png">
                <p>You</p>
                <p>4500 points</p>
                <img src="../assets/nivel.png"><span>30</span>
              </b-row>
            </b-col>
            
          </b-row>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style scoped>
#leaderboard img:last-of-type{
  width:20px;
  height:20px;
}
#leaderboard span{
  position: absolute;
  left: 100%;
  width:20px;
  height:20px;
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

