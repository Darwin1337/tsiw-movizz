import Vue from "vue";
import Vuex from "vuex";

// Popular a localstorage com informação pre-determinada
import dataObra from "../assets/data/obra.json";
import dataGeneroObra from "../assets/data/genero_obra.json";
import dataDiretorObra from "../assets/data/diretor_obra.json";
import dataProdutorObra from "../assets/data/produtor_obra.json";
import dataEscritorObra from "../assets/data/escritor_obra.json";
import dataEquipaObra from "../assets/data/equipa.json";
import dataElencoObra from "../assets/data/elenco_obra.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    obras_gosto:localStorage.obras_gosto ? JSON.parse(localStorage.obras_gosto) : [],
    vistos:localStorage.vistos ? JSON.parse(localStorage.vistos) : [],
    classificacao_obra:localStorage.classificacao_obra?JSON.parse(localStorage.classificacao_obra):[
      {
         id_imdb:"tt0111161",
         id_utilizador:1,
         pontuacao:4,
      }
   ],
    comentarios_obra:localStorage.comentarios_obra?JSON.parse(localStorage.comentarios_obra):
    [
      {
         id_comentario:1,
         id_imdb:"tt0111161",
         id_utilizador:1,
         comentario:"ola",
         data:"13-11-2012"
      }
    ],
    elenco_obra: localStorage.elenco_obra ? JSON.parse(localStorage.elenco_obra) : dataElencoObra,
    equipa: localStorage.equipa ? JSON.parse(localStorage.equipa) : dataEquipaObra,
    genero_obra: localStorage.genero_obra ? JSON.parse(localStorage.genero_obra) : dataGeneroObra,
    obra: localStorage.obra ? JSON.parse(localStorage.obra) : dataObra,
    produtor_obra: localStorage.produtor_obra ? JSON.parse(localStorage.produtor_obra) : dataProdutorObra,
    diretor_obra: localStorage.diretor_obra ? JSON.parse(localStorage.diretor_obra) : dataDiretorObra,
    escritor_obra: localStorage.escritor_obra ? JSON.parse(localStorage.escritor_obra) : dataEscritorObra,
    genero: localStorage.genero ? JSON.parse(localStorage.genero) :
      [
        {
          id_genero: 0,
          descricao: 'Action'
        },
        {
          id_genero: 1,
          descricao: 'Adventure'
        },
        {
          id_genero: 2,
          descricao: 'Animation'
        },
        {
          id_genero: 3,
          descricao: 'Biography'
        },
        {
          id_genero: 4,
          descricao: 'Comedy'
        },
        {
          id_genero: 5,
          descricao: 'Crime'
        },
        {
          id_genero: 6,
          descricao: 'Documentary'
        },
        {
          id_genero: 7,
          descricao: 'Drama'
        },
        {
          id_genero: 8,
          descricao: 'Family'
        },
        {
          id_genero: 9,
          descricao: 'Fantasy'
        },
        {
          id_genero: 10,
          descricao: 'Game Show'
        },
        {
          id_genero: 11,
          descricao: 'History'
        },
        {
          id_genero: 12,
          descricao: 'Horror'
        },
        {
          id_genero: 13,
          descricao: 'Music'
        },
        {
          id_genero: 14,
          descricao: 'Musical'
        },
        {
          id_genero: 15,
          descricao: 'Mystery'
        },
        {
          id_genero: 16,
          descricao: 'News'
        },
        {
          id_genero: 17,
          descricao: 'Reality-TV'
        },
        {
          id_genero: 18,
          descricao: 'Romance'
        },
        {
          id_genero: 19,
          descricao: 'Sci-Fi'
        },
        {
          id_genero: 20,
          descricao: 'Sport	'
        },
        {
          id_genero: 21,
          descricao: 'Superhero'
        },
        {
          id_genero: 22,
          descricao: 'Talk Show'
        },
        {
          id_genero: 23,
          descricao: 'Thriller'
        },
        {
          id_genero: 24,
          descricao: 'War'
        },
        {
          id_genero: 25,
          descricao: 'Western'
        }
    ],
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
    getAllUsers: (state) => state.users,
    getAllMovies:(state) => state.obra,
    getTitleInfo:(state)=>(id)=>
    [state.obra.filter(filme=>filme.id_imdb==id),
      state.elenco_obra.filter(ator=>ator.id_imdb==id),
      state.genero_obra.filter(genero=>genero.id_imdb==id),
      state.escritor_obra.filter(escritor=>escritor.id_imdb==id),
      state.diretor_obra.filter(diretor=>diretor.id_imdb==id),
      state.produtor_obra.filter(produtor=>produtor.id_imdb==id)
    ],
    getCrewDescription:(state)=>(ids)=>{
      let result="";
      for (let i = 0; i < ids.length; i++) {
        for (let j = 0; j < state.equipa.length; j++) {
          if (ids[i].id_pessoa==state.equipa[j].id_pessoa) {
            if (i==ids.length-1 && ids.length>1) {
              result=result.slice(0,-2)
              result+=" and "+state.equipa[j].nome;
            }
            else
            {
              if (ids.length>1) {
                result+=state.equipa[j].nome+", ";
              }
              else{
                result+=state.equipa[j].nome;
              }
            }
            break;
          }
        }
      }
      return result;
    },
    getTitleLikes:(state) => (id) => {
      let result=[];
      for (let j = 0; j < state.obras_gosto.length; j++) {
         if (id==state.obras_gosto[j].id_utilizador) {
            result.push(state.obras_gosto[j].id_imdb);
         }
      }
      return result;
    },
    getHasSeen:(state) => (id) => {
      let result=[];
      for (let j = 0; j < state.vistos.length; j++) {
         if (id==state.vistos[j].id_utilizador) {
            result.push(state.vistos[j].id_imdb);
         }
      }
      return result;
    },
    getGenreDescription:(state)=>(ids)=>{
      let result="";
      for (let i = 0; i < ids.length; i++) {
        for (let j = 0; j < state.genero.length; j++) {
          if (ids[i].id_genero==state.genero[j].id_genero) {
            if (i==ids.length-1 && ids.length>1) {
              result=result.slice(0,-2)
              result+=" and "+state.genero[j].descricao;
            }
            else {
              result += ids.length > 1 ? state.genero[j].descricao + ", " : result+=state.genero[j].descricao;
            }
            break;
          }
        }
      }
      return result;
    },
    getAllCast:(state) => state.equipa,
    getUserInfo:(state)=>(id)=>{
      let result=[];
      for (let j = 0; j < state.users.length; j++) {
         if (id==state.users[j].id) {
            result.push(state.users[j]);
         }
      }
      
      return result;
    },
    getTitleComments:(state)=>(id)=>{
      let result=[];
      for (let i = 0; i < state.comentarios_obra.length; i++) {
         if (id==state.comentarios_obra[i].id_imdb) {
            result.push({id_utilizador:state.comentarios_obra[i].id_utilizador, comentario:state.comentarios_obra[i].comentario, data:state.comentarios_obra[i].data});
         }
      }
      return result;
    },
    getCommentsQuantity:(state)=>state.comentarios_obra.length,
    getUserRating:(state)=>(id, imdb)=>{
      let result=[];
      for (let i = 0; i < state.classificacao_obra.length; i++) {
         if (id==state.classificacao_obra[i].id_utilizador && imdb==state.classificacao_obra[i].id_imdb) {
            result.push({pontuacao:state.classificacao_obra[i].pontuacao});
         }
      }
      return result;
    }
  },
  actions:{
    async loadMovies(context) {
      for(let i=0; i<25; i++) {
        let wasfound=false;
        for (let j=0; j<this.state.obra.length; j++) {
          if(this.state.movies[i].id==this.state.obra[j].id_imdb){
            wasfound=true;
          }
        }
        if(!wasfound){
          const response = await fetch(
            `https://imdb-api.com/en/API/Title/k_utdlvs0n/${this.state.movies[i].id}/FullCast,Posters,Trailer`
          );
          if (response.ok) {
            context.commit("SET_OBRA", await response.json());
          } else {
            throw new Error(response.status);
          }
        }
      }
    },
  },
  mutations: {
    SET_OBRA: (state, payload) => {
      state.obra.push({
        id_imdb:payload.id,
        titulo: payload.title,
        sinopse: payload.plot,
        poster: payload.image,
        banner: payload.posters.backdrops[0].link,
        trailer: payload.trailer.link,
        ano: payload.year,
        pais: payload.countryList[0].value,
        lingua: payload.languageList[0].value,
        class_etaria:payload.contentRating == "Approved" ? "PG-13" : payload.contentRating,
        duracao:payload.runtimeMins,
        total_temporadas:0,
        pontuacao_imdb:payload.imDbRating
      });
      localStorage.obra = JSON.stringify(state.obra);
      //generos
      for(let i=0; i<payload.genreList.length; i++){
        for(let j=0; j<state.genero.length; j++){
          if(payload.genreList[i].value==state.genero[j].descricao){
            state.genero_obra.push({id_imdb:payload.id, id_genero:state.genero[j].id_genero})
            localStorage.genero_obra= JSON.stringify(state.genero_obra);
            break;
          }
        }
      }
      //atores
      for(let i=0; i<payload.actorList.length; i++){
        let wasfound=false;
        for(let j=0; j<state.equipa.length; j++){
          if(payload.actorList[i].id==state.equipa[j].id_pessoa){
            wasfound=true;
            state.elenco_obra.push({id_imdb:payload.id, id_pessoa:payload.actorList[i].id})
            localStorage.elenco_obra= JSON.stringify(state.elenco_obra);
            break;
          }
        }
        if(!wasfound){
          state.equipa.push({id_pessoa:payload.actorList[i].id, nome:payload.actorList[i].name, foto:payload.actorList[i].image})
          localStorage.equipa= JSON.stringify(state.equipa);
          state.elenco_obra.push({id_imdb:payload.id, id_pessoa:payload.actorList[i].id})
          localStorage.elenco_obra= JSON.stringify(state.elenco_obra);
        }
      }
      //produtores
      let wasProducerfound=false;
      for(let i=0; i<payload.fullCast.others.length; i++){
        if(payload.fullCast.others[i].job=="Produced by"){
          wasProducerfound=true;
          for(let j=0; j<payload.fullCast.others[i].items.length; j++){
            let wasfound=false;
            for(let k=0; k<state.equipa.length; k++){
              if(payload.fullCast.others[i].items[j].id==state.equipa[k].id_pessoa){
                wasfound=true;
                state.produtor_obra.push({id_imdb:payload.id, id_pessoa:payload.fullCast.others[i].items[j].id})
                localStorage.produtor_obra= JSON.stringify(state.produtor_obra);
                break;
              }
            }
            if(!wasfound){
              state.equipa.push({id_pessoa:payload.fullCast.others[i].items[j].id, nome:payload.fullCast.others[i].items[j].name, foto:"https://imdb-api.com/images/original/nopicture.jpg"})
              localStorage.equipa= JSON.stringify(state.equipa);
              state.produtor_obra.push({id_imdb:payload.id, id_pessoa:payload.fullCast.others[i].items[j].id})
              localStorage.produtor_obra= JSON.stringify(state.produtor_obra);
            }
          }
          break;
        }
      }
      if (!wasProducerfound){
        state.produtor_obra.push({id_imdb:payload.id, id_pessoa: null})
      }

      //diretores
      for(let i=0; i<payload.directorList.length; i++){
        let wasfound=false;
        for(let j=0; j<state.equipa.length; j++){
          if(payload.directorList[i].id==state.equipa[j].id_pessoa){
            wasfound=true;
            state.diretor_obra.push({id_imdb:payload.id, id_pessoa:payload.directorList[i].id})
            localStorage.diretor_obra= JSON.stringify(state.diretor_obra);
            break;
          }
        }
        if(!wasfound){
          state.equipa.push({id_pessoa:payload.directorList[i].id, nome:payload.directorList[i].name, foto:"https://imdb-api.com/images/original/nopicture.jpg"})
          localStorage.equipa= JSON.stringify(state.equipa);
          state.diretor_obra.push({id_imdb:payload.id, id_pessoa:payload.directorList[i].id})
          localStorage.diretor_obra= JSON.stringify(state.diretor_obra);
        }
      }

      //escritor
      for(let i=0; i<payload.writerList.length; i++){
        let wasfound=false;
        for(let j=0; j<state.equipa.length; j++){
          if(payload.writerList[i].id==state.equipa[j].id_pessoa){
            wasfound=true;
            state.escritor_obra.push({id_imdb:payload.id, id_pessoa:payload.writerList[i].id})
            localStorage.escritor_obra= JSON.stringify(state.escritor_obra);
            break;
          }
        }
        if(!wasfound){
          state.equipa.push({id_pessoa:payload.writerList[i].id, nome:payload.writerList[i].name, foto:"https://imdb-api.com/images/original/nopicture.jpg"})
          localStorage.equipa= JSON.stringify(state.equipa);
          state.escritor_obra.push({id_imdb:payload.id, id_pessoa:payload.writerList[i].id})
          localStorage.escritor_obra= JSON.stringify(state.escritor_obra);
        }
      }
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
    SET_NEW_COMMENT(state,payload){
      state.comentarios_obra.push(payload);
      localStorage.comentarios_obra = JSON.stringify(state.comentarios_obra);
    },
    SET_NEW_RATE(state,payload){
      const idx=state.classificacao_obra.findIndex(rate=>rate.id_utilizador==payload.id_utilizador && rate.id_imdb==payload.id_imdb)
      if(idx==-1){
         state.classificacao_obra.push(payload);
      }
      else{
         state.classificacao_obra[idx].id_imdb=payload.id_imdb;
         state.classificacao_obra[idx].id_utilizador=payload.id_utilizador;
         state.classificacao_obra[idx].pontuacao=payload.pontuacao;
      }
      localStorage.classificacao_obra = JSON.stringify(state.classificacao_obra);
      
    },
    REMOVE_HAS_SEEN(state,payload){
      state.vistos= state.vistos.filter(filme=>(filme.id_imdb!=payload && filme.id_utilizador==state.loggedUser.id) || filme.id_utilizador!=state.loggedUser.id);
      localStorage.vistos = JSON.stringify(state.vistos);
    },
    REMOVE_LIKE(state,payload){
      state.obras_gosto= state.obras_gosto.filter(filme=>(filme.id_imdb!=payload && filme.id_utilizador==state.loggedUser.id) || filme.id_utilizador!=state.loggedUser.id);
      localStorage.obras_gosto = JSON.stringify(state.obras_gosto);
    },
    REMOVE_RATE(state,payload){
      state.classificacao_obra= state.classificacao_obra.filter(rate=>(rate.id_imdb!=payload && rate.id_utilizador==state.loggedUser.id) || rate.id_utilizador!=state.loggedUser.id);
      localStorage.classificacao_obra = JSON.stringify(state.classificacao_obra);
    },
  }
});
