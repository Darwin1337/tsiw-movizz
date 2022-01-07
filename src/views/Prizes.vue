<template>
  <div class="container">
    <div class="row align-items-center bgLive mt-4 flex-nowrap" style="border-radius:10px; overflow: hidden;">
      <div class="col-md-2 d-flex ">
        <p class="m-0 liveRewards">Live Rewards <br>Exchanged</p>
      </div>
      <div @mouseover="pressed=true; mostrarVencedor($event)" @mouseleave="mostrarReward($event)" class="col-md-3 d-flex align-items-center justify-content-between p-3 bgRewardLive">
        <div style="margin-right: 20px;">
          <p>Cinema NOS ticket</p>
          <p>10s ago</p>
        </div>
        <img src="../assets/cinemaNos.jpg" class="w-7" style="width:30%;" alt="">
      </div>
      <div class="col-md-3 col-sm-6 d-flex align-items-center justify-content-between p-3 bgRewardLive">
        <div style="margin-right: 20px;">
          <p>Cinema NOS ticket</p>
          <p>10s ago</p>
        </div>
        <img src="../assets/cinemaNos.jpg" class="w-7" style="width:30%;" alt="">
      </div>
      <div class="col-md-3 col-sm-6 d-flex align-items-center justify-content-between p-3 bgRewardLive">
        <div style="margin-right: 20px;">
          <p>Cinema NOS ticket</p>
          <p>10s ago</p>
        </div>
        <img src="../assets/cinemaNos.jpg" class="w-7" style="width:30%;" alt="">
      </div>
      <div class="col-md-3 col-sm-6 d-flex align-items-center justify-content-between p-3 bgRewardLive">
        <div style="margin-right: 20px;">
          <p>Cinema NOS ticket</p>
          <p>10s ago</p>
        </div>
        <img src="../assets/cinemaNos.jpg" class="w-7" style="width:30%;" alt="">
      </div>
    </div>
    <h3 class="mt-5">Rewards</h3>
    <p><b>1875</b> points</p>
    <div class="row flex-wrap">
      <div class="col-md-12 d-flex">
        <div class="col-md-2 p-2">
          <div class="card carddesign" >
            <img class="card-img-top" src="../assets/cinemaNos.jpg" alt="Card image cap">
            <div class="card-body text-center">
              <h5 class="card-title">Cinema NOS ticket</h5>
              <p class="card-text">3000</p>
              <a href="#" class="btn buybutton" @click="modal.show()">Buy</a>
            </div>
          </div>
        </div>
        <div class="col-md-2 p-2">
          <div class="card carddesign" >
            <img class="card-img-top" src="../assets/cinemaNos.jpg" alt="Card image cap">
            <div class="card-body text-center">
              <h5 class="card-title">Cinema NOS ticket</h5>
              <p class="card-text">3000</p>
              <a class="btn buybutton" @click="modal.show()">Buy</a>
            </div>
          </div>
        </div>

        <div class="modal fade backgroundBlur" ref="exampleModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body d-flex">
                <img src="../assets/cinemaNos.jpg" class="img30" alt="">
                <div>
                  <div class="ps-3">
                    <p>Are you sure you want to exchange your points for the <b>Cinemas NOS ticket?</b></p>
                    <p>This reward costs 3000 points</p>
                  </div>
                  <div class="buttonsRewardPosition">
                    <button type="button" class="btn green-btn me-2">Yes</button>
                    <button type="button" class="btn red-btn" @click="modal.hide()">No</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>

import { Modal } from 'bootstrap'
export default ({
  data() {
    return {
      pressed:false,
      modal: null
    }
  },
  methods: {
    mostrarReward(event){
        event.currentTarget.innerHTML =`<div style="margin-right: 20px;">
          <p>Cinema NOS ticket</p>
          <p>10s ago</p>
        </div>
        <img src="${require("../assets/cinemaNos.jpg")}" class="w-7" style="width:30%;" alt="">`
      
    },
    mostrarVencedor(event) {
      if(this.pressed){
        event.currentTarget.innerHTML =`
        <img src="${require("../assets/avatar.png")}" >
        <div style="margin-right: 20px;">
          <p>António Carvalho</p>
          <p>10s ago</p>
        </div>
        `
      }
      
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.exampleModal)
  },
})
</script>

<style scoped>
.buttonsRewardPosition{
    position: absolute;
    bottom: 0;
    padding: 1rem;
    right: 0px;
}
.img30{
  width:30%;
}
.modalrewards{
  background-color: #151E2E;
}
.buybutton{
  background-color: var(--laranja);
}
.btn{
  outline: none !important;
  box-shadow: none;
}
.carddesign{
  border:none;
  background-color:var(--azul-escuro2);
}
.bgRewardLive{
  background-color:#101622;
}
.bgLive{
  background-color:var(--azul-escuro2)
}
.liveRewards{
    border-right: 2px solid #84E296;
    padding-right: 20px;
    text-align: right;
    font-size: 24px;
    padding-left: 23px;
    font-weight: normal;
    color: #84E296;
}
</style>
