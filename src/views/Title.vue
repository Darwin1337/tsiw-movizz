<template>
  <div>
    <div class="jumbotron">
      <div class="container h-100">
        <div class="row h-100 w-100 pt-5 pb-5 m-0">
          <div class="poster col-lg-4 m-auto">
            <div class="w-100 poster-wrapper">
              <img id="title-poster" src="https://image.tmdb.org/t/p/original/dmnwJGVergOFWCiLbPsQTyyzePw.jpg"
                alt="Title cover" />
            </div>
          </div>
          <div class="main-info col-lg-8">
            <div class="d-flex align-items-center" style="gap: 20px">
              <p id="title-name">La Casa de Papel</p>
              <p id="title-content-rating" class="d-flex align-items-center justify-content-center">
                TV-MA
              </p>
            </div>
            <p id="title-date">2017-2021</p>
            <p id="title-genres">Action, Crime and Drama</p>
            <div>
              <div class="d-flex align-items-center mb-2" style="gap: 20px">
                <p class="m-0" style="font-size: 1.25em">
                  <strong>Synopsis</strong>
                </p>
                <a class="m-0 d-flex align-items-center" style="gap: 15px"
                  href="https://www.imdb.com/video/imdb/vi2646786841" target="_blank">
                  <img src="../assets/images/youtube.svg" alt="YouTube icon" width="40px" />
                  Watch the trailer
                </a>
              </div>
              <p id="title-synopsis">
                Set in Madrid, a mysterious man known as the "Professor"
                recruits a group of eight people, who choose city names as their
                aliases, to carry out an ambitious plan that involves entering
                the Royal Mint of Spain, and escaping with €984 million. After
                taking 67 people hostage inside the Mint, the team plans to
                remain inside for 11 days to print the money as they deal with
                elite police forces. In the events following the initial heist,
                the group's members are forced out of hiding and prepare for a
                second heist, this time on the Bank of Spain, as they again deal
                with hostages and police forces.
              </p>
            </div>
            <div class="mb-3">
              <img src="https://flagcdn.com/16x12/es.png" />
              &nbsp;
              <span id="title-language">Spanish</span>
            </div>
            <p id="title-running-time">42-77 minutes per episode</p>
            <p id="title-availability">Available on <strong>Netflix</strong></p>
            <div class="
                title-actions-wrapper
                d-flex
                justify-content-between
                flex-wrap
              ">
              <div>
                <p class="orange-btn text-center mb-3">IMDb 8.2</p>
                <p class="blur-btn text-center">Movizz 4.1/5</p>
              </div>
              <div class="title-actions d-flex align-items-center flex-wrap" style="gap: 15px; flex-grow: 0">
                <button class="blur-btn" style="font-weight: 500">
                  Add to favourites <i class="fas fa-heart"></i>
                </button>
                <button class="blur-btn" style="font-weight: 500">
                  Mark as seen <i class="fas fa-eye"></i>
                </button>
                <div class="wrapper-stars position-relative d-flex justify-content-center">
                  <div v-if="showStars" class="p-2 show-stars" style="position: absolute; top: -45px; background-color: var(--cinza2); border-radius: 5px;">
                    <div class="stars d-flex" style="gap: 5px; font-size: 1.25em; cursor: pointer; color: white;">
                      <i class="fas fa-star" @click="fillStars(1, 'a')" @mouseover="fillStars(1, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click="fillStars(2, 'a')" @mouseover="fillStars(2, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click="fillStars(3, 'a')" @mouseover="fillStars(3, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click="fillStars(4, 'a')" @mouseover="fillStars(4, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                      <i class="fas fa-star" @click="fillStars(5, 'a')" @mouseover="fillStars(5, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                    </div>
                  </div>
                  <button class="blur-btn" style="font-weight: 500" @click="showStars = !showStars">
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
          <div class="cast-card col-lg-2 col-md-3 col-sm-4 col-6 g-2" v-for="i in showFullCast ? 24 : 6" :key="i">
            <div style="background-color: var(--azul-escuro2); border-radius: 10px; w-100">
              <div class="cast-photo" style="
                  background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/58/Premios_Goya_2018_-_%C3%9Arsula_Corber%C3%B3.jpg');
                  background-repeat: no-repeat;
                  background-size: cover;
                  background-position: top;
                  width: 100%;
                  height: 150px;
                  border-top-right-radius: 10px;
                  border-top-left-radius: 10px;
                "></div>
              <p class="text-center pt-3 m-0">Úrsula Corberó</p>
              <p class="text-center pb-3 m-0" style="color: var(--cinza2)">
                Tokio
              </p>
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
          <span style="color: var(--cinza2)">David Pelegrín, Luis Miguel González Bedmar, Verónica Callón, Raúl
            Mora, Regino Hernández, Raquel Marraco and Patricia Rubio</span>
        </p>
        <p>
          Producers:
          <span style="color: var(--cinza2)">Álex Pina, Sonia Martínez, Jesús Colmenar, Esther Martínez Lobato
            and Nacho Manubens</span>
        </p>
        <p>
          Directors:
          <span style="color: var(--cinza2)">Jesús Colmenar, Koldo Serra, Álex Rodrigo and Javier Quintas</span>
        </p>
      </section>
      <hr />
      <section id="seasons">
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
        <hr>
        <div class="row">
          <div class="col-md-8">
            <section id="comments">
              <p class="subtitle">Comments</p>
              <form>
                <textarea id="comment-content" required placeholder="Let others know what you think..."></textarea>
                <div class="mt-1 mb-4">
                  <label class="cbox">Is this comment a spoiler?
                    <input type="checkbox">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="mt-3 mb-3">
                  <button class="orange-btn" type="submit">Comment</button>
                </div>
              </form>
              <div class="other-comments mt-5">
                <div class="card-comment d-flex" style="gap: 15px;">
                  <div class="photo" id="comment-photo1"></div>
                  <div class="details d-flex flex-column">
                    <p id="comment-author">Antónia Marques <span>21 de julho de 2019</span></p>
                    <p id="comment-message">A básica série da Netflix.</p>
                  </div>
                </div>
                <br>
                <div class="card-comment d-flex" style="gap: 15px;">
                  <div class="photo" id="comment-photo2"></div>
                  <div class="details d-flex flex-column">
                    <p id="comment-author">Carlota Gonçalves <span>10 de julho de 2019</span></p>
                    <p id="comment-message">Das melhores series a nível de ação, deixou-me agarrada à televisão por dias sem conseguir para de ver.</p>
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
export default {
  // $route.params.imdbid
  data() {
    return {
      showFullCast: false,
      selectedSeason: 1,
      showStars: true,
      savedStars: 0 
    };
  },
  methods: {
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
    }, fillStars(n, event_type) {
        if (event_type == "a") {
            console.log("a")
            document.querySelectorAll(".stars .fas").forEach(a => a.style.color = "white");
            if (n > 0 && n != this.savedStars) {
                for (let i = 0; i < n; i++) {
                    document.querySelectorAll(".stars .fas")[i].style.color = "var(--laranja)";
                }
            }
            this.savedStars = n != this.savedStars ? n : 0;
        } else if (event_type == "b") {
            console.log("b")
            document.querySelectorAll(".stars .fas").forEach(a => a.style.color = "white");
            if (n > 0) {
                for (let i = 0; i < n; i++) {
                    document.querySelectorAll(".stars .fas")[i].style.color = "var(--laranja)";
                }
            }
        } else {
            console.log("c")
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url("https://m.media-amazon.com/images/M/MV5BZTY5YzBiMWYtZWJkNS00ODg1LWI2N2MtZTYxOGFmOTk1YTg2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio1.7800_AL_.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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