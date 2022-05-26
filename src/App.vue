<template>
  <div>
    <Navbar v-if="$route.name != 'Authentication'" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  mounted () {
    document.title = this.$route.name + " | Movizz";
  },
  watch: {
    '$route.name'() {
      document.title = this.$route.name + " | Movizz";
    }
  },
};
</script>

<style>
  #app,
  html,
  body {
    background: #020916;
    color: #fffffF;
  }
</style>
