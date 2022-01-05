<template>
  <div class="catalog">
    <div class="container">
      <div class="mt-4">
         <!-- Banner -->
        <b-row class="mt-5" >
          
          <b-col cols="12" md="12" id="banner">
            <img class="w-100" src="../assets/bannerFilmes.png" alt="">
            <p>Movie of the moment </p>
            <h3>Fast and Furious Presents: Hobbs and Shaw</h3>
            <h5>Lawman Luke Hobbs and outcast Deckard Shaw form an unlikely alliance when a cyber-genetically enhanced villain threatens the future of humanity.</h5>
            <p id="generos">Action, Adventure and Thriller</p>
            <p>Duration 2h 17min</p>
            <div>
              <button>IMDb 6.5</button>
              <button>Movizz 3.6/5</button>
            </div>
          </b-col>
          
        </b-row>
        <b-row class="justify-content-center">
          <div class="d-flex">
            <div id="movieButton" @click="selectedType=1">
              Movies
            </div>
            <div id="seriesButton" @click="selectedType=2">
              Series
            </div>
          </div>
        </b-row>
      </div>
      <!-- se for filme -->
      <div v-if="selectedType==1">
        <h4 class="mt-5">Top Movies</h4>
        <b-row id="topQuizzes" class="mt-3">
          <b-col md="2" sm="4"  cols="6">
            <img class="w-100" id="aa" @mouseover="hover=true" @mouseleave="hover=false" src="../assets/lacasa.png" >
          </b-col>
          <b-col md="2" sm="4"  cols="6">
            <img class="w-100" src="../assets/lacasa.png" alt="">
          </b-col>
          <b-col md="2" sm="4"  cols="6">
            <img class="w-100" src="../assets/lacasa.png" alt="">
          </b-col>
          <b-col md="2" sm="4"  cols="6">
            <img class="w-100" src="../assets/disney_quiz.png" alt="">
          </b-col>
          <b-col md="2" sm="4" cols="6">
            <img class="w-100" src="../assets/disney_quiz.png" alt="">
          </b-col>
          <b-col md="2" sm="4"  cols="6">
            <img class="w-100" src="../assets/disney_quiz.png" alt="">
          </b-col>
        </b-row>
      </div>
      <!-- se for serie -->
      <div v-else>
        <h4 class="mt-5">Top Series</h4>
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
        <b-row id="topQuizzes" class="mt-3">
          <b-col cols="2" v-for="(movie,index) in movies" :key="index" class="mt-3">
            <img class="w-100" :src=movie.image >
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
      selectedType:1,
      quantidadeAMostrar:2,
      country_list : ["Yemen","Zambia","Zimbabwe"],
      generos:["Ação", "Ficção", "Romance"],
      movies: [
          {image:image2, title:"Fast and Furious", year:2005}, 
          {image:image1, title:"Fast and Furious", year:2005},
          {image:image2, title:"Fast and Furious", year:2005},
          {image:image2, title:"Fast and Furious", year:2005}, 
          {image:image1, title:"Fast and Furious", year:2005},
          {image:image2, title:"Fast and Furious", year:2005},
          {image:image2, title:"Fast and Furious", year:2005}, 
          {image:image1, title:"Fast and Furious", year:2005},
          {image:image2, title:"Fast and Furious", year:2005},
          {image:image2, title:"Fast and Furious", year:2005},
          {image:image2, title:"Fast and Furious", year:2005}
      ]
    }
  },
  mounted () {
    for(let i=1985;i<=2022;i++){
      document.getElementById("ano").innerHTML +=` <option>${i}</option>`
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

@media (max-width:800px){
  #banner{
    display:none
  }
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
#genre,#country, #ano, #highestRanked, #mostViewed, #mostRecent, #alphabetic{
    background-color: #ffffff14;
    border: none;
    width: auto;
    margin-left: 10px;
    height: 63%;
    border-radius: 20px;
    color: white;
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
#banner p:first-of-type{
  position: absolute;
  top: 70px;
  opacity: 70%;
  left: 50px;
  color: white;
}
#banner #generos{
  opacity: 70%;
  position: absolute;
  top: 200px;
  left: 50px;
  color: white;
}
#banner p:last-of-type{
  opacity: 70%;
  position: absolute;
  top: 225px;
  left: 50px;
  color: white;
}
#banner h3{
  position: absolute;
  top: 100px;
  left: 50px;
  color: white;
  font-size:35px;
}
#banner h5{
  margin-top:10px;
  position: absolute;
  top: 140px;
  left: 50px;
  color: white;
  font-size:18px;
}
#banner div button:first-of-type{
  transition: 0.5s;
  position: absolute;
  top: 280px;
  left: 50px;
  background-color: #E2B616;
  color: #020916;
  border-radius:3px;
  padding:3px 10px;
  border: none;
  opacity: 100%;
}
#banner div button:last-of-type{
  transition: 0.5s;
  position: absolute;
  top: 280px;
  left: 150px;
  color: white;
  background: rgba(255, 255, 255, 0.2); 
  border-radius:3px;
  padding:3px 10px;
  border: none;
  opacity: 100%;
}

</style>
