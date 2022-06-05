<template>
  <div v-if="!loading.quizzes" class="container">
    <div class="row m-0 mt-4">
      <div class="col-lg-8" style="max-height: 425px;" @click="$router.push({ name: 'Quiz', params: { id: 6 }})">
        <div :class="!webpSupported ? '' : 'webp'" class="jumbotron d-flex align-items-end ps-3 pe-3 pb-5"
          style=" height:100% ; background-position: center; border-radius: 10px;">
          <div class="container for-about">
            <p style="color: var(--cinza2); font-weight: 500;">Quiz of the day</p>
            <h3 style="font-weight: bold;">Stranger Things</h3>
            <h5>Think you know about the upside down? Think again.</h5>
            <p style="color: var(--cinza2); font-weight: bold;">5 questions • Normal difficulty</p>
            <br>
            <div>
              <router-link :to="{name:''}"><img src="../assets/images/play_icon.png" width="25px"
                  height="25px">&nbsp;&nbsp;&nbsp;Play</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 p-3" style="background: var(--azul-escuro); border-radius: 10px; max-height: 425px;">
        <h5 class="text-center">Top {{ data.users.length }} Leaderboard</h5>
        <div style="overflow-y: scroll; overflow-x: hidden; max-height: 300px;" id="leaderboardBar">
          <div style="cursor: pointer;" class="row leaderboard-card m-0 mt-2 me-2 pt-2 pb-2 pe-1 ps-1" v-for="i in data.users.length" :key="i" @click="$router.push({ name: 'Profile', params: { id: data.users[i - 1].id }})">
            <div class="col-2 d-flex justify-content-center align-items-center">
              <div class="position-relative">
                <img v-if="i <= 3" :src="crowns[i - 1]" width="25px"
                  style="position: absolute; top: -11px; left: -7px; transform: rotate(-30deg);">
                <img class="avatar" style="object-fit: cover; object-position: center top;" :src="data.users[i - 1].avatar">
              </div>
            </div>
            <div class="col-4 d-flex justify-content-center align-items-center">{{ data.users[i - 1].first_name }}</div>
            <div class="col-4 d-flex justify-content-center align-items-center"><strong>{{ data.users[i - 1].xp }} XP</strong></div>
            <div class="col-2 d-flex justify-content-center align-items-center">
              <span class="d-flex justify-content-center align-items-center"
                style="font-size: .85em; background-color: var(--azul-claro); color: var(--bg); font-weight: bold; border-radius: 50%; min-width: 25px; min-height: 25px;">{{ data.users[i - 1].stats.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h4 class="mt-5">Top Quizzes</h4>
      <section class="top-quizzes">
        <div class="navigation mb-2">
          <span class="nav-left me-3" @click="simulateScroll('left', '.top-quizzes')"><i
              class="fas fa-chevron-left"></i></span>
          <span class="nav-right ms-3" @click="simulateScroll('right', '.top-quizzes')"><i
              class="fas fa-chevron-right"></i></span>
        </div>
        <div class="carousel-wrapper" style="position: relative;">
          <div class="row-carousel disable-scrollbars">
            <div class="row__inner p-0">
              <div class="tile" v-for="i in data.topQuizzes.length" :key="i">
                <div class="tile__media">
                  <img class="tile__img" :src="webpSupported ? require('../assets/images/content/quiz/' + data.topQuizzes[i - 1].poster_webp) : data.topQuizzes[i - 1].poster" />
                </div>
                <div class="tile__details p-2">
                  <p class="quiz-card-title">{{ data.topQuizzes[i - 1].title }}</p>
                  <p class="quiz-card-play" @click="$router.push({ name: 'Quiz', params: { id: data.topQuizzes[i - 1].quiz_id } })">▶</p>
                  <p class="quiz-card-rating">{{ parseFloat(data.topQuizzes[i - 1].quizz_rating).toFixed(1) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- filtros -->
    <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3 mt-5 mb-3">
      <div class="col-md-12 col-lg-3 col-sm-12">
        <form @submit.prevent="" class="d-flex">
          <div class="input-group">
            <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search" v-model="filters.search">
            <button type="button"><i class="fas fa-search"></i></button>
          </div>
        </form>
      </div>

      <div class="col-md-3 col-lg-2 col-sm-6">
        <select id="difficulty" style="height: 40px;" v-model="filters.difficulty">
          <option disabled value="Difficulty">Difficulty</option>
          <option value="All">All</option>
          <option :value=difficulty.key v-for="(difficulty, index) in difficulties" :key="index">{{ difficulty.value }}</option>
        </select>
      </div>

      <div class="col-md-3 col-lg-2 col-sm-6">
        <select id="theme" style="height: 40px;" v-model="filters.theme">
          <option disabled value="Theme">Theme</option>
          <option value="All">All</option>
          <option :value=theme v-for="(theme, index) in themes" :key="index">{{ theme }}</option>
        </select>
      </div>

      <div class="col-md-3 col-lg-2 col-sm-6">
        <select id="type" style="height: 40px;" v-model="filters.type">
          <option disabled value="Type">Type</option>
          <option value="All">All</option>
          <option :value=type.key v-for="(type, index) in types" :key="index">{{ type.value }}</option>
        </select>
      </div>

      <div class="col-md-3 col-lg-3 col-sm-6">
        <select id="order" style="height: 40px;" v-model="filters.orderby">
          <option disabled value="Order by">Order by</option>
          <option value="Recently added">Recently added</option>
          <option value="Alphabetic (A-Z)">Alphabetic (A-Z)</option>
          <option value="Alphabetic (Z-A)">Alphabetic (Z-A)</option>
          <option value="Best rated">Best rated</option>
          <option value="Worst rated">Worst rated</option>
          <option value="Most played">Most played</option>
          <option value="Least played">Least played</option>
        </select>
      </div>
    </div>
    <!-- mostrar todos os quizzes -->
    <div>
      <div class="row g-3">
        <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="i in filteredQuizzes.length" :key="i">
          <div class="tile-custom">
            <div class="tile__media-custom">
              <img class="tile__img"
                :src="webpSupported ? require('../assets/images/content/quiz/' + filteredQuizzes[i - 1].poster_webp) : filteredQuizzes[i - 1].poster" />
            </div>
            <div class="tile__details-custom p-2 text-center">
              <p class="quiz-card-title">{{ filteredQuizzes[i - 1].title }}</p>
              <p class="quiz-card-play" @click="$router.push({ name: 'Quiz', params: { id: filteredQuizzes[i - 1].quiz_id } })">▶</p>
              <p class="quiz-card-rating">{{ parseFloat(filteredQuizzes[i - 1].quizz_rating).toFixed(1) }}</p>
            </div>
          </div>
        </div>
        <div v-if="filteredQuizzes.length == 0">
          <p>No results were found for the filters applied.</p>
        </div>
      </div>
      <div class="d-flex justify-content-center gap-5 mt-4">
        <div v-for="i in data.totalPages" :key="i" class="page d-flex justify-content-center align-items-center" :class="{ selected: data.currentPage == i }"
          @click="data.currentPage = i">
          <p class="m-0">{{ i }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="d-flex flex-column justify-content-center align-items-center text-center">
    <img src="../assets/images/loading.gif" alt="">
    <h3>We thought this would be faster as well, <span style="color: var(--laranja);">sorry</span>.</h3>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Quizzes",
  data() {
    return {
      webpSupported: true,
      crowns: [require("../assets/images/crown_gold_icon.svg"), require("../assets/images/crown_silver_icon.svg"), require("../assets/images/crown_bronze_icon.svg")],
      themes : ["Movies", "Series", "Actors", "Universes", "Anual", "Platform"],
      types: [
        { key: "short", value: "Short" },
        { key: "long", value: "Long" }
      ],
      difficulties: [
        { key: "normal", value: "Normal" },
        { key: "hard", value: "Hard" }
      ],
      data: {
        users: [],
        topQuizzes: [],
        quizzes: [],
        filterHistory: [],
        totalPages: 1,
        currentPage: 1
      },
      loading: {
        quizzes: true
      },
      filters: {
        search: "",
        difficulty: "Difficulty",
        theme: "Theme",
        type: "Type",
        orderby: "Order by"
      }
    }
  },
  mounted () {
    this.get5Users();
    this.getQuizzes();
  },
  methods: {
    ...mapActions(["getTop5Users", "getAllQuizzes"]),
    isWebpSupported() {
      const elem = document.createElement('canvas');
      if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
      }
      return false;
    },
    simulateScroll(dir, target) {
      if (dir == "right") {
        document.querySelector(target + " .nav-left").style.color = "white";
        if (parseInt(document.querySelector(target + " .row-carousel").scrollLeft) + (parseInt(document.querySelector(target + " .row-carousel").querySelector(".tile").offsetWidth) + 10) >= parseInt(document.querySelector(target + " .row-carousel").scrollWidth) - parseInt(document.querySelector(target + " .row-carousel").clientWidth)) {
          document.querySelector(target + " .row-carousel").scrollLeft = parseInt(document.querySelector(target + " .row-carousel").scrollWidth) - parseInt(document.querySelector(target + " .row-carousel").clientWidth);
          document.querySelector(target + " .nav-right").style.color = "gray";
        } else {
          document.querySelector(target + " .row-carousel").scrollLeft += (parseInt(document.querySelector(target + " .row-carousel").querySelector(".tile").offsetWidth) + 10);
        }
      } else {
        document.querySelector(target + " .nav-right").style.color = "white";
        if (parseInt(document.querySelector(target + " .row-carousel").scrollLeft) - (parseInt(document.querySelector(target + " .row-carousel").querySelector(".tile").offsetWidth) + 10) <= 0) {
          document.querySelector(target + " .row-carousel").scrollLeft = 0;
          document.querySelector(target + " .nav-left").style.color = "gray";
        } else {
          document.querySelector(target + " .row-carousel").scrollLeft -= (parseInt(document.querySelector(target + " .row-carousel").querySelector(".tile").offsetWidth) + 10);
        }
      }
    },
    async get5Users() {
      try {
        this.data.users = await this.getTop5Users();
        if (this.data.users.success) {
          this.data.users = this.data.users.msg;
        } else {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        } 
      } catch (e) {
        this.$router.push({ name: 'Error', params: { '0': 'error' } });
      }
    },
    async getQuizzes() {
      try {
        this.loading.quizzes = true;
        this.data.quizzes = await this.getAllQuizzes();
        if (this.data.quizzes.success) {
          this.data.quizzes = this.data.quizzes.msg;
          this.data.topQuizzes = [...this.data.quizzes];
          this.data.topQuizzes.sort((a, b) => a.quizz_rating < b.quizz_rating && 1 || -1).slice(0, 11);
          this.filterHistory = [...this.data.quizzes];
          this.loading.quizzes = false;
        } else {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        }
      } catch (e) {
        this.$router.push({ name: 'Error', params: { '0': 'error' } });
      }
    },
  },
  computed: {
    filteredQuizzes() {
      let filterResult = [...this.data.quizzes];

      // Barra de pesquisa
      if (this.filters.search != "") {
        filterResult = filterResult.filter(quiz => quiz.title.toLowerCase().includes(this.filters.search.toLowerCase()));
      }

      // Dificuldade
      if (this.filters.difficulty != "All" && this.filters.difficulty != "Difficulty") {
        filterResult = filterResult.filter(quiz => quiz.difficulty.description == this.filters.difficulty);
      }

      // Theme
      if (this.filters.theme != "All" && this.filters.theme != "Theme") {
        filterResult = filterResult.filter(quiz => quiz.theme_id.description == this.filters.theme);
      }

      // Type
      if (this.filters.type != "All" && this.filters.type != "Type") {
        filterResult = filterResult.filter(quiz => quiz.type.description == this.filters.type);
      }

      if (this.filters.orderby != "Recently added" && this.filters.orderby != "Order by") {
        if (this.filters.orderby == "Alphabetic (A-Z)") {
          filterResult = filterResult.sort((a, b) => (a.title < b.title) ? -1 : ((a.title > b.title) ? 1 : 0));
        } else if (this.filters.orderby == "Alphabetic (Z-A)") {
          filterResult = filterResult.sort((a, b) => (a.title > b.title) ? -1 : ((a.title < b.title) ? 1 : 0));
        } else if (this.filters.orderby == "Best rated") {
          filterResult = filterResult.sort((a, b) => (parseFloat(a.quizz_rating) > parseFloat(b.quizz_rating)) ? -1 : ((parseFloat(a.quizz_rating) < parseFloat(b.quizz_rating)) ? 1 : 0));
        } else if (this.filters.orderby == "Worst rated") {
          filterResult = filterResult.sort((a, b) => (parseFloat(a.quizz_rating) < parseFloat(b.quizz_rating)) ? -1 : ((parseFloat(a.quizz_rating) > parseFloat(b.quizz_rating)) ? 1 : 0));
        } else if (this.filters.orderby == "Most played") {
          filterResult = filterResult.sort((a, b) => (parseFloat(a.times_played) > parseFloat(b.times_played)) ? -1 : ((parseFloat(a.times_played) < parseFloat(b.times_played)) ? 1 : 0));
        } else if (this.filters.orderby == "Least played") {
          filterResult = filterResult.sort((a, b) => (parseFloat(a.times_played) < parseFloat(b.times_played)) ? -1 : ((parseFloat(a.times_played) > parseFloat(b.times_played)) ? 1 : 0));
        }  
      }
      this.data.totalPages = Math.ceil(filterResult.length / 12);
      if (JSON.stringify(filterResult) != JSON.stringify(this.data.filterHistory)) {
        // O utilizador mexeu nos filtros portanto forçar a página a ir para a 1
        this.data.currentPage = 1;
      }
      this.data.filterHistory = structuredClone(filterResult);
      return this.data.totalPages == 1 ? filterResult : filterResult.slice((this.data.currentPage - 1) * 12, ((this.data.currentPage - 1) * 12) + 12);
    }
  }
};
</script>

<style scoped>
  .page {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    border: 2px solid var(--laranja);
    border-radius: 50%;
    cursor: pointer;
  }

  .page.selected {
    cursor: default;
    background-color: var(--laranja);
    color: var(--bg);
  }

  select {
    /* Reset */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    outline: 0;
    /* Personalize */
    width: 100%;
    height: 100%;
    padding-left: 10px;
    /* padding: 0 4em 0 1em; */
    background: url("../assets/images/chevron-down-solid.svg") no-repeat right 0.8em center/0.8em, var(--cinza3);
    color: var(--cinza-claro);
    border-radius: 30px;
    box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  select option {
    background-color: white !important;
    color: black !important;
  }
  select:focus {
    outline: none;
  }
  select::-ms-expand {
    display: none;
  }
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
  form ::placeholder {
    color: var(--cinza2);
    opacity: 1;
  }
  form :-ms-input-placeholder {
    color: var(--cinza2);
  }
  form ::-ms-input-placeholder {
    color: var(--cinza2);
  }
  form input {
    border: none;
    outline: none;
    background-color: var(--cinza3);
    border-radius: 35px;
    color: white;
    padding: 10px 15px 10px 15px;
  }
  form button {
    border: none !important;
    background: var(--cinza3);
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
    padding: 0 15px 0 15px;
  }
  form i {
    color: var(--cinza-claro);
  }
  form input,
  form input:focus {
    color: white;
    outline: none !important;
    box-shadow: none;
    background-color: var(--cinza3);
  }
  .leaderboard-card {
    background-color: var(--bg);
    border-radius: 10px;
  }
  #leaderboardBar::-webkit-scrollbar {
    width: 5px;
  }
  #leaderboardBar::-webkit-scrollbar-thumb {
    background: #464646;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
  #leaderboardBar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .leaderboardPlayers {
    background-color: #BBE1FA;
    border-radius: 65%;
    font-weight: bold;
  }
  .jumbotron {
    background-image: url("../assets/images/home_banner.png");
    background-size: cover;
  }
  .jumbotron.webp {
    background-image: url("../assets/images/home_banner.webp");
    background-size: cover;
  }
  a {
    text-decoration: none;
    color: white;
  }
  .carousel-wrapper {
    margin: 0;
    color: #ecf0f1;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
  .carousel-wrapper h1,
  .carousel-wrapper p {
    text-align: center;
  }
  .carousel-wrapper a:link,
  .carousel-wrapper a:hover,
  .carousel-wrapper a:active,
  .carousel-wrapper a:visited {
    transition: color 150ms;
    color: #95a5a6;
    text-decoration: none;
  }
  .carousel-wrapper a:hover {
    color: #7f8c8d;
    text-decoration: underline;
  }
  .row-carousel {
    overflow-x: scroll;
    scroll-behavior: smooth;
    width: 100%;
  }
  .row__inner {
    transition: 450ms transform;
    font-size: 0;
    white-space: nowrap;
    padding-bottom: 10px;
  }
  .tile {
    position: relative;
    display: inline-block;
    max-width: 200px;
    width: 100%;
    margin-right: 10px;
    font-size: 20px;
  }
  .tile-custom {
    position: relative;
    display: inline-block;
    font-size: 20px;
  }
  .tile__media img {
    max-width: 200px;
    width: 100%;
    height: 296.28px;
  }
  .tile__img {
    width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 5px;
  }
  .tile:hover .tile__details,
  .tile-custom:hover .tile__details-custom,
  .row__inner:hover {
    opacity: 1;
  }
  .navigation {
    font-size: 1.5em;
    color: white;
    display: flex;
    justify-content: flex-end;
  }
  .nav-left {
    color: gray;
  }
  .nav-left:hover,
  .nav-right:hover {
    cursor: pointer;
  }
  .tile__details {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
    transition: 450ms opacity;
    border-radius: 5px;
  }
  .tile__details:after {
    margin-top: -25px;
    margin-left: -25px;
    width: 50px;
    height: 50px;
    border: 3px solid #ecf0f1;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .tile__details-custom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
    transition: 450ms opacity;
    border-radius: 5px;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .tile__details-custom:after {
    margin-top: -25px;
    margin-left: -25px;
    width: 50px;
    height: 50px;
    border: 3px solid #ecf0f1;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .tile__details .quiz-card-rating {
    position: absolute;
    bottom: 0;
    padding: 10px;
    width: 35px;
    height: 35px;
    border: 2px solid var(--verde);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: .85em;
    color: var(--verde);
  }
  .tile__details-custom .quiz-card-rating {
    margin-right: auto;
    min-width: 35px;
    min-height: 35px;
    border: 2px solid var(--verde);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: .85em;
    color: var(--verde);
  }
  .tile__details .quiz-card-play {
    position: absolute;
    top: 130px;
    left: 82px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
    border-radius: 50%;
  }
  .tile__details-custom .quiz-card-play {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
    border-radius: 50%;
  }
  .tile__details .quiz-card-title,
  .tile__details-custom .quiz-card-title {
    white-space: normal;
  }
  .tile__details .quiz-card-play:hover,
  .tile__details-custom .quiz-card-play:hover {
    cursor: pointer;
  }
  @media (max-width: 419px) {
    .tile {
      max-width: 150px;
    }
    .tile__media img {
      height: 222.22px;
    }
    .tile__details .quiz-card-play {
      top: 96px;
      left: 58px;
    }
  }
  @media (max-width: 767px) {
    .nav-left,
    .nav-right {
      display: none;
    }
  }
</style>
