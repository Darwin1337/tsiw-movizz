<template>
  <div class="mt-3" v-if="!loading.users">
    <div>
      <div class="row g-3">
        <div class="col-md-12 col-lg-6 col-sm-12 d-flex" v-for="i in (data.users.length >= mostrar ? mostrar : data.users.length)" :key="i">
          <div class="member d-flex align-items-center cardUser w-100 justify-content-between">
            <div style="position: relative;" class="padding-10" >
              <img :src="data.users[i - 1].avatar" width="50px" height="50px" style="border-radius: 50%; object-fit: cover; object-position: center top;">
              <p class="member-level big">{{ data.users[i - 1].stats.level }}</p>
            </div>
            <div class="padding-10">
              <b>{{ data.users[i - 1].first_name + " " + data.users[i - 1].last_name }}</b><span style="color:var(--cinza-claro);"> {{ data.users[i - 1].badge_id.name }}</span>
              <p class="m-0" style="color:var(--cinza-claro);"><b>Registered since</b> {{ new Date(data.users[i - 1].register_date).getDate() + "/" + (parseInt(new Date(data.users[i - 1].register_date).getMonth()) + 1) + "/" + new Date(data.users[i - 1].register_date).getFullYear() }}</p>
            </div>
            <div class="padding-10">
              <p class="m-0" style="color:var(--cinza-claro);"><b>{{ data.users[i - 1].is_locked ? "Blocked" : "Not blocked" }}</b></p>
            </div>
            <span :style="{ opacity: getLoggedUserData.data.id == data.users[i - 1].id ? '0' : '1'}" class="unblock-button" @click="changeLocked(data.users[i - 1].id)"><i class="fas fa-ban"></i></span>
            <div class="padding-10">
              <button class="detailsButton" @click="$router.push({ name: 'Profile', params: { id: data.users[i - 1].id } })">Details</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="mostrar < data.users.length" class="w-100 d-flex justify-content-center mt-4">
        <button class="rounded-btn" @click="mostrar = mostrar + 12 <= data.users.length ? mostrar + 12 : data.users.length">Load More</button>
      </div>
    </div>
  </div>
  <div v-else class="d-flex flex-column justify-content-center align-items-center text-center">
    <img src="../assets/images/loading.gif" alt="">
    <h3>We thought this would be faster as well, <span style="color: var(--laranja);">sorry</span>.</h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AdminUsers",
  data() {
    return {
      mostrar: 12,
      data: {
        users: []
      },
      loading: {
        users: true
      }
    }
  },
  mounted () {
    this.getUsers();
  },
  methods: {
    ...mapActions(["getAllUsers", "changeLockedStatus"]),
    async getUsers() {
      try {
        this.loading.users = true;
        this.data.users = await this.getAllUsers();
        if (this.data.users.success) {
          this.data.users = this.data.users.msg;
          this.loading.users = false;
        } else {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        } 
      } catch (e) {
        this.$router.push({ name: 'Error', params: { '0': 'error' } });
      }
    },
    async changeLocked(id) {
      if (this.getLoggedUserData.data.id != id) {
        try {
          const res = await this.changeLockedStatus(id);
          if (res.success) {
            this.data.users[this.data.users.findIndex(user => user.id == id)].is_locked = !this.data.users[this.data.users.findIndex(user => user.id == id)].is_locked;
          } else {
            throw new Error(res.msg);
          } 
        } catch (e) {
          this.$swal('Error!', e.message, 'error');
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getLoggedUserData"])
  }
};
</script>

<style scoped>
  a {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
  .active {
    color: var(--laranja);
    border-bottom: 1px solid var(--laranja);
  }
  .filters select {
    border-radius: 35px !important;
  }
  .filters button {
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
  }
  .filters input {
    border-radius: 35px !important;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }
  #section2 input {
    border-radius: 5px;
  }
  #section2 input.bg-inputs {
    border-radius: 0;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  #section2 textarea {
    border-radius: 5px;
  }
  #section2 select {
    border-radius: 5px;
  }
  .backgroundQuestions {
    background-color: var(--cinza3);
    border-radius: 5px;
  }
  .removeQuestion {
    color: white;
    background: var(--vermelho);
    padding: 8px;
    border-radius: 30px;
    cursor: pointer;
  }
  .editQuestion {
    color: black;
    background: var(--verde);
    padding: 8px;
    border-radius: 30px;
    cursor: pointer;
  }
  .removeIcon {
    position: absolute;
    bottom: 6px;
    background-color: var(--vermelho);
    color: white;
    padding: 8px 8px;
    border-radius: 30px;
    cursor: pointer;
  }
  .uploadButton {
    width: 100%;
    padding: 5px 15px;
    border: none !important;
    background: var(--cinza-claro);
    border-radius: 5px;
  }
  .quizImg img {
    border-radius: 5px;
    object-position: top center;
    height: 280px;
    width: 100%;
    object-fit: cover;
  }
  .colorOrange {
    color: var(--laranja);
  }
  .addQuestionButton {
    background-color: var(--laranja);
    border-radius: 5px;
    color: black;
    padding: 10px 25px;
  }
  .addNewQuizButton {
    background-color: var(--laranja);
    color: black;
    padding: 8px 25px;
    border: none;
    border-radius: 5px;
  }
  .editQuizButton {
    padding: 10px;
    margin: 10px 0px;
    background-color: var(--azul-escuro2);
    color: var(--cinza-claro);
    border: none;
    border-radius: 5px;
  }
  .editQuizButtonPrizes {
    padding: 10px;
    margin: 10px 0px;
    background-color: var(--cinza-claro);
    color: black;
    border: none;
    border-radius: 5px;
  }
  .removeQuizButton {
    padding: 10px;
    margin: 0px 0px;
    background-color: var(--vermelho);
    color: white;
    border: none;
    border-radius: 5px;
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
    left: 100px;
    bottom: 0;
    right: 0;
    position: fixed;
    z-index: -1;
    height: 100%;
  }
  .modalrewards {
    background-color: #151E2E;
  }
  .padding-10 {
    padding: 10px;
  }
  .detailsButton {
    background-color: var(--cinza3);
    border: none;
    color: var(--cinza-claro);
    border-radius: 5px;
    padding: 10px 23px;
  }
  .cardUser {
    border-radius: 5px;
    background-color: var(--azul-escuro2)
  }
  .block-button {
    background: var(--vermelho);
    border-radius: 5px;
    padding: 10px;
  }
  .unblock-button {
    background: #ffffff;
    border-radius: 5px;
    color: var(--vermelho);
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .member-level {
    position: absolute;
    background-color: var(--azul-claro);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    color: var(--bg);
    font-weight: bold;
  }
  .member-level.big {
    width: 25px;
    height: 25px;
    font-size: .85em;
    top: 41px;
    left: 41px;
  }
  .member-level.small {
    width: 20px;
    height: 20px;
    font-size: .75em;
    top: 25px;
    left: 25px;
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
  form textarea {
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
  form input.bg-inputs,
  form input.bg-inputs:focus {
    outline: none;
    border: none;
    box-shadow: none;
    background-color: #1D232E;
    color: white;
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
  select:focus {
    outline: none;
  }
  select::-ms-expand {
    display: none;
  }
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
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
  .tile__details {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: 1 ;
    transition: 450ms opacity;
    border-radius: 5px;
  }
  .input-group-text .fas {
      color: #AFB3B7;
  }
  .input-group-text {
      border: none !important;
      background: #1D232E;
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
  .navigation {
    font-size: 1.25em;
    gap: 0 5em;
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
  }
  @media (max-width: 575px) {
    .cardUser {
      flex-direction: column;
      text-align: center;
    }
  }
  @media (max-width: 991px) {
    .cardUser {
      margin-bottom: 20px;
    }
    .navigation {
      gap: 0 2em;
    }
  }
</style>
