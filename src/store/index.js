import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedUser: localStorage.loggedUser ? JSON.parse(localStorage.loggedUser) : null,
    loggedUserData: localStorage.loggedUserData ? JSON.parse(localStorage.loggedUserData) : null,
    api_keys: ["k_bxe02t9j", "k_82n08589", "k_z0rw7im2", "k_ysbktlgy", "k_z0rw7im2", "k_n116qcbn", "k_h21sbegj", "k_utdlvs0n", "k_14iolt3q", "k_p9fk9brd", "k_3gpl3mmq", "k_23fa7215", "k_08fh2pq9", "k_8luslxgk", "k_zhzvooqo", "k_o6h8ohp8"],
    cur_api: 0,
    tries_main: 0,
    tries_eps: 0,
    urlApi:"https://movizz-api.onrender.com"
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
        const response = await fetch(state.urlApi+"/api/auth", {
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
        const response = await fetch(state.urlApi+"/api/users", {
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
        const response = await fetch(state.urlApi+"/api/users", {
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
    async getAllTitles({context, state}, origin) {
      try {
        const response = await fetch(origin ? state.urlApi+"/api/titles?navbar=true" : state.urlApi+"/api/titles", {
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
        const response = await fetch(state.urlApi+"/api/quizzes", {
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
        const response = await fetch(state.urlApi+"/api/badges", {
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
    async getAllGenres({context, state}) {
      try {
        const response = await fetch(state.urlApi+"/api/genres", {
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
    async getAllThemes({context, state}) {
      try {
        const response = await fetch(state.urlApi+"/api/themes", {
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
    async getAllPrizes({context, state}) {
      try {
        const response = await fetch(state.urlApi+"/api/prizes", {
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
    async getAllPlatforms({context, state}) {
      try {
        const response = await fetch(state.urlApi+"/api/platforms", {
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
    async getUser({context, state}, user) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + user.id, {
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
        const response = await fetch(state.urlApi+"/api/titles/"+title.id, {
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
    async getQuiz({context, state}, quiz) {
      try {
        const response = await fetch(state.urlApi+"/api/quizzes/"+quiz.id, {
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
    async getBest10Titles({context, state}, isMovie) {
      try {
        const response = await fetch(state.urlApi+"/api/titles?top10=true&movie=" + isMovie, {
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
        const response = await fetch(state.urlApi+"/api/quizzes?top10=true", {
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
    async getTop5Users({context, state}) {
      try {
        const response = await fetch(state.urlApi+"/api/users?top5=true", {
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
    async extAPIgetTitle({context, state}, title) {
      try {
        const response = await fetch(`https://imdb-api.com/en/API/Title/${ state.api_keys[state.cur_api] }/${ title }/FullCast,Posters,Trailer`);

        if (response.ok) {
          return await response.json();
        } else {
          throw new Error;
        }
      } catch (e) {
        throw new Error;
      }
    },
    async extAPIgetSeason({context, state}, title) {
      try {
        const response = await fetch(`https://imdb-api.com/en/API/SeasonEpisodes/${ this.state.api_keys[this.state.cur_api] }/${ title.id }/${ title.season }`);

        if (response.ok) {
          return await response.json();
        } else {
          throw new Error;
        }
      } catch (e) {
        throw new Error;
      }
    },
    async registerTitle({context, state}, title) {
      try {
        const response = await fetch(state.urlApi+"/api/titles", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ title })
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
    async removeTitle({context, state}, data) {
      try {
        const response = await fetch(state.urlApi+"/api/titles/" + data, {
          method: "DELETE",
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
    async changePlatforms({context, state}, data) {
      try {
        const response = await fetch(state.urlApi+"/api/titles/" + data.imdb_id + "/platforms", {
          method: "PATCH",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ platforms: data.platforms })
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
    async addPrize({context, state}, prize) {
      try {
        const response = await fetch(state.urlApi+"/api/prizes", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify(prize)
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
    async editPrize({context, state}, prize) {
      try {
        const response = await fetch(state.urlApi+"/api/prizes/" + prize.prize_id, {
          method: "PATCH",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify(prize.data)
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
    async deletePrize({context, state}, prize) {
      try {
        const response = await fetch(state.urlApi+"/api/prizes/" + prize, {
          method: "DELETE",
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
    async addQuiz({context, state}, quiz) {
      try {
        const response = await fetch(state.urlApi+"/api/quizzes", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify(quiz)
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
    async editQuiz({context, state}, quiz) {
      try {
        const response = await fetch(state.urlApi+"/api/quizzes/" + quiz.quiz_id, {
          method: "PATCH",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify(quiz.data)
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
    async deleteQuiz({context, state}, quiz) {
      try {
        const response = await fetch(state.urlApi+"/api/quizzes/" + quiz, {
          method: "DELETE",
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
    // User related stuff
    async changeUserBadge({context, state}, user) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + user.id + "/badges", {
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
        const response = await fetch(state.urlApi+"/api/users/" + user.id, {
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
        const response = await fetch(state.urlApi+"/api/users/" + user.id + "/avatar", {
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
    },
    async addComment({context, state}, comment) {
      try {
        
        const response = await fetch(state.urlApi+"/api/titles/"+comment.imdb_id+"/comments", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ user_id: comment.id_user, comment:comment.comment, spoiler:comment.spoiler, title_id: comment.id_title})
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
    async removeCommentById({context, state}, title) {
      try {
        const response = await fetch(state.urlApi+"/api/titles/" + title.imdb_id + "/comments", {
          method: "DELETE",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({
            '_id_comment': title._id,
            '_id_title': title.title_id
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
    async addFavourite({context, state}, user) {
      try {
        const response = await fetch(state.urlApi+"/api/users/"+user.id+"/favourites", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ title: user.imdb_id })
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
    async removeFavourite({context, state}, user) {
      try {
        const response = await fetch(state.urlApi+"/api/users/"+user.id+"/favourites", {
          method: "DELETE",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ title: user.imdb_id })
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
    async addSeen({context, state}, user) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + user.id + "/seen", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ title: user.imdb_id })
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
    async removeSeen({context, state}, user) {
      try {
        const response = await fetch(state.urlApi+"/api/users/"+user.id+"/seen", {
          method: "DELETE",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ title: user._id })
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
    async getRating({context, state}, user) {
    try {
      const response = await fetch(state.urlApi+"/api/users/"+user.user_id+"/title_ratings/"+user.imdb_id, {
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
    async addRatings({context, state}, rating) {
      try {
        const response = await fetch(state.urlApi+"/api/users/"+rating.id_user+"/title_ratings/"+rating.imdb_id, {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ title_id:rating.id_title, rating:rating.rating })
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
    async changeRatings({context, state}, rating) {
      try {
        const response = await fetch(state.urlApi+"/api/users/"+rating.id_user+"/title_ratings/"+rating.imdb_id, {
          method: "PATCH",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ title_id:rating.id_title, rating:rating.rating })
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
    async deleteRatings({context, state}, rating) {
      try {
        const response = await fetch(state.urlApi+"/api/users/"+rating.id_user+"/title_ratings/"+rating.imdb_id, {
          method: "DELETE",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ title_id:rating.id_title, rating:rating.rating })
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
    async changeLockedStatus({context, state}, id) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + id + "/is_locked", {
          method: "PATCH",
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
    async addQuizAttempt({context, state}, user) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + state.loggedUserData.data.id + "/played", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({
            quiz_id: user.quiz_id,
            questions_right: user.questions_right,
            questions_wrong: user.questions_wrong,
            allowed_points: user.allowed_points,
            was_completed: user.was_completed
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
    async updateQuizAttempt({context, state}, user) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + state.loggedUserData.data.id + "/played/" + user.played_id, {
          method: "PATCH",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({
            questions_right: user.questions_right,
            questions_wrong: user.questions_wrong,
            allowed_points: user.allowed_points,
            was_completed: user.was_completed
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
    async addPoints({context, state}, points) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + state.loggedUserData.data.id + "/points", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({
            points: points,
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
    async addXP({context, state}, xp) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + state.loggedUserData.data.id + "/xp", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({
            xp: xp,
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
    async redeemPrize({context, state}, prize) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + state.loggedUserData.data.id + "/prizes_reedemed", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ prize_id: prize.id, price: prize.price })
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
    async addQuizComment({context, state}, data) {
      try {
        const response = await fetch(state.urlApi+"/api/quizzes/" + data.quiz_id + "/comments", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ comment: data.comment })
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
    async removeQuizComment({context, state}, data) {
      try {
        const response = await fetch(state.urlApi+"/api/quizzes/" + data.quiz_id + "/comments/" + data.comment_id, {
          method: "DELETE",
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
    async addQuizRating({context, state}, data) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + state.loggedUserData.data.id + "/quiz_ratings", {
          method: "POST",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({
            quiz_id: data.quiz_id,
            rating: data.rating
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
    async changeQuizRating({context, state}, data) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + state.loggedUserData.data.id + "/quiz_ratings/" + data.quiz_id, {
          method: "PATCH",
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.loggedUser.auth_key
          },
          body: JSON.stringify({ rating: data.rating })
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
    async removeQuizRating({context, state}, data) {
      try {
        const response = await fetch(state.urlApi+"/api/users/" + state.loggedUserData.data.id + "/quiz_ratings/" + data.quiz_id, {
          method: "DELETE",
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
    }
  },
  modules: {
  }
});
