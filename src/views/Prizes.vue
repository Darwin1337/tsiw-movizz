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
      <div class="col-md-3 d-flex align-items-center justify-content-between p-3 bgRewardLive">
        <div style="margin-right: 20px;">
          <p>Cinema NOS ticket</p>
          <p>10s ago</p>
        </div>
        <img src="../assets/cinemaNos.jpg" class="w-7" style="width:30%;" alt="">
      </div>
      <div class="col-md-3 d-flex align-items-center justify-content-between p-3 bgRewardLive">
        <div style="margin-right: 20px;">
          <p>Cinema NOS ticket</p>
          <p>10s ago</p>
        </div>
        <img src="../assets/cinemaNos.jpg" class="w-7" style="width:30%;" alt="">
      </div>
      <div class="col-md-3 d-flex align-items-center justify-content-between p-3 bgRewardLive">
        <div style="margin-right: 20px;">
          <p>Cinema NOS ticket</p>
          <p>10s ago</p>
        </div>
        <img src="../assets/cinemaNos.jpg" class="w-7" style="width:30%;" alt="">
      </div>
    </div>
    <h3 class="mt-5">Rewards</h3>
  </div>
</template>
<script>
export default ({
  data() {
    return {
      pressed:false,
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
})
</script>

<style scoped>
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
