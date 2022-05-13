<template>
  <div id="app">
    <Navbar v-if="$route.name != 'Authentication'" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  },
  mounted () {
    document.title = "Movizz - " + this.$route.name;
  },
  watch: {
    '$route.name'() {
      document.title = "Movizz - " + this.$route.name;
    }
  },
}
</script>

<style>
  #app,
  html,
  body {
    background: #020916;
    color: #fffffF;
  }
</style>