<template>
  <div>
    <div class="jumbotron">
      <div class="container h-100">
        <div class="row h-100 w-100 pt-5 pb-5 m-0">
          <div class="poster col-lg-4 m-auto">
            <div class="w-100 poster-wrapper">
              <img id="title-poster" :src="title.poster"
                alt="Title cover" />
            </div>
          </div>
          <div class="main-info col-lg-8">
            <div class="d-flex align-items-center" style="gap: 20px">
              <p id="title-name">{{ title.titulo }}</p>
              <p id="title-content-rating" class="d-flex align-items-center justify-content-center">
                {{ title.class_etaria }}
              </p>
            </div>
            <p id="title-date">{{ title.ano }}</p>
            <p id="title-genres">{{ extenseWriting(title.genero) }}</p>
            <div>
              <div class="d-flex align-items-center mb-2" style="gap: 20px">
                <p class="m-0" style="font-size: 1.25em">
                  <strong>Synopsis</strong>
                </p>
                <a class="m-0 d-flex align-items-center" style="gap: 15px"
                  :href="title.trailer" target="_blank">
                  <img src="../assets/images/youtube.svg" alt="YouTube icon" width="40px" />
                  Watch the trailer
                </a>
              </div>
              <p id="title-synopsis">
                {{ title.sinopse }}
              </p>
            </div>
            <div class="mb-3 d-flex align-items-center" style="gap: 5px;">
              <img style="width: 20px; min-width: 20px;" :src="'https://countryflagsapi.com/svg/' + (title.pais == 'UK' ? 'GB' : title.pais)" />
              &nbsp;
              <span id="title-language">{{ title.pais }}</span>
            </div>
            <p id="title-running-time">{{ title.duracao == "Running time not available" ? "Running time not available" : title.duracao + " minutes" }}</p>
            <p id="title-availability">{{title.plataformas[0].nome == "Currently in cinemas" ? "" : "Available on "}}<strong>{{ extenseWriting(title.plataformas.map(plat => plat.nome)) }}</strong></p>
            <div class="
                title-actions-wrapper
                d-flex
                justify-content-between
                flex-wrap
              ">
              <div>
                <p class="orange-btn text-center mb-3">IMDb {{parseFloat(title.pontuacao_imdb).toFixed(1)}}</p>
                <p class="blur-btn text-center">Movizz {{ movizzRating }}</p>
              </div>
              <div class="title-actions d-flex align-items-center flex-wrap" style="gap: 15px; flex-grow: 0">
                <button class="blur-btn" style="font-weight: 500" id="like" @click="addNewLike()">
                  Add to favourites <i class="fas fa-heart"></i>
                </button>
                <button class="blur-btn" style="font-weight: 500" id="seen" @click="addNewSeen()">
                  Mark as seen <i class="fas fa-eye"></i>
                </button>
                <div class="wrapper-stars position-relative d-flex justify-content-center">
                  <div v-show="showStars" class="p-2 show-stars" style="position: absolute; top: -45px; background-color: var(--cinza2); border-radius: 5px;">
                    <div class="stars d-flex" style="gap: 5px; font-size: 1.25em; cursor: pointer;" id="pontuacao">
                      <i class="fas fa-star" @click="changeRating(1,'a')" @mouseover="fillStars(1, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click=" changeRating(2, 'a')" @mouseover="fillStars(2, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click=" changeRating(3, 'a')" @mouseover="fillStars(3, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click=" changeRating(4, 'a')" @mouseover="fillStars(4, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click=" changeRating(5, 'a')" @mouseover="fillStars(5, 'b')" @mouseleave="fillStars(0, 'c')"></i>
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
        <a v-if="title.total_temporadas > 0" href="#seasons">Seasons</a>
        <a href="#comments">Comments</a>
        <a href="#quizzes">Quizzes</a>
      </div>
      <hr class="mt-5 mb-5">
      <section id="cast" class="mt-5 mb-3">
        <p class="subtitle">Cast</p>
        <div class="cast-members row">
          <template v-for="i in title.elenco.length">
            <div v-show="(i - 1) > 5 ? (showFullCast ? true : false) : true" class="cast-card col-lg-2 col-md-3 col-sm-4 col-6 g-2" :key="i">
              <div style="background-color: var(--azul-escuro2); border-radius: 10px; w-100">
                <div class="cast-photo" :style="{ backgroundImage: 'url(' + title.elenco[i - 1].image + ')' }" style="
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center center;
                    width: 100%;
                    height: 150px;
                    border-top-right-radius: 10px;
                    border-top-left-radius: 10px;
                  "></div>
                <p class="text-center pt-3 m-0" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{{ title.elenco[i - 1].name }}</p>
                <div class="w-100 pb-3 d-flex justify-content-center m-0 text-center">
                  <p class="p-0 m-0" style="color: var(--cinza2); width: 90%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{{ fixCharacterName(title.elenco[i - 1].asCharacter) }}</p>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="mt-3 mb-3">
          <a id="see-full-cast" @click="showFullCast = !showFullCast"><i :class="{'fas fa-minus-circle': showFullCast, 'fas fa-plus-circle': !showFullCast,}"></i>
            {{ showFullCast ? "Hide the complete cast" : "See the complete cast" }}
          </a>
        </div>
      </section>
      <hr class="mt-5 mb-5">
      <section id="crew">
        <p class="subtitle">Crew</p>
        <p>
          Writers:
          <span style="color: var(--cinza2)">{{ title.escritores ? extenseWriting(title.escritores) : "Information not available" }}</span>
        </p>
        <p>
          Producers:
          <span style="color: var(--cinza2)">{{ title.produtores ? extenseWriting(title.produtores) : "Information not available" }}</span>
        </p>
        <p>
          Directors:
          <span style="color: var(--cinza2)">{{ title.diretores ? extenseWriting(title.diretores) : "Information not available" }}</span>
        </p>
      </section>
      <hr class="mt-5 mb-5">
      <div v-if="title.total_temporadas > 0">
        <section id="seasons">
          <p class="subtitle">Seasons</p>
          <div class="d-flex num-seasons" style="gap: 25px">
            <p class="
                title-season
                d-flex
                justify-content-center
                align-items-center" :class="selectedSeason == i ? 'active' : ''" v-for="i in title.total_temporadas" :key="i"
              @click="selectedSeason = i">
              {{ i }}
            </p>
          </div>
          <div class="carousel-wrapper" style="position: relative;">
            <span class="nav-left" @click="simulateScroll('left')"><i class="fas fa-chevron-left"></i></span>
            <span class="nav-right" @click="simulateScroll('right')"><i class="fas fa-chevron-right"></i></span>
            <div class="row-carousel disable-scrollbars">
              <div class="row__inner p-0">
              <div class="tile" v-for="(episodio, i) in title.episodios.filter(ep => ep.num_temporada == selectedSeason)" :key="i">
                <div class="tile__media">
                  <img class="tile__img" :src="episodio.banner" />
                </div>
                <div class="tile__details">
                  <div class="tile__title">
                    <strong>{{ episodio.num_episodio }}</strong>&nbsp;&nbsp;&nbsp;"{{ episodio.titulo }}"
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </section>
          <hr class="mt-5 mb-5">
        </div>
        <div class="row">
          <div class="col-md-8">
            <section id="comments">
              <p class="subtitle">Comments</p>
              <form  @submit.prevent="addNewComment()">
                <textarea id="comment-content" v-model.lazy="comentario" required placeholder="Let others know what you think..."></textarea>
                <div class="mt-1 mb-4">
                  <label class="cbox">Is this comment a spoiler?
                    <input v-model="spoiler" type="checkbox">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="mt-3 mb-3">
                  <input class="orange-btn" type="submit" value="Comment">
                </div>
              </form>
              <div class="other-comments mt-5" id="comment">
                <div class="card-comment d-flex mb-3" style="gap: 15px;" v-for="(comment, i) in comments" :key="i" >
                  <div  :style="'background-image: url(' + getAllUsers[comment.id_utilizador].avatar + ');'" style="min-width: 50px;height: 50px;background-repeat: no-repeat;background-size: cover;background-position: center; border-radius: 50%;"></div>
                  <div class="details d-flex flex-column">
                    <p id="comment-author">{{ getAllUsers[comment.id_utilizador].primeiro_nome + ' ' + getAllUsers[comment.id_utilizador].ultimo_nome }} <span>{{ new Date(comment.data).getDate() + "/" + (parseInt(new Date(comment.data).getMonth()) + 1) + "/" + new Date(comment.data).getFullYear() + " at " + new Date(comment.data).getHours() + ":" + String(new Date(comment.data).getMinutes()).padStart(2, '0') + "h" }}</span></p>
                    <p v-if="comment.spoiler" class="comment-message" style="color: var(--vermelho);">Spoiler!!! <span @click="mostrarSpoiler(comment.comentario, i)" style="cursor: pointer;">See hidden comment</span></p>
                    <p v-else class="comment-message">{{ comment.comentario }}</p>
                  </div>
                  <span v-if="comment.id_utilizador==getLoggedUser.id || getLoggedUser.is_admin" @click="removeComment(comment.id_comentario)" class="unblock-button"><i class="fas fa-trash"></i></span>
                </div>
                <div>
                  <p v-if="comments.length==0">Be the first to comment on this title</p>
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
  data() {
    return {
      showFullCast: false,
      selectedSeason: 1,
      showStars: false,
      savedStars: 0,
      title: [],
      userLikes: [],
      userSeen: [],
      comments: [],
      comentario: "",
      userRatings: [],
      movizzRating: 0.00,
      spoiler: false
    };
  },
  computed: {
      ...mapGetters(["getTitleInfo", "getTitleLikes", "getLoggedUser", "getTitlesSeenByUser", "getTitleComments", "getAllUsers", "getNextAvailableTitleCommentID", "getUserTitleRating", "getTitleMovizzRating"]),
  },
  mounted () {
    document.querySelector(".jumbotron").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${this.title.banner})`;
    this.verifyLike();
    this.verifySeen();
    this.verifyRating();
  },
  created () {
    this.title = this.getTitleInfo(this.$route.params.imdbid);
    this.userLikes = this.getTitleLikes(this.getLoggedUser.id);
    this.userSeen = this.getTitlesSeenByUser(this.getLoggedUser.id);
    this.comments = this.getTitleComments(this.$route.params.imdbid);
    this.userRatings.pontuacao = this.getUserTitleRating(this.getLoggedUser.id, this.$route.params.imdbid) ? this.getUserTitleRating(this.getLoggedUser.id, this.$route.params.imdbid).pontuacao : 0;
    this.movizzRating = this.getTitleMovizzRating(this.$route.params.imdbid);
  },
  methods: {
    ...mapMutations(["SET_NEW_LIKE", "SET_HAS_SEEN", "REMOVE_HAS_SEEN", "REMOVE_LIKE","SET_NEW_TITLE_COMMENT","SET_NEW_TITLE_RATING","REMOVE_TITLE_RATING","REMOVE_TITLE_COMMENT"]),
    removeComment(id) {
      this.$swal({
        title: 'Warning!',
        text: "Are you sure you want to remove this comment?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.REMOVE_TITLE_COMMENT(id);
          this.comments= this.comments.filter(comment=>comment.id_comentario!=id);
        }
      });
      
    },
    addNewComment() {
      const DATA_COMMENT = new Date();
      this.comments.push({
        id_comentario: this.getNextAvailableTitleCommentID,
        id_imdb: this.$route.params.imdbid,
        id_utilizador: this.getLoggedUser.id,
        comentario: this.comentario,
        data: DATA_COMMENT,
        spoiler:this.spoiler
      });
      this.SET_NEW_TITLE_COMMENT({
        id_comentario: this.getNextAvailableTitleCommentID,
        id_imdb: this.$route.params.imdbid,
        id_utilizador: this.getLoggedUser.id,
        comentario: this.comentario,
        data: DATA_COMMENT,
        spoiler:this.spoiler
      });
    },
    verifyRating(){
      for (let i = 0; i < this.userRatings.pontuacao; i++) {
        this.fillStars(i + 1, 'a');
      }   
    },
    changeRating(n, event_type){
      this.fillStars(n, event_type)
      if(this.savedStars > 0){
        this.SET_NEW_TITLE_RATING({
          id_imdb: this.$route.params.imdbid,
          id_utilizador: this.getLoggedUser.id,
          pontuacao: this.savedStars
        });
      }
      else {
        this.REMOVE_TITLE_RATING(this.$route.params.imdbid);
      }
      this.userRatings.pontuacao = this.savedStars;
      this.movizzRating = this.getTitleMovizzRating(this.$route.params.imdbid);
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
      if(!this.userSeen.some(filme=>filme==this.$route.params.imdbid)){
        this.SET_HAS_SEEN({
          id_imdb: this.$route.params.imdbid,
          id_utilizador: this.getLoggedUser.id
        });
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
      if(!this.userLikes.some(filme=>filme==this.$route.params.imdbid)){
        this.SET_NEW_LIKE({
          id_imdb: this.$route.params.imdbid,
          id_utilizador: this.getLoggedUser.id
        });
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
        
    },
    extenseWriting(arr) {
      // Função que normaliza um array
      // ["Carro", "Perna", "Prédio"] => Carro, Perna e Prédio
      let resultString = "";
      for (let i = 0; i < arr.length; i++) {
        if ((i == (arr.length - 1)) && (arr.length > 1)) {
          resultString = resultString.slice(0, -2);
          resultString += " and "+ (arr[i].name ? arr[i].name : arr[i]);
        } else {
          resultString += arr.length > 1 ? (arr[i].name ? arr[i].name : arr[i]) + ", " : (arr[i].name ? arr[i].name : arr[i]);
        }
      }
      return resultString;
    },
    fixCharacterName(name) {
      // O nome do personagem vem assim da API: Skyler White 62 episodes, 2008-2013
      // Esta função devolverá apenas Skyler White
      let result = "";
      for (let i = 0; i < name.length; i++) {
        if (name[i] == " " || isNaN(name[i])) {
          result += name[i];
        } else {
          break;
        }
      }
      return result.trim();
    },
    mostrarSpoiler(comentario, id){
      const doc = document.querySelectorAll(".comment-message")[id];
      doc.innerHTML = comentario;
      doc.style.color = "#ffffff";
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

.unblock-button {
  background: var(--vermelho);
  border-radius: 5px;
  color: #ffffff;
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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