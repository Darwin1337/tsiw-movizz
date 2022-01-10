<template>
<div class="container">
  <div class="mt-5">
    <div class="hall-of-fame d-flex justify-content-center mb-4" style="gap: 15px;">
      <span style="border-right: 3px solid var(--verde); font-weight: bold; color: var(--verde); font-size: 1.5em;"
        class="pe-2 d-flex align-items-center text-end">Movizz<br>Hall of Fame</span>
      <div class="top-3 d-flex align-items-end" style="gap: 15px;">
        <div class="member d-flex flex-column align-items-center">
          <div style="position: relative;">
            <img src="https://thispersondoesnotexist.com/image" width="50px" height="50px" style="border-radius: 50%;">
            <img src="../assets/images/crown_gold_icon.svg" width="35px"
              style="position: absolute; top: -18px; left: 23px; transform: rotate(30deg);">
            <p class="member-level big">44</p>
          </div>
          <p class="m-0 mt-2 text-center" style="color: white;">Gonçalo</p>
          <p style="color: var(--cinza2);" class="m-0 text-center">Director</p>
        </div>

        <div class="member d-flex flex-column align-items-center">
          <div style="position: relative;">
            <img src="https://thispersondoesnotexist.com/image" width="40px" height="40px" style="border-radius: 50%;">
            <img src="../assets/images/crown_silver_icon.svg" width="30px"
              style="position: absolute; top: -16px; left: 16px; transform: rotate(25deg);">
            <p class="member-level small">39</p>
          </div>
          <p class="m-0 mt-2 text-center" style="color: white;">Diogo</p>
          <p style="color: var(--cinza2);" class="m-0 text-center">Producer</p>
        </div>

        <div class="member d-flex flex-column align-items-center">
          <div style="position: relative;">
            <img src="https://thispersondoesnotexist.com/image" width="40px" height="40px" style="border-radius: 50%;">
            <img src="../assets/images/crown_bronze_icon.svg" width="30px"
              style="position: absolute; top: -16px; left: 16px; transform: rotate(25deg);">
            <p class="member-level small">26</p>
          </div>
          <p class="m-0 mt-2 text-center" style="color: white;">Carlos</p>
          <p style="color: var(--cinza2);" class="m-0 text-center">Apprentice</p>
        </div>
      </div>
    </div>
    <!-- Banner -->
    <div style="height:425px;">
      <div class="jumbotron d-flex align-items-end ps-3 pe-3 pb-5" style=" height:100% ; background-position: center; border-radius: 10px;">
        <div class="container for-about">
          <p style="color: var(--cinza2); font-weight: 500;">Quizz of the day</p>
          <h3 style="font-weight: bold;">Stranger Things</h3>
          <h5>Think you know about the upside down? Think again.</h5>
          <p style="color: var(--cinza2); font-weight: bold;">10 questions • Normal difficulty</p>
          <br>
          <div>
            <router-link :to="{name:''}"><img src="../assets/images/play_icon.png" width="25px"
                height="25px">&nbsp;&nbsp;&nbsp;Play</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Top Quizzes -->
  <h4 class="mt-5">Top Quizzes</h4>
  <section class="top-quizzes">
    <div class="navigation mb-2">
      <span class="nav-left me-3" @click="simulateScroll('left', '.top-quizzes')"><i
          class="fas fa-chevron-left"></i></span>
      <span class="nav-right ms-3" @click="simulateScroll('right', '.top-quizzes')"><i
          class="fas fa-chevron-right"></i></span>
    </div>
    <div class="carousel-wrapper" style="position: relative;">
      <div class="row-carousel disable-scrollbars">
        <div class="row__inner p-0">
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2">
              <p class="quiz-card-title">Quiz about Prison Break</p>
              <p class="quiz-card-play">▶</p>
              <p class="quiz-card-rating">4.7</p>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img" src="http://ae01.alicdn.com/kf/H82dbacf2a86942828898af5d5c75704dM.jpg" alt="" />
            </div>
            <div class="tile__details p-2">
              <p class="quiz-card-title">Quiz about Prison Break</p>
              <p class="quiz-card-play">▶</p>
              <p class="quiz-card-rating">4.7</p>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://upload.wikimedia.org/wikipedia/pt/e/e1/Breaking_bad_5_temporada_%28parte_1%29_poster.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2">
              <p class="quiz-card-title">Quiz about Prison Break</p>
              <p class="quiz-card-play">▶</p>
              <p class="quiz-card-rating">4.7</p>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2">
              <p class="quiz-card-title">Quiz about Prison Break</p>
              <p class="quiz-card-play">▶</p>
              <p class="quiz-card-rating">4.7</p>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2">
              <p class="quiz-card-title">Quiz about Prison Break</p>
              <p class="quiz-card-play">▶</p>
              <p class="quiz-card-rating">4.7</p>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2">
              <p class="quiz-card-title">Quiz about Prison Break</p>
              <p class="quiz-card-play">▶</p>
              <p class="quiz-card-rating">4.7</p>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2">
              <p class="quiz-card-title">Quiz about Prison Break</p>
              <p class="quiz-card-play">▶</p>
              <p class="quiz-card-rating">4.7</p>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2">
              <p class="quiz-card-title">Quiz about Prison Break</p>
              <p class="quiz-card-play">▶</p>
              <p class="quiz-card-rating">4.7</p>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2">
              <p class="quiz-card-title">Quiz about Prison Break</p>
              <p class="quiz-card-play">▶</p>
              <p class="quiz-card-rating">4.7</p>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2">
              <p class="quiz-card-title">Quiz about Prison Break</p>
              <p class="quiz-card-play">▶</p>
              <p class="quiz-card-rating">4.7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Top Movies -->
  <h4 class="mt-5">Top Movies</h4>
  <section class="top-movies">
    <div class="navigation mb-2">
      <span class="nav-left me-3" @click="simulateScroll('left', '.top-movies')"><i
          class="fas fa-chevron-left"></i></span>
      <span class="nav-right ms-3" @click="simulateScroll('right', '.top-movies')"><i
          class="fas fa-chevron-right"></i></span>
    </div>
    <div class="carousel-wrapper" style="position: relative;">
      <div class="row-carousel disable-scrollbars">
        <div class="row__inner p-0">
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img" src="http://ae01.alicdn.com/kf/H82dbacf2a86942828898af5d5c75704dM.jpg" alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://upload.wikimedia.org/wikipedia/pt/e/e1/Breaking_bad_5_temporada_%28parte_1%29_poster.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Top Series -->
  <h4 class="mt-5">Top Series</h4>
  <section class="top-series">
    <div class="navigation mb-2">
      <span class="nav-left me-3" @click="simulateScroll('left', '.top-series')"><i
          class="fas fa-chevron-left"></i></span>
      <span class="nav-right ms-3" @click="simulateScroll('right', '.top-series')"><i
          class="fas fa-chevron-right"></i></span>
    </div>
    <div class="carousel-wrapper" style="position: relative;">
      <div class="row-carousel disable-scrollbars">
        <div class="row__inner p-0">
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img" src="http://ae01.alicdn.com/kf/H82dbacf2a86942828898af5d5c75704dM.jpg" alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://upload.wikimedia.org/wikipedia/pt/e/e1/Breaking_bad_5_temporada_%28parte_1%29_poster.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img"
                src="https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE.jpg"
                alt="" />
            </div>
            <div class="tile__details p-2 text-center d-flex justify-content-center align-items-center flex-column">
              <p class="quiz-card-title">Prison Break</p>
              <button class="orange-btn" style="font-size: .85em;">IMDb 8.2</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
  export default {
    methods: {
      simulateScroll(dir, target) {
        if (dir == "right") {
          document.querySelector(target + " .nav-left").style.color = "white";
          if (parseInt(document.querySelector(target + " .row-carousel").scrollLeft) + (parseInt(document.querySelector(target + " .row-carousel").querySelector(".tile").offsetWidth) + 10) >= parseInt(document.querySelector(target + " .row-carousel").scrollWidth) - parseInt(document.querySelector(target + " .row-carousel").clientWidth)) {
            document.querySelector(target + " .row-carousel").scrollLeft = parseInt(document.querySelector(target + " .row-carousel").scrollWidth) - parseInt(document.querySelector(target + " .row-carousel").clientWidth);
            document.querySelector(target + " .nav-right").style.color = "gray";
          } else {
            document.querySelector(target + " .row-carousel").scrollLeft += (parseInt(document.querySelector(target + " .row-carousel").querySelector(".tile").offsetWidth) + 10);
          }
        } else {
          document.querySelector(target + " .nav-right").style.color = "white";
          if (parseInt(document.querySelector(target + " .row-carousel").scrollLeft) - (parseInt(document.querySelector(target + " .row-carousel").querySelector(".tile").offsetWidth) + 10) <= 0) {
            document.querySelector(target + " .row-carousel").scrollLeft = 0;
            document.querySelector(target + " .nav-left").style.color = "gray";
          } else {
            document.querySelector(target + " .row-carousel").scrollLeft -= (parseInt(document.querySelector(target + " .row-carousel").querySelector(".tile").offsetWidth) + 10);
          }
        }
      }
    }
  };
