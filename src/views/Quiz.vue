<template>
    <div class="container">
        <div class="row mt-4 gy-2">
            <div class="col-lg-6 h-100">
                <div class="jumbotron d-flex align-items-center p-5" style="max-height: 386px; height: 100%; background-position: center;"
                    :style="'background-image: linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.65)), url(' + quizContent.banner  + ');'">
                    <div id="banner" class="w-100 h-100">
                        <h3 class="quiz-title">{{ quizContent.titulo }}</h3>
                        <h5 class="quiz-description">{{ quizContent.descricao }}</h5>
                        <p class="mb-2 orangeText">{{ quizContent.dificuldade.descricao == "normal" ? "Normal" : "Hard" }} • {{ quizContent.tipo.descricao == "curto" ? "Short" : "Long" }} quiz • {{ quizContent.tipo.num_perguntas }} questions</p>
                        <p class="mb-2" style="color: var(--cinza-claro);">This quiz has been played {{ getAllUsers.map(user => user.played.filter(quiz => quiz.id_quiz == $route.params.id)).reduce((acc, curr) => acc + curr.length, 0) }} times</p>
                        <div v-if="quizContent.especifico" class="d-flex align-items-center mt-3" style="gap: 15px;">
                            <button @click="$router.push({ name: 'Title', params: { imdbid: quizContent.perguntas[0].id_imdb } })" type="button" class="blur-btn" style="max-width: 150px;"><span>Visit title</span></button>
                        </div>
                        <div id="rating" class="mt-3 ms-auto d-flex align-items-center justify-content-center">
                            <p class="m-0 d-flex align-items-center justify-content-center">{{ movizzRating }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="d-flex justify-content-around quizHeader p-3" style="border-top-right-radius: 10px; border-top-left-radius: 10px;">
                    <p class="m-0"><b>{{ allowsPoints ? "XP & Points won: " : "XP won: " }}</b> {{ quizData.pontos_ganhos }}/{{ quizContent.tipo.num_perguntas * quizContent.dificuldade.pontos_pergunta }}</p>
                    <p class="m-0"><b>{{  quizContent.tipo.num_perguntas - quizData.num_pergunta }} Questions Left </b></p>
                    <p class="m-0"><b>{{ allowsPoints ? "Your points: " : "Your XP: " }}</b>{{ allowsPoints ? getLoggedUser.pontos : getLoggedUser.xp }}</p>
                </div>
                <div style="background-color:var(--azul-escuro2)" class="p-3 position-relative">
                    <div style="z-index: 0;">
                        <div class="text-center">
                            <img class="quizImage mt-3" :src="quizData.imagem">
                        </div>
                        <p class="mt-3"><span>{{ quizData.num_pergunta + 1 }}. </span>{{ quizData.texto }}</p>
                        <div class="row g-2">
                            <div class="col-sm-6 col-lg-12 col-xl-6">
                                <div @click="answerQuestion(1)" class="questions p-3"><span class="orangeText">A.</span><span class="ms-3">{{ quizData.opcao_1 }}</span></div>
                            </div>
                            <div class="col-sm-6 col-lg-12 col-xl-6">
                                <div @click="answerQuestion(2)" class="questions p-3"><span class="orangeText">B.</span><span class="ms-3">{{ quizData.opcao_2 }}</span></div>
                            </div>
                            <div class="col-sm-6 col-lg-12 col-xl-6">
                                <div @click="answerQuestion(3)" class="questions p-3"><span class="orangeText">C.</span><span class="ms-3">{{ quizData.opcao_3 }}</span></div>
                            </div>
                            <div class="col-sm-6 col-lg-12 col-xl-6">
                                <div @click="answerQuestion(4)" class="questions p-3"><span class="orangeText">D.</span><span class="ms-3">{{ quizData.opcao_4 }}</span></div>
                            </div>
                        </div>
                    </div>
                    <div style="position: absolute; top: 0; left: 0; z-index: 0; background-color:var(--azul-escuro2);" :style="{'display': hasQuizStarted ? 'none' : 'flex'}" class="h-100 w-100 justify-content-center align-items-center">
                        <button @click="showWarning()" class="play-btn"><i class="far fa-play-circle"></i>&nbsp;&nbsp;&nbsp;Start the quiz</button>
                    </div>
                    <div style="position: absolute; top: 0; left: 0; z-index: 0; background-color:var(--azul-escuro2); transition: 450ms;" :style="{'display': hasQuizFinished ? 'flex' : 'none'}" class="h-100 w-100 justify-content-center align-items-center">
                        <div class="h-100 w-100"
                        :style="'background-image: url(' + require('../assets/images/confetti.png') + ');'"
                        style="background-repeat: no-repeat; background-position: top center;">
                            <div class="h-100 container d-flex flex-column align-items-center justify-content-around">
                                <h3>Congratulations!</h3>
                                <div class="w-100">
                                    <div class="d-flex p-3 align-items-center justify-content-between quizHeader" style="border-radius: 5px;">
                                        <div class="d-flex align-items-center" style="gap: 15px;">
                                            <i style="color: var(--laranja);" class="fas fa-check"></i>
                                            <p class="m-0">Correct answers</p>
                                        </div>
                                        <p style="color: var(--azul-claro); font-size: 1.10rem;" class="m-0">{{ quizData.respostas_certas }}</p>
                                    </div>
                                    <br>
                                    <div class="d-flex p-3 align-items-center justify-content-between quizHeader" style="border-radius: 5px;">
                                        <div class="d-flex align-items-center" style="gap: 15px;">
                                            <i style="color: var(--laranja);" class="fas fa-times"></i>
                                            <p class="m-0">Wrong answers</p>
                                        </div>
                                        <p style="color: var(--azul-claro); font-size: 1.10rem;" class="m-0">{{ quizData.respostas_erradas }}</p>
                                    </div>
                                    <br>
                                    <div class="d-flex p-3 align-items-center justify-content-between quizHeader" style="border-radius: 5px;">
                                        <div class="d-flex align-items-center" style="gap: 15px;">
                                            <i style="color: var(--laranja);" class="fas fa-hands-helping"></i>
                                            <p class="m-0">Times help was needed</p>
                                        </div>
                                        <p style="color: var(--azul-claro); font-size: 1.10rem;" class="m-0">{{ quizData.ajudas_utilizadas }}</p>
                                    </div>
                                    <br>
                                    <div class="d-flex p-3 align-items-center justify-content-between quizHeader" style="border-radius: 5px;">
                                        <div class="d-flex align-items-center" style="gap: 15px;">
                                            <i style="color: var(--laranja);" class="fas fa-star"></i>
                                            <p class="m-0">Points won</p>
                                        </div>
                                        <p style="color: var(--azul-claro); font-size: 1.10rem;" class="m-0">{{ quizData.pontos_ganhos }}</p>
                                    </div>
                                </div>
    
                            </div>
                        </div>
                    </div>
                </div>
                <div class="help-section d-flex justify-content-around align-items-center quizHeader p-3" style="border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;">
                    <div class="position-relative" style="width: 100%; max-width: 150px;">
                        <button disabled class="gray-btn" style="cursor: default;">50/50</button>
                        <span
                            class="position-absolute d-flex justify-content-center align-items-center"
                            style="top: -10px; left: -10px; width: 25px; height: 25px; background-color: var(--azul-escuro2); border-radius: 50%; font-size: .85em; font-weight: bold;">
                            <i class="fas fa-ban"></i>
                        </span>
                    </div>
                    <p class="m-0"><b>Need a hand? </b></p>
                    <div class="position-relative" style="width: 100%; max-width: 150px;">
                        <button disabled class="gray-btn" style="cursor: default;">New question</button>
                        <span
                            class="position-absolute d-flex justify-content-center align-items-center"
                            style="top: -10px; left: -10px; width: 25px; height: 25px; background-color: var(--azul-escuro2); border-radius: 50%; font-size: .85em; font-weight: bold;">
                            <i class="fas fa-ban"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 fix-margin">
                <div class="rate-quiz">
                    <h4 class="mt-3 mb-3">Rate this quiz</h4>
                    <div class="stars d-flex" style="gap: 5px; font-size: 1.25em; cursor: pointer; color: var(--cinza-claro);">
                        <i class="fas fa-star" @click="changeRating(1,'a')" @mouseover="fillStars(1, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                        <i class="fas fa-star" @click=" changeRating(2, 'a')" @mouseover="fillStars(2, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                        <i class="fas fa-star" @click=" changeRating(3, 'a')" @mouseover="fillStars(3, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                        <i class="fas fa-star" @click=" changeRating(4, 'a')" @mouseover="fillStars(4, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                        <i class="fas fa-star" @click=" changeRating(5, 'a')" @mouseover="fillStars(5, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                    </div>
                    <p v-if="savedStars == 0" style="color: var(--cinza2);" class="mt-2">You haven't rated this quiz yet</p>
                </div>
                <section id="comments" class="mt-3">
                <form @submit.prevent="addNewComment()">
                    <textarea id="comment-content" required placeholder="Let others know what you think..." v-model.lazy="comentario"></textarea>
                    <div class="mt-3 mb-3">
                        <button class="orange-btn" type="submit">Comment</button>
                    </div>
                </form>
                <div class="other-comments mt-5" id="comment">
                    <div class="card-comment d-flex mb-3" style="gap: 15px;" v-for="(comment, i) in comments" :key="i" >
                    <div  :style="'background-image: url(' + getAllUsers[comment.id_utilizador].avatar + ');'" style="min-width: 50px;height: 50px;background-repeat: no-repeat;background-size: cover;background-position: center; border-radius: 50%;"></div>
                    <div class="details d-flex flex-column">
                        <p id="comment-author">{{ getAllUsers[comment.id_utilizador].primeiro_nome + ' ' + getAllUsers[comment.id_utilizador].ultimo_nome }} <span>{{ new Date(comment.data).getDate() + "/" + (parseInt(new Date(comment.data).getMonth()) + 1) + "/" + new Date(comment.data).getFullYear() + " at " + new Date(comment.data).getHours() + ":" + String(new Date(comment.data).getMinutes()).padStart(2, '0') + "h" }}</span></p>
                        <p class="comment-message">{{ comment.comentario }}</p>
                    </div>
                        <span v-if="comment.id_utilizador==getLoggedUser.id || getLoggedUser.is_admin" @click="removeComment(comment.id_comentario, comment.id_utilizador)" class="unblock-button"><i class="fas fa-trash"></i></span>
                    </div>
                    <div>
                        <p v-if="comments.length==0">Be the first to comment on this quiz</p>
                    </div>
                </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
    export default {
        data() {
            return {
                savedStars: 0,
                hasQuizStarted: false,
                hasQuizFinished: false,
                quizContent: [],
                allowsPoints: true,
                warningMessage: `Finishing this game <strong>WILL</strong> get you points and XP.<br><br>Leaving mid-game will cause you to lose the opportunity to get them.`,
                quizData: {
                    num_pergunta: 0,
                    imagem: "",
                    texto: "",
                    opcao_1: "",
                    opcao_2: "",
                    opcao_3: "",
                    opcao_4: "",
                    opcao_correta: 1,
                    isLocked: false,
                    pontos_ganhos: 0,
                    respostas_certas: 0,
                    respostas_erradas: 0,
                    ajudas_utilizadas: 0
                },
                userRatings: [],
                movizzRating: 0.00,
                comentario: "",
                comments: []
            }
        },
        mounted () {
            this.verifyRating();
        },
        created () {
            this.quizContent = this.getQuizByID(this.$route.params.id);
            this.userRatings.pontuacao = this.getUserQuizRating(this.getLoggedUser.id, this.$route.params.id) ? this.getUserQuizRating(this.getLoggedUser.id, this.$route.params.id).pontuacao : 0;
            this.movizzRating = this.getQuizRating(this.$route.params.id);
            this.comments = this.getQuizComments(this.$route.params.id);

            // REQ 037
            // Permitir a realização de apenas 1 quiz longo (de dificuldade normal ou difícil) ou 2 quiz curtos (pelo menos 1 desses 2 tem de ser de dificuldade difícil) por dia, todos os quizzes realizados posteriormente não irão dar pontos mas contarão para o nível/badge e XP;
            const CUR_DATA = new Date();
            const QUIZZES_PLAYED_LAST24H = this.getLoggedUser.played.filter(jogo => (Math.abs(CUR_DATA.getTime() - new Date(jogo.data).getTime()) / 3600000) < 24);

            if (QUIZZES_PLAYED_LAST24H.length > 0) {
                const CURTOS_LAST24 = QUIZZES_PLAYED_LAST24H.filter(jogo => jogo.tipo == "curto" && jogo.permitiu_pontos);
                const LONGOS_LAST24 = QUIZZES_PLAYED_LAST24H.filter(jogo => jogo.tipo == "longo" && jogo.permitiu_pontos);
                
                if (LONGOS_LAST24.length >= 1) {
                    this.allowsPoints = false;
                    this.warningMessage = `You have already played a long quiz that allowed points in the last 24h.<br><br>Finishing this game will get you XP but <strong>NOT</strong> points.<br><br>Leaving mid-game will cause you to lose the opportunity to get it.`;
                } else {
                    if (CURTOS_LAST24.length == 1) {
                        if ((CURTOS_LAST24[0].dificuldade == "normal" && this.quizContent.dificuldade.descricao == "normal") || (CURTOS_LAST24[0].dificuldade == "dificil" && this.quizContent.dificuldade.descricao == "dificil")) {
                            this.allowsPoints = false;
                            this.warningMessage = `You have played a short <strong>${ this.quizContent.dificuldade.descricao == "dificil" ? "hard" : "normal" }</strong> quiz that allowed points in the last 24h.<br><br>To have the ability of winning points please choose a short <strong>${ this.quizContent.dificuldade.descricao == "normal" ? "hard" : "normal" }</strong> quiz.<br><br>Finishing this game will get you XP but <strong>NOT</strong> points.<br><br>Leaving mid-game will cause you to lose the opportunity to get it.`;
                        } else if (this.quizContent.tipo.descricao == "longo") {
                            this.allowsPoints = false;
                            this.warningMessage = `You have played a short <strong>${ this.quizContent.dificuldade.descricao == "dificil" ? "hard" : "normal" }</strong> quiz that allowed points in the last 24h.<br><br>To have the ability of winning points please choose a short <strong>${ this.quizContent.dificuldade.descricao == "normal" ? "hard" : "normal" }</strong> quiz.<br><br>Finishing this game will get you XP but <strong>NOT</strong> points.<br><br>Leaving mid-game will cause you to lose the opportunity to get it.`;
                        }
                    } else if (CURTOS_LAST24.length > 1) {
                        if (CURTOS_LAST24.filter(jogo => jogo.dificuldade == "normal").length >= 1 && CURTOS_LAST24.filter(jogo => jogo.dificuldade == "dificil").length >= 1) {
                            this.allowsPoints = false;
                            this.warningMessage = `You have already played a normal short quiz and a hard short quiz in the last 24h.<br><br>Finishing this game will get you XP but <strong>NOT</strong> points.<br><br>Leaving mid-game will cause you to lose the opportunity to get it.`;
                        } else if (this.quizContent.tipo.descricao == "longo") {
                            this.allowsPoints = false;
                            this.warningMessage = `You have played a short <strong>${ this.quizContent.dificuldade.descricao == "dificil" ? "hard" : "normal" }</strong> quiz that allowed points in the last 24h.<br><br>To have the ability of winning points please choose a short <strong>${ this.quizContent.dificuldade.descricao == "normal" ? "hard" : "normal" }</strong> quiz.<br><br>Finishing this game will get you XP but <strong>NOT</strong> points.<br><br>Leaving mid-game will cause you to lose the opportunity to get it.`;
                        }
                    }
                }
            }
        },
        methods: {
            ...mapMutations(["SET_QUIZ_ATTEMPT", "UPDATE_QUIZ_ATTEMPT", "UPDATE_USER_POINTS", "UPDATE_USER_XP", "UPDATE_USER_LEVEL", "SET_NEW_QUIZ_RATING", "REMOVE_QUIZ_RATING", "REMOVE_QUIZ_COMMENT", "SET_NEW_QUIZ_COMMENT"]),
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
            playQuiz() {
                this.hasQuizStarted = true;
                document.querySelectorAll(".questions").forEach(pergunta => pergunta.classList.remove("correct-answer", "wrong-answer"));
                this.quizData.texto = this.quizContent.perguntas[this.quizData.num_pergunta].texto;
                this.quizData.opcao_1 = this.quizContent.perguntas[this.quizData.num_pergunta].opcao_1;
                this.quizData.opcao_2 = this.quizContent.perguntas[this.quizData.num_pergunta].opcao_2;
                this.quizData.opcao_3 = this.quizContent.perguntas[this.quizData.num_pergunta].opcao_3;
                this.quizData.opcao_4 = this.quizContent.perguntas[this.quizData.num_pergunta].opcao_4;
                this.quizData.imagem = this.quizContent.perguntas[this.quizData.num_pergunta].url_conteudo;
            },
            answerQuestion(id_clicado) {
                if (!this.quizData.isLocked) {
                    this.quizData.isLocked = true;
                    if (id_clicado == this.quizContent.perguntas[this.quizData.num_pergunta].opcao_correta) {
                        document.querySelectorAll(".questions")[id_clicado - 1].classList.add("correct-answer");
                        this.quizData.respostas_certas += 1;
                        this.quizData.pontos_ganhos += this.quizContent.dificuldade.pontos_pergunta;
                    } else {
                        document.querySelectorAll(".questions")[id_clicado - 1].classList.add("wrong-answer");
                        document.querySelectorAll(".questions")[this.quizContent.perguntas[this.quizData.num_pergunta].opcao_correta - 1].classList.add("correct-answer");
                        this.quizData.respostas_erradas += 1;
                    }

                    setTimeout(() => {
                        this.quizData.num_pergunta += 1;
                        if (this.quizData.num_pergunta == this.quizContent.tipo.num_perguntas) {
                            this.hasQuizFinished = true;
                            // Atualizar a tentativa
                            this.UPDATE_QUIZ_ATTEMPT({
                                "id_quiz": this.quizContent.id_quiz,
                                "data": new Date(),
                                "tipo": this.quizContent.tipo.descricao,
                                "dificuldade": this.quizContent.dificuldade.descricao,
                                "num_perguntas": this.quizContent.tipo.num_perguntas,
                                "perguntas_certas": this.quizData.respostas_certas,
                                "perguntas_erradas": this.quizData.respostas_erradas,
                                "ajudas_utilizadas": this.quizData.ajudas_utilizadas,
                                "permitiu_pontos": this.allowsPoints,
                                "completo": true
                            });
                            if (this.allowsPoints) {
                                // Se o jogo permitiu pontos, adicioná-los ao jogador
                                this.UPDATE_USER_POINTS(this.quizData.pontos_ganhos);
                            }
                            // Adicionar o XP ganho ao utilizador
                            this.UPDATE_USER_XP(this.quizData.pontos_ganhos);

                            // Verificar se o utilizador subiu de nível
                            if (Math.floor(this.getLoggedUser.xp / 150) !=  parseInt(this.getLoggedUser.nivel)) {
                                this.UPDATE_USER_LEVEL();
                                this.$swal.fire('Congratulations, you just reached level ' + this.getLoggedUser.nivel + "!");
                            }
                        } else {
                            this.playQuiz();
                        }
                        this.quizData.isLocked = false;
                     }, 2000);
                }
            },
            showWarning() {
                this.$swal.fire({
                    title: "Attention!",
                    html: `<p class="w-100" style="text-align: left;">${this.warningMessage}</p>`,
                    showCancelButton: true,
                    confirmButtonText: 'Continue',
                    denyButtonText: `Cancel`,
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Registar previamente a tentativa de quiz caso o utilizador saia a meio do jogo
                        this.SET_QUIZ_ATTEMPT({
                            "id_quiz": this.quizContent.id_quiz,
                            "data": new Date(),
                            "tipo": this.quizContent.tipo.descricao,
                            "dificuldade": this.quizContent.dificuldade.descricao,
                            "num_perguntas": this.quizContent.tipo.num_perguntas,
                            "perguntas_certas": 0,
                            "perguntas_erradas": 0,
                            "ajudas_utilizadas": 0,
                            "permitiu_pontos": this.allowsPoints,
                            "completo": false
                        });
                        this.playQuiz()
                    }
                });
            },
            verifyRating(){
                for (let i = 0; i < this.userRatings.pontuacao; i++) {
                    this.fillStars(i + 1, 'a');
                }   
            },
            changeRating(n, event_type){
                // Deixar o utilizador classificar o quiz apenas se o mesmo já o tiver jogado
                if (this.getLoggedUser.played.some(quiz => (quiz.id_quiz == this.$route.params.id) && (quiz.completo))) {
                    this.fillStars(n, event_type);
                    if (this.savedStars > 0){
                        this.SET_NEW_QUIZ_RATING({
                            id_quiz: this.$route.params.id,
                            id_utilizador: this.getLoggedUser.id,
                            pontuacao: this.savedStars
                        });
                    }
                    else {
                        this.REMOVE_QUIZ_RATING({ id_quiz: this.$route.params.id, id_user: this.getLoggedUser.id });
                    }
                    this.userRatings.pontuacao = this.savedStars;
                    this.movizzRating = this.getQuizRating(this.$route.params.id);
                } else {
                    this.$swal.fire('You have never completed this quiz, please play it at least once to have the ability to rate!');
                }
            },
            removeComment(id_comment_a, id_user_a) {
                this.$swal({
                    title: 'Warning!',
                    text: "Are you sure you want to remove this comment?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.REMOVE_QUIZ_COMMENT({ id_comment: id_comment_a, id_user: id_user_a });
                        this.comments= this.comments.filter(comment=>comment.id_comentario!=id_comment_a);
                    }
                });
            },
            addNewComment() {
                if (this.getLoggedUser.played.some(quiz => (quiz.id_quiz == this.$route.params.id) && (quiz.completo))) {
                    const DATA_COMMENT = new Date();
                    this.comments.push({
                        id_comentario: this.getNextAvailableQuizCommentID,
                        id_quiz: this.$route.params.id,
                        id_utilizador: this.getLoggedUser.id,
                        comentario: this.comentario.trim(),
                        data: DATA_COMMENT
                    });
                    this.SET_NEW_QUIZ_COMMENT({
                        id_comentario: this.getNextAvailableQuizCommentID,
                        id_quiz: this.$route.params.id,
                        id_utilizador: this.getLoggedUser.id,
                        comentario: this.comentario.trim(),
                        data: DATA_COMMENT
                    });
                } else {
                    this.$swal.fire('You have never completed this quiz, please play it at least once to have the ability to comment!');
                }
            }
        },
        computed: {
            ...mapGetters(["getQuizByID", "getLoggedUser", "getAllUsers", "getQuizRating", "getUserQuizRating", "getNextAvailableQuizCommentID", "getQuizComments"])
        }
    }
</script>

<style scoped>
a {
    color: white;
    text-decoration: none;
}

.correct-answer {
    background-color: #1DB83C !important;
    transition: 450ms;
}

.wrong-answer {
    background-color: #EC5252 !important;
    transition: 450ms;
}

.selected-answer {
    background-color: #4d535e !important;
    transition: 450ms;
}

.questions{
    border-radius: 10px;
    background-color: var(--bg);
    cursor: pointer;
}

.quizImage{
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
    background-color: #282F3C;
}

#rating{
    width: 50px;
    height: 50px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    color:var(--verde);
    border: 3px solid var(--verde);
      
}

.orangeText{
    color: var(--laranja);
}

#banner h3{
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
  color: #EEEEEE;
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