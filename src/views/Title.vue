<template>
  <div>
    <div class="jumbotron">
      <div class="container h-100">
        <div class="row h-100 w-100 pt-5 pb-5 m-0">
          <div class="poster col-lg-4 m-auto">
            <div class="w-100 poster-wrapper">
              <img id="title-poster" :src="info[0][0].poster"
                alt="Title cover" />
            </div>
          </div>
          <div class="main-info col-lg-8">
            <div class="d-flex align-items-center" style="gap: 20px">
              <p id="title-name">{{info[0][0].titulo}}</p>
              <p id="title-content-rating" class="d-flex align-items-center justify-content-center">
                {{info[0][0].class_etaria}}
              </p>
            </div>
            <p id="title-date"><b>Year: </b>{{info[0][0].ano}}</p>
            <p id="title-genres">{{getGenreDescription(info[2])}}</p>
            <div>
              <div class="d-flex align-items-center mb-2" style="gap: 20px">
                <p class="m-0" style="font-size: 1.25em">
                  <strong>Synopsis</strong>
                </p>
                <a class="m-0 d-flex align-items-center" style="gap: 15px"
                  :href="info[0][0].trailer" target="_blank">
                  <img src="../assets/images/youtube.svg" alt="YouTube icon" width="40px" />
                  Watch the trailer
                </a>
              </div>
              <p id="title-synopsis">
                {{info[0][0].sinopse}}
              </p>
            </div>
            <div class="mb-3 d-flex align-items-center" style="gap: 5px;">
              <img style="width: 20px; min-width: 20px;" :src="'https://countryflagsapi.com/svg/' + (info[0][0].pais == 'UK' ? 'GB' : info[0][0].pais)" />
              &nbsp;
              <span id="title-language">{{info[0][0].pais}}</span>
            </div>
            <p id="title-running-time">{{info[0][0].duracao}} minutes</p>
            <p id="title-availability">Available on <strong>Netflix</strong></p>
            <div class="
                title-actions-wrapper
                d-flex
                justify-content-between
                flex-wrap
              ">
              <div>
                <p class="orange-btn text-center mb-3">IMDb {{parseFloat(info[0][0].pontuacao_imdb).toFixed(1)}}</p>
                <p class="blur-btn text-center">Movizz 4.1/5</p>
              </div>
              <div class="title-actions d-flex align-items-center flex-wrap" style="gap: 15px; flex-grow: 0">
                <button class="blur-btn" style="font-weight: 500" id="like" @click="addNewLike()" >
                  Add to favourites <i class="fas fa-heart"></i>
                </button>
                <button class="blur-btn" style="font-weight: 500" id="seen" @click="addNewSeen()">
                  Mark as seen <i class="fas fa-eye"></i>
                </button>
                <div class="wrapper-stars position-relative d-flex justify-content-center">
                  <div v-show="showStars" class="p-2 show-stars" style="position: absolute; top: -45px; background-color: var(--cinza2); border-radius: 5px;">
                    <div class="stars d-flex" style="gap: 5px; font-size: 1.25em; cursor: pointer;">
                      <i class="fas fa-star" @click="fillStars(1, 'a')" @mouseover="fillStars(1, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click="fillStars(2, 'a')" @mouseover="fillStars(2, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click="fillStars(3, 'a')" @mouseover="fillStars(3, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click="fillStars(4, 'a')" @mouseover="fillStars(4, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click="fillStars(5, 'a')" @mouseover="fillStars(5, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                    </div>
                  </div>
                  <button class="blur-btn" style="font-weight: 500" @click="showStars = !showStars;">
                    Rate <i class="fas fa-star"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-5 mt-5">
      <div class="navigation d-flex flex-wrap" style="gap: 20px">
        <a href="#cast">Cast</a>
        <a href="#crew">Crew</a>
        <a href="#seasons">Seasons</a>
        <a href="#comments">Comments</a>
        <a href="#quizzes">Quizzes</a>
      </div>
      <hr />
      <section id="cast" class="mt-5 mb-3">
        <p class="subtitle">Cast</p>
        <div class="cast-members row">
          <div class="cast-card col-lg-2 col-md-3 col-sm-4 col-6 g-2" v-for="(member, i) in (showFullCast ? info[1].length : 6)" :key="i" :set="idx = getAllCast.findIndex(pessoa => pessoa.id_pessoa == info[1][i].id_pessoa)">
            <div style="background-color: var(--azul-escuro2); border-radius: 10px; w-100">
              <div class="cast-photo" :style="{ backgroundImage: 'url(' + getAllCast[idx].foto + ')' }" style="
                  background-repeat: no-repeat;
                  background-size: cover;
                  background-position: top;
                  width: 100%;
                  height: 150px;
                  border-top-right-radius: 10px;
                  border-top-left-radius: 10px;
                "></div>
              <p class="text-center pt-3 pb-3 m-0">{{ getAllCast[idx].nome }}</p>
              
            </div>
          </div>
        </div>
        <div class="mt-3 mb-3">
          <a id="see-full-cast" @click="showFullCast = !showFullCast"><i :class="{
                'fas fa-minus-circle': showFullCast,
                'fas fa-plus-circle': !showFullCast,
              }"></i>
            {{
              showFullCast ? "Hide the complete cast" : "See the complete cast"
            }}</a>
        </div>
      </section>
      <hr />
      <section id="crew">
        <p class="subtitle">Crew</p>
        <p>
          Writers:
          <span style="color: var(--cinza2)">{{getCrewDescription(info[3])}}</span>
        </p>
        <p>
          Producers:
          <span style="color: var(--cinza2)">{{getCrewDescription(info[5])}}</span>
        </p>
        <p>
          Directors:
          <span style="color: var(--cinza2)">{{getCrewDescription(info[4])}}</span>
        </p>
      </section>
      <hr />
      <!-- <section id="seasons">
        <p class="subtitle">Seasons</p>
        <div class="d-flex num-seasons" style="gap: 25px">
          <p class="
              title-season
              d-flex
              justify-content-center
              align-items-center" :class="selectedSeason == i ? 'active' : ''" v-for="i in 5" :key="i"
            @click="selectedSeason = i">
            {{ i }}
          </p>
        </div>
        <div class="carousel-wrapper" style="position: relative;">
          <span class="nav-left" @click="simulateScroll('left')"><i class="fas fa-chevron-left"></i></span>
          <span class="nav-right" @click="simulateScroll('right')"><i class="fas fa-chevron-right"></i></span>
          <div class="row-carousel disable-scrollbars">
            <div class="row__inner p-0">
            <div class="tile">
              <div class="tile__media">
                <img class="tile__img" src="https://m.media-amazon.com/images/M/MV5BMjAxNjFhNzQtOWNjYy00YjY5LWJmMDQtMDZhNWI1NTM3NDU5XkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_FMjpg_UX1000_.jpg" alt="" />
              </div>
              <div class="tile__details">
                <div class="tile__title">
                  <strong>1</strong>&nbsp;&nbsp;&nbsp;"Efectuar lo acordado"
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img class="tile__img" src="https://m.media-amazon.com/images/M/MV5BNDM5ZDE0ZTYtOWQxYy00Yzc3LTg1YTQtNzFiM2YyOTExNDk0XkEyXkFqcGdeQXVyNjI4MTY4MjA@._V1_.jpg" alt="" />
              </div>
              <div class="tile__details">
                <div class="tile__title">
                  <strong>2</strong>&nbsp;&nbsp;&nbsp;"Imprudencias letales"
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img class="tile__img" src="https://m.media-amazon.com/images/M/MV5BZjM3OWZhYzMtMTM4OS00YjA2LWFlYjItZTk2NTI1YmU3YTUwXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_FMjpg_UX1000_.jpg" alt="" />
              </div>
              <div class="tile__details">
                <div class="tile__title">
                  <strong>3</strong>&nbsp;&nbsp;&nbsp;"Errar al disparar"
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img class="tile__img" src="https://m.media-amazon.com/images/M/MV5BOTdhODAwYTktZWIyMy00MDJlLTlkNjQtOWE4OWVlODc1OTBjXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg" alt="" />
              </div>
              <div class="tile__details">
                <div class="tile__title">
                  <strong>4</strong>&nbsp;&nbsp;&nbsp;"Caballo de Troya"
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img class="tile__img" src="https://m.media-amazon.com/images/M/MV5BYzc5YzU2MWQtMjg4Ni00ZjI3LTg3YWUtOTdkZWE3MDE2NmQ0XkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg" alt="" />
              </div>
              <div class="tile__details">
                <div class="tile__title">
                  <strong>5</strong>&nbsp;&nbsp;&nbsp;"El día de la marmota"
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img class="tile__img" src="https://m.media-amazon.com/images/M/MV5BODNlMzgzOGMtNzlmZi00YWIzLWFiMzAtNzBhM2UxMDBlOTIyXkEyXkFqcGdeQXVyNjI4MTY4MjA@._V1_FMjpg_UX1000_.jpg" alt="" />
              </div>
              <div class="tile__details">
                <div class="tile__title">
                  <strong>6</strong>&nbsp;&nbsp;&nbsp;"La cálida guerra fría"
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img class="tile__img" src="https://m.media-amazon.com/images/M/MV5BYTMwZGZiNmEtYjkxNi00YzRkLWEzNWQtZGQ1NjUzOGU3MDNmXkEyXkFqcGdeQXVyNzE5ODM5NTY@._V1_.jpg" alt="" />
              </div>
              <div class="tile__details">
                <div class="tile__title">
                  <strong>7</strong>&nbsp;&nbsp;&nbsp;"Refrigerada inestabilidad"
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img class="tile__img" src="https://m.media-amazon.com/images/M/MV5BODkxZmE3MGUtYTExMS00OTc5LTlkYWItYWVmNGM3ZDIzYzdjXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg" alt="" />
              </div>
              <div class="tile__details">
                <div class="tile__title">
                  <strong>8</strong>&nbsp;&nbsp;&nbsp;"Tú lo has buscado"
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img class="tile__img" src="https://m.media-amazon.com/images/M/MV5BMDFiMDAwYjYtZmVlZi00M2NkLTljNDQtYjQ1MTYyODYwYTg0XkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg" alt="" />
              </div>
              <div class="tile__details">
                <div class="tile__title">
                  <strong>9</strong>&nbsp;&nbsp;&nbsp;"El que la sigue la consigue"
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </section>
        <hr> -->
        <div class="row">
          <div class="col-md-8">
            <section id="comments">
              <p class="subtitle">Comments</p>
              <form  @submit.prevent="addNewComment()">
                <textarea id="comment-content" v-model="comentario" required placeholder="Let others know what you think..."></textarea>
                <div class="mt-1 mb-4">
                  <label class="cbox">Is this comment a spoiler?
                    <input type="checkbox">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="mt-3 mb-3">
                  <input class="orange-btn" type="submit" value="Comment">
                </div>
              </form>
              <div class="other-comments mt-5" id="comment">
                <div class="card-comment d-flex" style="gap: 15px;" v-for="(comment, i) in comments" :key="i" >
                  <div  :style="'background-image: url(' + getAllUsers[comment.id_utilizador].avatar + ');'" style="min-width: 50px;height: 50px;background-repeat: no-repeat;background-size: cover;background-position: center; border-radius: 50%;"></div>
                  <div class="details d-flex flex-column">
                    <p id="comment-author">{{ getAllUsers[comment.id_utilizador].primeiro_nome + ' ' + getAllUsers[comment.id_utilizador].ultimo_nome }} <span>{{ comment.data }}</span></p>
                    <p id="comment-message">{{ comment.comentario }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="col-md-4">
            <section id="quizzes">
              <p class="subtitle">Find this show in these quizzes</p>
              <div class="related-card d-flex">
                <div class="related-image"></div>
                <div class="related-info d-flex flex-column p-2">
                  <p id="related-quiz-title">Netflix</p>
                  <p id="related-quiz-description">Questions from your favorite Netflix shows!</p>
                  <a class="d-flex" style="gap: 10px;">
                    <img src="../assets/images/play_icon.png" alt="Play icon" width="25px" height="25px">
                    <p>Play</p>
                  </a>
                </div>
              </div>
              <br>
              <div class="related-card d-flex">
                <div class="related-image"></div>
                <div class="related-info d-flex flex-column p-2">
                  <p id="related-quiz-title">Netflix</p>
                  <p id="related-quiz-description">Questions from your favorite Netflix shows!</p>
                  <a class="d-flex" style="gap: 10px;">
                    <img src="../assets/images/play_icon.png" alt="Play icon" width="25px" height="25px">
                    <p>Play</p>
                  </a>
                </div>
              </div>
              <br>
              <div class="related-card d-flex">
                <div class="related-image"></div>
                <div class="related-info d-flex flex-column p-2">
                  <p id="related-quiz-title">Netflix</p>
                  <p id="related-quiz-description">Questions from your favorite Netflix shows!</p>
                  <a class="d-flex" style="gap: 10px;">
                    <img src="../assets/images/play_icon.png" alt="Play icon" width="25px" height="25px">
                    <p>Play</p>
                  </a>
                </div>
              </div>
            </section>
          </div>
      </div>
    </div>
  </div>
</template>


<script>
 import { mapGetters, mapMutations } from "vuex";
export default {
  // $route.params.imdbid
  data() {
    return {
      showFullCast: false,
      selectedSeason: 1,
      showStars: false,
      savedStars: 0,
      info:[],
      userLikes: [],
      userSeen: [],
      comments:[],
      comentario:"",
    };
  },
  computed: {
      ...mapGetters(["getTitleInfo", "getGenreDescription", "getAllCast", "getCrewDescription", "getTitleLikes","getLoggedUser","getHasSeen","getTitleComments","getUserInfo", "getAllUsers", "getCommentsQuantity"]),
  },
  mounted () {
    document.querySelector(".jumbotron").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${this.info[0][0].banner})`;
    this.verifyLike();
    this.verifySeen();
    // this.listComments();
  },
  created () {
    this.info = this.getTitleInfo(this.$route.params.imdbid);
    this.userLikes=this.getTitleLikes(this.getLoggedUser.id);
    this.userSeen=this.getHasSeen(this.getLoggedUser.id);
    this.comments=this.getTitleComments(this.$route.params.imdbid);
  },
  methods: {
    ...mapMutations(["SET_NEW_LIKE", "SET_HAS_SEEN", "REMOVE_HAS_SEEN", "REMOVE_LIKE","SET_NEW_COMMENT"]),
    // listComments(){
    //   console.log(this.comments.length)
    //   for(let i=0;i<this.comments.length;i++){
    //     document.querySelector("#comment").innerHTML += `<div class="card-comment d-flex" style="gap: 15px;" >
    //     <div style="background-image:url(${this.getUserInfo(this.comments[i].id_utilizador)[0].avatar}); min-width: 50px;height: 50px;background-repeat: no-repeat;background-size: cover;background-position: center; border-radius: 50%;"></div>
    //               <div class="details d-flex flex-column">
    //                 <p id="comment-author">${this.getUserInfo(this.comments[i].id_utilizador)[0].primeiro_nome} ${this.getUserInfo(this.comments[i].id_utilizador)[0].ultimo_nome} <span>${this.comments[i].data}</span></p>
    //                 <p id="comment-message">${this.comments[i].comentario}</p>
    //               </div>
    //               </div>
    //             <br>`
    //     }
    // },
    addNewComment() {
      const DATA_COMMENT = new Date();
      this.SET_NEW_COMMENT({id_comentario:this.getCommentsQuantity+1,id_imdb:this.$route.params.imdbid,id_utilizador:this.getLoggedUser.id,comentario: this.comentario, data: DATA_COMMENT});
      this.comments.push({comentario: this.comentario, data: DATA_COMMENT, id_utilizador:this.getLoggedUser.id});
    },
    verifyLike(){
      let wasfound=false;
      for(let i=0;i<this.userLikes.length;i++){
        if(this.$route.params.imdbid==this.userLikes[i]){
          wasfound=true;
          document.querySelector("#like").style.backgroundColor = "var(--vermelho)"
          break;
        }
      }
      if(!wasfound){
        document.querySelector("#like").style.backgroundColor = "rgba(255, 255, 255, 0.15)";
      }
    },
    verifySeen(){
      let wasfound=false;
      for(let i=0;i<this.userSeen.length;i++){
        if(this.$route.params.imdbid==this.userSeen[i]){
          wasfound=true;
          document.querySelector("#seen").style.backgroundColor = "var(--verde)";
          break;
        }
      }
      if(!wasfound){
        document.querySelector("#seen").style.backgroundColor = "rgba(255, 255, 255, 0.15)";
      }
    },
    addNewSeen(){
      let aux={id_imdb:this.$route.params.imdbid, id_utilizador:this.getLoggedUser.id}
      if(!this.userSeen.some(filme=>filme==this.$route.params.imdbid)){
        this.SET_HAS_SEEN(aux);
        this.userSeen.push(this.$route.params.imdbid);
        this.verifySeen();
      }
      else{
        this.REMOVE_HAS_SEEN(this.$route.params.imdbid);
        this.userSeen= this.userSeen.filter(filme=>!filme==this.$route.params.imdbid);
        this.verifySeen();
      }
    },
    addNewLike(){
      let aux={id_imdb:this.$route.params.imdbid, id_utilizador:this.getLoggedUser.id}
      if(!this.userLikes.some(filme=>filme==this.$route.params.imdbid)){
        this.SET_NEW_LIKE(aux);
        this.userLikes.push(this.$route.params.imdbid);
        this.verifyLike();
      }
      else{
        this.REMOVE_LIKE(this.$route.params.imdbid);
        this.userLikes= this.userLikes.filter(filme=>!filme==this.$route.params.imdbid);
        this.verifyLike();
      }
    },
    simulateScroll(dir) {
      if (dir == "right") {
        document.querySelector('.row-carousel').scrollLeft += 260;
        if (document.querySelector('.row-carousel').scrollLeft - 260 > document.querySelector('.row-carousel').scrollWidth) {
          document.querySelector('.row-carousel').scrollLeft = document.querySelector('.row-carousel').scrollWidth;
        }
      } else {
        document.querySelector('.row-carousel').scrollLeft -= 260;
        if (document.querySelector('.row-carousel').scrollLeft - 260 < 0) {
          document.querySelector('.row-carousel').scrollLeft = 0;
        }
      }
    }, 
    fillStars(n, event_type) {
        if (event_type == "a") {
            document.querySelectorAll(".stars .fas").forEach(a => a.style.color = "white");
            if (n > 0 && n != this.savedStars) {
                for (let i = 0; i < n; i++) {
                    document.querySelectorAll(".stars .fas")[i].style.color = "var(--laranja)";
                }
            }
            this.savedStars = n != this.savedStars ? n : 0;
        } else if (event_type == "b") {
            document.querySelectorAll(".stars .fas").forEach(a => a.style.color = "white");
            if (n > 0) {
                for (let i = 0; i < n; i++) {
                    document.querySelectorAll(".stars .fas")[i].style.color = "var(--laranja)";
                }
            }
        } else {
            document.querySelectorAll(".stars .fas").forEach(a => a.style.color = "white");
            for (let i = 0; i < this.savedStars; i++) {
                document.querySelectorAll(".stars .fas")[i].style.color = "var(--laranja)";
            }
        }
    }
  }
};
</script>

<style scoped>
.jumbotron {

  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  min-height: 600px;
  height: 100%;
}

#title-poster {
  border-radius: 10px;
  min-width: 250px;
  max-width: 350px;
  width: 100%;
}

