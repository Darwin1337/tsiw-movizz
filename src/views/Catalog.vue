<template>
  <div class="container">
    <!-- Banner -->
    <div class="jumbo-wrapper mt-4" style="height: 425px;">
      <div class="jumbotron d-flex align-items-end p-5"
        style="height:100% ; background-position: center; border-radius:10px;">
        <div class="container for-about" id="banner">
          <p>Movie of the moment </p>
          <h2 style="font-weight: bold;">Fast and Furious Presents: Hobbs and Shaw</h2>
          <p style="font-size: 1.15em;">Lawman Luke Hobbs and outcast Deckard Shaw form an unlikely alliance when a
            cyber-genetically enhanced villain threatens the future of humanity.</p>
          <p>Action, Adventure and Thriller</p>
          <p>Duration 2h 17min</p>
          <br>
          <div class="d-flex" style="gap: 15px;">
            <button class="orange-btn">IMDb 6.5</button>
            <button class="blur-btn">Movizz 3.6/5</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Seletor filme/serie -->
    <div class="d-flex justify-content-center mt-3">
      <div :class="selectedType == 1 ? 'active-type' : 'default-type'" @click="selectedType = 1">
        <span style="font-size: 1.25em;">Movies</span>
      </div>
      <div :class="selectedType == 2 ? 'active-type' : 'default-type'" @click="selectedType = 2">
        <span style="font-size: 1.25em;">Series</span>
      </div>
    </div>
    <!-- se for filme -->
    <div v-if="selectedType==1">
      <h4 class="mt-3">Top Movies</h4>
      <section class="top-movies">
        <div class="navigation mb-2">
          <span class="nav-left me-3" @click="simulateScroll('left', '.top-movies')"><i
              class="fas fa-chevron-left"></i></span>
          <span class="nav-right ms-3" @click="simulateScroll('right', '.top-movies')"><i
              class="fas fa-chevron-right"></i></span>
        </div>
        <div class="carousel-wrapper" style="position: relative;">
          <div class="row-carousel disable-scrollbars">
            <div class="row__inner p-0">
              <div class="tile" v-for="i in 10" :key="i">
                <div class="tile__media">
                  <img class="tile__img" src="https://mb.web.sapo.io/a403b45d06a31ff4951e2d5d731e3aa11557f95c.jpg"
                    alt="" />
                </div>
                <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
                  <p class="quiz-card-title">Balas e Bolinhos</p>
                  <button class="orange-btn" style="font-size: .85em;">IMDb 10.0</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- se for serie -->
    <div v-else>
      <h4 class="mt-3">Top Series</h4>
      <section class="top-series">
        <div class="navigation mb-2">
          <span class="nav-left me-3" @click="simulateScroll('left', '.top-series')"><i
              class="fas fa-chevron-left"></i></span>
          <span class="nav-right ms-3" @click="simulateScroll('right', '.top-series')"><i
              class="fas fa-chevron-right"></i></span>
        </div>
        <div class="carousel-wrapper" style="position: relative;">
          <div class="row-carousel disable-scrollbars">
            <div class="row__inner p-0">
              <div class="tile" v-for="i in 10" :key="i"
                @click="$router.push({ name: 'Title', params: { imdbid: '2'} })">
                <div class="tile__media">
                  <img class="tile__img" src="https://upload.wikimedia.org/wikipedia/pt/f/fc/Family_Guy_Temporada_1.png"
                    alt="" />
                </div>
                <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
                  <p class="quiz-card-title">Family Guy</p>
                  <button class="orange-btn" style="font-size: .85em;">IMDb 7.2</button>
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
        <form class="d-flex">
          <div class="input-group">
            <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search">
            <button type="submit" @submit.prevent=""><i class="fas fa-search"></i></button>
          </div>
        </form>
      </div>

      <div class="col-md-3 col-lg-2 col-sm-6">
        <select id="genre" style="height: 40px;">
          <option disabled selected>Genre</option>
          <option :value=genero v-for="(genero,index) in generos" :key="index">{{genero}}</option>
        </select>
      </div>

      <div class="col-md-3 col-lg-2 col-sm-6">
        <select id="year" style="height: 40px;">
          <option disabled selected>Year</option>
          <option :value="i + 1979" v-for="i in 43" :key="i">{{ i + 1979 }}</option>
        </select>
      </div>

      <div class="col-md-3 col-lg-2 col-sm-6">
        <select id="country" style="height: 40px;">
          <option disabled selected>Country</option>
          <option :value=pais v-for="(pais,index) in country_list" :key="index">{{pais}}</option>
        </select>
      </div>

      <div class="col-md-3 col-lg-3 col-sm-6">
        <select id="order" style="height: 40px;">
          <option disabled selected>Order by</option>
          <option value="Alphabetic (A-Z)">Alphabetic (A-Z)</option>
          <option value="Alphabetic (Z-A)">Alphabetic (Z-A)</option>
          <option value="Most recent">Most recent</option>
          <option value="Oldest">Oldest</option>
          <option value="Best rated">Best rated</option>
          <option value="Worst rated">Worst rated</option>
          <option value="Most viewed">Most viewed</option>
        </select>
      </div>
    </div>

    <!-- mostrar todos os filmes -->
    <div>
      <div class="row g-3">
        <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="(filme, index) in mostrar" :key="index">
          <div class="tile-custom">
            <div class="tile__media-custom">
              <img class="tile__img"
                :src="selectedType == 1 ? 'https://imagens.publicocdn.com/imagens.aspx/232467?tp=KM' : 'https://m.media-amazon.com/images/I/71g3CCSgwCL._SL1284_.jpg'"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">{{ selectedType == 1 ? 'O Crime do Padre Amaro' : 'Arrested Development' }}</p>
              <button class="orange-btn w-100" style="font-size: .85em; max-width: 150px;">IMDb 10.0</button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 d-flex justify-content-center mt-4">
        <button class="rounded-btn" @click="mostrar+=12">Load More</button>
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
      }
    }
  }

</script>

<style scoped>
  .default-type,
  .active-type {
    cursor: pointer;
    padding: 10px 20px;
    border-bottom: 2px solid;
    margin-right: 30px;
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