<template>
  <div class="container ">
    <div class="navigation d-flex flex-wrap mt-4" style="gap: 20px">
      <a @click="tab='users'" :class="{ active: tab == 'users'}" >Users</a>
      <a @click="tab='quizzes'" :class="{ active: tab == 'quizzes'}" >Quizzes</a>
      <a @click="tab='movie'" :class="{ active: tab == 'movie'}">Movie/Series</a>
      <a @click="tab='prizes'" :class="{ active: tab == 'prizes'}" >Prizes</a>
    </div>
    <div v-if="tab=='users'">
      <!-- filtros -->
      <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3 mt-5 mb-3">
        <div class="col-md-12 col-lg-3 col-sm-12">
          <form class="d-flex">
            <div class="input-group">
              <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search">
              <button type="submit" @submit.prevent=""><i class="fas fa-search"></i></button>
            </div>
          </form>
        </div>

        <div class="col-md-3 col-lg-2 col-sm-6">
          <select id="order" style="height: 40px;">
            <option disabled selected>Order by</option>
            <option :value=filter v-for="(filter,index) in filters" :key="index">{{filter}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 col-lg-6 col-sm-12 d-flex ">
          <div class="member d-flex align-items-center cardUser w-100 justify-content-between">
            <div style="position: relative;" class="padding-10" >
              <img src="https://thispersondoesnotexist.com/image" width="50px" height="50px" style="border-radius: 50%;">
              <p class="member-level big">18</p>
            </div>
            <div class="padding-10">
              <b>Sara Raquel</b><span style="color:var(--cinza-claro);"> Senior</span>
              <p class="m-0" style="color:var(--cinza-claro);"><b>Registered since</b> October 12th 2020</p>
            </div>
            <div class="padding-10">
              <p class="m-0" style="color:var(--cinza-claro);"><b>Not blocked</b></p>
            </div>
            <div class="padding-10">
              <span class="unblock-button" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-ban"></i></span>
            </div>
            <div class="padding-10">
              <button class="detailsButton">Details</button>
            </div>
          </div>
        </div>

        <div class="col-md-12 col-lg-6 col-sm-12 d-flex ">
          <div class="member d-flex align-items-center cardUser w-100 justify-content-between">
            <div style="position: relative;" class="padding-10" >
              <img src="https://thispersondoesnotexist.com/image" width="50px" height="50px" style="border-radius: 50%;">
              <p class="member-level big">18</p>
            </div>
            <div class="padding-10">
              <b>Sara Raquel</b><span style="color:var(--cinza-claro);"> Senior</span>
              <p class="m-0" style="color:var(--cinza-claro);"><b>Registered since</b> October 12th 2020</p>
            </div>
            <div class="padding-10">
              <p class="m-0" style="color:var(--cinza-claro);"><b>Not blocked</b></p>
            </div>
            <div class="padding-10">
              <span class="block-button" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-ban"></i></span>
            </div>
            <div class="padding-10">
              <button class="detailsButton">Details</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade backgroundBlur" id="exampleModal" ref="exampleModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="max-width:500px;">
          <div class="modal-content modalrewards">
            <div class="modal-body row m-0 gy-3">
              <div class="col-md-12">
                <div class="d-flex h-100 flex-column justify-content-between">
                  <div>
                    <p>Are you sure you want to block this user?</p>
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

    </div>
    <div id="section2">
      <div v-if="tab=='quizzes'">
        <!-- filtros -->
        <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3 mt-5 mb-3 filters">
          <div class="col-md-12 col-lg-3 col-sm-12">
            <form class="d-flex">
              <div class="input-group">
                <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search">
                <button type="submit" @submit.prevent=""><i class="fas fa-search"></i></button>
              </div>
            </form>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="type" style="height: 40px;">
              <option disabled selected>Type</option>
              <option :value=type v-for="(type, index) in types" :key="index">{{ type }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="theme" style="height: 40px;">
              <option disabled selected>Theme</option>
              <option :value=theme v-for="(theme, index) in themes" :key="index">{{ theme }}</option>
            </select>
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
          <button class="addNewQuizButton" data-bs-toggle="modal" data-bs-target="#addQuizModal">Add new quiz</button>
        </div>
        <div class="row">
          <div class="col-lg-2 col-md-6 col-6 mt-3 quizImg">
            <img class="w-100" style="border-radius:5px;" src="http://ae01.alicdn.com/kf/H82dbacf2a86942828898af5d5c75704dM.jpg" alt="">
            <div class="d-flex flex-column">
              <button class="editQuizButton" >Edit</button>
              <button class="removeQuizButton" data-bs-toggle="modal" data-bs-target="#removeQuizModal">Remove</button>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 col-6 mt-3 quizImg">
            <img class="w-100" style="border-radius:5px;" src="https://upload.wikimedia.org/wikipedia/pt/e/e5/Riverdale_Temporada_2_Poster.jpg" alt="">
            <div class="d-flex flex-column">
              <button class="editQuizButton" data-bs-toggle="modal" data-bs-target="#editQuiz">Edit</button>
              <button class="removeQuizButton" data-bs-toggle="modal" data-bs-target="#removeQuizModal">Remove</button>
            </div>
          </div>
        </div>
        <!-- remove quiz modal -->
        <div class="modal fade backgroundBlur" id="removeQuizModal" ref="removeQuizModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:500px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                <div class="col-md-12">
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <div>
                      <p>Are you sure you want to remove this quiz?</p>
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
        <!-- New quiz modal -->
        <div class="modal fade backgroundBlur" id="addQuizModal" ref="addQuizModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>Add new quiz</h5>
                    <form action="" id="addNewQuizModal">
                      <div class="row">
                        <div class="col-lg-6">
                          <p class="m-0 mt-3 colorOrange">General</p> 
                          
                            <div class="mt-3">
                              <input type="text" class="w-100" placeholder="Title">
                            </div>
                            <div class="mt-2">
                              <textarea class="w-100" placeholder="Description"></textarea>
                            </div>
                            <div class="mt-2 d-flex" style="gap:10px;">
                              <select id="type" style="height: 40px;">
                                <option disabled selected>Type</option>
                                <option :value=type v-for="(type, index) in types" :key="index">{{ type }}</option>
                              </select>
                              <select id="difficulty" style="height: 40px;">
                                <option disabled selected>Difficulty</option>
                                <option :value=type v-for="(type, index) in types" :key="index">{{ type }}</option>
                              </select>
                            </div>
                            <div class="mt-2 d-flex" style="gap:10px;">
                              <div class="col-3 mt-4 d-flex flex-column">
                                <span class="ps-2">Image</span>
                                <img class="mt-2" style="width: 100%;max-height: 100px;object-fit: cover;object-position: top; border-radius: 5px; min-height: 100px;" src="../assets/images/imageNewQuiz.png" alt="">
                                <button class="mt-2 uploadButton">Upload</button>
                              </div>
                              <div class="col-9 d-flex mt-4 flex-column ">
                                <span class="ps-2">Banner</span>
                                <img class="mt-2" style="width: 100%; max-height: 100px; object-fit: cover; object-position: top; border-radius: 5px; display: block; min-height: 100px;" src="../assets/images/imageNewQuiz.png" alt="">
                                <button class="mt-2 uploadButton">Upload</button>
                              </div>
                            </div>
                          
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 mt-3 colorOrange">Questions</p> 
                          <p class="m-0 mt-3">This quiz doesn't have any questions, please add at least 8.</p>
                          <button data-bs-toggle="modal" data-bs-target="#newQuestion" class="uploadButton mt-2">Add question</button>
                        </div>
                      </div>
                    <div class="ms-auto">
                      <input class="addQuestionButton mt-5" type="submit" value="Add quiz">
                    </div>
                    </form>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
        <!-- New question modal -->
        <div class="modal fade backgroundBlur" id="newQuestion" ref="newQuestion" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>Add question</h5>
                    <form action="">
                      <div class="row">
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange" >General</p> 
                          
                            <div class="mt-2">
                              <input type="text" class="w-100" placeholder="Question text">
                            </div>
                            <div class="mt-2 d-flex" style="gap:10px;">
                              <select id="questionType" style="height: 44px;">
                                <option disabled selected>Type</option>
                                <option :value=type v-for="(type, index) in questionType" :key="index">{{ type }}</option>
                              </select>
                              <input type="text" class="w-100" placeholder="IMDb ID">
                            </div>
                            <div class="mt-2">
                              <input type="text" class="w-100" disabled placeholder="Content URL">
                            </div>
                          
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Possible answers</p> 
                          <input type="text" class="w-100 mt-2" placeholder="Answer #1">
                          <input type="text" class="w-100 mt-2" placeholder="Answer #2">
                          <input type="text" class="w-100 mt-2" placeholder="Answer #3">
                          <input type="text" class="w-100 mt-2" placeholder="Answer #4">
                        </div>
                      </div>
                      <input class="addQuestionButton mt-5" type="submit" value="Add question">
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Edit quiz modal -->
        <div class="modal fade backgroundBlur" id="editQuiz" ref="editQuiz" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>Edit quiz</h5>
                    <form action="">
                      <div class="row">
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange" >General</p> 
                          <div class="mt-2">
                            <input type="text" class="w-100" value="Prison Break">
                          </div>
                          <div class="mt-2">
                            <textarea type="text" class="w-100">Contrary to the series, there's no escaping this quiz.</textarea>
                          </div>
                          <div class="mt-2 d-flex" style="gap:10px;">
                            <select id="questionType" style="height: 44px;">
                              <option disabled selected>Type</option>
                              <option :value=type v-for="(type, index) in questionType" :key="index">{{ type }}</option>
                            </select>
                            <select id="questionDifficulty" style="height: 44px;">
                              <option disabled selected>Difficulty</option>
                              <option :value=type v-for="(type, index) in questionType" :key="index">{{ type }}</option>
                            </select>
                          </div>
                          <div class="mt-2 d-flex" style="gap:10px;">
                            <div class="col-3 mt-4 d-flex flex-column">
                              <span class="ms-2">Image</span>
                              <img class="mt-2" style="width: 100%;max-height: 100px;object-fit: cover;object-position: top; border-radius: 5px;" src="https://cdn.europosters.eu/image/750/posters/prison-break-mastermind-i3057.jpg" alt="">
                              <div style="position: relative;">
                                <span><i style="right: 10px;" class="fas fa-trash removeIcon"></i></span>
                              </div>
                              <button class="mt-2 uploadButton">Upload</button>
                            </div>
                            <div class="col-9 d-flex mt-4 flex-column">
                              <span class="ms-2">Banner</span>
                              <img class="mt-2" style="width: 100%; max-height: 100px; object-fit: cover; object-position: top; border-radius: 5px; display: block;" src="http://ae01.alicdn.com/kf/H82dbacf2a86942828898af5d5c75704dM.jpg" alt="">
                              <div style="position: relative;">
                                <span><i style="right: 10px;" class="fas fa-trash removeIcon"></i></span>
                              </div>
                              <button class="mt-2 uploadButton">Upload</button>
                            </div>
                          </div>                      
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Questions</p> 
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <p class="m-0 padding-10">Who was Lincoln accused of murdering?</p>
                            <div class="d-flex" style="gap:10px;">
                              <span data-bs-toggle="modal" data-bs-target="#editQuestionModal"><i class="fas fa-edit editQuestion"></i></span>
                              <span class="me-2" data-bs-toggle="modal" data-bs-target="#removeQuestionModal"><i class="fas fa-trash removeQuestion"></i></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input class="addQuestionButton mt-5" type="submit" value="Edit quiz">
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Edit question modal -->
        <div class="modal fade backgroundBlur" id="editQuestionModal" ref="editQuestionModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>Edit question</h5>
                    <form action="">
                      <div class="row">
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange" >General</p> 
                          <div class="mt-2">
                            <input type="text" class="w-100" value="Who was Lincoln accused of murdering?">
                          </div>
                          <div class="mt-2 d-flex" style="gap:10px;">
                            <select id="questionType" style="height: 44px;">
                              <option disabled >Type</option>
                              <option selected :value=type v-for="(type, index) in questionType" :key="index">{{ type }}</option>
                            </select>
                            <input type="text" value="0455275">
                          </div>
                          <div class="mt-2 ">
                            <input type="text" class="w-100" value="https://pbs.twimg.com/profile_images/1257145...">
                          </div>                     
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Possible answers</p> 
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input disabled class="w-100" type="text" value="The vice president's security guard">
                            <div class="d-flex" style="gap:10px;">
                              <span><i class="fas fa-edit editQuestion"></i></span>
                              <span class="me-2"><i class="fas fa-trash removeQuestion"></i></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input class="addQuestionButton mt-5" type="submit" value="Edit question">
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Remove question modal -->
        <div class="modal fade backgroundBlur" id="removeQuestionModal" ref="removeQuestionModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:500px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                <div class="col-md-12">
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <div>
                      <p>Are you sure you want to remove this question?</p>
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
      </div>
      <div v-if="tab=='movie'">
        <!-- filtros -->
        <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3 mt-5 mb-3 filters">
          <div class="col-md-12 col-lg-3 col-sm-12">
            <form class="d-flex">
              <div class="input-group">
                <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search">
                <button type="submit" @submit.prevent=""><i class="fas fa-search"></i></button>
              </div>
            </form>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="type" style="height: 40px;">
              <option disabled selected>Type</option>
              <option :value=type v-for="(type, index) in types" :key="index">{{ type }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="theme" style="height: 40px;">
              <option disabled selected>Theme</option>
              <option :value=theme v-for="(theme, index) in themes" :key="index">{{ theme }}</option>
            </select>
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
          <button class="addNewQuizButton" data-bs-toggle="modal" data-bs-target="#addMovieModal">Add new movie/series</button>
        </div>
        <div class="row">
          <div class="col-lg-2 col-md-6 mt-3">
            <img class="w-100" style="border-radius:5px;" src="https://br.web.img3.acsta.net/medias/nmedia/18/90/57/96/20121842.jpg" alt="">
            <div class="d-flex flex-column">
              <button class="editQuizButton" data-bs-toggle="modal" data-bs-target="#editMovieModal">Edit</button>
              <button class="removeQuizButton" data-bs-toggle="modal" data-bs-target="#removeMovieModal">Remove</button>
            </div>
          </div>
        </div>
        <!-- remove movie modal -->
        <div class="modal fade backgroundBlur" id="removeMovieModal" ref="removeMovieModal" tabindex="-1" aria-hidden="true">
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
        <!-- add movie modal -->
        <div class="modal fade backgroundBlur" id="addMovieModal" ref="addMovieModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                
                <div class="d-flex h-100 flex-column justify-content-between">
                  <h5>Add new quiz</h5>
                  <form action="" id="addNewQuizModal">
                    <div class="row">
                      <div class="col-lg-6">
                        <p class="m-0 mt-3 colorOrange">General</p> 
                        <div class="mt-3">
                          <input type="text" class="w-100" placeholder="IMDb ID">
                        </div>
                        <div class="mt-2 d-flex" style="gap:10px;">
                          <div class="col-3 mt-4 d-flex flex-column">
                            <span class="ps-2">Image</span>
                            <img class="mt-2" style="width: 100%;max-height: 100px;object-fit: cover;object-position: top; border-radius: 5px; min-height: 100px;" src="../assets/images/imageNewQuiz.png" alt="">
                            <button class="mt-2 uploadButton">Upload</button>
                          </div>
                          <div class="col-9 d-flex mt-4 flex-column ">
                            <span class="ps-2">Banner</span>
                            <img class="mt-2" style="width: 100%; max-height: 100px; object-fit: cover; object-position: top; border-radius: 5px; display: block; min-height: 100px;" src="../assets/images/imageNewQuiz.png" alt="">
                            <button class="mt-2 uploadButton">Upload</button>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <p class="m-0 mt-3 colorOrange">Avaliable at</p> 
                        <input type="text" class="w-100 mt-3" placeholder="Platform name">
                        <button data-bs-toggle="modal" data-bs-target="#newQuestion" class="uploadButton mt-3">Add platform</button>
                      </div>
                    </div>
                    <div class="ms-auto">
                        <input class="addQuestionButton mt-5" type="submit" value="Add movie/series">
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- edit movie modal -->
        <div class="modal fade backgroundBlur" id="editMovieModal" ref="editMovieModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                <div class="d-flex h-100 flex-column justify-content-between">
                  <h5>Edit Movie/Series</h5>
                  <form action="" id="addNewQuizModal">
                    <div class="row">
                      <div class="col-lg-6">
                        <p class="m-0 mt-3 colorOrange">General</p> 
                        
                          <div class="mt-3">
                            <input type="text" class="w-100" value="0455275">
                          </div>
                          <div class="mt-2 d-flex" style="gap:10px;">
                            <div class="col-3 mt-4 d-flex flex-column">
                              <span class="ms-2">Image</span>
                              <img class="mt-2" style="width: 100%;max-height: 100px;object-fit: cover;object-position: top; border-radius: 5px;" src="https://cdn.europosters.eu/image/750/posters/prison-break-mastermind-i3057.jpg" alt="">
                              <div style="position: relative;">
                                <span><i style="right: 10px;" class="fas fa-trash removeIcon"></i></span>
                              </div>
                              <button class="mt-2 uploadButton">Upload</button>
                            </div>
                            <div class="col-9 d-flex mt-4 flex-column">
                              <span class="ms-2">Banner</span>
                              <img class="mt-2" style="width: 100%; max-height: 100px; object-fit: cover; object-position: top; border-radius: 5px; display: block;" src="http://ae01.alicdn.com/kf/H82dbacf2a86942828898af5d5c75704dM.jpg" alt="">
                              <div style="position: relative;">
                                <span><i style="right: 10px;" class="fas fa-trash removeIcon"></i></span>
                              </div>
                              <button class="mt-2 uploadButton">Upload</button>
                            </div>
                          </div>
                        
                      </div>
                      <div class="col-lg-6">
                        <p class="m-0 mt-3 colorOrange">Avaliable at</p> 
                        <input type="text" class="w-100 mt-3" disabled value="Netflix">
                        <div style="position: relative;">
                          <span><i style="right: 10px;" class="fas fa-trash removeIcon"></i></span>
                        </div>
                        <input type="text" class="w-100 mt-3" disabled value="Hulu">
                        <div style="position: relative;">
                          <span><i style="right: 10px;" class="fas fa-trash removeIcon"></i></span>
                        </div>
                        <input type="text" class="w-100 mt-3" disabled value="Amazon Prime Video">
                        <div style="position: relative;">
                          <span><i style="right: 10px;" class="fas fa-trash removeIcon"></i></span>
                        </div>
                        <button data-bs-toggle="modal" data-bs-target="#newQuestion" class="uploadButton mt-3">Add platform</button>
                      </div>
                    </div>
                    <div class="ms-auto">
                        <input class="addQuestionButton mt-5" type="submit" value="Edit movie/series">
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="tab=='prizes'">
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
          <div class="col-lg-2 col-md-6 col-6 mt-3 quizImg">
            <img class="w-100" style="border-radius:5px 5px 0px 0px; max-height:180px;" src="https://fastly.4sqi.net/img/general/600x600/32566202_6NqeBMPdb7T5N2KvVFGdUKyeJBUgO37Yw6tznb-8xOg.jpg" alt="">
            <div class="d-flex flex-column" style="padding:10px; background-color:var(--azul-escuro2); border-radius:0px 0px 5px 5px;">
              <p class="m-0 text-center">Cinemas NOS ticket</p>
              <button class="editQuizButtonPrizes" data-bs-toggle="modal" data-bs-target="#editPrizeModal">Edit</button>
              <button class="removeQuizButton" data-bs-toggle="modal" data-bs-target="#removePrizeModal">Remove</button>
            </div>
          </div>
        </div>
        <!-- Remove prize modal -->
        <div class="modal fade backgroundBlur" id="removePrizeModal" ref="removePrizeModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:500px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                <div class="col-md-12">
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <div>
                      <p>Are you sure you want to remove this prize?</p>
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
        <!-- Add new prize modal -->
        <div class="modal fade backgroundBlur" id="addPrizeModal" ref="addPrizeModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:400px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>Add new prize</h5>
                    <form action="" id="addNewQuizModal">
                      <div class="row">
                        <div class="col-lg-12">
                          <p class="m-0 mt-3 colorOrange">General</p> 
                          
                            <div class="mt-3">
                              <input type="text" class="w-100" placeholder="Name">
                            </div>
                            <div class="mt-2 d-flex" style="gap:10px;">
                              <div class="col-7 mt-4 d-flex flex-column">
                                <input type="number" class="w-100" placeholder="Price">
                              </div>
                              <div class="col-5 mt-4 d-flex flex-column">
                                <span class="ps-2">Image</span>
                                <img class="mt-2" style="width: 100%;max-height: 100px;object-fit: cover;object-position: center; border-radius: 5px; min-height: 100px;" src="../assets/images/imageNewQuiz.png" alt="">
                                <button class="mt-2 uploadButton">Upload</button>
                              </div>
                            </div>
                          
                        </div>
                      </div>
                      <div class="ms-auto">
                        <input class="addQuestionButton mt-5" type="submit" value="Add prize">
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <!-- edit prize modal -->
        <div class="modal fade backgroundBlur" id="editPrizeModal" ref="editPrizeModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width:400px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>Edit prize</h5>
                    <form action="" id="addNewQuizModal">
                      <div class="row">
                        <div class="col-lg-12">
                          <p class="m-0 mt-3 colorOrange">General</p> 
                          
                            <div class="mt-3">
                              <input type="text" class="w-100" value="1 Month Amazon Prime Video Subscription">
                            </div>
                            <div class="mt-2 d-flex" style="gap:10px;">
                              <div class="col-7 mt-4 d-flex flex-column">
                                <input type="number" class="w-100" value="5000">
                              </div>
                              <div class="col-5 mt-4 d-flex flex-column">
                                <span class="ps-2">Image</span>
                                <img class="mt-2" style="width: 100%;max-height: 100px;object-fit: cover;object-position: center; border-radius: 5px; min-height: 100px;" src="https://m.media-amazon.com/images/G/01/digital/video/acquisition/amazon_video_light_on_dark.png" alt="">
                                <button class="mt-2 uploadButton">Upload</button>
                              </div>
                            </div>
                          
                        </div>
                      </div>
                      <div class="ms-auto">
                        <input class="addQuestionButton mt-5" type="submit" value="Edit prize">
                      </div>
                    </form>
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
  export default {
    data() {
      return {
        tab: "users",
        themes : ["Movie", "Series", "Actors", "Universes", "Anual", "Platform"],
        types:["Normal", "Long"],
        questionType:["Text", "Video", "Audio"],
        filters:["All", "Blocked", "Not blocked"]
      }
    },
  
  }
</script>

<style scoped>
a{
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
#section2 textarea {
  border-radius: 5px;
}
#section2 select {
  border-radius: 5px;
}
.backgroundQuestions {
  background-color:var(--cinza3);
  border-radius: 5px;
}
.removeQuestion{
  color: white;
  background: var(--vermelho);
  padding: 8px;
  border-radius: 30px;
}
.editQuestion {
    color: black;
    background: var(--verde);
    padding: 8px;
    border-radius: 30px;
}
.removeIcon{
    position: absolute;
    bottom: 6px;
    background-color: red;
    color: white;
    padding: 8px 8px;
    border-radius: 30px;
}
.uploadButton{
  width:100%;
  padding: 5px 15px;
  border: none !important;
  background: var(--cinza-claro);
  border-radius: 5px;
}
.quizImg img{
  border-radius: 5px;
  object-position: top center;
  height: 280px;
  width: 100%;
  object-fit: cover;
}
.colorOrange{
  color: var(--laranja);
}
.addQuestionButton{
  background-color:var(--laranja);
  border-radius: 5px;
  color: black;
  padding:10px 25px;
}
.addNewQuizButton{
  background-color: var(--laranja);
  color: black;
  padding:8px 25px;
  border: none;
  border-radius: 5px;
}
.editQuizButton{
  padding: 10px;
  margin: 10px 0px;
  background-color: var(--azul-escuro2);
  color: var(--cinza-claro);
  border: none;
  border-radius: 5px;
}
.editQuizButtonPrizes{
  padding: 10px;
  margin: 10px 0px;
  background-color: var(--cinza-claro);
  color: black;
  border: none;
  border-radius: 5px;
}
.removeQuizButton{
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
.modalrewards{
  background-color: #151E2E;
}
.padding-10{
  padding:10px;
}
.detailsButton{
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
.block-button{
    background: var(--vermelho);
    border-radius: 5px;
    padding: 10px;
}
.unblock-button{
    background: #ffffff;
    border-radius: 5px;
    color:var(--vermelho);
    padding: 10px;
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
.navigation {
  font-size: 1.25em;
}
@media (max-width: 575px) {
 
  .cardUser{
    flex-direction: column;
    text-align: center;
  }
}
@media (max-width: 991px) {
  .cardUser{
    margin-bottom:20px;
  }
}
</style>
