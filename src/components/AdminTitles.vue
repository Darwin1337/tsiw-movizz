<template>
  <div class="mt-3" v-if="!loading.titles">
    <div class="mt-3 mb-3">
      <button class="addNewQuizButton" data-bs-toggle="modal" data-bs-target="#addMovieModal">Add new movie/series</button>
    </div>
    <div>
      <div class="row g-3">
        <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="i in (data.titles.length >= mostrar ? mostrar : data.titles.length)" :key="i">
            <div class="tile-custom">
              <router-link :to="{ name: 'Title', params: { imdbid: data.titles[i - 1].imdb_id }} ">
                <div class="tile__media-custom">
                  <img class="tile__img" :src="webpSupported ? (data.titles[i - 1].poster_webp ? require('../assets/images/content/' + data.titles[i - 1].poster_webp) : data.titles[i - 1].poster) : data.titles[i - 1].poster" alt="Movie poster" />
                </div>
              </router-link>
              <div class="d-flex flex-column">
                <button class="editQuizButton" data-bs-toggle="modal" data-bs-target="#editMovieModal" style="font-size: 1rem;" @click="listTitleInfo(data.titles[i - 1].imdb_id)">Edit</button>
                <button class="removeQuizButton" style="font-size: 1rem;" @click="deleteTitle(data.titles[i - 1].imdb_id.toString())">Remove</button>
              </div>
            </div>
        </div>
      </div>
      <div v-if="mostrar < data.titles.length" class="w-100 d-flex justify-content-center mt-4">
        <button class="rounded-btn" @click="mostrar = mostrar + 12 <= data.titles.length ? mostrar + 12 : data.titles.length">Load More</button>
      </div>
    </div>
    <!-- New movie: main modal -->
    <div class="modal fade backgroundBlur" id="addMovieModal" ref="addMovieModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
        <div class="modal-content modalrewards">
          <div class="modal-body row m-0 gy-3">
            <div class="d-flex h-100 flex-column justify-content-between">
              <h5>Add Movie/Series</h5>
              <form @submit.prevent="add()">
                <p class="m-0 mt-3 colorOrange">General</p> 
                <div class="mt-3">
                  <input type="text" class="w-100" v-model="title.titleId" placeholder="IMDb ID" required>
                </div>
                <p class="m-0 mt-3 colorOrange">Avaliable at</p>
                <div v-for="(plat, i) in title.titlePlatforms" :key="i">
                  <input type="text" class="w-100 mt-3" disabled :value="plat.name">
                  <div style="position: relative;">
                    <span><i style="right: 10px;" class="fas fa-trash removeIcon" @click="newRemovePlatform(plat.platform_id)"></i></span>
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
                  <option :value="opt.platform_id" v-for="(opt, i) in data.platforms" :key="i">
                    {{opt.name}}
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
                  <option :value="opt.platform_id" v-for="(opt,i) in data.platforms" :key="i">
                    {{opt.name}}
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
                  <input type="text" class="w-100" v-model="editTitle.titleId" placeholder="IMDb ID" disabled>
                </div>
                <p class="m-0 mt-3 colorOrange">Avaliable at</p>
                <div v-for="(plat,i) in editTitle.titlePlatforms" :key="i">
                  <input type="text" class="w-100 mt-3" disabled :value="plat.name">
                  <div style="position: relative;">
                    <span><i style="right: 10px;" class="fas fa-trash removeIcon" @click="removePlatform(plat.platform_id)"></i></span>
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
  <div v-else class="d-flex flex-column justify-content-center align-items-center text-center">
    <img src="../assets/images/loading.gif" alt="">
    <h3>We thought this would be faster as well, <span style="color: var(--laranja);">sorry</span>.</h3>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AdminTitles",
  data() {
    return {
      webpSupported: true,
      country_list: ["Portugal", "Spain"],
      generos: ["Action", "Comedy"],
      mostrar: 12,
      editID: null,
      editTitle:{
        selectedPlatform: 0,
        titleId: null,
        titlePlatforms: [],
      },
      title: {
        selectedPlatform: 0,
        titleId: null,
        titlePlatforms: [],
      },
      data: {
        titles: [],
        platforms: [],
        newTitle: [],
        genres: []
      },
      loading: {
        titles: true
      }
    }
  },
  mounted () {
    this.webpSupported = this.isWebpSupported();
    this.getTitles();
    this.getPlatforms();
    this.getGenres();
  },
  methods: {
    ...mapActions(["getAllTitles", "getAllPlatforms", "getAllGenres", "extAPIgetTitle", "extAPIgetSeason", "registerTitle", "removeTitle", "changePlatforms"]),
    isWebpSupported() {
      const elem = document.createElement("canvas");
      if (elem.getContext && elem.getContext("2d")) {
        return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
      }
      return false;
    },
    async getTitles() {
      try {
        this.loading.titles = true;
        this.data.titles = await this.getAllTitles();
        if (this.data.titles.success) {
          this.data.titles = this.data.titles.msg;
          this.data.titles.reverse();
          this.loading.titles = false;
        } else {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        }
      } catch (e) {
        this.$router.push({ name: 'Error', params: { '0': 'error' } });
      }
    },
    async getPlatforms() {
      try {
        this.data.platforms = await this.getAllPlatforms();
        if (this.data.platforms.success) {
          this.data.platforms = this.data.platforms.msg;
        } else {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        }
      } catch (e) {
        this.$router.push({ name: 'Error', params: { '0': 'error' } });
      }
    },
    async getGenres() {
      try {
        this.data.genres = await this.getAllGenres();
        if (this.data.genres.success) {
          this.data.genres = this.data.genres.msg;
        } else {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        }
      } catch (e) {
        this.$router.push({ name: 'Error', params: { '0': 'error' } });
      }
    },
    async deleteTitle(id) {
      try {
        const check = await this.$swal({
          title: 'Warning!',
          text: "Are you sure you want to remove this title?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
        });
          
        if (check.isConfirmed) {
          const res = await this.removeTitle(id);
          if (res.success) {
            this.data.titles = this.data.titles.filter(title => title.imdb_id.toString() != id);
            this.$store.state.loggedUserData.data.favourites = this.$store.state.loggedUserData.data.favourites.filter(fav => fav.imdb_id.toString() != id);
            this.$store.state.loggedUserData.data.seen = this.$store.state.loggedUserData.data.seen.filter(seen => seen.imdb_id.toString() != id);
            this.$store.state.loggedUserData.data.title_ratings = this.$store.state.loggedUserData.data.title_ratings.filter(rat => rat.title_id.imdb_id.toString() != id);
            localStorage.loggedUserData = JSON.stringify({ loading: false, data: this.$store.state.loggedUserData.data });
          } else {
            throw new Error(res.msg);
          }
        }
      } catch (e) {
        this.$swal('Error!', e.message, 'error');
      }
    },
    async add() {
      let errorHappened = false;
      // Verificar se há plataformas inseridas
      if (this.title.titlePlatforms.length > 0) {
        // Verificar se o id imdb é valido
        if (String(this.title.titleId.toLowerCase()).match(/ev\d{7}\/\d{4}(-\d)?|(ch|co|ev|nm|tt)\d{7}/)) {
          // Verificar se o imdb_id já existe na BD para evitar calls à API externa desnecessárias
          if (!this.data.titles.some(tt => tt.imdb_id.toLowerCase().trim() == this.title.titleId.toLowerCase().trim())) {
            try {
              let res = await this.extAPIgetTitle(this.title.titleId.toLowerCase().trim());
              this.saveMainInfo(res);
              if (!res.errorMessage || res.errorMessage == null || res.errorMessage == "null") {
                this.$store.state.tries_main = 0;
                this.saveMainInfo(res);
                if (res.tvSeriesInfo) {
                  for (let i = 0; i < res.tvSeriesInfo.seasons.length; i++) {
                    try {
                      let res2 = await this.extAPIgetSeason({ id: this.title.titleId.toLowerCase().trim(), season: i + 1 });
                      if (!res2.errorMessage || res2.errorMessage == null || res2.errorMessage == "null") {
                        this.$store.state.tries_eps = 0;
                        this.saveEpisodeInfo(res2);
                      } else {
                        this.$store.state.cur_api = this.$store.state.cur_api < (this.$store.state.api_keys.length - 1) ? this.$store.state.cur_api += 1 : this.$store.state.cur_api = this.$store.state.api_keys.length - 1;
                        this.$store.state.tries_eps += 1;
                        if (this.$store.state.tries_eps >= this.$store.state.cur_api.length + 1) {
                          errorHappened = true;
                          throw new Error(res2.errorMessage);
                        } else {
                          i--;
                        }
                      }
                    } catch (e) {
                      this.$store.state.cur_api = this.$store.state.cur_api < (this.$store.state.api_keys.length - 1) ? this.$store.state.cur_api += 1 : this.$store.state.cur_api = this.$store.state.api_keys.length - 1;
                      this.$store.state.tries_eps += 1;
                      if (this.$store.state.tries_eps >= this.$store.state.cur_api.length + 1) {
                        errorHappened = true;
                        this.$swal({ title: 'Error!', text: e.message, icon: 'error' });
                        break;
                      } else {
                        i--;
                      }
                    }
                  }
                }
              } else {
                this.$store.state.cur_api = this.$store.state.cur_api < (this.$store.state.api_keys.length - 1) ? this.$store.state.cur_api += 1 : this.$store.state.cur_api = this.$store.state.api_keys.length - 1;
                this.$store.state.tries_main += 1;

                if (this.$store.state.tries_main >= this.$store.state.cur_api.length + 1) {
                  errorHappened = true;
                  throw new Error(res.errorMessage);
                } else {
                  this.add();
                }
              }
            } catch (e) {
              this.$store.state.cur_api = this.$store.state.cur_api < (this.$store.state.api_keys.length - 1) ? this.$store.state.cur_api += 1 : this.$store.state.cur_api = this.$store.state.api_keys.length - 1;
              this.$store.state.tries_main += 1;

              if (this.$store.state.tries_main >= this.$store.state.cur_api.length + 1) {
                errorHappened = true;
                this.$swal({ title: 'Error!', text: e.message, icon: 'error' });
              } else {
                this.add();
              }
            }
          } else {
            this.$swal({ title: 'Error!', text: "The title already exists in the platform!", icon: 'error' });
            errorHappened = true;
          }
        } else {
          this.$swal({ title: 'Error!', text: "Invalid IMDb ID!", icon: 'error' });
          errorHappened = true;
        }
        if (!errorHappened) {
          // O objeto do título já foi completamente construído, enviar a informação para a localstorage
          try {
            const resAddTitle = await this.registerTitle(this.data.newTitle);
            if (resAddTitle.success) {
              this.$swal({ title: 'Success!', text: "The title has been successfully added!", icon: 'success' });
              this.data.titles.unshift(resAddTitle.data);
              document.querySelector("#close-add-title").click();
              this.title.selectedPlatform = 0;
              this.title.titleId = null;
              this.title.titlePlatforms = [];
            } else {
              throw new Error(resAddTitle.msg)
            }
          } catch (e) {
            this.$swal({ title: 'Error!', text: e.message, icon: 'error' });
          }
        }
      } else {
        this.$swal({ title: 'Error!', text: "Please add at least one platform!", icon: 'error' });
      }
    },
    async edit() {
      if (this.editTitle.titlePlatforms.length > 0) {
        // Verificar se as plataformas são diferentes
        let hasChanged = false;
        const originalPlatforms = this.data.titles.find(tt => tt.imdb_id == this.editID).platforms;
        if (originalPlatforms.length != this.editTitle.titlePlatforms.length) {
          hasChanged = true;
        } else {
          originalPlatforms.forEach(platform => {
            if (!this.editTitle.titlePlatforms.some(a => a.platform_id == platform.platform_id.platform_id)) {
              hasChanged = true;
            }
          });
        }

        if (hasChanged) {
          const newData = [];
          this.editTitle.titlePlatforms.forEach(a => {
            newData.push({ platform_id: a._id });
          });
          try {
            const res = await this.changePlatforms({ imdb_id: this.editID, platforms: newData });
            if (res.success) {
              this.data.titles[this.data.titles.findIndex(tt => tt.imdb_id == this.editID)].platforms = res.data.platforms;
              this.$swal({ title: 'Success!', text: "The title has been successfully edited!", icon: 'success' });
            } else {
              throw new Error(res.msg);
            }
          } catch (e) {
            this.$swal('Error!', e.message, 'error');
          }
        }
        document.querySelector("#close-edit-title").click();
      } else {
        this.$swal({ title: 'Error!', text: "Please add at least one platform!", icon: 'error' });
      }
    },
    listTitleInfo(id){
      this.editTitle.titleId = id;
      this.editTitle.titlePlatforms = [];
      this.data.titles.find(tt => tt.imdb_id == id).platforms.forEach(plat => {
        this.editTitle.titlePlatforms.push(this.data.platforms.find(a => a.platform_id.toString() == plat.platform_id.platform_id.toString()));
      });
      this.editTitle.selectedPlatform = 0;
      this.editID = id;
    },
    newAddPlatform(){
      if (this.title.titlePlatforms.some(platform => platform.platform_id == this.title.selectedPlatform)) {
        this.$swal({
          title: 'Error!',
          text: "This platform is already registered in this title!",
          icon: 'error',
        })
      } else {
        this.title.titlePlatforms.push(this.data.platforms.find(plat => plat.platform_id == this.title.selectedPlatform));
        this.performClick("#new-addplatform-back");
      }
    },
    addPlatform(){
      if (this.editTitle.titlePlatforms.some(platform => platform.platform_id == this.editTitle.selectedPlatform)) {
        this.$swal({
          title: 'Error!',
          text: "This platform is already registered in this title!",
          icon: 'error',
        })
      } else {
        this.editTitle.titlePlatforms.push(this.data.platforms.find(plat => plat.platform_id == this.editTitle.selectedPlatform));
        this.performClick("#edit-addplatform-back");
      }
    },
    newRemovePlatform(id){
      if (this.title.titlePlatforms.length > 1) {
        this.title.titlePlatforms = this.title.titlePlatforms.filter(plat => plat.platform_id != id);
      } else {
        this.$swal({
          title: 'Error!',
          text: 'Each title has to have at least 1 platform.',
          icon: 'error',
        });
      }
    },
    removePlatform(id){
      if (this.editTitle.titlePlatforms.length > 1) {
        this.editTitle.titlePlatforms = this.editTitle.titlePlatforms.filter(plat => plat.platform_id != id);
      } else {
        this.$swal({
          title: 'Error!',
          text: 'Each title has to have at least 1 platform.',
          icon: 'error',
        });
      }
    },
    performClick(name) {
      document.querySelector(name).click();
    },
    saveMainInfo(res) {
      this.data.newTitle = {
        imdb_id: res.id,
        title: res.title,
        synopsis: res.plot ? res.plot : "Unfortunately, we could not retrieve the plot for this movie, try again later",
        poster: res.image ? res.image : "https://img.myloview.com/posters/question-mark-sign-ask-query-symbol-interrogation-point-icon-turquoise-3d-rendering-isolated-on-white-400-179381654.jpg",
        banner: res.posters.backdrops.length > 0 ? res.posters.backdrops[0].link : "https://advantec.co.uk/app/uploads/2019/02/generic-banner.jpg",
        trailer: res.trailer.link ? res.trailer.link : "https://youtu.be/dQw4w9WgXcQ",
        year: res.year ? res.year : "2000",
        country: res.countryList[0].value ? res.countryList[0].value : "Portugal",
        language: res.languageList[0].value ? res.languageList[0].value : "English",
        content_rating: !res.contentRating || res.contentRating == "Approved" ? "PG-13" : res.contentRating,
        duration: res.runtimeMins ? res.runtimeMins : "Running time not available",
        seasons: res.tvSeriesInfo ? res.tvSeriesInfo.seasons.length : 0,
        platforms: [],
        genres: [],
        episodes: [],
        cast: res.actorList.length > 50 ? res.actorList.slice(0, 50) : res.actorList,
        producers: [],
        directors: res.directorList,
        writers: !res.tvSeriesInfo ? res.writerList : null,
        imdb_rating: res.imDbRating ? res.imDbRating : 0.0 
      };

      // Elenco
      this.data.newTitle.cast.forEach((actor, i) => {
        this.data.newTitle.cast[i].image_webp = null;
      });

      // Géneros
      res.genreList.map(genre => {
        this.data.newTitle.genres.push({
          genre_id: this.data.genres.find(gen => gen.description == genre.value)._id
        });
      });

      // Plataformas
      this.title.titlePlatforms.forEach(plat => {
        this.data.newTitle.platforms.push({
          platform_id: plat._id
        });
      });

      // Produtores
      for (let i = 0; i < res.fullCast.others.length; i++){
        const JOB = res.fullCast.others[i].job;
        if (JOB.toLowerCase().trim() == "produced by" || JOB.toLowerCase().trim() == "series produced by") {
          if (this.data.newTitle.seasons > 0) {
            this.data.newTitle.producers = res.fullCast.others[i].items.length > 5 ? res.fullCast.others[i].items.slice(0, 5) : res.fullCast.others[i].items;
          } else {
            this.data.newTitle.producers = res.fullCast.others[i].items;
          }
          break;
        }
      }

      if (this.data.newTitle.seasons > 0) {
        // Escritores
        for (let i = 0; i < res.fullCast.writers.items.length; i++) {
          if (this.data.newTitle.writers) {
            if (!this.data.newTitle.writers.some(escritor => escritor.id == res.fullCast.writers.items[i].id)) {
              this.data.newTitle.writers.push(res.fullCast.writers.items[i]);
              if (this.data.newTitle.writers.length == 5) {
                break;
              }
            }
          } else {
            this.data.newTitle.writers = [res.fullCast.writers.items[i]];
          }
        }

        // Diretores (manter um cap de 5 diretores - os principais - para não encher a localstorage)
        this.data.newTitle.directors = res.fullCast.directors.items.length > 5 ? res.fullCast.directors.items.slice(0, 5) : res.fullCast.directors.items;
      }
    },
    saveEpisodeInfo(res) {
      try {
        for (let k = 0; k < res.episodes.length; k++) {
          this.data.newTitle.episodes.push({
            imdb_id: res.imDbId,
            season: res.episodes[k].seasonNumber,
            episode: res.episodes[k].episodeNumber,
            title: res.episodes[k].title,
            banner: res.episodes[k].image,
            banner_webp: null
          });
        }
      } catch (e) {
        throw new Error;
      }
    }
  }
};
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