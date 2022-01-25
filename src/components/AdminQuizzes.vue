<template>
    <div>
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
        <div class="mt-3 mb-3">
          <button class="addNewQuizButton" data-bs-toggle="modal" data-bs-target="#addQuizModal">Add new quiz</button>
        </div>
        <div>
          <div class="row g-3">
            <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="(filme, index) in mostrar" :key="index">
              <div class="tile-custom">
                <div class="tile__media-custom">
                  <img class="tile__img" src="https://br.web.img3.acsta.net/medias/nmedia/18/91/30/40/20328542.jpg" alt="" />
                </div>
                <div class="d-flex flex-column">
                  <button class="editQuizButton" data-bs-toggle="modal" data-bs-target="#editQuiz" style="font-size: 1rem;">Edit</button>
                  <button class="removeQuizButton" data-bs-toggle="modal" data-bs-target="#removeQuizModal" style="font-size: 1rem;">Remove</button>
                </div>
              </div>
            </div>
          </div>
          <div class="w-100 d-flex justify-content-center mt-4">
            <button class="rounded-btn" @click="mostrar+=12">Load More</button>
          </div>
        </div>
        <!-- Remove quiz modal -->
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

        <!-- New quiz: main modal -->
        <div class="modal fade backgroundBlur" id="addQuizModal" ref="addQuizModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>New quiz</h5>
                    <form @submit.prevent="">
                      <div class="row g-2">
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">General</p> 
                          <div class="mt-2">
                            <input type="text" class="w-100" placeholder="Title" required>
                          </div>
                          <div class="mt-2">
                            <textarea type="text" class="w-100" placeholder="Description" required></textarea>
                          </div>
                          <div class="mt-2 d-flex" style="gap: 10px;">
                            <select id="quizType" style="height: 44px;" required>
                              <option selected disabled>Type</option>
                              <option value="Normal">Normal</option>
                              <option value="Long">Long</option>
                            </select>
                            <select id="quizDifficulty" style="height: 44px;" required>
                              <option selected disabled>Difficulty</option>
                              <option value="Normal">Normal</option>
                              <option value="Hard">Hard</option>
                            </select>
                          </div>
                          <div class="row mt-4 g-2">
                            <div class="col-md-4 flex-column">
                              <span>Image</span>
                              <img class="mt-2" style="width: 100%; max-height: 100px; min-height: 100px; object-fit: cover;object-position: top; border-radius: 5px;" src="../assets/images/imageNewQuiz.png" alt="">
                              <!-- Mostrar o ícone de remover apenas se não for a imagem default -->
                              <!-- ../assets/images/imageNewQuiz.png -->
                              <!-- <div style="position: relative;">
                                <span style="cursor: pointer"><i style="right: 10px;" class="fas fa-trash removeIcon"></i></span>
                              </div> -->
                              <button class="mt-2 uploadButton" data-bs-target="#addPosterModal" data-bs-toggle="modal">Upload</button>
                            </div>
                            <div class="col-md-8 flex-column">
                              <span>Banner</span>
                              <img class="mt-2" style="width: 100%; max-height: 100px; min-height: 100px; object-fit: cover; object-position: top; border-radius: 5px; display: block;" src="../assets/images/bannerNewQuiz.png" alt="">
                               <!-- Mostrar o ícone de remover apenas se não for a imagem default -->
                              <!-- ../assets/images/bannerNewQuiz.png -->
                              <!-- <div style="position: relative;">
                                <span style="cursor: pointer"><i style="right: 10px;" class="fas fa-trash removeIcon"></i></span>
                              </div> -->
                              <button class="mt-2 uploadButton" data-bs-target="#addBannerModal" data-bs-toggle="modal">Upload</button>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Questions</p>
                          <div class="leaderboardBar" style="max-height: 351px; overflow-y: scroll;">
                            <!-- <div class="mt-2 me-1 d-flex justify-content-between align-items-center backgroundQuestions" v-for="i in 15" :key="i">
                              <p class="m-0 padding-10">Who was Lincoln accused of murdering?</p>
                              <div class="d-flex" style="gap: 10px;">
                                <span data-bs-toggle="modal" data-bs-target="#editQuestionModal"><i class="fas fa-pencil editQuestion"></i></span>
                                <span class="me-2"><i class="fas fa-trash removeQuestion"></i></span>
                              </div>
                            </div> -->
                            <div class="mt-2 me-1 d-flex justify-content-between align-items-center backgroundQuestions">
                              <p class="m-0 padding-10">This quiz doesn't have any questions, please add at least 8.</p>
                              <!-- <div class="d-flex" style="gap: 10px;">
                                <span data-bs-toggle="modal" data-bs-target="#editQuestionModal"><i class="fas fa-pencil editQuestion"></i></span>
                                <span class="me-2"><i class="fas fa-trash removeQuestion"></i></span>
                              </div> -->
                            </div>
                          </div>
                          <button data-bs-toggle="modal" data-bs-target="#newQuestionNewQuiz" class="uploadButton mt-2">Add question</button>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" data-bs-dismiss="modal" value="Edit quiz"/>
                        <input class="close-btn" type="button" data-bs-dismiss="modal" value="Close"/>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <!-- New quiz: new question modal -->
        <div class="modal fade backgroundBlur" id="newQuestionNewQuiz" ref="newQuestionNewQuiz" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>New question</h5>
                    <form @submit.prevent="">
                      <div class="row">
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange" >General</p> 
                          <div class="mt-2">
                            <input type="text" class="w-100" placeholder="Question" required>
                          </div>
                          <div class="mt-0 row g-2">
                            <div class="col-md-6">
                              <select id="questionType" style="height: 44px;" required v-model="addQuestionType">
                                <option selected disabled >Type</option>
                                <option :value=type v-for="(type, index) in questionType" :key="index">{{ type }}</option>
                              </select>
                            </div>
                            <div class="col-md-6">
                              <input class="w-100" type="text" placeholder="IMDb ID" required>
                            </div>
                          </div>
                          <div class="mt-2 ">
                            <input :disabled="addQuestionType == 'Text'" type="text" class="w-100" :placeholder="addQuestionType == 'Text' ? 'Locked: Content URL' : 'Content URL'" required>
                          </div>                     
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Possible answers</p> 
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #1" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #2" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #3" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #4" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="number" placeholder="Correct answer" required>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal" value="Edit question">
                        <input class="close-btn" type="button" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal" value="Back"/>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <!-- New quiz: edit question modal -->
        <div class="modal fade backgroundBlur" id="newQuizEditQuestion" ref="newQuizEditQuestion" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>Edit question</h5>
                    <form @submit.prevent="">
                      <div class="row">
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange" >General</p> 
                          <div class="mt-2">
                            <input type="text" class="w-100" value="Who was Lincoln accused of murdering?" required>
                          </div>
                          <div class="mt-0 row g-2">
                            <div class="col-md-6">
                              <select id="questionType" style="height: 44px;" required>
                                <option disabled >Type</option>
                                <option selected :value=type v-for="(type, index) in questionType" :key="index">{{ type }}</option>
                              </select>
                            </div>
                            <div class="col-md-6">
                              <input class="w-100" type="text" value="0455275" required>
                            </div>
                          </div>
                          <div class="mt-2 ">
                            <!-- Bloquear Content URL e limpar o input quando o select tiver em Text -->
                            <!-- <input :disabled="addQuestionType == 'Text'" type="text" class="w-100" :placeholder="addQuestionType == 'Text' ? 'Locked: Content URL' : 'Content URL'" required> -->
                            <input type="text" class="w-100" value="https://pbs.twimg.com/profile_images/1257145..." required>
                          </div>                     
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Possible answers</p> 
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" value="1. The vice president's security guard" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" value="2. The vice president's security guard" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" value="3. The vice president's security guard" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" value="4. The vice president's security guard" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="number" placeholder="Correct answer" value="3" required>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal" value="Edit question">
                        <input class="close-btn" type="button" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal" value="Back"/>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <!-- New quiz: add poster -->
        <div class="modal fade backgroundBlur" id="addPosterModal" ref="addPosterModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width: 800px;">
            <div class="modal-content modalrewards">
              <div>
                <form @submit.prevent="" class="modal-body d-flex flex-column" style="gap: 20px;">
                  <label for="url-pic">URL for the poster:</label>
                  <div class="input-group">
                    <input type="text" class="form-control bg-inputs" aria-label="URL" required placeholder="URL">
                    <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                  </div>
                  <div class="d-flex" style="gap: 15px;">
                    <button type="submit" class="orange-btn" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal">Change poster</button>
                    <button class="red-btn" type="button" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal">Back</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- New quiz: add banner -->
        <div class="modal fade backgroundBlur" id="addBannerModal" ref="addBannerModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width: 800px;">
            <div class="modal-content modalrewards">
              <div>
                <form @submit.prevent="" class="modal-body d-flex flex-column" style="gap: 20px;">
                  <label for="url-pic">URL for the banner:</label>
                  <div class="input-group">
                    <input type="text" class="form-control bg-inputs" aria-label="URL" required placeholder="URL">
                    <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                  </div>
                  <div class="d-flex" style="gap: 15px;">
                    <button type="submit" class="orange-btn" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal">Change banner</button>
                    <button class="red-btn" type="button" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal">Back</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit quiz: main modal -->
        <div class="modal fade backgroundBlur" id="editQuiz" ref="editQuiz" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>Edit quiz</h5>
                    <form @submit.prevent="">
                      <div class="row g-2">
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange" >General</p> 
                          <div class="mt-2">
                            <input type="text" class="w-100" value="Prison Break" required>
                          </div>
                          <div class="mt-2">
                            <textarea type="text" class="w-100" required>Contrary to the series, there's no escaping this quiz.</textarea>
                          </div>
                          <div class="mt-2 d-flex" style="gap: 10px;">
                            <select id="quizType" style="height: 44px;" required>
                              <option disabled>Type</option>
                              <option value="Normal">Normal</option>
                              <option selected value="Long">Long</option>
                            </select>
                            <select id="quizDifficulty" style="height: 44px;" required>
                              <option disabled>Difficulty</option>
                              <option value="Normal">Normal</option>
                              <option selected value="Hard">Hard</option>
                            </select>
                          </div>
                          <div class="row mt-4 g-2">
                            <div class="col-md-4 flex-column">
                              <span>Image</span>
                              <img class="mt-2" style="width: 100%; max-height: 100px; min-height: 100px; object-fit: cover;object-position: top; border-radius: 5px;" src="https://cdn.europosters.eu/image/750/posters/prison-break-mastermind-i3057.jpg" alt="">
                              <div style="position: relative;">
                                <span style="cursor: pointer"><i style="right: 10px;" class="fas fa-trash removeIcon"></i></span>
                              </div>
                              <button class="mt-2 uploadButton" data-bs-target="#editPosterModal" data-bs-toggle="modal">Upload</button>
                            </div>
                            <div class="col-md-8 flex-column">
                              <span>Banner</span>
                              <img class="mt-2" style="width: 100%; max-height: 100px; min-height: 100px; object-fit: cover; object-position: top; border-radius: 5px; display: block;" src="http://ae01.alicdn.com/kf/H82dbacf2a86942828898af5d5c75704dM.jpg" alt="">
                              <div style="position: relative;">
                                <span style="cursor: pointer"><i style="right: 10px;" class="fas fa-trash removeIcon"></i></span>
                              </div>
                              <button class="mt-2 uploadButton" data-bs-target="#editBannerModal" data-bs-toggle="modal">Upload</button>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Questions</p>
                          <div class="leaderboardBar" style="max-height: 351px; overflow-y: scroll;">
                            <div class="mt-2 me-1 d-flex justify-content-between align-items-center backgroundQuestions" v-for="i in 15" :key="i">
                              <p class="m-0 padding-10">Who was Lincoln accused of murdering?</p>
                              <div class="d-flex" style="gap: 10px;">
                                <span data-bs-toggle="modal" data-bs-target="#editQuestionModal"><i class="fas fa-pencil editQuestion"></i></span>
                                <span class="me-2"><i class="fas fa-trash removeQuestion"></i></span>
                              </div>
                            </div>
                          </div>
                          <button data-bs-toggle="modal" data-bs-target="#newQuestionEditQuiz" class="uploadButton mt-2">Add question</button>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" data-bs-dismiss="modal" value="Edit quiz"/>
                        <input class="close-btn" type="button" data-bs-dismiss="modal" value="Close"/>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit quiz: new question modal -->
        <div class="modal fade backgroundBlur" id="newQuestionEditQuiz" ref="newQuestion" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>New question</h5>
                    <form @submit.prevent="">
                      <div class="row">
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange" >General</p> 
                          <div class="mt-2">
                            <input type="text" class="w-100" placeholder="Question" required>
                          </div>
                          <div class="mt-0 row g-2">
                            <div class="col-md-6">
                              <select id="questionType" style="height: 44px;" required v-model="addQuestionType">
                                <option selected disabled >Type</option>
                                <option :value=type v-for="(type, index) in questionType" :key="index">{{ type }}</option>
                              </select>
                            </div>
                            <div class="col-md-6">
                              <input class="w-100" type="text" placeholder="IMDb ID" required>
                            </div>
                          </div>
                          <div class="mt-2 ">
                            <input :disabled="addQuestionType == 'Text'" type="text" class="w-100" :placeholder="addQuestionType == 'Text' ? 'Locked: Content URL' : 'Content URL'" required>
                          </div>                     
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Possible answers</p> 
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #1" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #2" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #3" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #4" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="number" placeholder="Correct answer" required>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal" value="Edit question">
                        <input class="close-btn" type="button" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal" value="Back"/>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit quiz: edit question modal -->
        <div class="modal fade backgroundBlur" id="editQuestionModal" ref="editQuestionModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
            <div class="modal-content modalrewards">
              <div class="modal-body row m-0 gy-3">
                  <div class="d-flex h-100 flex-column justify-content-between">
                    <h5>Edit question</h5>
                    <form @submit.prevent="">
                      <div class="row">
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange" >General</p> 
                          <div class="mt-2">
                            <input type="text" class="w-100" value="Who was Lincoln accused of murdering?" required>
                          </div>
                          <div class="mt-0 row g-2">
                            <div class="col-md-6">
                              <select id="questionType" style="height: 44px;" required>
                                <option disabled >Type</option>
                                <option selected :value=type v-for="(type, index) in questionType" :key="index">{{ type }}</option>
                              </select>
                            </div>
                            <div class="col-md-6">
                              <input class="w-100" type="text" value="0455275" required>
                            </div>
                          </div>
                          <div class="mt-2 ">
                            <!-- Bloquear Content URL e limpar o input quando o select tiver em Text -->
                            <!-- <input :disabled="addQuestionType == 'Text'" type="text" class="w-100" :placeholder="addQuestionType == 'Text' ? 'Locked: Content URL' : 'Content URL'" required> -->
                            <input type="text" class="w-100" value="https://pbs.twimg.com/profile_images/1257145..." required>
                          </div>                     
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Possible answers</p> 
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" value="1. The vice president's security guard" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" value="2. The vice president's security guard" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" value="3. The vice president's security guard" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" value="4. The vice president's security guard" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="number" placeholder="Correct answer" value="3" required>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal" value="Edit question">
                        <input class="close-btn" type="button" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal" value="Back"/>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit quiz: edit poster -->
        <div class="modal fade backgroundBlur" id="editPosterModal" ref="editPosterModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width: 800px;">
            <div class="modal-content modalrewards">
              <div>
                <form @submit.prevent="" class="modal-body d-flex flex-column" style="gap: 20px;">
                  <label for="url-pic">URL for the poster:</label>
                  <div class="input-group">
                    <input type="text" class="form-control bg-inputs" aria-label="URL" required value="https://static.globalnoticias.pt/storage/DN/2016/original/ng5677498.jpg">
                    <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                  </div>
                  <div class="d-flex" style="gap: 15px;">
                    <button type="submit" class="orange-btn" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal">Change poster</button>
                    <button class="red-btn" type="button" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal">Back</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit quiz: edit banner -->
        <div class="modal fade backgroundBlur" id="editBannerModal" ref="editBannerModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered" style="max-width: 800px;">
            <div class="modal-content modalrewards">
              <div>
                <form @submit.prevent="" class="modal-body d-flex flex-column" style="gap: 20px;">
                  <label for="url-pic">URL for the banner:</label>
                  <div class="input-group">
                    <input type="text" class="form-control bg-inputs" aria-label="URL" required value="https://static.globalnoticias.pt/storage/DN/2016/original/ng5677498.jpg">
                    <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                  </div>
                  <div class="d-flex" style="gap: 15px;">
                    <button type="submit" class="orange-btn" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal">Change banner</button>
                    <button class="red-btn" type="button" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal">Back</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default ({
    data() {
        return {
            mostrar: 12,
            themes : ["Movie", "Series", "Actors", "Universes", "Anual", "Platform"],
            types:["Normal", "Long"],
            questionType:["Text", "Video", "Audio"],
            addQuestionType: "Text",
        }
    },
    computed: {
      // ...mapGetters([""])
    },
    methods: {
      // ...mapMutations([""])
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

