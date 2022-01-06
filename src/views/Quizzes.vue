<template>
  <div class="container">
    <div class="mt-4">
      <div class="row">
        <div class="col-md-8">
          <div class="jumbotron d-flex align-items-end" style="padding-bottom: 40px; padding-left: 30px; height:100% ; background-position: center;" >
            <div class="container for-about">
              <p>Quizz of the day</p>
              <h3>Stranger Things</h3>
              <h5>Think you know about the upside down? Think again.</h5>
              <p>10 questions</p>
              <div><router-link :to="{name:''}"><img src="../assets/PLAY.png">  Play</router-link></div>
            </div>
          </div>
        </div>
        <div class="col-md-4" style="background: #151e2e; padding: 15px;border-radius: 10px;">
          <h5 style="text-align:center;">Top 10 Leaderboard</h5>
          <div style="overflow: scroll;overflow-x: hidden; max-height: 300px;" id="leaderboardBar">
            <div class="row mt-2 m-0 w-100">
              <div class="col-md-12 d-flex align-items-center justify-content-around leaderboardPlayersBG">
                <img src="../assets/avatar.png">
                <p class="m-0">You</p>
                <p class="m-0">4500 points</p>
                <span class="leaderboardPlayers">30</span>
              </div>
            </div>
            <div class="row mt-2 m-0 w-100">
              <div class="col-md-12 d-flex align-items-center justify-content-around leaderboardPlayersBG">
                <img src="../assets/avatar.png">
                <p class="m-0">You</p>
                <p class="m-0">4500 points</p>
                <span class="leaderboardPlayers">30</span>
              </div>
            </div>
            <div class="row mt-2 m-0 w-100">
              <div class="col-md-12 d-flex align-items-center justify-content-around leaderboardPlayersBG">
                <img src="../assets/avatar.png">
                <p class="m-0">You</p>
                <p class="m-0">4500 points</p>
                <span class="leaderboardPlayers">30</span>
              </div>
            </div>
            <div class="row mt-2 m-0 w-100">
              <div class="col-md-12 d-flex align-items-center justify-content-around leaderboardPlayersBG">
                <img src="../assets/avatar.png">
                <p class="m-0">You</p>
                <p class="m-0">4500 points</p>
                <span class="leaderboardPlayers">30</span>
              </div>
            </div>
            <div class="row mt-2 m-0 w-100" >
              <div class="col-md-12 d-flex align-items-center justify-content-around leaderboardPlayersBG">
                <img src="../assets/avatar.png">
                <p class="m-0">You</p>
                <p class="m-0">4500 points</p>
                <span class="leaderboardPlayers">30</span>
              </div>
            </div>
            <div class="row mt-2 m-0 w-100">
              <div class="col-md-12 d-flex align-items-center justify-content-around leaderboardPlayersBG">
                <img src="../assets/avatar.png">
                <p class="m-0">You</p>
                <p class="m-0">4500 points</p>
                <span class="leaderboardPlayers">30</span>
              </div>
            </div>
             <div class="row mt-2 m-0 w-100">
              <div class="col-md-12 d-flex align-items-center justify-content-around leaderboardPlayersBG">
                <img src="../assets/avatar.png">
                <p class="m-0">You</p>
                <p class="m-0">4500 points</p>
                <span class="leaderboardPlayers">30</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 class="mt-5">Top Quizzes</h4>
          <div class="row" id="topQuizzes">
            <div class="col-md-2 col-sm-4 mt-3">
              <img class="w-100" id="aa" @mouseover="hover=true" @mouseleave="hover=false" src="../assets/lacasa.png" >
            </div>
            <div class="col-md-2 col-sm-4 mt-3">
              <img class="w-100" id="aa" @mouseover="hover=true" @mouseleave="hover=false" src="../assets/lacasa.png" >
            </div>
            <div class="col-md-2 col-sm-4 mt-3">
              <img class="w-100" id="aa" @mouseover="hover=true" @mouseleave="hover=false" src="../assets/lacasa.png" >
            </div>
            <div class="col-md-2 col-sm-4 mt-3">
              <img class="w-100" id="aa" @mouseover="hover=true" @mouseleave="hover=false" src="../assets/lacasa.png" >
            </div>
          </div>
        </div>
        <!-- filtros -->
        <div id="filterBar">
          <input type="text" id="search" placeholder="Find quiz">
          <select name="themes" id="themes">
            <option disabled selected>Themes</option>
            <option :value=theme v-for="(theme,index) in themes" :key="index">{{theme}}</option>
          </select>
          <select name="type" id="type">
            <option disabled selected>Type</option>
             <option :value=type v-for="(type,index) in types" :key="index">{{type}}</option>
          </select>
          
          <button id="mostplayed">Most played</button> 
          <button id="alphabetic">Alphabetic</button> 
        </div>
        <!-- mostrar todos os quizzes -->
        <div>
          <div class="row mt-3">
            <div class="col-md-12 mt-3 d-flex flex-wrap" id="allseries">
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 d-flex flex-wrap justify-content-center">
              <div class="col-md-2" v-for="(filme,index) in mostrar" :key="index">
                {{filme}}
              </div>
              <p style="background-color: #151e2e; padding: 10px 32px; border-radius: 30px;" @click="mostrar+=12">Load More</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        themes : ["Yemen","Zambia","Zimbabwe"],
        types:["Ação", "Ficção", "Romance"],
      }
    },
    methods: {
    },
    mounted () {
     
    },
    watch: {
      
    },
  }

</script>
<style>
.leaderboardPlayersBG{
  background-color: #101622;padding: 7px;width: 95%;border-radius: 12px;
}
#leaderboardBar::-webkit-scrollbar {
  width: 5px;
}
/* Handle */
#leaderboardBar::-webkit-scrollbar-thumb {
  background: #464646; 
  -webkit-border-radius: 10px;
    border-radius: 10px;
}

/* Handle on hover */
#leaderboardBar::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
select > option {
    background-color: white !important;
    color: black !important;
}
select {
  -webkit-appearance: none;
  appearance: none;
}
button {
  padding:0px 15px;
}
select, input{
  padding-left: 10px;
  padding-right: 10px;
}
#filterBar{
  background-color: #151E2E;
  border-radius: 6px;
  height: 60px;
  display: flex;
  margin-top: 26px;
  align-items: center;
  flex-wrap: wrap;
  
}
#search{

    margin-left: 20px;
    background-color: #ffffff14;
    border: none;
    width: auto;
    height: 63%;
    border-radius: 20px;
    color: black;
}
#themes,#type, #mostplayed, #alphabetic{
    background-color: #ffffff14;
    border: none;
    width: auto;
    margin-left: 10px;
    height: 63%;
    border-radius: 20px;
    color: white;
}
.leaderboardPlayers{
  background-color: #BBE1FA;
  border-radius: 65%;
  font-weight: bold;
}
.jumbotron {
  background-image: url("../assets/banner.png");
  background-size: cover;
}
</style>