#title-name {
  font-weight: 500;
  color: white;
  font-size: 1.5em;
}

#title-content-rating {
  border: 2px solid var(--vermelho);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-weight: bold;
}

a {
  color: white;
  text-decoration: none;
}

.navigation {
  font-size: 1.25em;
}

.subtitle {
  font-weight: bold;
  font-size: 1.25em;
  color: var(--azul-claro);
}

.title-season {
  width: 30px;
  height: 30px;
  border: 2px solid var(--cinza2);
  border-radius: 50%;
}

.title-season.active {
  border: 2px solid var(--verde);
}

.title-season:hover {
  cursor: pointer;
}

#see-full-cast {
  color: var(--verde);
}

#see-full-cast:hover {
  cursor: pointer;
}

.carousel-wrapper {
  margin: 0;
  color: #ecf0f1;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.carousel-wrapper h1,
.carousel-wrapper p {
  text-align: center;
}

.carousel-wrapper p {
  width: 100%;
  max-width: 500px;
  margin: auto;
}

.carousel-wrapper a:link,
.carousel-wrapper a:hover,
.carousel-wrapper a:active,
.carousel-wrapper a:visited {
  transition: color 150ms;
  color: #95a5a6;
  text-decoration: none;
}

.carousel-wrapper a:hover {
  color: #7f8c8d;
  text-decoration: underline;
}

.row-carousel {
  overflow-x: scroll;
  scroll-behavior: smooth;
  width: 100%;
}

.row__inner {
  transition: 450ms transform;
  font-size: 0;
  white-space: nowrap;
  padding-bottom: 10px;
}

.tile {
  position: relative;
  display: inline-block;
  width: 250px;
  height: 140.625px;
  margin-right: 10px;
  font-size: 20px;
}

.tile__img {
  width: 250px;
  height: 140.625px;
  -o-object-fit: cover;
  object-fit: cover;
  opacity: .5;
  border-radius: 5px;
}

.tile__details {
  font-size: 0.75em;
  transition: 450ms opacity;
}

.tile:hover .tile__details {
  opacity: 1;
}

.tile__title {
  position: absolute;
  bottom: 0;
  padding: 10px;
}

.row__inner:hover .tile:hover {
  opacity: 1;
}

.nav-left,
.nav-right {
  font-size: 2.5em;
  color: white;
}

.nav-left:hover,
.nav-right:hover {
  cursor: pointer;
}

.nav-left {
  position: absolute;
  z-index: 1;
  top: 45px;
  left: 25px;
}

.nav-right {
  position: absolute;
  z-index: 1;
  top: 45px;
  right: 25px;
}

#comment-content {
  resize: none;
  width: 100%;
  height: 85px;
  background-color: var(--cinza1);
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px;
}

