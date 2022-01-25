<template>
    <div>
        <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3 mt-5 mb-3 filters">
          <div class="col-md-12 col-lg-3 col-sm-12">
            <form class="d-flex">
              <div class="input-group">
                <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search">
                <button type="submit" @submit.prevent=""><i class="fas fa-search"></i></button>
              </div>
            </form>
          </div>
          <div class="col-md-3 col-lg-3 col-sm-6">
            <select id="order" style="height: 40px;">
              <option disabled selected>Order by</option>
              <option value="Alphabetic (A-Z)">Alphabetic (A-Z)</option>
              <option value="Alphabetic (Z-A)">Alphabetic (Z-A)</option>
              <option value="Best rated">Best rated</option>
              <option value="Worst rated">Worst rated</option>
              <option value="Most played">Most played</option>
              <option value="Least played">Least played</option>
            </select>
          </div>
        </div>
        <div>
          <button class="addNewQuizButton" data-bs-toggle="modal" data-bs-target="#addPrizeModal">Add new prize</button>
        </div>
        <div class="row">
          <div class="col-xl-2 col-lg-3 col-md-4 col-12 mt-3 quizImg" v-for="i in (getAllPrizes.length >= mostrar ? mostrar : getAllPrizes.length)" :key="i">
            <img class="w-100" style="border-radius:5px 5px 0px 0px; max-height:180px;" :src="getAllPrizes[i - 1].img" alt="">
            <div class="d-flex flex-column" style="padding:10px; background-color:var(--azul-escuro2); border-radius:0px 0px 5px 5px;">
              <p class="m-0 text-center" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{{getAllPrizes[i - 1].nome}}</p>
              <button class="editQuizButtonPrizes" data-bs-toggle="modal" data-bs-target="#editPrizeModal" @click="listInfo(getAllPrizes[i - 1].id_premio)">Edit</button>
              <button class="removeQuizButton" @click="removePrize(getAllPrizes[i - 1].id_premio)">Remove</button>
            </div>
          </div>
          <div v-if="mostrar < getAllPrizes.length" class="w-100 d-flex justify-content-center mt-4">
            <button class="rounded-btn" @click="mostrar = mostrar + 12 <= getAllPrizes.length ? mostrar + 12 : getAllPrizes.length">Load More</button>
          </div>
        </div>
        <!-- Remove prize modal -->
        <div class="modal fade backgroundBlur" id="removePrizeModal" ref="removePrizeModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width:500px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                <div class="col-md-12">
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <div>
                      <p>Are you sure you want to remove this prize?</p>
                    </div>
                    <div class="ms-auto">
                      <button type="button" class="btn green-btn me-2" >Yes</button>
                      <button type="button" class="btn red-btn" data-bs-dismiss="modal">No</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- New prize: main modal -->
        <div class="modal fade backgroundBlur" id="addPrizeModal" ref="addPrizeModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width:400px;">
            <div class="modal-content modalrewards">
              <div class="modal-body m-0 gy-3">
                <div class="d-flex h-100 flex-column justify-content-between">
                  <h5>New prize</h5>
                  <form @submit.prevent="addNewPrize()" id="addNewQuizModal">
                    <p class="m-0 mt-3 colorOrange">General</p> 
                    <div class="mt-3">
                      <input type="text" class="w-100" placeholder="Name" v-model="prizes.prizeName" required>
                    </div>
                    <div class="row mt-0 g-3">
                      <div class="col-xl-6">
                        <input type="number" class="w-100" v-model="prizes.prizeCost" placeholder="Price" required>
                      </div>
                      <div class="col-xl-6">
                        <span>Image</span>
                        <img style="width: 100%; max-height: 100px; object-fit: cover; object-position: center; border-radius: 5px; min-height: 100px;" :src="prizes.prizeImg==''?require('../assets/images/imageNewQuiz.png'):prizes.prizeImg" >
                        <div style="position: relative;">
                          <span style="cursor: pointer"><i v-if="prizes.prizeImg != 'https://i.ibb.co/8PmJCqD/image-New-Quiz.png'" style="right: 10px;" class="fas fa-trash removeIcon" @click="prizes.prizeImg='https://i.ibb.co/8PmJCqD/image-New-Quiz.png'"></i></span>
                        </div>
                        <button type="button" class="uploadButton mt-2" data-bs-target="#newPrizeUploadPicture" data-bs-toggle="modal">Upload</button>
                      </div>
                    </div>
                    <div class="ms-auto mt-4 d-flex" style="gap: 15px;">
                      <input class="addQuestionButton" type="submit" value="Add prize">
                      <input class="close-btn" id="add-prize-close" type="button" data-bs-dismiss="modal" value="Close"/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- New prize: upload picture -->
        <div class="modal fade backgroundBlur" id="newPrizeUploadPicture" ref="newPrizeUploadPicture" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width: 800px;">
            <div class="modal-content modalrewards">
              <div>
                <form @submit.prevent="" class="modal-body d-flex flex-column" style="gap: 20px;">
                  <label for="url-pic">URL for the picture:</label>
                  <div class="input-group">
                    <input type="text" class="form-control bg-inputs" aria-label="URL" required placeholder="URL" v-model="prizes.prizeImg">
                    <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                  </div>
                  <div class="d-flex" style="gap: 15px;">
                    <button type="submit" class="orange-btn" @click="prizes.prizeImg ? performClick('#new-pic-back') : null">Add pciture</button>
                    <button class="red-btn" id="new-pic-back" type="button" data-bs-target="#addPrizeModal" data-bs-toggle="modal" data-bs-dismiss="modal" @click="prizes.prizeImg ? null : prizes.prizeImg = 'https://i.ibb.co/8PmJCqD/image-New-Quiz.png'">Back</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- Edit prize: main modal -->
        <div class="modal fade backgroundBlur" id="editPrizeModal" ref="editPrizeModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width:400px;">
            <div class="modal-content modalrewards">
              <div class="modal-body m-0 gy-3">
                <div class="d-flex h-100 flex-column justify-content-between">
                  <h5>Edit prize</h5>
                  <form @submit.prevent="editPrize(editPrizes.prizeId)" id="addNewQuizModal">
                    <p class="m-0 mt-3 colorOrange">General</p> 
                    <div class="mt-3">
                      <input type="text" class="w-100" v-model="editPrizes.prizeName" required>
                    </div>
                    <div class="row mt-0 g-3">
                      <div class="col-xl-6">
                        <input type="number" class="w-100" v-model="editPrizes.prizeCost" required>
                      </div>
                      <div class="col-xl-6">
                        <span>Image</span>
                        <img style="width: 100%; max-height: 100px; object-fit: cover; object-position: center; border-radius: 5px; min-height: 100px;" :src="editPrizes.prizeImg">
                        <div style="position: relative;">
                          <span style="cursor: pointer"><i v-if="editPrizes.prizeImg != 'https://i.ibb.co/8PmJCqD/image-New-Quiz.png'" style="right: 10px;" class="fas fa-trash removeIcon" @click="editPrizes.prizeImg='https://i.ibb.co/8PmJCqD/image-New-Quiz.png'"></i></span>
                        </div>
                        <button type="button" class="uploadButton mt-2" data-bs-target="#editPrizeUploadPicture" data-bs-toggle="modal">Upload</button>
                      </div>
                    </div>
                    <div class="ms-auto mt-4 d-flex" style="gap: 15px;">
                      <input class="addQuestionButton" type="submit" value="Edit prize">
                      <input class="close-btn" type="button" id="edit-prize-close-modal" data-bs-dismiss="modal" value="Close"/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Edit prize: upload picture -->
        <div class="modal fade backgroundBlur" id="editPrizeUploadPicture" ref="editPrizeUploadPicture" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width: 800px;">
            <div class="modal-content modalrewards">
              <div>
                <form @submit.prevent="" class="modal-body d-flex flex-column" style="gap: 20px;">
                  <label for="url-pic">URL for the picture:</label>
                  <div class="input-group">
                    <input type="text" class="form-control bg-inputs" aria-label="URL" required v-model="editPrizes.prizeImg">
                    <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                  </div>
                  <div class="d-flex" style="gap: 15px;">
                    <button type="submit" class="orange-btn" @click="editPrizes.prizeImg ? performClick('#edit-pic-back') : null">Change picture</button>
                    <button class="red-btn" id="edit-pic-back" type="button" data-bs-target="#editPrizeModal" data-bs-toggle="modal" data-bs-dismiss="modal" @click="editPrizes.prizeImg ? null : editPrizes.prizeImg = getPrizeInfo(editID).img">Back</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default ({
    data() {
        return {
            mostrar: 12,
            editID: null,
            prizes: {
                prizeId: null,
                prizeName: "",
                prizeCost: 0,
                prizeImg: "https://i.ibb.co/8PmJCqD/image-New-Quiz.png",
            },
            editPrizes:{
                prizeId: null,
                prizeName: "",
                prizeCost: 0,
                prizeImg: "",
            }
        }
    },
    computed: {
      ...mapGetters(["getAllPrizes", "getPrizeInfo", "getNextAvailablePrizeID"])
    },
    methods: {
        ...mapMutations(["SET_NEW_PRIZE", "REMOVE_PRIZE", "UPDATE_PRIZE"]),
        addNewPrize() {
            if (this.prizes.prizeName.trim() && this.prizes.prizeCost > 0 && this.prizes.prizeImg.trim()) {
                this.SET_NEW_PRIZE({
                    id_premio: this.getNextAvailablePrizeID,
                    nome: this.prizes.prizeName,
                    img: this.prizes.prizeImg,
                    valor: this.prizes.prizeCost
                });
                document.querySelector("#add-prize-close").click();
                this.prizes.prizeId = null;
                this.prizes.prizeName = "";
                this.prizes.prizeCost = 0;
                this.prizes.prizeImg = "https://i.ibb.co/8PmJCqD/image-New-Quiz.png";
            } else {
                this.showWarning();
            }
        },
        removePrize(id){
        this.$swal({
        title: 'Warning!',
        text: "Are you sure you want to remove this prize?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.REMOVE_PRIZE(id)
        }
      });
        
        },
        listInfo(id){
            this.editID = id;
            this.editPrizes.prizeId = id;
            this.editPrizes.prizeName = this.getPrizeInfo(id).nome;
            this.editPrizes.prizeCost = this.getPrizeInfo(id).valor;
            this.editPrizes.prizeImg = this.getPrizeInfo(id).img;
        },
        editPrize(id){
            if (this.editPrizes.prizeName.trim() && this.editPrizes.prizeCost > 0 && this.editPrizes.prizeImg.trim()) {
                this.UPDATE_PRIZE({
                    id_premio: id,
                    nome: this.editPrizes.prizeName,
                    valor: this.editPrizes.prizeCost,
                    img: this.editPrizes.prizeImg
                });
                document.querySelector("#edit-prize-close-modal").click();
            } else {
                this.showWarning();
            }
        },
        showWarning() {
            this.$swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Some fields were left empty!'
            })
        },
        performClick(name) {
            document.querySelector(name).click();
        }
    }
});
</script>

