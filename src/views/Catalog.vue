<template>
  <div class="container">
    <!-- Banner -->
    <div class="mt-4" style="height:425px;">
      <div class="jumbotron d-flex align-items-end" style="padding-bottom: 40px; padding-left: 30px; height:100% ; background-position: center; border-radius:10px;" >
        <div class="container for-about" id="banner">
          <p>Movie of the moment </p>
          <h3>Fast and Furious Presents: Hobbs and Shaw</h3>
          <h5>Lawman Luke Hobbs and outcast Deckard Shaw form an unlikely alliance when a cyber-genetically enhanced villain threatens the future of humanity.</h5>
          <p id="generos">Action, Adventure and Thriller</p>
          <p>Duration 2h 17min</p>
          <div>
            <button>IMDb 6.5</button>
            <button>Movizz 3.6/5</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Seletor filme/serie -->
    <div class="row">
      <div class="col-md-12 d-flex justify-content-center">
        <div id="movieButton" @click="selectedType=1">
          Movies
        </div>
        <div id="seriesButton" @click="selectedType=2">
          Series
        </div>
      </div>
    </div>
    <!-- se for filme -->
    <div v-if="selectedType==1">
      <h4 class="mt-5">Top Movies</h4>
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
    <!-- se for serie -->
    <div v-else>
      <h4 class="mt-5">Top Series</h4>
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
      <input type="text" id="search" placeholder="Find movies">
      <select name="genre" id="genre">
        <option disabled selected>Gênero</option>
        <option :value=genero v-for="(genero,index) in generos" :key="index">{{genero}}</option>
      </select>
      <select name="year" id="ano">
        <option disabled selected>Ano</option>
      </select>
      <select name="country" id="country">
        <option disabled selected>País</option>
        <option :value=pais v-for="(pais,index) in country_list" :key="index">{{pais}}</option>
      </select>
      
      <button id="highestRanked">Highest ranked</button> 
      <button id="mostViewed">Most viewed</button> 
      <button id="mostRecent">Most recent</button> 
      <button id="alphabetic">Alphabetic</button> 
    </div>
    <!-- mostrar todos os filmes -->
    <div v-if="selectedType==1">
      <div class="row mt-3">
        <div class="col-md-12 mt-3 d-flex flex-wrap" id="allmovies">
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 d-flex flex-wrap justify-content-center">
          <div class="col-md-2" v-for="(filme,index) in mostrar" :key="index">
            {{filme}}
          </div>
          <p @click="mostrar+=12">Load More</p>
        </div>
      </div>
    </div>
    <!-- mostrar todas as series -->
    <div v-if="selectedType==2">
      <div class="row mt-3">
        <div class="col-md-2 mt-3">
          <img class="w-100"> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedType:1,
        country_list : ["Yemen","Zambia","Zimbabwe"],
        generos:["Ação", "Ficção", "Romance"],
        mostrar:12,
      }
    },
    methods: {
    },
    mounted () {
      for(let i=1985;i<=2022;i++){
        document.getElementById("ano").innerHTML +=` ${i}`
      }
      
      if (this.selectedType==1){
          document.getElementById("movieButton").style.color = "orange"
          document.getElementById("movieButton").style.cursor = "pointer"
          document.getElementById("seriesButton").style.color = "white"
          document.getElementById("seriesButton").style.cursor = "pointer"
      };
    },
    watch: {
      selectedType() {
        if (this.selectedType==1){
          document.getElementById("movieButton").style.color = "orange"
          document.getElementById("seriesButton").style.color = "white"
        }
        else{
          document.getElementById("seriesButton").style.color = "orange"
          document.getElementById("movieButton").style.color = "white"
        }
      }
    },
  }

</script>
<style scoped>
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
#genre,#country, #ano, #highestRanked, #mostViewed, #mostRecent, #alphabetic{
    background-color: #ffffff14;
    border: none;
    width: auto;
    margin-left: 10px;
    height: 63%;
    border-radius: 20px;
    color: white;
}
.jumbotron {
  background-image: url("../assets/bannerFilmes.png");
  background-size: cover;
}
#movieButton{
  padding: 10px 20px;
  border-bottom: 2px solid;
  margin-right: 30px;
}
#seriesButton{
  padding: 10px 20px;
  margin-left: 30px;
  border-bottom: 2px solid;
}
#banner div button:first-of-type{
  transition: 0.5s;
  background-color: #E2B616;
  color: #020916;
  border-radius:3px;
  padding:3px 10px;
  border: none;
}
#banner div button:last-of-type{
  transition: 0.5s;
  background: rgba(255, 255, 255, 0.2); 
  color: #020916;
  border-radius:3px;
  padding:3px 10px;
  margin-left: 10px;
  border: none;
}
</style>
