<template>
  <div>
    <div class="jumbotron">
      <div class="d-flex h-100 flex-column align-items-center justify-content-center">
        <img id="logo" src="../assets/images/logo.svg" alt="Logo" width="35%" />
        <p class="title">we're glad you made it</p>
      </div>
    </div>
    <div class="container">
      <div class="bg w-100 h-100">
      <div class="row mb-5">
        <div class="col-md-7">
          <p class="seccion-title">Frequently Asked Questions</p>
          <p class="faq-title">What's this about?</p>
          <p class="faq-text">Well, sad to hear you clearly didn't understand the assignment. Good thing we are here to
            help.
            Long story short, answer quizzes about your favourite movies and TV shows and earn great prizes!</p>
          <br>
          <p class="faq-title">Ok... but what kind of prizes?</p>
          <p class="faq-text">From free month subscriptions of your favourite streaming platforms to full on paid trips
            to cinema festivals. We know... we might be spoiling you, but you deserve it.</p>
          <br>
          <p class="faq-title">Is there a catch to it?</p>
          <p class="faq-text">Wow, you must be real fun at parties... just kidding, we know you'd rather binge watch
            Breaking Bad again. No, there is literally none, just play and win. In the process show people who really is
            the one who knocks.</p>
          <br>
          <p class="faq-title">Thats... it?</p>
          <p class="faq-text">Well... yes, but actually no. We have tons of movies and series waiting to be discovered.
            If you ever feel like you got nothing to watch, you've come to the right place. Customizable filters
            and all the information you need to see if something is worth your time or no, because we know
            you're a busy person.</p>
          <br>
          <p class="faq-title">I'm in, where do I sign up?</p>
          <p class="faq-text">Thought you'd never ask.
            Fill out the sign up form and prove you're a legit cinephile and not just some poser.</p>
        </div>
        <div class="col-md-5">
          <p class="seccion-title">No time to waste?</p>
          <p class="login-title">Prove it's really you, <span style="color: #BBE1FA; font-weight: bold;">sign in</span>
          </p>
          <form id="login" class="mb-5" @submit.prevent="loginUser()">
            <div class="input-group">
              <input type="text" class="form-control bg-inputs" placeholder="E-mail" aria-label="E-mail" required v-model="old_user.email">
              <span class="input-group-text"><i class="fas fa-envelope"></i></span>
            </div>
            <br>
            <div class="input-group">
              <input type="password" class="form-control bg-inputs" placeholder="Password" aria-label="Password" required v-model="old_user.password">
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
            </div>
            <div class="text-center">
              <button type="submit" class="mt-4 orange-btn">Sign in</button>
            </div>
          </form>
          <p class="login-title"><span style="color: #BBE1FA; font-weight: bold;">Sign up</span>, we promise we won't
            sell your data</p>
          <form id="register" @submit.prevent="registerUser()">
            <div class="row g-4">
              <div class="col-sm-6">
                <input type="text" class="form-control bg-inputs" placeholder="First name" aria-label="First name" required v-model="new_user.primeiro_nome">
              </div>
              <div class="col-sm-6">
                <input type="text" class="form-control bg-inputs" placeholder="Last name" aria-label="Last name" required v-model="new_user.ultimo_nome">
              </div>
            </div>
            <br>
            <div class="input-group">
              <input type="email" class="form-control bg-inputs" placeholder="E-mail" aria-label="E-mail" required v-model="new_user.email">
              <span class="input-group-text"><i class="fas fa-envelope"></i></span>
            </div>
            <br>
            <div class="input-group">
              <input type="password" class="form-control bg-inputs" placeholder="Password" aria-label="Password" required v-model="new_user.password">
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
            </div>
            <br>
            <div class="input-group">
              <input type="text" class="form-control bg-inputs" onmouseenter="(this.type='date')" onfocus="(this.type='date')" placeholder="Date of birth" aria-label="Date of birth" required v-model="new_user.data_nascimento">
              <span class="input-group-text"><i class="fas fa-calendar"></i></span>
            </div>
            <div class="text-center">
              <button type="submit" class="mt-4 orange-btn">Sign up</button>
            </div> 
          </form>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      old_user: {
        email: '',
        password: ''
      },
      new_user: {
        primeiro_nome: '',
        ultimo_nome: '',
        email: '',
        password: '',
        data_nascimento: '',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        id_badge: 0,
        pontos: 0,
        xp: 0,
        nivel: 0,
        num_quizzes: 0,
        num_certas: 0,
        num_erradas: 0,
        num_ajudas: 0
      }
    }
  },
  methods: {
    ...mapMutations(["SET_LOGGED_USER"]),
    ...mapMutations(["SET_NEW_USER"]),
    loginUser() {
      if (this.isUser(this.old_user.email, this.old_user.password)) {
        this.SET_LOGGED_USER(this.old_user.email);
        this.$router.push({ name: "Home" });
      } else {
        this.$swal('Error!', 'The data entered is not in our system.', 'error');
      }
    },
    registerUser() {
      if (this.isEmailAvailable(this.new_user.email)) {
        this.new_user.id = this.getNextAvailableID;
        this.new_user.data_registo = new Date();
        this.SET_NEW_USER(this.new_user);
        this.$swal('Success!', 'The sign in was successful.', 'success');
      } else {
        this.$swal('Error!', 'The e-mail entered is already being used.', 'error');
      }
    }
  },
  computed: {
    ...mapGetters(["isEmailAvailable"]),
    ...mapGetters(["isUser"]),
    ...mapGetters(["getNextAvailableID"])
  }
}
</script>

<style scoped>  
  .jumbotron {
    background-image: url("../assets/images/authentication_banner.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 650px;
  }

  .bg {
    position: relative;
    display: block;
    z-index: 0;
  }

  .bg::after {
    content: "";
    background: url("../assets/images/twd_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  .title {
    color: white;
    font-size: 1.5em;
    margin-top: auto;
    font-weight: bold;
    margin-bottom: 75px;
  }

  #logo {
    width: 15%;
    min-width: 300px;
    margin-top: 25px;
    margin-bottom: auto;
  }

  .seccion-title {
    color: #84E296;
    font-weight: 900;
    font-size: 1.5em;
  }

  .faq-title {
    font-size: 1.25em;
    font-weight: bold;
    color:#BBE1FA;
  }

  .login-title {
    font-size: 1.25em;
    font-weight: bold;
    color: white;
  }

  .faq-text {
    color: white;
    font-weight: 500;
  }

  .input-group-text .fas {
      color: #AFB3B7;
  }

  .input-group-text {
      border: none !important;
      background: #1D232E;
  }
</style>