</script>

<style scoped>
  .jumbotron {
    background-image: url("../assets/images/home_banner.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  a {
    text-decoration: none;
    color: white;
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
    top: 29px;
    left: 27px;
  }

  .member-level.small {
    width: 20px;
    height: 20px;
    font-size: .75em;
    top: 25px;
    left: 25px;
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
    max-width: 200px;
    width: 100%;
    margin-right: 10px;
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

  .row__inner:hover .tile:hover {
    opacity: 1;
  }

  .navigation {
    font-size: 1.5em;
    color: white;
    display: flex;
    justify-content: flex-end;
  }

  .nav-left {
    color: gray;
  }

  .nav-left:hover,
  .nav-right:hover {
    cursor: pointer;
  }

  .tile__details {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
    transition: 450ms opacity;
    border-radius: 5px;
  }

  .tile__details:after {
    margin-top: -25px;
    margin-left: -25px;
    width: 50px;
    height: 50px;
    border: 3px solid #ecf0f1;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .tile__details:before:hover {
    cursor: pointer;
  }

  .tile:hover .tile__details {
    opacity: 1;
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

  @media (max-width: 419px) {
    .hall-of-fame>span {
      font-size: 1.25em !important;
    }

    .hall-of-fame p {
      font-size: .85em;
    }

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

  @media (max-width: 767px) {
    .nav-left,
    .nav-right {
      display: none;
    }
  }
</style>
