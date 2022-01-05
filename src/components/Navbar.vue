<template>
  <div v-if="currentWidth >= 992" id="desktop">
    <b-navbar toggleable="lg">
      <b-container>
        <b-navbar-brand :to="{ name: 'Authentication' }">
          <img src="../assets/images/logo.svg" alt="Logo" width="80%" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'Home' }">Home</b-nav-item>
            <b-nav-item :to="{ name: 'Catalog' }">Catalog</b-nav-item>
            <b-nav-item :to="{ name: 'Quizzes' }">Quizzes</b-nav-item>
            <b-nav-item :to="{ name: 'Prizes' }">Prizes</b-nav-item>
          </b-navbar-nav>
          <b-nav-form class="w-100 d-flex justify-content-end">
            <b-input-group size="md" class="mr-sm-5">
              <b-form-input size="md" placeholder="Search your favourite movies"></b-form-input>
              <div class="input-group-append">
                <div class="input-group-text">
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </b-input-group>
          </b-nav-form>
          <b-navbar-nav class="ml-auto">
            <div class="d-flex align-items-center">
              <img src="../assets/images/avatar.png" alt="Avatar" width="40px" height="40px" />
              <div id="level">
                <span>32</span>
              </div>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-end">
              <b-nav-item :to="{ name: 'Profile' }" id="username">António</b-nav-item>
              <div id="badge-legend" class="d-flex">
                <img src="../assets/images/badges/11_cinema_god.svg" alt="Badge" width="15px" height="15px" />
                <span> Extra</span>
              </div>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
  <div v-else id="mobile">
    <b-navbar toggleable>
      <b-navbar-brand :to="{ name: 'Authentication' }">
        <img src="../assets/images/logo.svg" alt="Logo" width="80%" />
      </b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-input-group size="md">
            <b-form-input size="md" placeholder="Search your favourite movies"></b-form-input>
            <div class="input-group-append">
              <div class="input-group-text">
                <i class="fas fa-search"></i>
              </div>
            </div>
          </b-input-group>
          <div class="d-flex mb-3">
            <img src="../assets/images/avatar.png" alt="Avatar" width="40px" height="40px" />
            <div id="level">
              <span>32</span>
            </div>
            <div class="d-flex flex-column align-items-end">
              <b-nav-item :to="{ name: 'Profile' }" id="username">
                António
                <img src="../assets/images/badges/11_cinema_god.svg" alt="Badge" width="15px" height="15px" />
                <span> Extra</span>
              </b-nav-item>
                
            </div>
          </div>
          <b-nav-item :to="{ name: 'Home' }">Home</b-nav-item>
          <b-nav-item :to="{ name: 'Catalog' }">Catalog</b-nav-item>
          <b-nav-item :to="{ name: 'Quizzes' }">Quizzes</b-nav-item>
          <b-nav-item :to="{ name: 'Prizes' }">Prizes</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
    background-color: #182131;
    height: 80px;
  }

  #mobile nav {
    background-color: #182131;
  }

  #mobile .navbar-toggler {
    background-color: white;
    border: none;
  }

  #mobile .navbar-toggler svg {
    color: #182131;
  }

  #desktop a,
  #mobile a {
    color: white !important;
    font-weight: bold;
  }

  input {
    border: none;
    outline: none;
    background-color: #2b3342;
    border-radius: 35px;
    color: white !important;
    width: 250px !important;
  }

  input:focus {
    border: none;
    outline: none;
    box-shadow: none;
    background-color: #2b3342;
  }

  span {
    color: #5b6371;
    font-size: 0.75em;
  }

  #desktop #username a {
    margin: 0;
    padding: 0;
  }
    
  #mobile #badge-legend {
    position: relative;
    top: -15px;
  }
  
  #level {
    position: relative;
    top: 20px;
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

  .input-group-text {
    border: none !important;
    background: #2b3342;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  #mobile .input-group {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>