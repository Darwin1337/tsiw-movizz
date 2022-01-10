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
          <div class="d-flex">
            <form class="d-flex me-4">
              <div class="input-group">
                <input type="search" placeholder="Find your favourite movie" aria-label="Search">
                <button type="submit" @submit.prevent=""><i class="fas fa-search"></i></button>
              </div>
            </form>
            <div class="d-flex align-items-center">
              <img src="https://thispersondoesnotexist.com/image" style="border-radius: 50%;" alt="Avatar" width="40px" height="40px" />
              <div id="level">
                <span>32</span>
              </div>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-end">
              <router-link :to="{ name: 'Profile' }" id="username">António</router-link>
              <div id="badge-legend" class="d-flex" style="gap: 5px;">
                <img src="../assets/images/badges/11_cinema_god.svg" alt="Badge" width="15px" height="15px" />
                <span> Extra</span>
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
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="user-card mt-3 d-flex m-0 align-items-center">
            <img src="https://thispersondoesnotexist.com/image" alt="Avatar" style="border-radius: 50%;" width="40px" height="40px" />
            <div id="level">
              <span>32</span>
            </div>
            <div class="d-flex flex-column align-items-end">
              <router-link :to="{ name: 'Profile' }" id="username">
                António
                <img src="../assets/images/badges/11_cinema_god.svg" alt="Badge" width="15px" height="15px" />
                <span> Extra</span>
              </router-link>
            </div>
          </div>
          <form class="d-flex">
            <div class="input-group mb-3">
              <input type="search" class="form-control" placeholder="Find your favourite movie" aria-label="Search">
              <button type="submit" @submit.prevent=""><i class="fas fa-search"></i></button>
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
export default {
  data() {
    return {
      currentWidth: window.innerWidth,
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.currentWidth = window.innerWidth;
    },
  },
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
  }

  #level span {
    padding: 0;
    margin: 0;
    background-color: white;
    padding: 2px;
    border-radius: 50%;
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
  }
</style>