<style scoped>
  a {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }

  .active {
    color: var(--laranja);
    border-bottom: 1px solid var(--laranja);
  }

  .filters select {
    border-radius: 35px !important;
  }

  .filters button {
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
  }

  .filters input {
    border-radius: 35px !important;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }


  #section2 input {
    border-radius: 5px;
  }

  #section2 input.bg-inputs {
    border-radius: 0;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  #section2 textarea {
    border-radius: 5px;
  }

  #section2 select {
    border-radius: 5px;
  }

  .backgroundQuestions {
    background-color: var(--cinza3);
    border-radius: 5px;
  }

  .removeQuestion {
    color: white;
    background: var(--vermelho);
    padding: 8px;
    border-radius: 30px;
    cursor: pointer;
  }

  .editQuestion {
    color: black;
    background: var(--verde);
    padding: 8px;
    border-radius: 30px;
    cursor: pointer;
  }

  .removeIcon {
    position: absolute;
    bottom: 6px;
    background-color: var(--vermelho);
    color: white;
    padding: 8px 8px;
    border-radius: 30px;
    cursor: pointer;
  }

  .uploadButton {
    width: 100%;
    padding: 5px 15px;
    border: none !important;
    background: var(--cinza-claro);
    border-radius: 5px;
  }

  .quizImg img {
    border-radius: 5px;
    object-position: top center;
    height: 280px;
    width: 100%;
    object-fit: cover;
  }

  .colorOrange {
    color: var(--laranja);
  }

  .addQuestionButton {
    background-color: var(--laranja);
    border-radius: 5px;
    color: black;
    padding: 10px 25px;
  }

  .addNewQuizButton {
    background-color: var(--laranja);
    color: black;
    padding: 8px 25px;
    border: none;
    border-radius: 5px;
  }

  .editQuizButton {
    padding: 10px;
    margin: 10px 0px;
    background-color: var(--azul-escuro2);
    color: var(--cinza-claro);
    border: none;
    border-radius: 5px;
  }

  .editQuizButtonPrizes {
    padding: 10px;
    margin: 10px 0px;
    background-color: var(--cinza-claro);
    color: black;
    border: none;
    border-radius: 5px;
  }

  .removeQuizButton {
    padding: 10px;
    margin: 0px 0px;
    background-color: var(--vermelho);
    color: white;
    border: none;
    border-radius: 5px;
  }

  .bg {
    position: relative;
    display: block;
    z-index: 0;
  }

  .bg::after {
    content: "";
    background: url("../assets/images/twd_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    top: 0;
    left: 100px;
    bottom: 0;
    right: 0;
    position: fixed;
    z-index: -1;
    height: 100%;
  }

  .modalrewards {
    background-color: #151E2E;
  }

  .padding-10 {
    padding: 10px;
  }

  .detailsButton {
    background-color: var(--cinza3);
    border: none;
    color: var(--cinza-claro);
    border-radius: 5px;
    padding: 10px 23px;
  }

  .cardUser {
    border-radius: 5px;
    background-color: var(--azul-escuro2)
  }

  .block-button {
    background: var(--vermelho);
    border-radius: 5px;
    padding: 10px;
  }

  .unblock-button {
    background: #ffffff;
    border-radius: 5px;
    color: var(--vermelho);
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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
    top: 41px;
    left: 41px;
  }

  .member-level.small {
    width: 20px;
    height: 20px;
    font-size: .75em;
    top: 25px;
    left: 25px;
  }

  form ::placeholder {
    color: var(--cinza2);
    opacity: 1;
  }

  form :-ms-input-placeholder {
    color: var(--cinza2);
  }

  form ::-ms-input-placeholder {
    color: var(--cinza2);
  }

  form input {
    border: none;
    outline: none;
    background-color: var(--cinza3);
    border-radius: 35px;
    color: white;
    padding: 10px 15px 10px 15px;
  }

  form textarea {
    border: none;
    outline: none;
    background-color: var(--cinza3);
    border-radius: 35px;
    color: white;
    padding: 10px 15px 10px 15px;
  }

  form button {
    border: none !important;
    background: var(--cinza3);
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
    padding: 0 15px 0 15px;
  }

  form i {
    color: var(--cinza-claro);
  }

  form input,
  form input:focus {
    color: white;
    outline: none !important;
    box-shadow: none;
    background-color: var(--cinza3);
  }

  form input.bg-inputs,
  form input.bg-inputs:focus {
    outline: none;
    border: none;
    box-shadow: none;
    background-color: #1D232E;
    color: white;
  }

  select {
    /* Reset */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    outline: 0;
    /* Personalize */
    width: 100%;
    height: 100%;
    padding-left: 10px;
    /* padding: 0 4em 0 1em; */
    background: url("../assets/images/chevron-down-solid.svg") no-repeat right 0.8em center/0.8em, var(--cinza3);
    color: var(--cinza-claro);
    border-radius: 30px;
    box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  select option {
    background-color: white !important;
    color: black !important;
  }
  
  .leaderboardBar::-webkit-scrollbar {
    width: 5px;
  }

  .leaderboardBar::-webkit-scrollbar-thumb {
    background: #464646;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  .leaderboardBar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  select:focus {
    outline: none;
  }

  select::-ms-expand {
    display: none;
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .tile {
    position: relative;
    display: inline-block;
    max-width: 200px;
    width: 100%;
    margin-right: 10px;
    font-size: 20px;
  }

  .tile-custom {
    position: relative;
    display: inline-block;
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

  .tile-custom:hover .tile__details {
    opacity: 1;
  }

  .tile__details {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: 1 ;
    transition: 450ms opacity;
    border-radius: 5px;
  }

  .input-group-text .fas {
      color: #AFB3B7;
  }

  .input-group-text {
      border: none !important;
      background: #1D232E;
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

  .navigation {
    font-size: 1.25em;
    gap: 0 5em;
  }

  @media (max-width: 419px) {
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

  @media (max-width: 575px) {
    .cardUser {
      flex-direction: column;
      text-align: center;
    }
  }

  @media (max-width: 991px) {
    .cardUser {
      margin-bottom: 20px;
    }

    .navigation {
      gap: 0 2em;
    }
  }
</style>

