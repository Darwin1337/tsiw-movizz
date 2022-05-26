<template>
    <div class="mt-3">
      <div class="mt-3 mb-3">
        <button class="addNewQuizButton" data-bs-toggle="modal" data-bs-target="#addMovieModal">Add new movie/series</button>
      </div>
      <div>
        <div class="row g-3">
          <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="i in (getAllTitles.length >= mostrar ? mostrar : getAllTitles.length)" :key="i">
            <div class="tile-custom">
              <div class="tile__media-custom">
                <img class="tile__img" :src="getAllTitles[i - 1].poster" alt="" />
              </div>
              <div class="d-flex flex-column">
                <button class="editQuizButton" data-bs-toggle="modal" data-bs-target="#editMovieModal" style="font-size: 1rem;" @click="listTitleInfo(getAllTitles[i - 1].id_imdb)">Edit</button>
                <button class="removeQuizButton" style="font-size: 1rem;" @click="removeTitle(getAllTitles[i - 1].id_imdb)">Remove</button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="mostrar < getAllTitles.length" class="w-100 d-flex justify-content-center mt-4">
          <button class="rounded-btn" @click="mostrar = mostrar + 12 <= getAllTitles.length ? mostrar + 12 : getAllTitles.length">Load More</button>
        </div>
      </div>
      <!-- remove movie modal -->
      <div class="modal fade backgroundBlur" id="removeMovieModal" ref="removeMovieModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" style="max-width:500px;">
          <div class="modal-content modalrewards">
            <div class="modal-body row m-0 gy-3">
              <div class="col-md-12">
                <div class="d-flex h-100 flex-column justify-content-between">
                  <div>
                    <p>Are you sure you want to remove this movie/series?</p>
                  </div>
                  <div class="ms-auto">
                    <button type="button" class="btn green-btn me-2">Yes</button>
                    <button type="button" class="btn red-btn" data-bs-dismiss="modal">No</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- New movie: main modal -->
      <div class="modal fade backgroundBlur" id="addMovieModal" ref="addMovieModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
          <div class="modal-content modalrewards">
            <div class="modal-body row m-0 gy-3">
              <div class="d-flex h-100 flex-column justify-content-between">
                <h5>Edit Movie/Series</h5>
                <form @submit.prevent="add()">
                  <p class="m-0 mt-3 colorOrange">General</p> 
                  <div class="mt-3">
                    <input type="text" class="w-100" v-model="title.titleId" required>
                  </div>
                  <p class="m-0 mt-3 colorOrange">Avaliable at</p>
                  <div v-for="(plat,i) in title.titlePlatforms" :key="i">
                    <input type="text" class="w-100 mt-3" disabled :value="plat.nome">
                    <div style="position: relative;">
                      <span><i style="right: 10px;" class="fas fa-trash removeIcon" @click="newRemovePlatform(plat.id_plataforma)"></i></span>
                    </div>
                  </div>
                  <p v-if="title.titlePlatforms.length == 0" class="m-0" style="color: var(--cinza);">Please add at least 1 platform.</p>
                  <button type="button" data-bs-toggle="modal" data-bs-target="#addPlatformNewMovie" class="uploadButton mt-3">Add platform</button>
                  <div class="ms-auto mt-5 d-flex" style="gap: 15px;">
                    <input class="addQuestionButton" type="submit" value="Add movie/series">
                    <input class="close-btn" type="button" id="close-add-title" data-bs-dismiss="modal" value="Close"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- New movie: add platform -->
      <div class="modal fade backgroundBlur" id="addPlatformNewMovie" ref="addPlatformNewMovie" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 800px;">
          <div class="modal-content modalrewards">
            <div>
              <form @submit.prevent="" class="modal-body d-flex flex-column" style="gap: 20px;">
                <label for="url-pic">Name of the platform:</label>
                <div class="input-group">
                  <select id="platformSelect" class="form-control bg-inputs" v-model="title.selectedPlatform">
                    <option :value="opt.id_plataforma" v-for="(opt,i) in getAllPlatforms" :key="i">
                      {{opt.nome}}
                    </option>
                  </select>
                </div>
                <div class="d-flex" style="gap: 15px;">
                  <button type="submit" class="orange-btn" @click="newAddPlatform()">Add platform</button>
                  <button class="red-btn" type="button" id="new-addplatform-back" data-bs-target="#addMovieModal" data-bs-toggle="modal" data-bs-dismiss="modal">Back</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Edit movie: add platform -->
      <div class="modal fade backgroundBlur" id="addPlatform" ref="addPlatform" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 800px;">
          <div class="modal-content modalrewards">
            <div>
              <form @submit.prevent="" class="modal-body d-flex flex-column" style="gap: 20px;">
                <label for="url-pic">Name of the platform:</label>
                <div class="input-group">
                  <select id="platformSelect" class="form-control bg-inputs" v-model="editTitle.selectedPlatform">
                    <option :value="opt.id_plataforma" v-for="(opt,i) in getAllPlatforms" :key="i">
                      {{opt.nome}}
                    </option>
                  </select>
                </div>
                <div class="d-flex" style="gap: 15px;">
                  <button type="submit" class="orange-btn" @click="addPlatform()">Add platform</button>
                  <button class="red-btn" type="button" id="edit-addplatform-back" data-bs-target="#editMovieModal" data-bs-toggle="modal" data-bs-dismiss="modal">Back</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Edit movie: main modal -->
      <div class="modal fade backgroundBlur" id="editMovieModal" ref="editMovieModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
          <div class="modal-content modalrewards">
            <div class="modal-body row m-0 gy-3">
              <div class="d-flex h-100 flex-column justify-content-between">
                <h5>Edit Movie/Series</h5>
                <form @submit.prevent="edit()">
                  <p class="m-0 mt-3 colorOrange">General</p>
                  <div class="mt-3">
                    <input type="text" class="w-100" v-model="editTitle.titleId" required>
                  </div>
                  <p class="m-0 mt-3 colorOrange">Avaliable at</p>
                  <div v-for="(plat,i) in editTitle.titlePlatforms" :key="i">
                    <input type="text" class="w-100 mt-3" disabled :value="plat.nome">
                    <div style="position: relative;">
                      <span><i style="right: 10px;" class="fas fa-trash removeIcon" @click="removePlatform(plat.id_plataforma)"></i></span>
                    </div>
                  </div>
                  <p v-if="editTitle.titlePlatforms.length == 0" class="m-0" style="color: var(--cinza);">Please add at least 1 platform.</p>
                  <button type="button" data-bs-toggle="modal" data-bs-target="#addPlatform" class="uploadButton mt-3">Add platform</button>
                  <div class="ms-auto mt-5 d-flex" style="gap: 15px;">
                      <input class="addQuestionButton" type="submit" value="Edit movie/series" >
                      <input class="close-btn" type="button" id="close-edit-title" data-bs-dismiss="modal" value="Close"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default ({
    data() {
      return {
        country_list: ["Portugal", "Spain"],
        generos: ["Action", "Comedy"],
        mostrar: 12,
        editID: null,
        editTitle:{
          selectedPlatform: 0,
          titleId: null,
          titlePlatforms: [],
        },
        addID: null,
        title: {
          selectedPlatform: 0,
          titleId: null,
          titlePlatforms: [],
        }
      }
    },
    computed: {
      ...mapGetters(["getAllTitles","getTitleInfo","getAllPlatforms","getPlatformsById"])
    },
    methods: {
      ...mapMutations(["UPDATE_TITLE_PLATFORM","REMOVE_TITLE"]),
      ...mapActions(["saveNewTitle"]),
      add() {
        let errorHappened = false;
        // Verificar se há plataformas inseridas
        if (this.title.titlePlatforms.length > 0) {
          // Verificar se o id imdb mudou para evitar fazer calls à api desnecessariamente
          if (this.title.titleId != this.addID) {
            // Verificar se o id tem os caracteres 'tt'
            if (this.title.titleId.toLowerCase().includes("tt")) {
              // Adicionamos o novo
              this.saveNewTitle([this.title.titleId, this.title.titlePlatforms])
              .catch((err) => {
                this.$swal({
                  title: 'Error!',
                  text: err,
                  icon: 'error',
                });
                errorHappened = true;
              });
            } else {
              this.$swal({
                title: 'Error!',
                text: "Wrong IMDb ID!",
                icon: 'error',
              });
              errorHappened = true;
            }
          }
          if (!errorHappened) {
            this.$swal({
              title: 'Success!',
              text: "The title has been successfully edited!",
              icon: 'success',
            });
            document.querySelector("#close-add-title").click();
            this.title.selectedPlatform = 0;
            this.title.titleId = null;
            this.title.titlePlatforms = [];
          }
        } else {
          this.$swal({
            title: 'Error!',
            text: "Please add at least one platform!",
            icon: 'error',
          });
        }
      },
      edit() {
        let errorHappened = false, addedNew = false;
        // Verificar se há plataformas inseridas
        if (this.editTitle.titlePlatforms.length > 0) {
          // Verificar se o id imdb mudou para evitar fazer calls à api desnecessariamente
          if (this.editTitle.titleId != this.editID) {
            // Verificar se o id tem os caracteres 'tt'
            if (this.editTitle.titleId.toLowerCase().includes("tt")) {
              // Adicionamos o novo
              this.saveNewTitle([this.editTitle.titleId, this.editTitle.titlePlatforms])
              .then(() => {
                this.REMOVE_TITLE(this.editID);
                addedNew = true;
              })
              .catch((err) => {
                this.$swal({
                  title: 'Error!',
                  text: err,
                  icon: 'error',
                });
                errorHappened = true;
              });
            } else {
              this.$swal({
                title: 'Error!',
                text: "Wrong IMDb ID!",
                icon: 'error',
              });
              errorHappened = true;
            }
          }
          if (!addedNew) this.UPDATE_TITLE_PLATFORM([this.editID, this.editTitle.titlePlatforms]);
          if (!errorHappened) {
            this.$swal({
              title: 'Success!',
              text: "The title has been successfully edited!",
              icon: 'success',
            });
            document.querySelector("#close-edit-title").click();
          }
        } else {
          this.$swal({
            title: 'Error!',
            text: "Please add at least one platform!",
            icon: 'error',
          });
        }
      },
      listTitleInfo(id){
        this.editTitle.titleId = id;
        this.editTitle.titlePlatforms = [...this.getTitleInfo(id).plataformas];
        this.editTitle.selectedPlatform = 0;
        this.editID = id;
      },
      addPlatform(){
        if (this.editTitle.titlePlatforms.some(platform => platform.id_plataforma == this.editTitle.selectedPlatform)) {
          this.$swal({
            title: 'Error!',
            text: "This platform is already registered in this title!",
            icon: 'error',
          })
        } else {
          this.editTitle.titlePlatforms.push({ id_plataforma: this.editTitle.selectedPlatform, nome: this.getPlatformsById(this.editTitle.selectedPlatform).nome });
          this.performClick("#edit-addplatform-back");
        }
      },
      removePlatform(id){
        if (this.editTitle.titlePlatforms.length > 1) {
          this.editTitle.titlePlatforms = this.editTitle.titlePlatforms.filter(plat => plat.id_plataforma != id);
        } else {
          this.$swal({
            title: 'Error!',
            text: 'Each title has to have at least 1 platform.',
            icon: 'error',
          });
        }
      },
      newAddPlatform(){
        if (this.title.titlePlatforms.some(platform => platform.id_plataforma == this.title.selectedPlatform)) {
          this.$swal({
            title: 'Error!',
            text: "This platform is already registered in this title!",
            icon: 'error',
          })
        } else {
          this.title.titlePlatforms.push({ id_plataforma: this.title.selectedPlatform, nome: this.getPlatformsById(this.title.selectedPlatform).nome });
          this.performClick("#new-addplatform-back");
        }
      },
      newRemovePlatform(id){
        if (this.title.titlePlatforms.length > 1) {
          this.title.titlePlatforms = this.title.titlePlatforms.filter(plat => plat.id_plataforma != id);
        } else {
          this.$swal({
            title: 'Error!',
            text: 'Each title has to have at least 1 platform.',
            icon: 'error',
          });
        }
      },
      removeTitle(id){
        this.$swal({
          title: 'Warning!',
          text: "Are you sure you want to remove this title?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.REMOVE_TITLE(id)
          }
        });
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

