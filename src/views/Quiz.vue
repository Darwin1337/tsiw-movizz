<template>
    <div class="container">
        <div class="row mt-4 gy-2">
            <div class="col-lg-6 h-100">
                <div class="jumbotron d-flex align-items-center p-5" style="max-height: 386px; height: 100%; background-position: center;" >
                    <div id="banner" class="w-100 h-100">
                        <h3>Prison Break</h3>
                        <h5>Contrary to the series, there's no escaping this quiz.</h5>
                        <p class="mb-2 orangeText">Hard • Long quiz • 10 questions</p>
                        <p class="mb-2" style="color: var(--cinza-claro);">7,443 people played this quiz</p>
                        <div class="d-flex align-items-center mt-3" style="gap: 15px;">
                            <button type="button" class="blur-btn" style="max-width: 150px;"><span>Visit series</span></button>
                            <div class="d-flex align-items-center">
                                <router-link :to="{name:''}" class="d-flex">
                                    <img src="../assets/images/play_icon.png" width="25px"
                                    height="25px">&nbsp;&nbsp;&nbsp;Play
                                </router-link>
                            </div>
                        </div>
                        <div id="rating" class="mt-3 ms-auto d-flex align-items-center justify-content-center">
                            <p class="m-0 d-flex align-items-center justify-content-center">4.7</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="d-flex justify-content-around quizHeader p-3" style="border-top-right-radius: 10px; border-top-left-radius: 10px;">
                    <p class="m-0"><b>Points won: </b> 30/150</p>
                    <p class="m-0"><b>8 Questions Left </b></p>
                    <p class="m-0"><b>Your points: </b>9232</p>
                </div>
                <div style="background-color:var(--azul-escuro2)" class="p-3">
                    <div class="text-center">
                        <img class="quizImage mt-3" src="https://static.posters.cz/image/750/plakaty/the-walking-dead-season-8-collage-i51425.jpg" alt="">
                    </div>
                    <p class="mt-3"><span>3. </span>Who, from The Fox River 8, did Mahome execute?</p>
                    <div class="row g-2">
                        <div class="col-sm-6 col-lg-12 col-xl-6">
                            <div class="questions p-3"><span class="orangeText">A.</span><span class="ms-3">John "Abruzzi" Abruzzi</span></div>
                        </div>
                        <div class="col-sm-6 col-lg-12 col-xl-6">
                            <div class="questions p-3"><span class="orangeText">A.</span><span class="ms-3">John "Abruzzi" Abruzzi</span></div>
                        </div>
                        <div class="col-sm-6 col-lg-12 col-xl-6">
                            <div class="questions p-3"><span class="orangeText">A.</span><span class="ms-3">John "Abruzzi" Abruzzi</span></div>
                        </div>
                        <div class="col-sm-6 col-lg-12 col-xl-6">
                            <div class="questions p-3"><span class="orangeText">A.</span><span class="ms-3">John "Abruzzi" Abruzzi</span></div>
                        </div>
                    </div>
                </div>
                <div class="help-section d-flex justify-content-around align-items-center quizHeader p-3" style="border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;">
                    <div class="position-relative" style="width: 100%; max-width: 150px;">
                        <button class="gray-btn">50/50</button>
                        <span
                            class="position-absolute d-flex justify-content-center align-items-center"
                            style="top: -10px; left: -10px; width: 25px; height: 25px; background-color: var(--azul-escuro2); border-radius: 50%; font-size: .85em; font-weight: bold;">
                            10
                        </span>
                    </div>
                    <p class="m-0"><b>Need a hand? </b></p>
                    <div class="position-relative" style="width: 100%; max-width: 150px;">
                        <button class="gray-btn">New question</button>
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
                        <i class="fas fa-star" @click="fillStars(1, 'a')" @mouseover="fillStars(1, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                        <i class="fas fa-star" @click="fillStars(2, 'a')" @mouseover="fillStars(2, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                        <i class="fas fa-star" @click="fillStars(3, 'a')" @mouseover="fillStars(3, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                        <i class="fas fa-star" @click="fillStars(4, 'a')" @mouseover="fillStars(4, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                        <i class="fas fa-star" @click="fillStars(5, 'a')" @mouseover="fillStars(5, 'b')" @mouseleave="fillStars(0, 'c')"></i>
                    </div>
                    <p v-if="savedStars == 0" style="color: var(--cinza2);" class="mt-2">You haven't rated this quiz yet</p>
                </div>
                <section id="comments" class="mt-3">
                <form>
                    <textarea id="comment-content" required placeholder="Let others know what you think..."></textarea>
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
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                savedStars: 0
            }
        },
        methods: {
            fillStars(n, event_type) {
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
    }
</script>

<style scoped>
a {
    color: white;
    text-decoration: none;
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
}

@media (max-width: 419px) {
    .jumbotron {
        max-height: 525px !important;
    }
}
</style>