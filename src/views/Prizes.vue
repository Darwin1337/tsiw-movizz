<template>
  <div class="container">
    <h3 class="mt-4">Rewards</h3>
    <span
      class="p-2 mt-2 mb-2"
      style="background-color: var(--azul-escuro); border-radius: 5px; display: inline-block;">
      <b>1875</b> points
    </span>
     
    <div class="modal fade backgroundBlur" id="exampleModal" ref="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
        <div class="modal-content modalrewards">
          <div class="modal-body row m-0 gy-3">
            <div
              class="card-image-modal col-md-5">
              <img class="w-100 h-100" :src="Math.floor(Math.random() * 2) + 1 == 1 ? 'https://www.cheatsheet.com/wp-content/uploads/2017/10/Netflix.jpg' : 'https://filmdaily.co/wp-content/uploads/2020/12/netflix-7.jpeg'" alt="Card image cap">
            </div>
            <div class="col-md-7">
              <div class="d-flex h-100 flex-column justify-content-between">
                <div>
                  <p>Are you sure you want to exchange your points for the <b>Cinemas NOS ticket?</b></p>
                  <p style="color: var(--cinza-claro)">This reward costs 3000 points</p>
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
    <div class="row">
      <template v-for="i in 5">
        <div class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 p-2" :key="i">
          <div class="card carddesign">
            <div
              class="card-image">
              <img class="w-100 h-100" src="https://www.cheatsheet.com/wp-content/uploads/2017/10/Netflix.jpg" alt="Card image cap">
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">Cinema NOS ticket</h5>
              <p class="card-text">3000</p>
              <button class="orange-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" style="max-width: 150px; width: 100%;">Buy</button>
            </div>
          </div>
        </div>
        <div class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 p-2" :key="i * (i + 45)">
          <div class="card carddesign">
            <div
              class="card-image">
              <img class="w-100 h-100" src="https://filmdaily.co/wp-content/uploads/2020/12/netflix-7.jpeg" alt="Card image cap">
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">Cinema NOS ticket</h5>
              <p class="card-text">3000</p>
              <button class="orange-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" style="max-width: 150px; width: 100%;">Buy</button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default ({
  data() {
    return {
      // modal: null
    }
  },
  methods: {
    ...mapActions([
      "loadMovies",
    ]),
    callAction() {
      this.loadMovies();
    },
  }
})
</script>

<style scoped>
.modalrewards{
  background-color: #151E2E;
}

.carddesign {
  border: none;
  background-color: var(--azul-escuro2);
  border-radius: 10px;
}

.card-image {
  max-width: inherit;
  height: 150px;
  border-radius: 10px;
}

.card-image-modal {
  max-width: inherit;
  height: 250px;
  border-radius: 10px;
}

.card-image img {
  object-fit: cover;
  object-position: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

.card-image-modal img {
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
}
</style>