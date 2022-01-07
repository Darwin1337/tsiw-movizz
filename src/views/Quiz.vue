<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-4">
                <div class="row bannerQuizz">
                    <div class="col-md-12" style="max-height: 386px; height: 100%;">
                        <div class="jumbotron d-flex align-items-center" style="padding-bottom: 40px; padding-left: 30px; height:100% ; background-position: center;" >
                            <div class="container for-about" id="banner">
                                <h3>Prison Break</h3>
                                <h5>Contrary to the series, there's no escaping this quiz.</h5>
                                <p class="mb-2 orangeText">Hard • Long quiz • 10 questions</p>
                                <p class="mb-2">7,443 people played this quiz</p>
                                <div class="d-flex align-items-center mt-3">
                                    <a type="button" class="btn visitSerieButton"><span>Visit serie</span></a>
                                    <div>
                                        <img class="playButton ms-4" src="../assets/PLAY.png"><span> Start the quiz</span>
                                    </div>
                                </div>
                            </div>
                            <div id="rating" class="d-flex align-items-center justify-content-center mt-3">
                                <span>4.7</span>
                            </div>
                        </div>
                        <h4 class="mt-3">Rate this quiz</h4>
                        <!-- comments -->
                    </div>
                </div>
            </div>
            <div class="col-md-6 mt-4 ">
                <div class="d-flex justify-content-around quizHeader p-3">
                    <p class="m-0"><b>Points won: </b> 30/150</p>
                    <p class="m-0"><b>8 Questions Left </b></p>
                    <p class="m-0"><b>Your points: </b>9232</p>
                </div>
                <div style="background-color:var(--azul-escuro2)">
                    <div class="text-center">
                        <img class="quizImage mt-3" src="../assets/images/prisonBreakBanner.png" alt="">
                    </div>
                    <p class="mt-3 quizMargin"><span>3. </span>Who, from The Fox River 8, did Mahome execute?</p>
                    <div class="row quizMargin">
                        <div class="col-md-6 questions"><span class="orangeText">A. </span> John</div>
                        <div class="col-md-6 questions"><span class="orangeText">B. </span>John</div>
                        <div class="col-md-6 questions"><span class="orangeText">C. </span>John</div>
                        <div class="col-md-6 questions"><span class="orangeText">D. </span>John</div>
                    </div>
                    <p class="m-0 p-2"></p>
                </div>
                <div class="d-flex justify-content-around quizHeader p-3">
                    <p class="m-0">50/50</p>
                    <p class="m-0"><b>Need a hand? </b></p>
                    <p class="m-0">New question</p>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.quizMargin{
    margin-left: 25px;
    margin-right: 25px;
}
.questions{
    border-radius: 10px;
    width: 46%;
    padding:10px 20px;
    margin: 10px 10px;
    background-color: var(--bg)
}
.quizImage{
    width: 100%;
    max-width: 588px;
}
.quizHeader {
    background-color: #282F3C;
}
#rating{
      width: 50px;
      height: 50px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 25px;
      color:var(--verde);
      border: 3px solid var(--verde);
      
}
.orangeText{
    color: var(--laranja);
}
.visitSerieButton {
    transition: 0.5s;
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    padding: 5px 20px;
    
}
.playButton{
    width:20%;
}
#banner h3{
    font-weight: bold;
    font-size:55px;
}
.bannerQuizz{
    min-height: 350px;
    height: 100%;
}
.jumbotron {
  background-image: url("../assets/images/prisonBreakBanner.png");
  background-size: cover;
}
</style>