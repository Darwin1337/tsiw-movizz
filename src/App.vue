<template>
  <div>
    <Navbar v-if="['Authentication', 'Error'].indexOf($route.name) == -1" />
    <router-view class="view"/>
    <Footer v-if="$route.name != 'Error'" />
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

  .view {
    min-height: calc(100vh - 265px);
  }

  @media (max-width: 991px) {
    .view {
      min-height: calc(100vh - 241px);
    }
  }
</style>
