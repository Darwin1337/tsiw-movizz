import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedUser: localStorage.loggedUser ? JSON.parse(localStorage.loggedUser) : null
  },
  getters: {
    getLoggedUserID: (state) => (state.loggedUser) ? JSON.parse(atob(state.loggedUser.auth_key.split('.')[1])).id : null
  },
  mutations: {
    SET_LOGGED_USER(state, payload) {
      // Guardar o token JWT na localstorage
      localStorage.loggedUser = JSON.stringify({ auth_key: payload.auth_key, exp_date: payload.exp_date });
      state.loggedUser = { auth_key: payload.auth_key, exp_date: payload.exp_date };
      console.log("JWT token: " + payload.auth_key);
      console.log("Expires at: " + payload.exp_date.toString());
    }
  },
  actions: {
    async loginUser(context, data) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/auth", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          const data = await response.json();
          context.commit("SET_LOGGED_USER", data);
        } else {
          throw Error(response.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async getAllUsers({context, state}) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/users", {
          method: "GET",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          }
        });
  
        if (response.ok) {
          return await response.json();
        } else {
          throw Error(response.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async getTitle({context, state}, title) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/titles/"+title.id, {
          method: "GET",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          }
        });
  
        if (response.ok) {
          return await response.json();
        } else {
          throw Error(response.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async getAllTitles({context, state}) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/titles", {
          method: "GET",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          }
        });
  
        if (response.ok) {
          return await response.json();
        } else {
          throw Error(response.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async getAllQuizzes({context, state}) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/quizzes", {
          method: "GET",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          }
        });

        if (response.ok) {
          return await response.json();
        } else {
          throw Error(response.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async getAllBadges({context, state}) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/quizzes", {
          method: "GET",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          }
        });

        if (response.ok) {
          return await response.json();
        } else {
          throw Error(response.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async getUser({context, state}, user) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/users/" + user.id, {
          method: "GET",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          }
        });

        if (response.ok) {
          return await response.json();
        } else {
          throw Error(response.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async getBest10Movies({context, state}) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/titles?top10=true&movie=true", {
          method: "GET",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          }
        });

        if (response.ok) {
          return await response.json();
          
        } else {
          throw Error(response.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async getBest10Series({context, state}) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/titles?top10=true&movie=false", {
          method: "GET",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          }
        });
  
        if (response.ok) {
          return await response.json();
        } else {
          throw Error(response.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async getBest10Quizzes({context, state}) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/quizzes?top10=true", {
          method: "GET",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          }
        });
  
        if (response.ok) {
          return await response.json();
        } else {
          throw Error(response.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    }
  },
  modules: {}
});
