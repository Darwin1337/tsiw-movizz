<template>
  <div class="d-flex flex-column justify-content-center align-items-center text-center">
    <img id="logo" src="../assets/images/error.svg" alt="Error image" width="250px" />
    <h2>Something bad happened but it's not <span style="color: var(--azul-claro)">your</span> fault.</h2>
    <h4 class="mb-3">Just go back <span style="color: var(--laranja);">home</span>.</h4>

    <button class="orange-btn" @click="$router.push({ name: getLoggedUserID ? 'Home' : 'Authentication' })">Take me back</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Error",
  computed: {
    ...mapGetters(["getLoggedUserID"])
  }
};
</script>

<style scoped>
</style>
