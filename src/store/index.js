import Vue from "vue";
import Vuex from "vuex";

// Popular a localstorage com informação pré-determinada
import dataObra from "../assets/data/obra.json";
import dataGenero from "../assets/data/genero.json";
import dataUsers from "../assets/data/users.json";
import dataPlatforms from "../assets/data/plataformas.json";
import dataPremios from "../assets/data/premios.json";
import dataPremioUtilizador from "../assets/data/premio_utilizador.json";
import dataQuiz from "../assets/data/quiz.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    obra: localStorage.obra ? JSON.parse(localStorage.obra) : dataObra,
    plataformas: localStorage.plataformas ? JSON.parse(localStorage.plataformas) : dataPlatforms,
    genero: localStorage.genero ? JSON.parse(localStorage.genero) : dataGenero,
    users: localStorage.users ? JSON.parse(localStorage.users) : dataUsers,
    badges: localStorage.badges ? JSON.parse(localStorage.badges) : [{"icon":require("../assets/images/badges/0.svg"),"name":"Freshman","xp_min":0,"xp_max":749,"level":0},{"icon":require("../assets/images/badges/1.svg"),"name":"Sophomore","xp_min":750,"xp_max":1499,"level":5},{"icon":require("../assets/images/badges/2.svg"),"name":"Junior","xp_min":1500,"xp_max":2249,"level":10},{"icon":require("../assets/images/badges/3.svg"),"name":"Senior","xp_min":2250,"xp_max":2999,"level":15},{"icon":require("../assets/images/badges/4.svg"),"name":"Graduated","xp_min":3000,"xp_max":3749,"level":20},{"icon":require("../assets/images/badges/5.svg"),"name":"Apprentice","xp_min":3750,"xp_max":4499,"level":25},{"icon":require("../assets/images/badges/6.svg"),"name":"Extra","xp_min":4500,"xp_max":5249,"level":30},{"icon":require("../assets/images/badges/7.svg"),"name":"Producer","xp_min":5250,"xp_max":5999,"level":35},{"icon":require("../assets/images/badges/8.svg"),"name":"Expert","xp_min":6000,"xp_max":6749,"level":40},{"icon":require("../assets/images/badges/9.svg"),"name":"Cinema God","xp_min":6750,"xp_max":7499,"level":45},{"icon":require("../assets/images/badges/10.svg"),"name":"Freshman","xp_min":7500,"xp_max":999999999,"level":50}],
    loggedUser: localStorage.loggedUser ? JSON.parse(localStorage.loggedUser) : null,
    obras_gosto: localStorage.obras_gosto ? JSON.parse(localStorage.obras_gosto) : [],
    vistos: localStorage.vistos ? JSON.parse(localStorage.vistos) : [],
    classificacao_obra: localStorage.classificacao_obra ? JSON.parse(localStorage.classificacao_obra) : [{ id_imdb:"tt0366551", id_utilizador: 1, pontuacao: 4 }],
    classificacao_quiz: localStorage.classificacao_quiz ? JSON.parse(localStorage.classificacao_quiz) : [],
    comentarios_obra: localStorage.comentarios_obra ? JSON.parse(localStorage.comentarios_obra) : [{ id_comentario: 0, id_imdb: "tt0366551", id_utilizador: 1, comentario: "Bom filme!", data: "2022-01-20T18:06:43.231Z" }],
    comentarios_quiz: localStorage.comentarios_quiz ? JSON.parse(localStorage.comentarios_quiz) : [],
    cur_api: 0,
    api_keys: [],
    quant_calls: 0,
    quiz: localStorage.quiz ? JSON.parse(localStorage.quiz) : dataQuiz,
    premios:localStorage.premios?JSON.parse(localStorage.premios) : dataPremios,
    premios_utilizador:localStorage.premios_utilizador?JSON.parse(localStorage.premios_utilizador) : dataPremioUtilizador,
  },
  getters: {
    isEmailAvailable: (state) => (email) => state.users.every((user) => user.email !== email),
    getLoggedUser: (state) => state.loggedUser,
    isUser: (state) => (email, password) => state.users.some((user) => user.email === email && user.password === password),
    getBadges: (state) => state.badges,
    getNextAvailableUserID: (state) => state.users.length > 0 ? state.users[state.users.length - 1].id + 1 : 0,
    getAllUsers: (state) => state.users,
    getAllTitles: (state) => state.obra,
    getAllGenres: (state) => state.genero,
    getTitleInfo: (state) => (id) => state.obra.find(obra => obra.id_imdb == id),
    getTitleLikes: (state) => (id) => state.obras_gosto.filter(titulo => titulo.id_utilizador == id).map(titulo => titulo.id_imdb),
    getTitlesSeenByUser: (state) => (id) => state.vistos.filter(titulo => titulo.id_utilizador == id).map(visto => visto.id_imdb),
    getTitleComments: (state) => (id_imdb) => state.comentarios_obra.filter(comentario => comentario.id_imdb == id_imdb),
    getQuizComments: (state) => (id_quiz) => state.comentarios_quiz.filter(comentario => comentario.id_quiz == id_quiz),
    getNextAvailableTitleCommentID: (state) => state.comentarios_obra.length > 0 ? state.comentarios_obra[state.comentarios_obra.length - 1].id_comentario + 1 : 0,
    getNextAvailableQuizCommentID: (state) => state.comentarios_quiz.length > 0 ? state.comentarios_quiz[state.comentarios_quiz.length - 1].id_comentario + 1 : 0,
    getUserTitleRating: (state) => (id, id_imdb) => state.classificacao_obra.find(classificacao => classificacao.id_utilizador == id && classificacao.id_imdb == id_imdb),
    getUserQuizRating: (state) => (id, id_quiz) => state.classificacao_quiz.find(classificacao => classificacao.id_utilizador == id && classificacao.id_quiz == id_quiz),
    getAllViewsByTitle: (state) => state.obra.map(title => { return({ id_imdb: title.id_imdb, visualizacoes: state.vistos.filter(visto => visto.id_imdb == title.id_imdb).length }) }),
    getTitleMovizzRating: (state) => (id) => parseFloat(parseFloat(state.classificacao_obra.filter(rating => rating.id_imdb == id).map(rating => rating.pontuacao).reduce((accum, curr) => accum + curr, 0)) / parseFloat(state.classificacao_obra.filter(rating => rating.id_imdb == id).length || 1)).toFixed(1),
    getQuizRating: (state) => (id) => parseFloat(parseFloat(state.classificacao_quiz.filter(rating => rating.id_quiz == id).map(rating => rating.pontuacao).reduce((accum, curr) => accum + curr, 0)) / parseFloat(state.classificacao_quiz.filter(rating => rating.id_quiz == id).length || 1)).toFixed(1),
    getAllPrizes: (state) => state.premios,
    getAllPremiosUtilizador: (state) => state.premios_utilizador,
    getPremioInfo:(state)=>(id)=>state.premios.find(premio => premio.id_premio == id),
    getAllCommentsLoggedUser: (state) =>(id)=> state.comentarios_obra.filter(comentario=>comentario.id_utilizador==id),
    getAllRatingsLoggedUser: (state) =>(id)=> state.classificacao_obra.filter(classificacao=>classificacao.id_utilizador==id),
    getQuizByID: (state) => (id) => state.quiz.find(quiz => quiz.id_quiz == id)
  },
  actions:{
    // async loadMovies(context) {
    //   for (let i=0; i<25; i++) {
    //     console.log("Série nmr. " + (i + 1));
    //     console.log("A ir buscar info de:" + this.state.tempSeries[i].title);
    //     let wasfound=false;
    //     for (let j=0; j<this.state.obra.length; j++) {
    //       if(this.state.tempSeries[i].id==this.state.obra[j].id_imdb){
    //         wasfound=true;
    //         console.log(this.state.tempSeries[i].title + " already exists, skipping");
    //       }
    //     }
    //     if(!wasfound){
    //       const response = await fetch(
    //         `https://imdb-api.com/en/API/Title/${this.state.api_keys[this.state.cur_api]}/${this.state.tempSeries[i].id}/FullCast,Posters,Trailer`
    //       );
    //       this.state.quant_calls += 3;
    //       if (response.ok) {
    //         console.log("à espera da response")
    //         const beSure = await response.json();
    //         console.log("recebeu response")
    //         if (!beSure.errorMessage || beSure.errorMessage == null || beSure.errorMessage == "null") {
    //           console.log("a dar set à obra")
    //           context.commit("SET_OBRA", beSure);
    //           console.log(this.state.tempSeries[i].title + ": a gurdar a informação");
    //           if (beSure.tvSeriesInfo || beSure.tvSeriesInfo != null || beSure.tvSeriesInfo != "null") {
    //             console.log(this.state.tempSeries[i].title + ": a ir buscar as temporadas (" + beSure.tvSeriesInfo.seasons.length +")");
    //             await this.dispatch('loadSeriesSeason', beSure);
    //           }
    //         } else {
    //           console.log("api was changed check logs");
    //           console.log("next index was supposed to be: " + i);
    //           console.log("but now we are going to repeat: " + (i - 1));
    //           i--;
    //           localStorage.setItem(this.state.cur_api + '_exceeded', new Date());
    //           this.state.cur_api = this.state.cur_api < (this.state.api_keys.length - 1) ? this.state.cur_api += 1 : this.state.cur_api = 7;
    //         }
    //       } else {
    //         console.log("api was changed check logs");
    //         console.log("next index was supposed to be: " + i);
    //         console.log("but now we are going to repeat: " + (i - 1));
    //         i--;
    //         localStorage.setItem(this.state.cur_api + '_exceeded', new Date());
    //         this.state.cur_api = this.state.cur_api < (this.state.api_keys.length - 1) ? this.state.cur_api += 1 : this.state.cur_api = 7;
    //         // throw new Error(response.status);
    //       }
    //     }
    //   }
    // },
    // async loadMovies(context) {
    //   console.log("starting...")
    //   for(let i=0; i<25; i++) {
    //     let wasfound=false;
    //     for (let j=0; j<this.state.obra.length; j++) {
    //       if(this.state.movies[i].id==this.state.obra[j].id_imdb){
    //         console.log("já tem");
    //         wasfound=true;
    //       }
    //     }
    //     if(!wasfound){
    //       const response = await fetch(
    //         `https://imdb-api.com/en/API/Title/k_82n08589/${this.state.movies[i].id}/FullCast,Posters,Trailer`
    //       );
    //       if (response.ok) {
    //         context.commit("SET_OBRA", await response.json());
    //       } else {
    //         throw new Error(response.status);
    //       }
    //     }
    //   }
    // },
    // async loadSeriesSeason(context, payload) {
    //   for (let j = 0; j < payload.tvSeriesInfo.seasons.length; j++) {
    //     console.log("A ir buscar temporada " + (j + 1) + " de " + payload.title);
    //     const response = await fetch(
    //       `https://imdb-api.com/en/API/SeasonEpisodes/${this.state.api_keys[this.state.cur_api]}/${payload.id}/${j + 1}`
    //     );
    //     this.state.quant_calls += 1;
    //     if (response.ok) {
    //       const beSure = await response.json();
    //       if (!beSure.errorMessage || beSure.errorMessage == null || beSure.errorMessage == "null") {
    //         context.commit("SET_SEASON", beSure);
    //       } else {
    //         console.log("SEASONS: api was changed check logs");
    //         console.log("SEASONS: next index was supposed to be: " + j);
    //         console.log("SEASONS: but now we are going to repeat: " + (j - 1));
    //         j--;
    //         localStorage.setItem('SEASONS_' + this.state.cur_api + '_exceeded', new Date());
    //         this.state.cur_api = this.state.cur_api < (this.state.api_keys.length - 1) ? this.state.cur_api += 1 : this.state.cur_api = 7;
    //       }
    //     } else {
    //       console.log("SEASONS: api was changed check logs");
    //       console.log("SEASONS: next index was supposed to be: " + j);
    //       console.log("SEASONS: but now we are going to repeat: " + (j - 1));
    //       j--;
    //       localStorage.setItem('SEASONS_' + this.state.cur_api + '_exceeded', new Date());
    //       this.state.cur_api = this.state.cur_api < (this.state.api_keys.length - 1) ? this.state.cur_api += 1 : this.state.cur_api = 7;
    //       // throw new Error(response.status);
    //     }
    //   }
    // }
  },
  mutations: {
    SET_SEASON: (state, payload) => {
      try {
        for (let k = 0; k < payload.episodes.length; k++) {
          state.obra[state.obra.length - 1].episodios.push({
            id_imdb: payload.imDbId,
            num_temporada: payload.episodes[k].seasonNumber,
            num_episodio: payload.episodes[k].episodeNumber,
            titulo: payload.episodes[k].title,
            banner: payload.episodes[k].image
          });
        }
      } catch (e) {
        alert("STOP!!!!! " + e)
      }

      localStorage.obra = JSON.stringify(state.obra);
      console.log("Temporada " + payload.episodes[0].seasonNumber + " de " + payload.title + " obtida com sucesso");
      if (payload.episodes[0].seasonNumber == state.obra[state.obra.length - 1].total_temporadas) {
        console.log("Série foi obtida completamente com sucesso");
      }
    },
    SET_OBRA: (state, payload) => {
      try {
        state.obra.push({
          id_imdb:payload.id,
          titulo: payload.title,
          sinopse: payload.plot,
          poster: payload.image,
          banner: payload.posters.backdrops.length == 0 || payload.poster ? prompt("Enter the link for the banner of " + payload.title + ":") : payload.posters.backdrops[0].link,
          trailer: payload.trailer.link,
          ano: payload.year,
          pais: payload.countryList[0].value,
          lingua: payload.languageList[0].value,
          class_etaria: payload.contentRating == "Approved" ? "PG-13" : payload.contentRating,
          duracao: payload.runtimeMins ? payload.runtimeMins : "Running time not available",
          total_temporadas: payload.tvSeriesInfo ? payload.tvSeriesInfo.seasons.length : 0,
          genero: [],
          episodios: [],
          elenco: payload.actorList.length > 50 ? payload.actorList.slice(0, 50) : payload.actorList,
          produtores: [],
          diretores: payload.directorList,
          escritores: !payload.tvSeriesInfo ? payload.writerList : null,
          pontuacao_imdb:payload.imDbRating
        });
      } catch (e) {
        alert("Error: " + e)
      }

      // Géneros
      payload.genreList.map(genre => {
        state.obra[state.obra.length - 1].genero.push(genre.value);
      });

      // Produtores
      for (let i = 0; i < payload.fullCast.others.length; i++){
        const JOB = payload.fullCast.others[i].job;
        if (JOB.toLowerCase().trim() == "produced by" || JOB.toLowerCase().trim() == "series produced by") {
          if (state.obra[state.obra.length - 1].total_temporadas > 0) {
            // Se for série manter um cap de 5 produtores - os principais - para não encher a localstorage
            state.obra[state.obra.length - 1].produtores = payload.fullCast.others[i].items.length > 5 ? payload.fullCast.others[i].items.slice(0, 5) : payload.fullCast.others[i].items;
          } else {
            // Se for um filme, obter todos os produtores
            state.obra[state.obra.length - 1].produtores = payload.fullCast.others[i].items;
          }
          break;
        }
      }

      // Se for série alterar uns certos campos que a API devolve de maneira diferente
      if (state.obra[state.obra.length - 1].total_temporadas > 0) {
        // Escritores (manter um cap de 5 escritores - os principais - para não encher a localstorage)
        // Há uma chance de os escritores serem iguais então é necessário verificar isso
        for (let i = 0; i < payload.fullCast.writers.items.length; i++) {
          if (state.obra[state.obra.length - 1].escritores) {
            if (!state.obra[state.obra.length - 1].escritores.some(escritor => escritor.id == payload.fullCast.writers.items[i].id)) {
              state.obra[state.obra.length - 1].escritores.push(payload.fullCast.writers.items[i]);
              if (state.obra[state.obra.length - 1].escritores.length == 5) {
                break;
              }
            }
          } else {
            state.obra[state.obra.length - 1].escritores = [payload.fullCast.writers.items[i]];
          }
        }

        // Diretores (manter um cap de 5 diretores - os principais - para não encher a localstorage)
        state.obra[state.obra.length - 1].diretores = payload.fullCast.directors.items.length > 5 ? payload.fullCast.directors.items.slice(0, 5) : payload.fullCast.directors.items;
      }

      localStorage.obra = JSON.stringify(state.obra);
      console.log(payload.title + " obtido com sucesso");
    },
    SET_MOVIES: (state, payload) => {
      state.movies = payload
      localStorage.filmes = JSON.stringify(payload);
    },
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
    },
    SET_NEW_LIKE(state,payload){
      state.obras_gosto.push(payload);
      localStorage.obras_gosto = JSON.stringify(state.obras_gosto);
    },
    SET_HAS_SEEN(state,payload){
      state.vistos.push(payload);
      localStorage.vistos = JSON.stringify(state.vistos);
    },
    SET_NEW_TITLE_COMMENT(state, payload){
      state.comentarios_obra.push(payload);
      localStorage.comentarios_obra = JSON.stringify(state.comentarios_obra);
    },
    SET_NEW_QUIZ_COMMENT(state, payload){
      state.comentarios_quiz.push(payload);
      localStorage.comentarios_quiz = JSON.stringify(state.comentarios_quiz);
    },
    SET_NEW_TITLE_RATING(state,payload){
      const idx=state.classificacao_obra.findIndex(rate=>rate.id_utilizador==payload.id_utilizador && rate.id_imdb==payload.id_imdb)
      if (idx == -1){
         state.classificacao_obra.push(payload);
      } else {
         state.classificacao_obra[idx].id_imdb=payload.id_imdb;
         state.classificacao_obra[idx].id_utilizador=payload.id_utilizador;
         state.classificacao_obra[idx].pontuacao=payload.pontuacao;
      }
      localStorage.classificacao_obra = JSON.stringify(state.classificacao_obra);
      
    },
    SET_NEW_QUIZ_RATING(state,payload){
      const idx=state.classificacao_quiz.findIndex(rate=>rate.id_utilizador==payload.id_utilizador && rate.id_quiz==payload.id_quiz)
      if (idx == -1){
         state.classificacao_quiz.push(payload);
      } else {
         state.classificacao_quiz[idx].id_quiz=payload.id_quiz;
         state.classificacao_quiz[idx].id_utilizador=payload.id_utilizador;
         state.classificacao_quiz[idx].pontuacao=payload.pontuacao;
      }
      localStorage.classificacao_quiz = JSON.stringify(state.classificacao_quiz);
      
    },
    REMOVE_QUIZ_RATING(state, payload){
      state.classificacao_quiz = state.classificacao_quiz.filter(rate=>(rate.id_quiz != payload && rate.id_utilizador==state.loggedUser.id) || rate.id_utilizador != state.loggedUser.id);
      localStorage.classificacao_quiz = JSON.stringify(state.classificacao_quiz);
    },
    REMOVE_HAS_SEEN(state,payload){
      state.vistos= state.vistos.filter(filme=>(filme.id_imdb!=payload && filme.id_utilizador==state.loggedUser.id) || filme.id_utilizador!=state.loggedUser.id);
      localStorage.vistos = JSON.stringify(state.vistos);
    },
    REMOVE_LIKE(state,payload){
      state.obras_gosto= state.obras_gosto.filter(filme=>(filme.id_imdb!=payload && filme.id_utilizador==state.loggedUser.id) || filme.id_utilizador!=state.loggedUser.id);
      localStorage.obras_gosto = JSON.stringify(state.obras_gosto);
    },
    REMOVE_TITLE_RATING(state,payload){
      state.classificacao_obra= state.classificacao_obra.filter(rate=>(rate.id_imdb!=payload && rate.id_utilizador==state.loggedUser.id) || rate.id_utilizador!=state.loggedUser.id);
      localStorage.classificacao_obra = JSON.stringify(state.classificacao_obra);
    },
    REMOVE_TITLE_COMMENT(state,payload){
      state.comentarios_obra = state.comentarios_obra.filter(comment=>(comment.id_comentario!=payload && comment.id_utilizador==state.loggedUser.id) || comment.id_utilizador!=state.loggedUser.id);
      localStorage.comentarios_obra = JSON.stringify(state.comentarios_obra);
    },
    REMOVE_QUIZ_COMMENT(state,payload){
      state.comentarios_quiz = state.comentarios_quiz.filter(comment=>(comment.id_comentario != payload && comment.id_utilizador == state.loggedUser.id) || comment.id_utilizador != state.loggedUser.id);
      localStorage.comentarios_quiz = JSON.stringify(state.comentarios_quiz);
    },
    SET_NEW_BUY(state,payload){
      state.premios_utilizador.push({id_utilizador:payload.id_utilizador, id_premio: payload.id_premio, data: payload.data});
      localStorage.premios_utilizador = JSON.stringify(state.premios_utilizador);
      state.loggedUser.pontos-=payload.valor;
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    SET_QUIZ_ATTEMPT(state, payload) {
      state.users[state.users.findIndex(user => user.id == state.loggedUser.id)].played.push(payload);
      localStorage.users = JSON.stringify(state.users);
      state.loggedUser = state.users.find((user) => user.email === state.loggedUser.email);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    UPDATE_QUIZ_ATTEMPT(state, payload) {
      state.users[state.users.findIndex(user => user.id == state.loggedUser.id)].played[state.users[state.users.findIndex(user => user.id == state.loggedUser.id)].played.length - 1] = payload;
      localStorage.users = JSON.stringify(state.users);
      state.loggedUser = state.users.find((user) => user.email === state.loggedUser.email);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    UPDATE_USER_POINTS(state, payload) {
      state.users[state.users.findIndex(user => user.id == state.loggedUser.id)].pontos += payload;
      localStorage.users = JSON.stringify(state.users);
      state.loggedUser = state.users.find((user) => user.email === state.loggedUser.email);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    UPDATE_USER_XP(state, payload) {
      state.users[state.users.findIndex(user => user.id == state.loggedUser.id)].xp += payload;
      localStorage.users = JSON.stringify(state.users);
      state.loggedUser = state.users.find((user) => user.email === state.loggedUser.email);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    UPDATE_USER_LEVEL(state) {
      state.users[state.users.findIndex(user => user.id == state.loggedUser.id)].nivel = parseInt(state.users[state.users.findIndex(user => user.id == state.loggedUser.id)].nivel) + 1;
      localStorage.users = JSON.stringify(state.users);
      state.loggedUser = state.users.find((user) => user.email === state.loggedUser.email);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    SET_NEW_QUIZ(state,payload) {
      state.premios.push(payload);
      localStorage.premios = JSON.stringify(state.premios);
    },
    REMOVE_QUIZ(state,payload) {
      state.premios = state.premios.filter(premio=>(premio.id_premio != payload));
      localStorage.premios = JSON.stringify(state.premios);
    },
    UPDATE_QUIZ(state,payload) {
      state.premios[state.premios.findIndex(premio=>premio.id_premio==payload.id_premio)].id_premio = payload.id_premio;
      state.premios[state.premios.findIndex(premio=>premio.id_premio==payload.id_premio)].nome = payload.nome;
      state.premios[state.premios.findIndex(premio=>premio.id_premio==payload.id_premio)].img = payload.img;
      state.premios[state.premios.findIndex(premio=>premio.id_premio==payload.id_premio)].valor = payload.valor;
      localStorage.premios = JSON.stringify(state.premios);
    }
  }
});
