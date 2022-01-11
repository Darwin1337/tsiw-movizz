import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: localStorage.users ? JSON.parse(localStorage.users) :
      [
        {
          "id": 0,
          "primeiro_nome": "Admin",
          "ultimo_nome": "ESMAD",
          "email": "admin",
          "password": "esmad2122",
          "data_nascimento": "1990-01-01",
          "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          "id_badge": 0,
          "pontos": 0,
          "xp": 0,
          "nivel": 0,
          "num_quizzes": 0,
          "num_certas": 0,
          "num_erradas": 0,
          "num_ajudas": 0,
          "data_registo": new Date()
        },
        {
          "id": 1,
          "primeiro_nome": "User",
          "ultimo_nome": "ESMAD",
          "email": "user",
          "password": "esmad2122",
          "data_nascimento": "1990-01-01",
          "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          "id_badge": 0,
          "pontos": 0,
          "xp": 0,
          "nivel": 0,
          "num_quizzes": 0,
          "num_certas": 0,
          "num_erradas": 0,
          "num_ajudas": 0,
          "data_registo": new Date()
        }
      ],
    loggedUser: localStorage.loggedUser ? JSON.parse(localStorage.loggedUser) : null,
    badges: localStorage.badges ? JSON.parse(localStorage.badges) :
      [
        {
          "icon": require("../assets/images/badges/0.svg"),
          "name": "Freshman",
          "xp_min": 0,
          "xp_max": 749,
          "level": 0
        },
        {
          "icon": require("../assets/images/badges/1.svg"),
          "name": "Sophomore",
          "xp_min": 750,
          "xp_max": 1499,
          "level": 5
        },
        {
          "icon": require("../assets/images/badges/2.svg"),
          "name": "Junior",
          "xp_min": 1500,
          "xp_max": 2249,
          "level": 10
        },
        {
          "icon": require("../assets/images/badges/3.svg"),
          "name": "Senior",
          "xp_min": 2250,
          "xp_max": 2999,
          "level": 15
        },
        {
          "icon": require("../assets/images/badges/4.svg"),
          "name": "Graduated",
          "xp_min": 3000,
          "xp_max": 3749,
          "level": 20
        },
        {
          "icon": require("../assets/images/badges/5.svg"),
          "name": "Apprentice",
          "xp_min": 3750,
          "xp_max": 4499,
          "level": 25
        },
        {
          "icon": require("../assets/images/badges/6.svg"),
          "name": "Extra",
          "xp_min": 4500,
          "xp_max": 5249,
          "level": 30
        },
        {
          "icon": require("../assets/images/badges/7.svg"),
          "name": "Producer",
          "xp_min": 5250,
          "xp_max": 5999,
          "level": 35
        },
        {
          "icon": require("../assets/images/badges/8.svg"),
          "name": "Expert",
          "xp_min": 6000,
          "xp_max": 6749,
          "level": 40
        },
        {
          "icon": require("../assets/images/badges/9.svg"),
          "name": "Cinema God",
          "xp_min": 6750,
          "xp_max": 7499,
          "level": 45
        },
        {
          "icon": require("../assets/images/badges/10.svg"),
          "name": "Freshman",
          "xp_min": 7500,
          "xp_max": 999999999,
          "level": 50
        }
      ]
  },
  getters: {
    isEmailAvailable: (state) => (email) => state.users.every((user) => user.email !== email),
    getLoggedUser: (state) => state.loggedUser,
    isUser: (state) => (email, password) => state.users.some((user) => user.email === email && user.password === password),
    getBadges: (state) => state.badges,
    getNextAvailableID: (state) => state.users ? state.users[state.users.length - 1].id + 1 : 0,
    getAllUsers: (state) => state.users
  },
  mutations: {
    SET_LOGGED_USER(state, payload) {
      state.loggedUser = state.users.find((user) => user.email === payload);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    SET_NEW_USER(state, payload) {
      state.users.push(payload);
      localStorage.users = JSON.stringify(state.users);
    },
    SET_LOGOUT(state) {
      state.loggedUser = null;
      localStorage.removeItem("loggedUser");
    },
    SET_EDITED_USER(state, payload) {
      if (!payload.isAvatar) {
        state.users[payload.index].primeiro_nome = payload.primeiro_nome;
        state.users[payload.index].ultimo_nome = payload.ultimo_nome;
        state.users[payload.index].email = payload.email;
        state.users[payload.index].password = payload.password;
        state.users[payload.index].data_nascimento = payload.data_nascimento;
        localStorage.users = JSON.stringify(state.users);
      } else {
        state.users[payload.index].avatar = payload.avatar;
        localStorage.users = JSON.stringify(state.users);
      }
    },
    SET_NEW_BADGE(state, payload) {
      state.users[payload.index].id_badge = payload.id_badge;
      localStorage.users = JSON.stringify(state.users);
    }
  }
});
