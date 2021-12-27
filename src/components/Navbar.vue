<template>
  <div >
    <div class="navbar-bg">
      <b-navbar toggleable="lg" class="container">
        <b-navbar-brand href="#"><img src="../assets/logo.svg"></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">
              <router-link :to="{ name: 'Home' }">Home</router-link>
            </b-nav-item>
            <b-nav-item href="#">
             <router-link :to="{ name: 'Catalog' }">Catalog</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link :to="{ name: 'Quizzes' }">Quizzes</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link :to="{ name: 'Prizes' }">Prizes</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav right>

            <!-- parte pesquisa na navbar -->
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <!-- parte de perfil do utilizador -->
            <div class="d-flex align-items-center">
              <b-nav-item href="#"><img src="../assets/avatar.png"></b-nav-item>
              <b-nav-item href="#">
                <router-link :to="{ name: 'Profile' }">António</router-link>
              </b-nav-item>
            </div>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
  .navbar-bg {
    background-color: #182131;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>