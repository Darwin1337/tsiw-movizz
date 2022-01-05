<template>
  <div>
    <b-jumbotron>
      <div class="d-flex h-100 flex-column align-items-center justify-content-center">
        <img id="logo" src="../assets/images/logo.svg" alt="Logo" width="35%" />
        <p class="title">we're glad you made it</p>
      </div>
    </b-jumbotron>
    <b-container class="bv-example-row">
      <b-row class="mb-5">
        <b-col md="7">
          <p class="seccion-title">Frequently Asked Questions</p>
          <p class="faq-title">What's this about?</p>
          <p class="faq-text">Well, sad to hear you clearly didn't understand the assignment. Good thing we are here to
            help.
            Long story short, answer quizzes about your favourite movies and TV shows and earn great prizes!</p>
          <br>
          <p class="faq-title">Ok... but what kind of prizes?</p>
          <p class="faq-text">From free month subscriptions of your favourite streaming platforms to full on paid trips
            to cinema festivals. We know... we might be spoiling you, but you deserve it.</p>
          <br>
          <p class="faq-title">Is there a catch to it?</p>
          <p class="faq-text">Wow, you must be real fun at parties... just kidding, we know you'd rather binge watch
            Breaking Bad again. No, there is literally none, just play and win. In the process show people who really is
            the one who knocks.</p>
          <br>
          <p class="faq-title">Thats... it?</p>
          <p class="faq-text">Well... yes, but actually no. We have tons of movies and series waiting to be discovered.
            If you ever feel like you got nothing to watch, you've come to the right place. Customizable filters
            and all the information you need to see if something is worth your time or no, because we know
            you're a busy person.</p>
          <br>
          <p class="faq-title">I'm in, where do I sign up?</p>
          <p class="faq-text">Thought you'd never ask.
            Fill out the sign up form and prove you're a legit cinephile and not just some poser.</p>
        </b-col>
        <b-col md="5">
          <p class="seccion-title">No time to waste?</p>
          <p class="login-title">Prove it's really you, <span style="color: #BBE1FA; font-weight: bold;">sign in</span>
          </p>
          <form id="login" class="mb-5">
            <b-input-group>
              <b-form-input placeholder="E-mail"></b-form-input>
              <div class="input-group-append">
                <div class="input-group-text">
                  <i class="fas fa-envelope"></i>
                </div>
              </div>
            </b-input-group>
            <br>
            <b-input-group>
              <b-form-input type="password" placeholder="Password"></b-form-input>
              <div class="input-group-append">
                <div class="input-group-text">
                  <i class="fas fa-lock"></i>
                </div>
              </div>
            </b-input-group>
            <div class="text-center">
              <button type="submit" class="mt-4 orange-btn">Sign in</button>
              </div>
          </form>
          <p class="login-title"><span style="color: #BBE1FA; font-weight: bold;">Sign up</span>, we promise we won't
            sell your data</p>
          <form id="register">
            <b-row>
              <b-col sm="6">
                <b-form-input placeholder="First name"></b-form-input>
              </b-col>
              <b-col sm="6">
                <b-form-input placeholder="Last name"></b-form-input>
              </b-col>
            </b-row>
            <br>
            <b-input-group>
              <b-form-input placeholder="E-mail"></b-form-input>
              <div class="input-group-append">
                <div class="input-group-text">
                  <i class="fas fa-envelope"></i>
                </div>
              </div>
            </b-input-group>
            <br>
            <b-input-group>
              <b-form-input type="password" placeholder="Password"></b-form-input>
              <div class="input-group-append">
                <div class="input-group-text">
                  <i class="fas fa-lock"></i>
                </div>
              </div>
            </b-input-group>
            <br>
            <b-input-group>
              <b-form-datepicker placeholder="Date of birth" right></b-form-datepicker>
              <div class="input-group-append">
                <div class="input-group-text">
                  <i class="fas fa-calendar"></i>
                </div>
              </div>
            </b-input-group>
            <div class="text-center">
              <button type="submit" class="mt-4 orange-btn">Sign up</button>
            </div> 
          </form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<style scoped>  
  .jumbotron {
    background-image: url("../assets/images/teste.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 650px;
  }

  .title {
    color: white;
    font-size: 1.5em;
    margin-top: auto;
    font-weight: bold;
    margin-bottom: 75px;
  }

  #logo {
    width: 15%;
    min-width: 300px;
    margin-top: 25px;
    margin-bottom: auto;
  }

  .seccion-title {
    color: #84E296;
    font-weight: 900;
    font-size: 1.5em;
  }

  .faq-title {
    font-size: 1.25em;
    font-weight: bold;
    color:#BBE1FA;
  }

  .login-title {
    font-size: 1.25em;
    font-weight: bold;
    color: white;
  }

  .faq-text {
    color: white;
    font-weight: 500;
  }

  input,
  input:focus,
  .b-form-datepicker,
  .b-form-datepicker:focus,
  .b-form-datepicker:active {
    outline: none;
    border: none;
    box-shadow: none;
    background-color: #1D232E;
    color: white;
  }

  .orange-btn {
    background-color: orange;
    border: none;
    color: #1D232E;
    padding: 5px;
    border-radius: 5px;
    width: 150px;
    font-weight: bold;
  }


  .input-group-text .fas {
    color: #AFB3B7;
  }

  .input-group-text {
    border: none !important;
    background: #1D232E;
  }

  ::placeholder {
    color: #AFB3B7 !important;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: #AFB3B7 !important;
  }

  ::-ms-input-placeholder {
    color: #AFB3B7 !important;
  }
</style>