<template>
  <div class="container">

    <div class="mt-4">
      <div class="row align-items-center">
        <div class="col-md-6" style="text-align:right; border-right:3px solid #84E296; color:#84E296;">
          <div class="me-4"><h3>Movizz</h3><p>Hall of Frame</p></div>
        </div>
        <div class="col-md-6" >
          <div class="d-flex align-items-center ms-4">
            <div class="col-md-2">
              <div>
                <div>
                  <img src="../assets/avatar.png" >
                  <img src="../assets/coroa.png" style="position: relative;top: -29px;width: 35px;left: -30px;z-index: 0;" >
                  <img style="position: relative;top: 19px;width: 20px; left: -46px;" src="../assets/nivel.png" > <span style="position: relative;top: 19px;font-size: 10px;color: black;left: -66px;">45</span>
                </div>
                <p class="mt-2" style="color:white;">Gonçalo <br><span style="opacity:50%;">Director</span></p>
              </div>
            </div>
            <div class="col-md-2">
              <div>
                <div>
                  <img src="../assets/avatar.png" >
                  <img src="../assets/coroa.png" style="position: relative;top: -29px;width: 35px;left: -30px;z-index: 0;" >
                  <img style="position: relative;top: 19px;width: 20px; left: -46px;" src="../assets/nivel.png" > <span style="position: relative;top: 19px;font-size: 10px;color: black;left: -66px;">45</span>
                </div>
                <p class="mt-2" style="color:white;">Gonçalo <br><span style="opacity:50%;">Director</span></p>
              </div>
            </div>
          </div>
        </div>
        <!-- Banner -->
        <div class="" style="height:425px;">
          <div class="jumbotron d-flex align-items-end" style="padding-bottom: 40px; padding-left: 30px; height:100% ; background-position: center;" >
            <div class="container for-about">
              <p>Quizz of the day</p>
              <h3>Stranger Things</h3>
              <h5>Think you know about the upside down? Think again.</h5>
              <p>10 questions</p>
              <div>
                <router-link :to="{name:''}"><img src="../assets/PLAY.png">  Play</router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- Top Quizzes -->
         <h4 class="mt-5">Top Quizzes</h4>
         <div class="row" id="topQuizzes">
            <div class="col-md-4 col-lg-2 col-6 col-sm-6">
              <img class="w-100" id="aa" @mouseover="hover=true" @mouseleave="hover=false" src="../assets/lacasa.png" >
            </div>
            <div class="col-md-4 col-lg-2 col-6 col-sm-6">
              <img class="w-100" id="aa" @mouseover="hover=true" @mouseleave="hover=false" src="../assets/lacasa.png" >
            </div>
         </div>
         <!-- Top Movies -->
          <h4 class="mt-5">Top Movies</h4>
          <div class="col-6 text-right">
            <a class="btn btn-primary mb-3 mr-1" href="#carouselMovies" role="button" data-slide="prev">
                <i class="fa fa-arrow-left"></i>
            </a>
            <a class="btn btn-primary mb-3 " href="#carouselMovies" role="button" data-slide="next">
                <i class="fa fa-arrow-right"></i>
            </a>
          </div>
          <div id="carouselMovies" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row">

                  <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                    <div class="card">
                      <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
                    </div>
                  </div>
                  <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                    <div class="card">
                      <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
                    </div>
                  </div>
                  <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                    <div class="card">
                      <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="carousel-item">
                  <div class="row">

                      <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                          <div class="card">
                              <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
                          </div>
                      </div>
                      <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                          <div class="card">
                              <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
                          </div>
                      </div>
                      <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                          <div class="card">
                              <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
                          </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          <!-- Top Series -->
          <h4>Top Series</h4>
          <div class="col-6 text-right">
            <a class="btn btn-primary mb-3 mr-1" href="#carouselSeries" role="button" data-slide="prev">
                <i class="fa fa-arrow-left"></i>
            </a>
            <a class="btn btn-primary mb-3 " href="#carouselSeries" role="button" data-slide="next">
                <i class="fa fa-arrow-right"></i>
            </a>
          </div>
          <div id="carouselSeries" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row">
                  <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                    <div class="card">
                      <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
                    </div>
                  </div>
                  <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                    <div class="card">
                      <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
                    </div>
                  </div>
                  <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                    <div class="card">
                      <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="carousel-item">
                  <div class="row">

                      <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                          <div class="card">
                              <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
                          </div>
                      </div>
                      <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                          <div class="card">
                              <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
                          </div>
                      </div>
                      <div class="col-md-4 col-lg-2 col-6 col-sm-6 mb-3">
                          <div class="card">
                              <img class="img-fluid" alt="100%x280" src="../assets/lacasa.png">
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

</script>

<style scoped>
.jumbotron {
  background-image: url("../assets/banner.png");
  background-size: cover;
}
</style>
