<template>
  <div v-if="!loading.titles" class="container">
    <!-- Banner -->
    <div class="jumbo-wrapper mt-4" style="height: 425px;">
      <div :class="!webpSupported ? '' : 'webp'" class="jumbotron d-flex align-items-end p-5"
        style="height:100% ; background-position: center; border-radius:10px;">
        <div class="container for-about" id="banner">
          <p>Movie of the moment </p>
          <h2 style="font-weight: bold;">Fast and Furious Presents: Hobbs and Shaw</h2>
          <p style="font-size: 1.15em;">Lawman Luke Hobbs and outcast Deckard Shaw form an unlikely alliance when a
            cyber-genetically enhanced villain threatens the future of humanity.</p>
          <p>Action, Adventure and Thriller</p>
          <p>137 minutes</p>
          <br>
          <div class="d-flex" style="gap: 15px;">
            <button class="orange-btn" @click="$router.push({ name: 'Title', params: { imdbid: 'tt6806448'} })">IMDb 6.5</button>
            <button class="blur-btn" @click="$router.push({ name: 'Title', params: { imdbid: 'tt6806448'} })">{{ !loading.titles ? 'Movizz ' + this.data.bannerRating : 'Loading'}}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Seletor filme/serie -->
    <div class="d-flex justify-content-center mt-3" style="gap: 15px;">
      <div :class="selectedType == 1 ? 'active-type' : 'default-type'" @click="selectedType = 1;">
        <span style="font-size: 1.25em;">Movies</span>
      </div>
      <div :class="selectedType == 2 ? 'active-type' : 'default-type'" @click="selectedType = 2;">
        <span style="font-size: 1.25em;">Series</span>
      </div>
    </div>

    <div v-if="!loading.topMovies && !loading.topSeries">
      <h4 class="mt-3">{{ selectedType == 1 ? 'Top Movies' : 'Top Series'}}</h4>
      <section :class="selectedType == 1 ? 'top-movies' : 'top-series'">
        <div class="navigation mb-2">
          <span class="nav-left me-3" @click="simulateScroll('left', (selectedType == 1 ? '.top-movies' : '.top-series'))"><i
              class="fas fa-chevron-left"></i></span>
          <span class="nav-right ms-3" @click="simulateScroll('right', (selectedType == 1 ? '.top-movies' : '.top-series'))"><i
              class="fas fa-chevron-right"></i></span>
        </div>
        <div class="carousel-wrapper" style="position: relative;">
          <div class="row-carousel disable-scrollbars">
            <div class="row__inner p-0">
              <div class="tile" v-for="i in 10" :key="i" :set="topTitles = (selectedType == 1 ? data.topMovies : data.topSeries)" @click="$router.push({ name: 'Title', params: { imdbid: topTitles[i - 1].imdb_id} })">
                <div class="tile__media">
                  <img class="tile__img" :src="webpSupported ? (topTitles[i - 1].poster_webp ? require('../assets/images/content/' + topTitles[i - 1].poster_webp) : topTitles[i - 1].poster) : topTitles[i - 1].poster"
                    rel="preload" />
                </div>
                <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
                  <p class="quiz-card-title">{{topTitles[i - 1].title}}</p>
                  <button class="orange-btn" style="font-size: .85em;">IMDb {{parseFloat(topTitles[i - 1].imdb_rating).toFixed(1)}}</button>
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
        <select id="genre" style="height: 40px;" v-model="filters.genre">
          <option disabled value="Genre">Genre</option>
          <option value="All">All</option>
          <option :value=genero v-for="(genero, index) in generos" :key="index">{{ genero }}</option>
        </select>
      </div>

      <div class="col-md-3 col-lg-2 col-sm-6">
        <select id="year" style="height: 40px;" v-model="filters.year">
          <option disabled value="Year">Year</option>
          <option value="All">All</option>
          <option :value=ano v-for="(ano, index) in anos" :key="index">{{ ano }}</option>
        </select>
      </div>

      <div class="col-md-3 col-lg-2 col-sm-6">
        <select id="country" style="height: 40px;" v-model="filters.country">
          <option disabled value="Country">Country</option>
          <option value="All">All</option>
          <option :value=pais v-for="(pais, index) in paises" :key="index">{{ pais }}</option>
        </select>
      </div>

      <div class="col-md-3 col-lg-3 col-sm-6">
        <select id="order" style="height: 40px;" v-model="filters.orderby">
          <option disabled value="Order by">Order by</option>
          <option value="Recently added">Recently added</option>
          <option value="Alphabetic (A-Z)">Alphabetic (A-Z)</option>
          <option value="Alphabetic (Z-A)">Alphabetic (Z-A)</option>
          <option value="Most recent">Most recent</option>
          <option value="Oldest">Oldest</option>
          <option value="Best IMDb rated">Best IMDb rated</option>
          <option value="Worst IMDb rated">Worst IMDb rated</option>
          <option value="Best Movizz rated">Best Movizz rated</option>
          <option value="Worst Movizz rated">Worst Movizz rated</option>
          <option value="Most viewed">Most viewed</option>
          <option value="Least viewed">Least viewed</option>
        </select>
      </div>
    </div>

    <!-- mostrar todos -->
    <div v-if="!loading.titles">
      <div class="row g-3">
        <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="title in filteredTitles" :key="title.imdb_id">
          <router-link :to="{ name: 'Title', params: { imdbid: title.imdb_id }} ">
            <div class="tile-custom">
              <div class="tile__media-custom">
                <img class="tile__img"
                  :src="webpSupported ? (title.poster_webp ? require('../assets/images/content/' + title.poster_webp) : title.poster) : title.poster"
                  rel="preload" />
              </div>
              <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
                <p class="quiz-card-title">{{ title.title }}</p>
                <button class="orange-btn w-100 mb-2" style="font-size: .85em; max-width: 150px;">IMDb {{ parseFloat(title.imdb_rating).toFixed(1) }}</button>
                <button class="blur-btn" style="font-size: .85em; max-width: 150px;">Movizz {{ parseFloat(title.movizz_rating).toFixed(1) }}</button>
              </div>
            </div>
          </router-link>
        </div>
        <div v-if="filteredTitles.length == 0">
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
    <div v-else>
      <p>Loading...</p>
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
    name: "Catalog",
    data() {
      return {
        webpSupported: true,
        selectedType: 1,
        anos: [],
        generos: [],
        paises: [],
        data: {
          titles: [],
          movies: [],
          series: [],
          topMovies: [],
          topSeries: [],
          filterHistory: [],
          totalPages: 1,
          currentPage: 1,
          bannerRating: 0.0,
        },
        loading: {
          titles: true,
          topMovies: true,
          topSeries: true,
          genres: true
        },
        filters: {
          search: "",
          genre: "Genre",
          year: "Year",
          country: "Country",
          orderby: "Order by"
        }
      }
    },
    mounted () {
      this.webpSupported = this.isWebpSupported();
      this.getTitles();
      this.getTopTitles();
      this.getGenres();
    },
    methods: {
      ...mapActions(["getBest10Titles", "getAllTitles", "getAllGenres"]),
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
      async getTitles() {
        try {
          this.loading.titles = true;
          this.data.movies = await this.getAllTitles();
          if (this.data.movies.success) {
            this.data.bannerRating = parseFloat(this.data.movies.msg.filter(tt => tt.imdb_id == 'tt6806448')[0].movizz_rating).toFixed(1);

            this.data.movies.msg.map(title => {
              // Pré carregar anos para o select
              if (!this.anos.some(ano => ano == title.year)) {
                this.anos.push(title.year);
              }
              // Pré carregar países para o select
              if (!this.paises.some(pais => pais == title.country)) {
                this.paises.push(title.country);
              }
            });
            
            this.anos.sort();
            this.paises.sort();
            this.data.series = this.data.movies.msg.filter(t => t.seasons > 0);
            this.data.movies = this.data.movies.msg.filter(t => t.seasons == 0);
            this.filterHistory = this.selectedType == 1 ? [...this.data.movies] : [...this.data.series];
            this.loading.titles = false;
          } else {
            this.$router.push({ name: 'Error', params: { '0': 'error' } });
          }
        } catch (e) {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        }
      },
      async getTopTitles() {
        try {
          this.loading.topMovies = true;
          this.data.topMovies = await this.getBest10Titles(true);
          if (this.data.topMovies.success) {
            this.data.topMovies = this.data.topMovies.msg;
            this.loading.topMovies = false;
          } else {
            this.$router.push({ name: 'Error', params: { '0': 'error' } });
          }

          this.loading.topSeries = true;
          this.data.topSeries = await this.getBest10Titles(false);
          if (this.data.topSeries.success) {
            this.data.topSeries = this.data.topSeries.msg;
            this.loading.topSeries = false;
          } else {
            this.$router.push({ name: 'Error', params: { '0': 'error' } });
          }
        }catch (e) {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        }
      },
      async getGenres() {
        try {
          this.loading.genres = true;
          this.generos = await this.getAllGenres();
          if (this.generos.success) {
            this.generos = this.generos.msg.map(genre => genre.description);
            this.loading.genres = false;
          } else {
            this.$router.push({ name: 'Error', params: { '0': 'error' } });
          }
        }catch (e) {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        }
      },
    },
    computed: {
      filteredTitles() {
        if (!this.loading.titles && !this.loading.quizzes) {
          let filterResult = this.selectedType == 1 ? [...this.data.movies] : [...this.data.series];

          // Barra de pesquisa
          if (this.filters.search != "") {
            filterResult = filterResult.filter(title => title.title.toLowerCase().includes(this.filters.search.toLowerCase()));
          }

          // Géneros
          if (this.filters.genre != "All" && this.filters.genre != "Genre") {
            filterResult = filterResult.filter(title => title.genres.some(genero => genero.genre_id.description == this.filters.genre));
          }

          // Anos
          if (this.filters.year != "All" && this.filters.year != "Year") {
            filterResult = filterResult.filter(title => title.year == this.filters.year);
          }
          
          // Países
          if (this.filters.country != "All" && this.filters.country != "Country") {
            filterResult = filterResult.filter(title => this.filters.country == title.country);
          }

          if (this.filters.orderby != "Recently added" && this.filters.orderby != "Order by") {
            if (this.filters.orderby == "Alphabetic (A-Z)") {
              filterResult = filterResult.sort((a, b) => (a.title < b.title) ? -1 : ((a.title > b.title) ? 1 : 0));
            } else if (this.filters.orderby == "Alphabetic (Z-A)") {
              filterResult = filterResult.sort((a, b) => (a.title > b.title) ? -1 : ((a.title < b.title) ? 1 : 0));
            } else if (this.filters.orderby == "Most recent") {
              filterResult = filterResult.sort((a, b) => (a.year > b.year) ? -1 : ((a.year < b.year) ? 1 : 0));
            } else if (this.filters.orderby == "Oldest") {
              filterResult = filterResult.sort((a, b) => (a.year < b.year) ? -1 : ((a.year > b.year) ? 1 : 0));
            } else if (this.filters.orderby == "Best IMDb rated") {
              filterResult = filterResult.sort((a, b) => (a.imdb_rating > b.imdb_rating) ? -1 : ((a.imdb_rating < b.imdb_rating) ? 1 : 0));
            } else if (this.filters.orderby == "Worst IMDb rated") {
              filterResult = filterResult.sort((a, b) => (a.imdb_rating < b.imdb_rating) ? -1 : ((a.imdb_rating > b.imdb_rating) ? 1 : 0));
            } else if (this.filters.orderby == "Best Movizz rated") {
              filterResult = filterResult.sort((a, b) => (a.movizz_rating > b.movizz_rating) ? -1 : ((a.movizz_rating < b.movizz_rating) ? 1 : 0));
            } else if (this.filters.orderby == "Worst Movizz rated") {
              filterResult = filterResult.sort((a, b) => (a.movizz_rating < b.movizz_rating) ? -1 : ((a.movizz_rating > b.movizz_rating) ? 1 : 0));
            } else if (this.filters.orderby == "Most viewed") {
              filterResult = filterResult.sort((a, b) => (a.times_seen > b.times_seen) ? -1 : ((a.times_seen < b.times_seen) ? 1 : 0));
            } else if (this.filters.orderby == "Least viewed") {
              filterResult = filterResult.sort((a, b) => (a.times_seen < b.times_seen) ? -1 : ((a.times_seen > b.times_seen) ? 1 : 0));
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
        return null;
      }
    },
    watch: {
      selectedType() {
        this.data.currentPage = 1;
      }
    }
  }

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

  a {
    text-decoration: none;
    color: white;
  }

  .default-type,
  .active-type {
    cursor: pointer;
    padding: 10px 20px;
    border-bottom: 2px solid;
    display: flex;
    justify-content: center;
  }

  .default-type {
    color: white;
  }

  .active-type {
    color: orange;
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

  .jumbotron {
    background-image: url("../assets/images/catalog_banner.png");
    background-size: cover;
  }

  .jumbotron.webp {
    background-image: url("../assets/images/catalog_banner.webp");
    background-size: cover;
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

  .tile:hover .tile__details {
    opacity: 1;
  }

  .tile-custom:hover .tile__details {
    opacity: 1;
  }

  .row__inner:hover .tile:hover {
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

  .tile__details:before:hover {
    cursor: pointer;
  }

  .tile:hover .tile__details {
    opacity: 1;
  }

  .tile-custom:hover .tile__details {
    opacity: 1;
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

  .tile__details .quiz-card-title {
    white-space: normal;
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

  .tile__details .quiz-card-play:hover {
    cursor: pointer;
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

    .jumbo-wrapper {
      min-height: 425px;
      max-height: 600px;
      height: 100% !important;
    }

    .jumbotron {
      padding: .5rem !important;
    }
  }

  @media (max-width: 767px) {
    .nav-left,
    .nav-right {
      display: none;
    }

    .jumbotron {
      padding: 1.5rem !important;
    }
  }
</style>