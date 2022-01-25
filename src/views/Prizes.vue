<template>
  <div class="container">
    <h3 class="mt-4">Rewards</h3>
    <span
      class="p-2 mt-2 mb-2"
      style="background-color: var(--azul-escuro); border-radius: 5px; display: inline-block;">
      <b>{{getLoggedUser.pontos}}</b> points
    </span>
     
    <div class="modal fade backgroundBlur" id="exampleModal" ref="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
        <div class="modal-content modalrewards">
          <span id="idPremio" style="display: none;"></span>
          <div class="modal-body row m-0 gy-3">
            <div
              class="card-image-modal col-md-5">
              <img class="w-100 h-100" id="premioImagem">
            </div>
            <div class="col-md-7">
              <div class="d-flex h-100 flex-column justify-content-between">
                <div>
                  <p id="premioNome"></p>
                  <p style="color: var(--cinza-claro)" id="premioPreco"></p>
                </div>
                <div class="ms-auto">
                  <button type="button" class="btn green-btn me-2" data-bs-dismiss="modal" @click="comprarPremio()">Yes</button>
                  <button type="button" class="btn red-btn" data-bs-dismiss="modal">No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 p-2" v-for="(premio,index) in getAllPrizes" :key="index">
        <div class="card carddesign">
          <div
            class="card-image">
            <img class="w-100 h-100" :src="getAllPrizes[index].img" alt="Card image cap">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{{getAllPrizes[index].nome}}</h5>
            <p class="card-text">{{getAllPrizes[index].valor}} pontos</p>
            <button :disabled="getAllPrizes[index].valor>getLoggedUser.pontos" :class="{noPoints:getAllPrizes[index].valor>getLoggedUser.pontos}" class="orange-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="openModal(index)" style="max-width: 150px; width: 100%;">Buy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default ({
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(["getLoggedUser", "getAllPrizes"])
  },
  methods: {
    ...mapActions(["loadMovies"]),
    ...mapMutations(["SET_NEW_BUY"]),
    callAction() {
      this.loadMovies();
    },
    openModal(i){
      document.querySelector("#premioNome").innerHTML=`Are you sure you want to exchange your points for the <b>${this.getAllPrizes[i].nome}</b>`;
      document.querySelector("#premioPreco").innerHTML=`This reward costs ${this.getAllPrizes[i].valor} points`;
      document.querySelector("#premioImagem").src=this.getAllPrizes[i].img;
      document.querySelector("#idPremio").innerHTML= i;
    },
    comprarPremio(){
      const id=document.querySelector("#idPremio").innerHTML;
      this.SET_NEW_BUY({id_utilizador:this.getLoggedUser.id, id_premio: id, data: new Date(), valor: this.getAllPrizes[id].valor})
    }
  }
})
</script>

<style scoped>
.noPoints{
  background-color:var(--cinza3);
}
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