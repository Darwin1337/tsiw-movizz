import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedUser: localStorage.loggedUser ? JSON.parse(localStorage.loggedUser) : null,
    loggedUserData: localStorage.loggedUserData ? JSON.parse(localStorage.loggedUserData) : null
  },
  getters: {
    getLoggedUserID: (state) => (state.loggedUser) ? JSON.parse(atob(state.loggedUser.auth_key.split('.')[1])).id : null,
    getLoggedUserData: (state) => state.loggedUserData
  },
  mutations: {
    LOGOUT_USER(state, payload) {
      state.loggedUser = null;
      state.loggedUserData = null;
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("loggedUserData");
    }
  },
  actions: {
    async loginUser({context, state}, user) {
      try {
        state.loggedUserData = { data: {}, loading: true };
        const response = await fetch("http://127.0.0.1:3000/api/auth", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });

        const data = await response.json();
        if (response.ok) {
          state.loggedUser = { auth_key: data.auth_key, exp_date: data.exp_date };
          localStorage.loggedUser = JSON.stringify({ auth_key: data.auth_key, exp_date: data.exp_date });
          state.loggedUserData.data = await this.dispatch('getUser', { id: JSON.parse(atob(data.auth_key.split('.')[1])).id });
          state.loggedUserData.data = state.loggedUserData.data.msg[0];
          state.loggedUserData.loading = false;
          localStorage.loggedUserData = JSON.stringify(state.loggedUserData);
          return data;
        } else {
          throw Error(data.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async registerUser({context, state}, user) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/users", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user })
        });
  
        if (response.ok) {
          return await response.json();
        } else {
          const data = await response.json();
          throw Error(data.msg);
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
          const data = await response.json();
          throw Error(data.msg);
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
          const data = await response.json();
          throw Error(data.msg);
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
          const data = await response.json();
          throw Error(data.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async getAllBadges({context, state}) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/badges", {
          method: "GET",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          }
        });

        let data = await response.json();
        if (response.ok) {
          data.msg = data.msg.sort((a,b) => a.badge_id - b.badge_id);
          return data;
        } else {
          throw Error(data.msg);
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
          const data = await response.json();
          throw Error(data.msg);
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
          const data = await response.json();
          throw Error(data.msg);
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
          const data = await response.json();
          throw Error(data.msg);
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
          const data = await response.json();
          throw Error(data.msg);
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
          const data = await response.json();
          throw Error(data.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async changeUserBadge({context, state}, user) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/users/" + user.id + "/badges", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ 'badge_id': user.badge_id })
        });
  
        if (response.ok) {
          return await response.json();
        } else {
          const data = await response.json();
          throw Error(data.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async editUser({context, state}, user) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/users/" + user.id, {
          method: "PATCH",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'password': user.password,
            'dob': String(user.dob),
            'is_admin': user.is_admin,
            'is_locked': user.is_locked
          })
        });
  
        if (response.ok) {
          return await response.json();
        } else {
          const data = await response.json();
          throw Error(data.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    },
    async changeUserAvatar({context, state}, user) {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/users/" + user.id + "/avatar", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ 'avatar': user.avatar })
        });
  
        if (response.ok) {
          return await response.json();
        } else {
          const data = await response.json();
          throw Error(data.msg);
        }
      } catch (e) {
        throw Error(e.message);
      }
    }
  },
  modules: {
  }
});
