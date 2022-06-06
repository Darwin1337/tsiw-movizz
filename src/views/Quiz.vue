<template>
  <div v-if="!loading.quiz" class="container">
    <div class="row mt-4 gy-2">
      <div class="col-lg-6 h-100">
        <div
          class="jumbotron d-flex align-items-center p-5"
          style="max-height: 386px; height: 100%; background-position: center"
          :style="'background-image: linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.65)), url(' + (webpSupported ? require('../assets/images/content/quiz/' + data.quiz.banner_webp) : data.quiz.banner) + ');'"
        >
          <div id="banner" class="w-100 h-100">
            <h3 class="quiz-title">{{ data.quiz.title }}</h3>
            <h5 class="quiz-description">{{ data.quiz.description }}</h5>
            <p class="mb-2 orangeText">{{ data.quiz.difficulty.description == "normal" ? "Normal" : "Hard" }} difficulty • {{ data.quiz.type.description == "short" ? "Short" : "Long" }} quiz • {{ data.quiz.type.questions }} questions</p>
            <p class="mb-2" style="color: var(--cinza-claro)">This quiz has been played {{ data.quiz.times_played }} times</p>
            <div v-if="data.quiz.is_specific" class="d-flex align-items-center mt-3" style="gap: 15px">
              <button @click="$router.push({ name: 'Title', params: { imdbid: data.quiz.questions[0].imdb_id } })" type="button" class="blur-btn" style="max-width: 150px"><span>Visit title</span></button>
            </div>
            <div id="rating" class="mt-3 ms-auto d-flex align-items-center justify-content-center">
              <p class="m-0 d-flex align-items-center justify-content-center">{{ parseFloat(data.quiz.quizz_rating).toFixed(1) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="d-flex justify-content-around quizHeader p-3" style="border-top-right-radius: 10px; border-top-left-radius: 10px">
          <p class="m-0">
            <b>{{ allowsPoints ? "XP & Points won: " : "XP won: " }}</b> {{ quizData.pontos_ganhos }}/{{ data.quiz.type.questions * data.quiz.difficulty.question_points }}
          </p>
          <p class="m-0">
            <b>{{ data.quiz.type.questions - quizData.num_pergunta }} Questions Left </b>
          </p>
          <p class="m-0">
            <b>{{ allowsPoints ? "Your points: " : "Your XP: " }}</b
            >{{ allowsPoints ? getLoggedUserData.data.points : getLoggedUserData.data.xp }}
          </p>
        </div>
        <div style="background-color: var(--azul-escuro2)" class="p-3 position-relative">
          <div style="z-index: 0">
            <div class="text-center">
              <img class="quizImage mt-3" :src="quizData.imagem" />
            </div>
            <p class="mt-3">
              <span>{{ quizData.num_pergunta + 1 }}. </span>{{ quizData.texto }}
            </p>
            <div class="row g-2">
              <div class="col-sm-6 col-lg-12 col-xl-6">
                <div @click="answerQuestion(1)" class="questions p-3">
                  <span class="orangeText">A.</span><span class="ms-3">{{ quizData.opcao_1 }}</span>
                </div>
              </div>
              <div class="col-sm-6 col-lg-12 col-xl-6">
                <div @click="answerQuestion(2)" class="questions p-3">
                  <span class="orangeText">B.</span><span class="ms-3">{{ quizData.opcao_2 }}</span>
                </div>
              </div>
              <div class="col-sm-6 col-lg-12 col-xl-6">
                <div @click="answerQuestion(3)" class="questions p-3">
                  <span class="orangeText">C.</span><span class="ms-3">{{ quizData.opcao_3 }}</span>
                </div>
              </div>
              <div class="col-sm-6 col-lg-12 col-xl-6">
                <div @click="answerQuestion(4)" class="questions p-3">
                  <span class="orangeText">D.</span><span class="ms-3">{{ quizData.opcao_4 }}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="position: absolute; top: 0; left: 0; z-index: 0; background-color: var(--azul-escuro2)" :style="{ display: hasQuizStarted ? 'none' : 'flex' }" class="h-100 w-100 justify-content-center align-items-center">
            <button @click="showWarning()" class="play-btn"><i class="far fa-play-circle"></i>&nbsp;&nbsp;&nbsp;Start the quiz</button>
          </div>
          <div style="position: absolute; top: 0; left: 0; z-index: 0; background-color: var(--azul-escuro2); transition: 450ms" :style="{ display: hasQuizFinished ? 'flex' : 'none' }" class="h-100 w-100 justify-content-center align-items-center">
            <div class="h-100 w-100" :style="'background-image: url(' + require('../assets/images/confetti.png') + ');'" style="background-repeat: no-repeat; background-position: top center">
              <div class="h-100 container d-flex flex-column align-items-center justify-content-around">
                <h3>Congratulations!</h3>
                <div class="w-100">
                  <div class="d-flex p-3 align-items-center justify-content-between quizHeader" style="border-radius: 5px">
                    <div class="d-flex align-items-center" style="gap: 15px">
                      <i style="color: var(--laranja)" class="fas fa-check"></i>
                      <p class="m-0">Correct answers</p>
                    </div>
                    <p style="color: var(--azul-claro); font-size: 1.1rem" class="m-0">{{ quizData.respostas_certas }}</p>
                  </div>
                  <br />
                  <div class="d-flex p-3 align-items-center justify-content-between quizHeader" style="border-radius: 5px">
                    <div class="d-flex align-items-center" style="gap: 15px">
                      <i style="color: var(--laranja)" class="fas fa-times"></i>
                      <p class="m-0">Wrong answers</p>
                    </div>
                    <p style="color: var(--azul-claro); font-size: 1.1rem" class="m-0">{{ quizData.respostas_erradas }}</p>
                  </div>
                  <br />
                  <div class="d-flex p-3 align-items-center justify-content-between quizHeader" style="border-radius: 5px">
                    <div class="d-flex align-items-center" style="gap: 15px">
                      <i style="color: var(--laranja)" class="fas fa-star"></i>
                      <p class="m-0">Points won</p>
                    </div>
                    <p style="color: var(--azul-claro); font-size: 1.1rem" class="m-0">{{ quizData.pontos_ganhos }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="help-section d-flex justify-content-around align-items-center quizHeader p-3" style="border-bottom-right-radius: 10px; border-bottom-left-radius: 10px">
          <p class="m-0"><strong>Developed by Movizz</strong></p>
        </div>
      </div>
      <div class="col-lg-6 fix-margin">
        <div class="rate-quiz">
          <h4 class="mt-3 mb-3">Rate this quiz</h4>
          <div class="stars d-flex" style="gap: 5px; font-size: 1.25em; cursor: pointer; color: var(--cinza-claro)">
            <i class="fas fa-star" @click="changeRating(1, 'a')" @mouseover="fillStars(1, 'b')" @mouseleave="fillStars(0, 'c')"></i>
            <i class="fas fa-star" @click="changeRating(2, 'a')" @mouseover="fillStars(2, 'b')" @mouseleave="fillStars(0, 'c')"></i>
            <i class="fas fa-star" @click="changeRating(3, 'a')" @mouseover="fillStars(3, 'b')" @mouseleave="fillStars(0, 'c')"></i>
            <i class="fas fa-star" @click="changeRating(4, 'a')" @mouseover="fillStars(4, 'b')" @mouseleave="fillStars(0, 'c')"></i>
            <i class="fas fa-star" @click="changeRating(5, 'a')" @mouseover="fillStars(5, 'b')" @mouseleave="fillStars(0, 'c')"></i>
          </div>
          <p v-if="savedStars == 0" style="color: var(--cinza2)" class="mt-2">You haven't rated this quiz yet</p>
        </div>
        <section id="comments" class="mt-3">
          <form @submit.prevent="addNewComment()">
            <textarea id="comment-content" required placeholder="Let others know what you think..." v-model.lazy="comentario"></textarea>
            <div class="mt-3 mb-3">
              <button class="orange-btn" type="submit">Comment</button>
            </div>
          </form>
          <div class="other-comments mt-5" id="comment">
            <div class="card-comment d-flex mb-3" style="gap: 15px;" v-for="(comment, i) in data.quiz.comments" :key="i" >
              <div  :style="'background-image: url(' + comment.user_id.avatar + ');'" style="min-width: 50px;height: 50px;background-repeat: no-repeat;background-size: cover;background-position: center; border-radius: 50%;"></div>
              <div class="details d-flex flex-column">
                  <p id="comment-author">{{ comment.user_id.first_name + ' ' + comment.user_id.last_name }} <span>{{ new Date(comment.date).getDate() + "/" + (parseInt(new Date(comment.date).getMonth()) + 1) + "/" + new Date(comment.date).getFullYear() + " at " + new Date(comment.date).getHours() + ":" + String(new Date(comment.date).getMinutes()).padStart(2, '0') + "h" }}</span></p>
                  <p class="comment-message">{{ comment.comment }}</p>
              </div>
              <span v-if="comment.user_id.id == getLoggedUserData.data.id || getLoggedUserData.data.is_admin" @click="removeComment(comment.id)" class="unblock-button"><i class="fas fa-trash"></i></span>
            </div>
            <div>
                <p v-if="data.quiz.comments.length == 0">Be the first to comment on this quiz</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <div v-else class="d-flex flex-column justify-content-center align-items-center text-center">
    <img src="../assets/images/loading.gif" alt="" />
    <h3>We thought this would be faster as well, <span style="color: var(--laranja)">sorry</span>.</h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Quiz",
  data() {
    return {
      webpSupported: true,
      data: {
        quiz: [],
      },
      loading: {
        quiz: true,
      },
      hasQuizStarted: false,
      hasQuizFinished: false,
      allowsPoints: true,
      warningMessage: `Finishing this game <strong>WILL</strong> get you points and XP.<br><br>Leaving mid-game will cause you to lose the opportunity to get them.`,
      quizData: {
        pld_id: null,
        num_pergunta: 0,
        imagem: "",
        texto: "",
        opcao_1: "",
        opcao_2: "",
        opcao_3: "",
        opcao_4: "",
        isLocked: false,
        pontos_ganhos: 0,
        respostas_certas: 0,
        respostas_erradas: 0
      },
      savedStars: 0,
      comentario: ""
    };
  },
  mounted() {
    this.getQuizInfo();
  },
  methods: {
    ...mapActions(["getQuiz", "addQuizAttempt", "updateQuizAttempt", "addPoints", "addXP", "addQuizComment", "removeQuizComment", "addQuizRating", "changeQuizRating", "removeQuizRating"]),
    isWebpSupported() {
      const elem = document.createElement("canvas");
      if (!!(elem.getContext && elem.getContext("2d"))) {
        return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
      }
      return false;
    },
    fillStars(n, event_type) {
      if (event_type == "a") {
        this.waitForElm(".stars .fas").then((elm) => {
          document.querySelectorAll(".stars .fas").forEach((a) => (a.style.color = "white"));
        });
        if (n > 0 && n != this.savedStars) {
          for (let i = 0; i < n; i++) {
            this.waitForElm(".stars .fas").then((elm) => {
              document.querySelectorAll(".stars .fas")[i].style.color = "var(--laranja)";
            });
          }
        }
        this.savedStars = n != this.savedStars ? n : 0;
      } else if (event_type == "b") {
        this.waitForElm(".stars .fas").then((elm) => {
          document.querySelectorAll(".stars .fas").forEach((a) => (a.style.color = "white"));
        });
        if (n > 0) {
          for (let i = 0; i < n; i++) {
            this.waitForElm(".stars .fas").then((elm) => {
              document.querySelectorAll(".stars .fas")[i].style.color = "var(--laranja)";
            });
          }
        }
      } else {
        this.waitForElm(".stars .fas").then((elm) => {
          document.querySelectorAll(".stars .fas").forEach((a) => (a.style.color = "white"));
        });
        for (let i = 0; i < this.savedStars; i++) {
          this.waitForElm(".stars .fas").then((elm) => {
            document.querySelectorAll(".stars .fas")[i].style.color = "var(--laranja)";
          });
        }
      }
    },
    preGameVerification() {
      // REQ 037
      // Permitir a realização de apenas 1 quiz longo (de dificuldade normal ou difícil) ou 2 quiz curtos (pelo menos 1 desses 2 tem de ser de dificuldade difícil) por dia, todos os quizzes realizados posteriormente não irão dar pontos mas contarão para o nível/badge e XP;
      const CUR_DATA = new Date();
      const QUIZZES_PLAYED_LAST24H = this.getLoggedUserData.data.played.filter((jogo) => Math.abs(CUR_DATA.getTime() - new Date(jogo.date).getTime()) / 3600000 < 24);
      if (QUIZZES_PLAYED_LAST24H.length > 0) {
        const CURTOS_LAST24 = QUIZZES_PLAYED_LAST24H.filter((jogo) => jogo.quiz_id.type.description == "short" && jogo.allowed_points);
        const LONGOS_LAST24 = QUIZZES_PLAYED_LAST24H.filter((jogo) => jogo.quiz_id.type.description == "long" && jogo.allowed_points);

        if (LONGOS_LAST24.length >= 1) {
          this.allowsPoints = false;
          this.warningMessage = `You have already played a long quiz that allowed points in the last 24h.<br><br>Finishing this game will get you XP but <strong>NOT</strong> points.<br><br>Leaving mid-game will cause you to lose the opportunity to get it.`;
        } else {
          if (CURTOS_LAST24.length == 1) {
            if ((CURTOS_LAST24[0].quiz_id.difficulty.description == "normal" && this.data.quiz.difficulty.description == "normal") || (CURTOS_LAST24[0].quiz_id.difficulty.description == "hard" && this.data.quiz.difficulty.description == "dificil")) {
              this.allowsPoints = false;
              this.warningMessage = `You have played a short <strong>${this.data.quiz.difficulty.description}</strong> quiz that allowed points in the last 24h.<br><br>To have the ability of winning points please choose a short <strong>${
                this.data.quiz.difficulty.description == "normal" ? "hard" : "normal"
              }</strong> quiz.<br><br>Finishing this game will get you XP but <strong>NOT</strong> points.<br><br>Leaving mid-game will cause you to lose the opportunity to get it.`;
            } else if (this.data.quiz.type.description == "long") {
              this.allowsPoints = false;
              this.warningMessage = `You have played a short <strong>${this.data.quiz.difficulty.description}</strong> quiz that allowed points in the last 24h.<br><br>To have the ability of winning points please choose a short <strong>${
                this.data.quiz.difficulty.description == "normal" ? "hard" : "normal"
              }</strong> quiz.<br><br>Finishing this game will get you XP but <strong>NOT</strong> points.<br><br>Leaving mid-game will cause you to lose the opportunity to get it.`;
            }
          } else if (CURTOS_LAST24.length > 1) {
            if (CURTOS_LAST24.filter((jogo) => jogo.quiz_id.difficulty.description == "normal").length >= 1 && CURTOS_LAST24.filter((jogo) => jogo.quiz_id.difficulty.description == "hard").length >= 1) {
              this.allowsPoints = false;
              this.warningMessage = `You have already played a normal short quiz and a hard short quiz in the last 24h.<br><br>Finishing this game will get you XP but <strong>NOT</strong> points.<br><br>Leaving mid-game will cause you to lose the opportunity to get it.`;
            } else if (this.data.quiz.type.description == "long") {
              this.allowsPoints = false;
              this.warningMessage = `You have played a short <strong>${this.data.quiz.difficulty.description}</strong> quiz that allowed points in the last 24h.<br><br>To have the ability of winning points please choose a short <strong>${
                this.data.quiz.difficulty.description == "normal" ? "hard" : "normal"
              }</strong> quiz.<br><br>Finishing this game will get you XP but <strong>NOT</strong> points.<br><br>Leaving mid-game will cause you to lose the opportunity to get it.`;
            }
          }
        }
      }
    },
    playQuiz() {
      this.hasQuizStarted = true;
      document.querySelectorAll(".questions").forEach((pergunta) => pergunta.classList.remove("correct-answer", "wrong-answer"));
      this.quizData.texto = this.data.quiz.questions[this.quizData.num_pergunta].content;
      this.quizData.opcao_1 = this.data.quiz.questions[this.quizData.num_pergunta].options[0].content;
      this.quizData.opcao_2 = this.data.quiz.questions[this.quizData.num_pergunta].options[1].content;
      this.quizData.opcao_3 = this.data.quiz.questions[this.quizData.num_pergunta].options[2].content;
      this.quizData.opcao_4 = this.data.quiz.questions[this.quizData.num_pergunta].options[3].content;
      this.quizData.imagem = this.data.quiz.questions[this.quizData.num_pergunta].image;
    },
    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    verifyRating() {
      const ratIdx = this.getLoggedUserData.data.quiz_ratings.findIndex(rating => rating.quiz_id.toString() == this.data.quiz._id.toString());
      const curRating = ratIdx != -1 ? this.getLoggedUserData.data.quiz_ratings[ratIdx].rating : 0.0;
      for (let i = 0; i < curRating; i++) {
        this.fillStars(i + 1, 'a');
      }
    },
    waitForElm(selector) {
      return new Promise((resolve) => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver((mutations) => {
          if (document.querySelector(selector)) {
            resolve(document.querySelector(selector));
            observer.disconnect();
          }
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      });
    },
    async changeRating(n, event_type){
      // Deixar o utilizador classificar o quiz apenas se o mesmo já o tiver jogado
      if (this.getLoggedUserData.data.played.some(attempt => (attempt.quiz_id.quiz_id.toString() == this.$route.params.id.toString()) && (attempt.was_completed))) {
        this.fillStars(n, event_type);
        if (this.savedStars > 0) {
          const ratIdx = this.getLoggedUserData.data.quiz_ratings.findIndex(rating => rating.quiz_id.toString() == this.data.quiz._id.toString())
          if (ratIdx != -1) {
            try {
              const updateRating = await this.changeQuizRating({ quiz_id: this.$route.params.id, rating: this.savedStars });
              if (updateRating.success) {
                this.$store.state.loggedUserData.data.quiz_ratings[ratIdx].rating = this.savedStars;
                localStorage.loggedUserData = JSON.stringify({ loading: false, data: this.$store.state.loggedUserData.data });
                this.data.quiz.quizz_rating = updateRating.average;
              } else {
                throw new Error(updateRating.msg);
              }
            } catch (e) {
              this.$swal('Error!', e.message, 'error');
            }
          } else {
            try {
              const newRating = await this.addQuizRating({ quiz_id: this.$route.params.id, rating: this.savedStars });
              if (newRating.success) {
                this.$store.state.loggedUserData.data.quiz_ratings.push(newRating.data);
                localStorage.loggedUserData = JSON.stringify({ loading: false, data: this.$store.state.loggedUserData.data });
                this.data.quiz.quizz_rating = newRating.average;
              } else {
                throw new Error(updateRating.msg);
              }
            } catch (e) {
              this.$swal('Error!', e.message, 'error');
            }
          }
        } else {
          try {
            const removeRating = await this.removeQuizRating({ quiz_id: this.$route.params.id });
            if (removeRating.success) {
              this.$store.state.loggedUserData.data.quiz_ratings = this.$store.state.loggedUserData.data.quiz_ratings.filter(rating => rating.quiz_id.toString() != this.data.quiz._id.toString());
              localStorage.loggedUserData = JSON.stringify({ loading: false, data: this.$store.state.loggedUserData.data });
              this.data.quiz.quizz_rating = removeRating.average;
            } else {
              throw new Error(updateRating.msg);
            }
          } catch (e) {
            this.$swal('Error!', e.message, 'error');
          }
        }
      } else {
        this.$swal.fire('You have never completed this quiz, please play it at least once to have the ability to rate!');
      }
    },
    async answerQuestion(id_clicado) {
      if (!this.quizData.isLocked) {
        this.quizData.isLocked = true;
        let opcaoCorreta = this.data.quiz.questions[this.quizData.num_pergunta].options.findIndex(opcao => opcao.correct == true) + 1;
        if (id_clicado == opcaoCorreta) {
          document.querySelectorAll(".questions")[id_clicado - 1].classList.add("correct-answer");
          this.quizData.respostas_certas += 1;
          this.quizData.pontos_ganhos += this.data.quiz.difficulty.question_points;
        } else {
          document.querySelectorAll(".questions")[id_clicado - 1].classList.add("wrong-answer");
          document.querySelectorAll(".questions")[opcaoCorreta - 1].classList.add("correct-answer");
          this.quizData.respostas_erradas += 1;
        }

        await this.timeout(2000);

        this.quizData.num_pergunta += 1;
        if (this.quizData.num_pergunta == this.data.quiz.type.questions) {
          this.hasQuizFinished = true;

          // Atualizar a tentativa
          try {
            const updQuizAttempt = await this.updateQuizAttempt({
              played_id: this.quizData.pld_id,
              questions_right: this.quizData.respostas_certas,
              questions_wrong: this.quizData.respostas_erradas,
              allowed_points: this.allowsPoints,
              was_completed: true
            });

            if (!updQuizAttempt.success) {
              this.$router.push({ name: 'Error', params: { '0': 'error' } });
            } else {
              this.$store.state.loggedUserData.data.played[this.$store.state.loggedUserData.data.played.findIndex(jogo => jogo._id == this.quizData.pld_id)] = updQuizAttempt.data;
              this.$store.state.loggedUserData.data.stats.quizzes_completed += 1;
              this.$store.state.loggedUserData.data.stats.questions_right += this.quizData.respostas_certas;
              this.$store.state.loggedUserData.data.stats.questions_wrong += this.quizData.respostas_erradas;
              localStorage.loggedUserData = JSON.stringify({ loading: false, data: this.$store.state.loggedUserData.data });
            }
          } catch (e) {
            this.$router.push({ name: 'Error', params: { '0': 'error' } });
          }

          if (this.allowsPoints) {
            // Se o jogo permitiu pontos, adicioná-los ao jogador
            try {
              const addPointsToUser = await this.addPoints(this.quizData.pontos_ganhos);

              if (!addPointsToUser.success) {
                this.$router.push({ name: 'Error', params: { '0': 'error' } });
              } else {
                this.$store.state.loggedUserData.data.points += this.quizData.pontos_ganhos;
                localStorage.loggedUserData = JSON.stringify({ loading: false, data: this.$store.state.loggedUserData.data });
              }
            } catch (e) {
              this.$router.push({ name: 'Error', params: { '0': 'error' } });
            }
          }

          // Adicionar o XP ganho ao utilizador
          try {
            const addXPToUser = await this.addXP(this.quizData.pontos_ganhos);

            if (!addXPToUser.success) {
              this.$router.push({ name: 'Error', params: { '0': 'error' } });
            } else {
              this.$store.state.loggedUserData.data.xp += this.quizData.pontos_ganhos;
              // Verificar se o utilizador subiu de nível
              if (addXPToUser.passed_level.toString() == "true") {
                this.$store.state.loggedUserData.data.stats.level += 1;
                this.$swal.fire("Congratulations, you just reached level " + this.getLoggedUserData.data.stats.level + "!");
              }
              localStorage.loggedUserData = JSON.stringify({ loading: false, data: this.$store.state.loggedUserData.data });
            }
          } catch (e) {
            this.$router.push({ name: 'Error', params: { '0': 'error' } });
          }
        } else {
          this.playQuiz();
        }
        this.quizData.isLocked = false;
      }
    },
    async showWarning() {
      const message = await this.$swal.fire({
        title: "Attention!",
        html: `<p class="w-100" style="text-align: left;">${this.warningMessage}</p>`,
        showCancelButton: true,
        confirmButtonText: "Continue",
        denyButtonText: `Cancel`,
        allowOutsideClick: false,
      });

      if (message.isConfirmed) {
        // Registar previamente a tentativa de quiz caso o utilizador saia a meio do jogo
        try {
          const quizAttempt = await this.addQuizAttempt({
            quiz_id: this.data.quiz._id,
            questions_right: 0,
            questions_wrong: 0,
            allowed_points: this.allowsPoints,
            was_completed: false,
          });

          if (!quizAttempt.success) {
            this.$router.push({ name: "Error", params: { 0: "error" } });
          } else {
            this.quizData.pld_id = quizAttempt.data._id;
            this.$store.state.loggedUserData.data.played.push(quizAttempt.data);
            this.data.quiz.times_played += 1;
            localStorage.loggedUserData = JSON.stringify({ loading: false, data: this.$store.state.loggedUserData.data });
          }
        } catch (e) {
          this.$router.push({ name: "Error", params: { 0: "error" } });
        }
        this.playQuiz()
      }
    },
    async getQuizInfo() {
      try {
        this.loading.quiz = true;
        this.data.quiz = await this.getQuiz({ id: this.$route.params.id });
        if (this.data.quiz.success) {
          this.data.quiz = this.data.quiz.msg;
          this.loading.quiz = false;
          this.preGameVerification();
          this.verifyRating();
        } else {
          this.$router.push({ name: "Error", params: { 0: "error" } });
        }
      } catch (e) {
        this.$router.push({ name: "Error", params: { 0: "error" } });
      }
    },
    async addNewComment() {
      if (this.getLoggedUserData.data.played.some(attempt => (attempt.quiz_id.quiz_id.toString() == this.$route.params.id.toString()) && (attempt.was_completed))) {
        try {
          const response = await this.addQuizComment({ quiz_id: this.$route.params.id, comment: this.comentario.trim() });

          if (response.success) {
            this.data.quiz.comments.push(response.data);
            this.comentario = "";
            this.$swal("Sucess!", "Comment added successfully!", "success");
          } else {
            throw new Error(response.msg);
          }
        } catch (e) {
          this.$swal("Error!", e.message, "error");
        }
      } else {
        this.$swal.fire('You have never completed this quiz, please play it at least once to have the ability to comment!');
      }
    },
    async removeComment(id) {
      const prompt = await this.$swal({
        title: "Warning!",
        text: "Are you sure you want to remove this comment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
      });

      if (prompt.isConfirmed) {
        try {
          const response = await this.removeQuizComment({
            quiz_id: this.$route.params.id,
            comment_id: id
          });

          if (response.success) {
            this.data.quiz.comments = this.data.quiz.comments.filter((comment) => comment.id.toString() != id.toString());
          } else {
            throw new Error(response.msg);
          }
        } catch (e) {
          this.$swal("Error!", e.message, "error");
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getLoggedUserData"]),
  },
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
.correct-answer {
  background-color: #1db83c !important;
  transition: 450ms;
}
.wrong-answer {
  background-color: #ec5252 !important;
  transition: 450ms;
}
.selected-answer {
  background-color: #4d535e !important;
  transition: 450ms;
}
.questions {
  border-radius: 10px;
  background-color: var(--bg);
  cursor: pointer;
}
.quizImage {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center top;
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
.quizHeader {
  background-color: #282f3c;
}
#rating {
  width: 50px;
  height: 50px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  color: var(--verde);
  border: 3px solid var(--verde);
}
.orangeText {
  color: var(--laranja);
}
#banner h3 {
  font-weight: bold;
  font-size: 55px;
}
.bannerQuizz {
  min-height: 350px;
  height: 100%;
}
.jumbotron {
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("https://i.pinimg.com/originals/91/0d/67/910d67f4f41a771e3f5f0c50c8f8dd0e.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
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
  color: #eeeeee;
}
.card-comment .details span {
  margin-left: 15px;
  color: var(--cinza2);
}
.fix-margin {
  margin-top: -265px;
}
@media (max-width: 1199px) {
  .fix-margin {
    margin-top: -385px;
  }
  .quiz-title {
    font-size: 2.5rem !important;
  }
  .quiz-description {
    font-size: 1.5rem !important;
  }
}
@media (max-width: 991px) {
  .fix-margin {
    margin-top: 0;
  }
}
@media (max-width: 575px) {
  .jumbotron {
    max-height: 450px !important;
  }
  .help-section {
    flex-direction: column;
  }
  .quiz-title {
    font-size: 2rem !important;
  }
  .quiz-description {
    font-size: 1.5rem !important;
  }
}
@media (max-width: 419px) {
  .jumbotron {
    max-height: 525px !important;
  }
  .quiz-title {
    font-size: 1.5rem !important;
  }
  .quiz-description {
    font-size: 1rem !important;
  }
}
</style>