#comment-content:focus {
  border: none;
  box-shadow: none;
  outline: none;
}

#comments label {
  color: var(--cinza2);
}

.card-comment .photo {
  min-width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.card-comment #comment-photo1 {
  background-image: url("https://thispersondoesnotexist.com/image");
}

.card-comment #comment-photo2 {
  background-image: url("https://cdn.discordapp.com/attachments/819526744419598356/916005827469512764/netflix.png");
}

#comment-author {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

#comment-message {
  color: #EEEEEE;
}

.card-comment .details span {
  margin-left: 15px;
  color: var(--cinza2);
}

.related-card .related-image {
  width: 150px;
  background-image: url("https://cdn.discordapp.com/attachments/819526744419598356/916005827469512764/netflix.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.related-card .related-info {
  background-color: var(--cinza1);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.related-card a:hover {
  cursor: pointer;
}

#related-quiz-title {
  font-weight: bold;
  color: var(--verde);
}

@media (max-width: 991px) {
  .poster-wrapper {
    text-align: center;
  }

  #title-poster {
    margin-bottom: 15px;
  }

  .title-actions-wrapper {
    flex-direction: column;
  }

  .title-actions {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .title-actions button {
    width: 100%;
  }

  .show-stars {
    top: 40px !important;
    text-align: center;
  }

  .wrapper-stars {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .nav-left,
  .nav-right {
    display: none;
  }
}
</style>