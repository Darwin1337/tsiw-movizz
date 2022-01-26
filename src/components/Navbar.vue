<template>
  <div v-if="currentWidth >= 992" id="desktop">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" :to="{ name: 'Authentication' }">
          <img src="../assets/images/logo.svg" alt="Logo" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto ms-3 mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ name: 'Home' }">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Catalog' }">Catalog</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Quizzes' }">Quizzes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Prizes' }">Prizes</router-link>
            </li>
            <li class="nav-item" v-if="getLoggedUser.is_admin">
              <router-link class="nav-link" :to="{ name: 'Admin' }">Admin</router-link>
            </li>
          </ul>
          <div class="d-flex">
            <form @submit.prevent="" class="me-4 position-relative">
              <div class="input-group">
                <input id="search-bar" type="search" placeholder="Search anything" aria-label="Search" v-model="search">
                <button type="submit" ><i class="fas fa-search"></i></button>
              </div>
              <div tabindex="0" class="leaderboardBar" id="search-results"
                style="
                  display: none;
                  background-color: #161c26;
                  max-height: 178px;
                  position: absolute;
                  top: 45px;
                  width: 100%;
                  z-index: 1;
                  border-radius: 5px;
                  overflow-y: auto;">
                <div class="card-comment p-3 me-1" v-for="i in filteredTitles.length" :key="i">
                  <div class="d-flex w-100 align-items-center" style="gap: 15px; cursor: pointer;" @click="redirect(filteredTitles[i - 1])">
                    <div style="width: 50px; height: 73px; min-width: 50px; min-height: 73px;">
                      <img class="w-100 h-100" style="object-fit: cover; object-position: center top; border-radius: 5px;" :src="filteredTitles[i - 1].poster">
                    </div>
                    <div class="d-flex flex-column">
                      <p class="m-0" style="color: var(--cinza-claro);">{{ filteredTitles[i - 1].hasOwnProperty('id_imdb') ? (getTitleInfo(filteredTitles[i - 1].id_imdb).total_temporadas == 0 ? 'Movie' : 'Series') : 'Quiz' }}</p>
                      <p style="color: var(--laranja); font-size: 0.9rem;" class="m-0"><strong>{{ filteredTitles[i - 1].titulo }}</strong></p>
                    </div>
                  </div>
                </div>
                <div class="card-comment p-3 me-1" v-if="filteredTitles.length == 0">
                  <p style="color: white; font-size: 0.9rem;" class="m-0"><strong>No results were found.</strong></p>
                </div>
              </div>
            </form>
            <div class="d-flex align-items-center">
              <img :src="this.getLoggedUser.avatar" style="border-radius: 50%; object-fit: cover; object-position: center top;" alt="Avatar" width="40px" height="40px" />
              <div id="level">
                <span>{{ this.getLoggedUser.nivel }}</span>
              </div>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-end">
              <router-link :to="{ name: 'Profile', params: { id: this.getLoggedUser.id } }" id="username">{{ this.getLoggedUser.primeiro_nome }}</router-link>
              <div id="badge-legend" class="d-flex" style="gap: 5px;">
                <img :src="this.getBadges[this.getLoggedUser.id_badge].icon" alt="Badge" width="15px" height="15px" />
                <span> {{ this.getBadges[this.getLoggedUser.id_badge].name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <div v-else id="mobile">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" :to="{ name: 'Authentication' }">
          <img src="../assets/images/logo.svg" alt="Logo" />
        </a>
        <button class="nav-btn-toggler navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="user-card mt-3 d-flex m-0 align-items-center">
            <img :src="this.getLoggedUser.avatar" alt="Avatar" style="border-radius: 50%;" width="40px" height="40px" />
            <div id="level">
              <span>{{ this.getLoggedUser.nivel }}</span>
            </div>
            <div class="d-flex flex-column align-items-end">
              <router-link :to="{ name: 'Profile', params: { id: this.getLoggedUser.id } }" id="username">
                {{ this.getLoggedUser.primeiro_nome }}
                <img :src="this.getBadges[this.getLoggedUser.id_badge].icon" alt="Badge" width="15px" height="15px" />
                <span> {{ this.getBadges[this.getLoggedUser.id_badge].name }}</span>
              </router-link>
            </div>
          </div>
          <form @submit.prevent="" class="position-relative">
            <div class="input-group mb-3">
              <input id="search-bar-mobile" type="search" class="form-control" placeholder="Find your favourite movie" aria-label="Search" v-model="search">
              <button type="submit"><i class="fas fa-search"></i></button>
            </div>
            <div tabindex="0" class="leaderboardBar" id="search-results-mobile"
              style="
                display: none;
                background-color: #161c26;
                max-height: 178px;
                position: absolute;
                top: 45px;
                width: 100%;
                z-index: 1;
                border-radius: 5px;
                overflow-y: auto;">
              <div class="card-comment p-3 me-1" v-for="i in filteredTitles.length" :key="i">
                <div class="d-flex w-100 align-items-center" style="gap: 15px; cursor: pointer;" @click="redirect(filteredTitles[i - 1])">
                  <div style="width: 50px; height: 73px; min-width: 50px; min-height: 73px;">
                    <img class="w-100 h-100" style="object-fit: cover; object-position: center top; border-radius: 5px;" :src="filteredTitles[i - 1].poster">
                  </div>
                  <div class="d-flex flex-column">
                    <p class="m-0" style="color: var(--cinza-claro);">{{ filteredTitles[i - 1].hasOwnProperty('id_imdb') ? (getTitleInfo(filteredTitles[i - 1].id_imdb).total_temporadas == 0 ? 'Movie' : 'Series') : 'Quiz' }}</p>
                    <p style="color: var(--laranja); font-size: 0.9rem;" class="m-0"><strong>{{ filteredTitles[i - 1].titulo }}</strong></p>
                  </div>
                </div>
              </div>
              <div class="card-comment p-3 me-1" v-if="filteredTitles.length == 0">
                <p style="color: white; font-size: 0.9rem;" class="m-0"><strong>No results were found.</strong></p>
              </div>
            </div>
          </form>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ name: 'Home' }">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Catalog' }">Catalog</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Quizzes' }">Quizzes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Prizes' }">Prizes</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currentWidth: window.innerWidth,
      search: ""
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.insertEventListeners();
  },
  methods: {
    onResize() {
      this.currentWidth = window.innerWidth;
      this.insertEventListeners();
    },
    redirect(obj) {
      obj.hasOwnProperty('id_imdb') ? this.$router.push({ name: 'Title', params: { imdbid: obj.id_imdb} }) : this.$router.push({ name: 'Quiz', params: { id: obj.id_quiz } });
      document.querySelector("#search-results").style.display = "none";
    },
    insertEventListeners() {
      try {
        document.querySelector("#search-bar").addEventListener("focusout", (event) =>  document.querySelector("#search-results").style.display = event.relatedTarget != document.querySelector("#search-results") ?  "none" : "block");
        document.querySelector("#search-bar").addEventListener("focusin", () => this.search.length >= 3 ? document.querySelector("#search-results").style.display = "block" : document.querySelector("#search-results").style.display = "none" );
      } catch { 
        document.querySelector("#search-bar-mobile").addEventListener("focusout", (event) =>  document.querySelector("#search-results-mobile").style.display = event.relatedTarget != document.querySelector("#search-results-mobile") ?  "none" : "block");
        document.querySelector("#search-bar-mobile").addEventListener("focusin", () => this.search.length >= 3 ? document.querySelector("#search-results-mobile").style.display = "block" : document.querySelector("#search-results-mobile").style.display = "none" );
      };
    }
  },
  computed: {
    ...mapGetters(["getLoggedUser", "getBadges", "getAllTitles", "getAllQuizzes", "getTitleInfo"]),
    filteredTitles() {
      let filterResult = [...this.getAllTitles];
      filterResult = filterResult.concat([...this.getAllQuizzes]);

      // Barra de pesquisa
      filterResult = filterResult.filter(title => title.titulo.toLowerCase().includes(this.search.toLowerCase()));
    
      return filterResult.length > 5 ? filterResult.slice(0, 5) : filterResult;
    }
  },
  watch:{
    $route() {
      if (this.currentWidth < 992) {
        document.querySelector(".nav-btn-toggler").setAttribute("aria-expanded", false);
        document.querySelector(".nav-btn-toggler").classList = "nav-btn-toggler navbar-toggler collapsed";
        document.querySelector("#navbarSupportedContent").classList = "navbar-collapse collapse";
      }
    },
    search() {
      try {
        if (this.search.length >= 3) {
          document.querySelector("#search-results").style.display = "block";
        } else {
          document.querySelector("#search-results").style.display = "none";
        }
      } catch {
        if (this.search.length >= 3) {
          document.querySelector("#search-results-mobile").style.display = "block";
        } else {
          document.querySelector("#search-results-mobile").style.display = "none";
        }
      };

    }
  } 
};
</script>

<style scoped>
  #desktop nav {
    background-color: var(--azul-escuro);
    height: 80px;
  }

  #desktop a,
  #mobile a {
    color: white !important;
    font-weight: bold;
    text-decoration: none;
  }

  span {
    color: var(--cinza2);
    font-size: 0.75em;
  }

  .leaderboardBar::-webkit-scrollbar {
    width: 5px;
  }

  .leaderboardBar::-webkit-scrollbar-thumb {
    background: #464646;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  .leaderboardBar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance:none;
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

  #mobile form input,
  #mobile form input:focus {
    color: white;
    outline: none !important;
    box-shadow: none;
    background-color: var(--cinza3);
  }

  form i {
    color: var(--cinza2);
  }

  #username {
    color: white;
    font-weight: bold;
  }

  #desktop #username a {
    margin: 0;
    padding: 0;
  }
  
  #desktop #level {
    position: relative;
    top: 15px;
    right: 10px;
    min-width: 20px;
    min-height: 20px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 50%;
  }

  #level span {
    display: inline-block;
    padding: 0;
    margin: 0;
    padding: 2px;
    font-weight: bold;
  }

  #mobile nav {
    background-color: var(--azul-escuro);
  }

  #mobile .navbar-toggler {
    background-color: white;
    border: none;
  }

  #mobile .navbar-toggler:focus {
    outline: none !important;
    box-shadow: none;
  }

  #mobile .navbar-toggler .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(24, 33, 49)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
  }

  #mobile .input-group {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #mobile .user-card  {
    background: var(--cinza3);
    padding: 15px;
    border-radius: 10px;
  }

  #mobile #level {
    position: relative;
    top: 15px;
    right: 10px;
    min-width: 20px;
    min-height: 20px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 50%;
  }
</style>