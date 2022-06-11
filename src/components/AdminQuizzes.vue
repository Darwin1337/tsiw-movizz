<template>
    <div class="mt-3">
        <div class="mt-3 mb-3">
          <button class="addNewQuizButton" data-bs-toggle="modal" data-bs-target="#addQuizModal">Add new quiz</button>
        </div>
        <div>
          <div class="row g-3">
            <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="i in (getAllQuizzes.length >= mostrar ? mostrar : getAllQuizzes.length)" :key="i">
              <div class="tile-custom">
                <div class="tile__media-custom">
                  <img class="tile__img" :src="getAllQuizzes[i - 1].poster"/>
                </div>
                <div class="d-flex flex-column">
                  <button class="editQuizButton" data-bs-toggle="modal" data-bs-target="#editQuiz" style="font-size: 1rem;" @click="editInfo = JSON.parse(JSON.stringify(getAllQuizzes[i - 1]))">Edit</button>
                  <button class="removeQuizButton" style="font-size: 1rem;" @click="removeQuiz(getAllQuizzes[i - 1].id_quiz)">Remove</button>
                </div>
              </div>
            </div>
          </div>
        <div v-if="mostrar < getAllQuizzes.length" class="w-100 d-flex justify-content-center mt-4">
          <button class="rounded-btn" @click="mostrar = mostrar + 12 <= getAllQuizzes.length ? mostrar + 12 : getAllQuizzes.length">Load More</button>
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
                            <input type="text" class="w-100" placeholder="Title" v-model="addInfo.titulo" required>
                          </div>
                          <div class="mt-2">
                            <textarea type="text" class="w-100" placeholder="Description" v-model.lazy="addInfo.descricao" required></textarea>
                          </div>
                          <div class="mt-2 d-flex" style="gap: 10px;">
                            <select id="quizType" style="height: 44px;" required v-model="addInfo.tipo.descricao">
                              <option disabled>Type</option>
                              <option value="curto">Normal</option>
                              <option value="longo">Long</option>
                            </select>
                            <select id="quizDifficulty" style="height: 44px;" required v-model="addInfo.dificuldade.descricao">
                              <option disabled>Difficulty</option>
                              <option value="normal">Normal</option>
                              <option value="dificil">Hard</option>
                            </select>
                          </div>
                          <div class="mt-2">
                            <select id="quizTheme" style="height: 44px;" required v-model="addInfo.tema">
                              <option disabled>Theme</option>
                              <option :value=theme v-for="(theme, index) in themes" :key="index">{{ theme }}</option>
                            </select>
                          </div>
                          <div class="mt-3">
                            <label class="cbox">Is this quiz specific to a series/movie?
                              <input v-model="addInfo.especifico" type="checkbox">
                              <span class="checkmark"></span>
                            </label>
                          </div>
                          <div class="row mt-4 g-2">
                            <div class="col-md-4 flex-column">
                              <span>Image</span>
                              <img class="mt-2" style="width: 100%; max-height: 100px; min-height: 100px; object-fit: cover;object-position: top; border-radius: 5px;" :src="addInfo.poster">
                              <div style="position: relative;">
                                <span style="cursor: pointer"><i v-if="addInfo.poster != 'https://i.ibb.co/8PmJCqD/image-New-Quiz.png'" style="right: 10px;" class="fas fa-trash removeIcon" @click="addInfo.poster='https://i.ibb.co/8PmJCqD/image-New-Quiz.png'"></i></span>
                              </div>
                              <button class="mt-2 uploadButton" data-bs-target="#addPosterModal" data-bs-toggle="modal" @click="addControl.tempPoster = addInfo.poster.slice()">Upload</button>
                            </div>
                            <div class="col-md-8 flex-column">
                              <span>Banner</span>
                              <img class="mt-2" style="width: 100%; max-height: 100px; min-height: 100px; object-fit: cover; object-position: top; border-radius: 5px; display: block;" :src="addInfo.banner">
                              <div style="position: relative;">
                                <span style="cursor: pointer"><i v-if="addInfo.banner != 'https://i.ibb.co/6gkMXdZ/banner-New-Quiz.png'" style="right: 10px;" class="fas fa-trash removeIcon" @click="addInfo.banner='https://i.ibb.co/6gkMXdZ/banner-New-Quiz.png'"></i></span>
                              </div>
                              <button class="mt-2 uploadButton" data-bs-target="#addBannerModal" data-bs-toggle="modal" @click="addControl.tempBanner = addInfo.banner.slice()">Upload</button>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Questions</p>
                          <div class="leaderboardBar" style="max-height: 500px; overflow-y: scroll;">
                            <div class="mt-2 me-1 d-flex justify-content-between align-items-center backgroundQuestions" v-for="i in addInfo.perguntas.length" :key="i">
                              <p class="m-0 padding-10">{{ addInfo.perguntas[i - 1].texto }}</p>
                              <div class="d-flex" style="gap: 10px;">
                                <span data-bs-toggle="modal" @click="addEditQuestion = JSON.parse(JSON.stringify(addInfo.perguntas[i - 1]))" data-bs-target="#newQuizEditQuestion"><i class="fas fa-pencil editQuestion"></i></span>
                                <span class="me-2" @click="addRemoveQuestion(addInfo.perguntas[i - 1].id_pergunta)"><i class="fas fa-trash removeQuestion"></i></span>
                              </div>
                            </div>
                            <div class="mt-2 me-1 d-flex justify-content-between align-items-center backgroundQuestions" v-if="addInfo.perguntas.length == 0">
                              <p class="m-0 padding-10">This quiz doesn't have any questions, please add at least {{ addInfo.tipo.num_perguntas }}.</p>
                            </div>
                          </div>
                          <button data-bs-toggle="modal" data-bs-target="#newQuestionNewQuiz" class="uploadButton mt-2">Add question</button>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" @click="addQuiz()" value="Add quiz"/>
                        <input class="close-btn" type="button" id="add-quiz-back" data-bs-dismiss="modal" value="Close"/>
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
                            <input type="text" class="w-100" placeholder="Question" v-model="addAddQuestion.texto" required>
                          </div>
                          <div class="mt-0 row g-2">
                            <div class="col-md-6">
                              <select id="questionType" style="height: 44px;" required>
                                <option disabled>Type</option>
                                <option selected value="texto">Text</option>
                              </select>
                            </div>
                            <div class="col-md-6">
                              <input class="w-100" type="text" placeholder="IMDb ID" v-model="addAddQuestion.id_imdb" required>
                            </div>
                          </div>
                          <div class="mt-2 ">
                            <input type="text" class="w-100" placeholder="Content URL" v-model="addAddQuestion.url_conteudo" required>
                          </div>                      
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Possible answers</p> 
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #1" v-model="addAddQuestion.opcao_1" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #2" v-model="addAddQuestion.opcao_2" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #3" v-model="addAddQuestion.opcao_3" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #4" v-model="addAddQuestion.opcao_4" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="number" placeholder="Correct answer" v-model="addAddQuestion.opcao_correta" required>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" @click="newAddQuestion()" value="Edit question">
                        <input class="close-btn" type="button" id="add-add-question-back" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal" value="Back"/>
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
                            <input type="text" class="w-100" v-model="addEditQuestion.texto" required>
                          </div>
                          <div class="mt-0 row g-2">
                            <div class="col-md-6">
                              <select id="questionType" style="height: 44px;" required>
                                <option disabled >Type</option>
                                <option selected value="texto">Text</option>
                              </select>
                            </div>
                            <div class="col-md-6">
                              <input class="w-100" type="text" v-model="addEditQuestion.id_imdb" required>
                            </div>
                          </div>
                          <div class="mt-2 ">
                            <input type="text" class="w-100" placeholder="Content URL" v-model="addEditQuestion.url_conteudo" required>
                          </div>                     
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Possible answers</p> 
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" v-model="addEditQuestion.opcao_1" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" v-model="addEditQuestion.opcao_2" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" v-model="addEditQuestion.opcao_3" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" v-model="addEditQuestion.opcao_4" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="number" placeholder="Correct answer" v-model="addEditQuestion.opcao_correta" required>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" @click="newEditQuestion(addEditQuestion.id_pergunta)" value="Edit question">
                        <input class="close-btn" type="button" id="edit-add-question-back" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal" value="Back"/>
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
                    <input type="text" class="form-control bg-inputs" aria-label="URL" required placeholder="URL" v-model="addControl.tempPoster">
                    <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                  </div>
                  <div class="d-flex" style="gap: 15px;">
                    <button type="submit" class="orange-btn" @click="addChangePoster()">Change poster</button>
                    <button class="red-btn" type="button" id="add-change-poster-back" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal">Back</button>
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
                    <input type="text" class="form-control bg-inputs" aria-label="URL" required placeholder="URL" v-model="addControl.tempBanner">
                    <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                  </div>
                  <div class="d-flex" style="gap: 15px;">
                    <button type="submit" class="orange-btn" @click="addChangeBanner()">Change banner</button>
                    <button class="red-btn" type="button" id="add-change-banner-back" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal">Back</button>
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
                          <p class="m-0 colorOrange">General</p> 
                          <div class="mt-2">
                            <input type="text" class="w-100" value="Prison Break" required v-model="editInfo.titulo">
                          </div>
                          <div class="mt-2">
                            <textarea type="text" class="w-100" required placeholder="Description" v-model.lazy="editInfo.descricao"></textarea>
                          </div>
                          <div class="mt-2 d-flex" style="gap: 10px;">
                            <select id="quizType" style="height: 44px;" required v-model="editInfo.tipo.descricao">
                              <option disabled>Type</option>
                              <option value="curto">Short</option>
                              <option value="longo">Long</option>
                            </select>
                            <select id="quizDifficulty" style="height: 44px;" required v-model="editInfo.dificuldade.descricao">
                              <option disabled>Difficulty</option>
                              <option value="normal">Normal</option>
                              <option value="dificil">Hard</option>
                            </select>
                          </div>
                          <div class="mt-2">
                            <select id="quizTheme" style="height: 44px;" required v-model="editInfo.tema">
                              <option disabled>Theme</option>
                              <option :value=theme v-for="(theme, index) in themes" :key="index">{{ theme }}</option>
                            </select>
                          </div>
                          <div class="mt-3">
                            <label class="cbox">Is this quiz specific to a series/movie?
                              <input v-model="editInfo.especifico" type="checkbox">
                              <span class="checkmark"></span>
                            </label>
                          </div>
                          <div class="row mt-2 g-2">
                            <div class="col-md-4 flex-column">
                              <span>Image</span>
                              <img class="mt-2" style="width: 100%; max-height: 100px; min-height: 100px; object-fit: cover;object-position: top; border-radius: 5px;" :src="editInfo.poster">
                              <div style="position: relative;">
                                <span style="cursor: pointer"><i v-if="editInfo.poster != 'https://i.ibb.co/8PmJCqD/image-New-Quiz.png'" style="right: 10px;" class="fas fa-trash removeIcon" @click="editInfo.poster='https://i.ibb.co/8PmJCqD/image-New-Quiz.png'"></i></span>
                              </div>
                              <button class="mt-2 uploadButton" data-bs-target="#editPosterModal" data-bs-toggle="modal" @click="editControl.tempPoster = editInfo.poster.slice()">Upload</button>
                            </div>
                            <div class="col-md-8 flex-column">
                              <span>Banner</span>
                              <img class="mt-2" style="width: 100%; max-height: 100px; min-height: 100px; object-fit: cover; object-position: top; border-radius: 5px; display: block;" :src="editInfo.banner">
                              <div style="position: relative;">
                                <span style="cursor: pointer"><i v-if="editInfo.banner != 'https://i.ibb.co/6gkMXdZ/banner-New-Quiz.png'" style="right: 10px;" class="fas fa-trash removeIcon" @click="editInfo.banner='https://i.ibb.co/6gkMXdZ/banner-New-Quiz.png'"></i></span>
                              </div>
                              <button class="mt-2 uploadButton" data-bs-target="#editBannerModal" data-bs-toggle="modal" @click="editControl.tempBanner = editInfo.banner.slice()">Upload</button>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Questions</p>
                          <div class="leaderboardBar" style="max-height: 500px; overflow-y: scroll;">
                            <div class="mt-2 me-1 d-flex justify-content-between align-items-center backgroundQuestions" v-for="i in editInfo.perguntas.length" :key="i">
                              <p class="m-0 padding-10">{{ editInfo.perguntas[i - 1].texto }}</p>
                              <div class="d-flex" style="gap: 10px;">
                                <span data-bs-toggle="modal" @click="editQuestion = JSON.parse(JSON.stringify(editInfo.perguntas[i - 1]))" data-bs-target="#editQuestionModal"><i class="fas fa-pencil editQuestion"></i></span>
                                <span class="me-2" @click="editRemoveQuestion(editInfo.perguntas[i - 1].id_pergunta)"><i class="fas fa-trash removeQuestion"></i></span>
                              </div>
                            </div>
                            <div class="mt-2 me-1 d-flex justify-content-between align-items-center backgroundQuestions" v-if="editInfo.perguntas.length == 0">
                              <p class="m-0 padding-10">This quiz doesn't have any questions, please add at least {{ editInfo.tipo.num_perguntas }}.</p>
                            </div>
                          </div>
                          <button data-bs-toggle="modal" data-bs-target="#newQuestionEditQuiz" class="uploadButton mt-2">Add question</button>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" @click="editQuiz()" value="Edit quiz"/>
                        <input class="close-btn" type="button" id="edit-quiz-back" data-bs-dismiss="modal" value="Close"/>
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
                            <input type="text" class="w-100" placeholder="Question" v-model="addQuestion.texto" required>
                          </div>
                          <div class="mt-0 row g-2">
                            <div class="col-md-6">
                              <select id="questionType" style="height: 44px;" required>
                                <option disabled>Type</option>
                                <option selected value="texto">Text</option>
                              </select>
                            </div>
                            <div class="col-md-6">
                              <input class="w-100" type="text" placeholder="IMDb ID" v-model="addQuestion.id_imdb" required>
                            </div>
                          </div>
                          <div class="mt-2 ">
                            <input type="text" class="w-100" placeholder="Content URL" v-model="addQuestion.url_conteudo" required>
                          </div>                       
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Possible answers</p> 
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #1" v-model="addQuestion.opcao_1" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #2" v-model="addQuestion.opcao_2" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #3" v-model="addQuestion.opcao_3" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" placeholder="Answer #4" v-model="addQuestion.opcao_4" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="number" placeholder="Correct answer" v-model="addQuestion.opcao_correta" required>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" @click="editAddQuestion()" value="Add question">
                        <input class="close-btn" type="button" id="edit-add-question-back" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal" value="Back"/>
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
                            <input type="text" class="w-100" v-model="editQuestion.texto" required>
                          </div>
                          <div class="mt-0 row g-2">
                            <div class="col-md-6">
                              <select id="questionType" style="height: 44px;" required>
                                <option disabled>Type</option>
                                <option selected value="texto">Text</option>
                              </select>
                            </div>
                            <div class="col-md-6">
                              <input class="w-100" type="text" v-model="editQuestion.id_imdb" required>
                            </div>
                          </div>
                          <div class="mt-2 ">
                            <input type="text" class="w-100" placeholder="Content URL" v-model="editQuestion.url_conteudo" required>
                          </div>                     
                        </div>
                        <div class="col-lg-6">
                          <p class="m-0 colorOrange">Possible answers</p> 
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" v-model="editQuestion.opcao_1" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" v-model="editQuestion.opcao_2" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" v-model="editQuestion.opcao_3" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="text" v-model="editQuestion.opcao_4" required>
                          </div>
                          <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                            <input class="w-100" type="number" placeholder="Correct answer" v-model="editQuestion.opcao_correta" required>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mt-3" style="gap: 15px;">
                        <input class="addQuestionButton" type="submit" value="Edit question" @click="editEditQuestion(editQuestion.id_pergunta)">
                        <input class="close-btn" type="button" id="edit-edit-question-back" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal" value="Back"/>
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
                    <input type="text" class="form-control bg-inputs" placeholder="URL" aria-label="URL" required v-model="editControl.tempPoster">
                    <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                  </div>
                  <div class="d-flex" style="gap: 15px;">
                    <button type="submit" class="orange-btn" @click="editChangePoster()">Change poster</button>
                    <button class="red-btn" type="button" id="edit-change-poster-back" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal">Back</button>
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
                    <input type="text" class="form-control bg-inputs" aria-label="URL" required v-model="editControl.tempBanner">
                    <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                  </div>
                  <div class="d-flex" style="gap: 15px;">
                    <button type="submit" class="orange-btn" @click="editChangeBanner()">Change banner</button>
                    <button class="red-btn" type="button" id="edit-change-banner-back" data-bs-target="#editQuiz" data-bs-toggle="modal" data-bs-dismiss="modal">Back</button>
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
          // Editar quiz variáveis
          editInfo: {
            id_quiz: null,
            tipo: { descricao: "curto", num_perguntas: 5 },
            dificuldade: { descricao: "normal", pontos_pergunta: 10 },
            especifico: false,
            titulo: "",
            tema: "",
            descricao: "",
            poster: "",
            banner: "",
            perguntas: []
          },
          editQuestion: {
            id_pergunta: null,
            id_imdb: "",
            texto: "",
            tipo_pergunta: "",
            url_conteudo: "",
            opcao_1: "",
            opcao_2: "",
            opcao_3: "",
            opcao_4: "",
            opcao_correta: 0
          },
          addQuestion: {
            id_imdb: "",
            texto: "",
            tipo_pergunta: "texto",
            url_conteudo: "",
            opcao_1: "",
            opcao_2: "",
            opcao_3: "",
            opcao_4: "",
            opcao_correta: ""
          },
          editControl: {
            tempPoster: "",
            tempBanner: ""
          },

          // Adicionar quiz variáveis
          addInfo: {
            tipo: { descricao: "curto", num_perguntas: 5 },
            dificuldade: { descricao: "normal", pontos_pergunta: 10 },
            especifico: false,
            titulo: "",
            tema: "Movie",
            descricao: "",
            poster: "https://i.ibb.co/8PmJCqD/image-New-Quiz.png",
            banner: "https://i.ibb.co/6gkMXdZ/banner-New-Quiz.png",
            perguntas: []
          },
          addEditQuestion: {
            id_pergunta: null,
            id_imdb: "",
            texto: "",
            tipo_pergunta: "",
            url_conteudo: "",
            opcao_1: "",
            opcao_2: "",
            opcao_3: "",
            opcao_4: "",
            opcao_correta: 0
          },
          addAddQuestion: {
            id_imdb: "",
            texto: "",
            tipo_pergunta: "texto",
            url_conteudo: "",
            opcao_1: "",
            opcao_2: "",
            opcao_3: "",
            opcao_4: "",
            opcao_correta: ""
          },
          addControl: {
            tempPoster: "",
            tempBanner: ""
          },

          // Geral
          mostrar: 12,
          themes : ["Movie", "Series", "Actors", "Universes", "Anual", "Platform"],
          types:["Normal", "Long"],
          questionType:["Text", "Video", "Audio"], // remover isto
          addQuestionType: "Text" // remover isto
        }
    },
    computed: {
      ...mapGetters(["getAllQuizzes", "getQuizByID", "getNextAvailableQuizID"])
    },
    methods: {
      ...mapMutations(["EDIT_QUIZ", "SET_NEW_QUIZ", "REMOVE_QUIZ"]),

      // Métodos para adicionar quiz
      addQuiz() {
        if (this.addInfo.perguntas.length >= this.addInfo.tipo.num_perguntas) {
          if (this.addInfo.titulo.trim() && this.addInfo.descricao.trim() && this.addInfo.poster.trim() && this.addInfo.banner.trim()) {
            this.addInfo.id_quiz = this.getNextAvailableQuizID;
            this.SET_NEW_QUIZ(this.addInfo);
            this.performClick("#add-quiz-back");
            this.$swal({
              title: 'Success!',
              text: "The quiz has been successfully edited!",
              icon: 'success',
            });
          } else {
            this.$swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Some fields were left empty or have invalid data!'
            });
          }
        } else {
          this.$swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Please add at least ' + this.addInfo.tipo.num_perguntas + ' questions!'
          });
        }
      },
      addRemoveQuestion(id) {
        this.$swal({
          title: 'Warning!',
          text: "Are you sure you want to remove this question?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.addInfo.perguntas = this.addInfo.perguntas.filter(pergunta => pergunta.id_pergunta != id);
          }
        });
      },
      newEditQuestion(id) {
        if (this.addEditQuestion.id_imdb.trim() && this.addEditQuestion.texto.trim() && this.addEditQuestion.url_conteudo.trim() && this.addEditQuestion.opcao_1.trim() && this.addEditQuestion.opcao_2.trim() && this.addEditQuestion.opcao_3.trim() && this.addEditQuestion.opcao_4.trim() && this.addEditQuestion.opcao_correta > 0 && this.addEditQuestion.opcao_correta <= 4) {
          const QUESTION_IDX = this.addInfo.perguntas.findIndex(pergunta => pergunta.id_pergunta == id);
          this.addInfo.perguntas[QUESTION_IDX].id_imdb = this.addEditQuestion.id_imdb.trim();
          this.addInfo.perguntas[QUESTION_IDX].texto = this.addEditQuestion.texto.trim();
          this.addInfo.perguntas[QUESTION_IDX].url_conteudo = this.addEditQuestion.url_conteudo.trim();
          this.addInfo.perguntas[QUESTION_IDX].opcao_1 = this.addEditQuestion.opcao_1.trim();
          this.addInfo.perguntas[QUESTION_IDX].opcao_2 = this.addEditQuestion.opcao_2.trim();
          this.addInfo.perguntas[QUESTION_IDX].opcao_3 = this.addEditQuestion.opcao_3.trim();
          this.addInfo.perguntas[QUESTION_IDX].opcao_4 = this.addEditQuestion.opcao_4.trim();
          this.addInfo.perguntas[QUESTION_IDX].opcao_correta = this.addEditQuestion.opcao_correta;
          this.performClick("#edit-add-question-back");
        } else {
          this.$swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Some fields were left empty or have invalid data!'
          });
        }
      },
      newAddQuestion() {
        if (this.addAddQuestion.id_imdb.trim() && this.addAddQuestion.texto.trim() && this.addAddQuestion.url_conteudo.trim() && this.addAddQuestion.opcao_1.trim() && this.addAddQuestion.opcao_2.trim() && this.addAddQuestion.opcao_3.trim() && this.addAddQuestion.opcao_4.trim() && this.addAddQuestion.opcao_correta > 0 && this.addAddQuestion.opcao_correta <= 4) {
          this.addInfo.perguntas.push({
            id_pergunta: this.addInfo.perguntas.length > 0 ? Math.max.apply(null, this.addInfo.perguntas.map(pergunta => pergunta.id_pergunta)) + 1 : 0,
            id_imdb: this.addAddQuestion.id_imdb.trim(),
            texto: this.addAddQuestion.texto.trim(),
            tipo_pergunta: this.addAddQuestion.tipo_pergunta,
            url_conteudo: this.addAddQuestion.url_conteudo.trim(),
            opcao_1: this.addAddQuestion.opcao_1.trim(),
            opcao_2: this.addAddQuestion.opcao_2.trim(),
            opcao_3: this.addAddQuestion.opcao_3.trim(),
            opcao_4: this.addAddQuestion.opcao_4.trim(),
            opcao_correta: this.addAddQuestion.opcao_correta
          });
          this.addAddQuestion.id_imdb = "";
          this.addAddQuestion.texto = "";
          this.addAddQuestion.url_conteudo = "";
          this.addAddQuestion.opcao_1 = "";
          this.addAddQuestion.opcao_2 = "";
          this.addAddQuestion.opcao_3 = "";
          this.addAddQuestion.opcao_4 = "";
          this.addAddQuestion.opcao_correta = "";
          this.performClick("#add-add-question-back");
        } else {
          this.$swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Some fields were left empty or have invalid data!'
          });
        }
      },
      addChangePoster() {
        if (this.addControl.tempPoster.trim()) {
          this.addInfo.poster = this.addControl.tempPoster.slice();
          this.performClick("#add-change-poster-back");
        }
      },
      addChangeBanner() {
        if (this.addControl.tempBanner.trim()) {
          this.addInfo.banner = this.addControl.tempBanner.slice();
          this.performClick("#add-change-banner-back");
        }
      },

      // Métodos de editar quiz
      editQuiz() {
        if (this.editInfo.perguntas.length >= this.editInfo.tipo.num_perguntas) {
          if (this.editInfo.titulo.trim() && this.editInfo.descricao.trim() && this.editInfo.poster.trim() && this.editInfo.banner.trim()) {
            this.EDIT_QUIZ(this.editInfo);
            this.performClick("#edit-quiz-back");
            this.$swal({
              title: 'Success!',
              text: "The quiz has been successfully edited!",
              icon: 'success',
            });
          } else {
            this.$swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Some fields were left empty or have invalid data!'
            });
          }
        } else {
          this.$swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Please add at least ' + this.editInfo.tipo.num_perguntas + ' questions!'
          });
        }
      },
      editRemoveQuestion(id) {
        this.$swal({
          title: 'Warning!',
          text: "Are you sure you want to remove this question?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.editInfo.perguntas = this.editInfo.perguntas.filter(pergunta => pergunta.id_pergunta != id);
          }
        });
      },
      editChangePoster() {
        if (this.editControl.tempPoster.trim()) {
          this.editInfo.poster = this.editControl.tempPoster.slice();
          this.performClick("#edit-change-poster-back");
        }
      },
      editChangeBanner() {
        if (this.editControl.tempBanner.trim()) {
          this.editInfo.banner = this.editControl.tempBanner.slice();
          this.performClick("#edit-change-banner-back");
        }
      },
      editEditQuestion(id) {
        if (this.editQuestion.id_imdb.trim() && this.editQuestion.texto.trim() && this.editQuestion.url_conteudo.trim() && this.editQuestion.opcao_1.trim() && this.editQuestion.opcao_2.trim() && this.editQuestion.opcao_3.trim() && this.editQuestion.opcao_4.trim() && this.editQuestion.opcao_correta > 0 && this.editQuestion.opcao_correta <= 4) {
          const QUESTION_IDX = this.editInfo.perguntas.findIndex(pergunta => pergunta.id_pergunta == id);
          this.editInfo.perguntas[QUESTION_IDX].id_imdb = this.editQuestion.id_imdb.trim();
          this.editInfo.perguntas[QUESTION_IDX].texto = this.editQuestion.texto.trim();
          this.editInfo.perguntas[QUESTION_IDX].url_conteudo = this.editQuestion.url_conteudo.trim();
          this.editInfo.perguntas[QUESTION_IDX].opcao_1 = this.editQuestion.opcao_1.trim();
          this.editInfo.perguntas[QUESTION_IDX].opcao_2 = this.editQuestion.opcao_2.trim();
          this.editInfo.perguntas[QUESTION_IDX].opcao_3 = this.editQuestion.opcao_3.trim();
          this.editInfo.perguntas[QUESTION_IDX].opcao_4 = this.editQuestion.opcao_4.trim();
          this.editInfo.perguntas[QUESTION_IDX].opcao_correta = this.editQuestion.opcao_correta;
          this.performClick("#edit-edit-question-back");
        } else {
          this.$swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Some fields were left empty or have invalid data!'
          });
        }
      },
      editAddQuestion() {
        if (this.addQuestion.id_imdb.trim() && this.addQuestion.texto.trim() && this.addQuestion.url_conteudo.trim() && this.addQuestion.opcao_1.trim() && this.addQuestion.opcao_2.trim() && this.addQuestion.opcao_3.trim() && this.addQuestion.opcao_4.trim() && this.addQuestion.opcao_correta > 0 && this.addQuestion.opcao_correta <= 4) {
          this.editInfo.perguntas.push({
            id_pergunta: this.editInfo.perguntas.length > 0 ? Math.max.apply(null, this.editInfo.perguntas.map(pergunta => pergunta.id_pergunta)) + 1 : 0,
            id_imdb: this.addQuestion.id_imdb.trim(),
            texto: this.addQuestion.texto.trim(),
            tipo_pergunta: this.addQuestion.tipo_pergunta,
            url_conteudo: this.addQuestion.url_conteudo.trim(),
            opcao_1: this.addQuestion.opcao_1.trim(),
            opcao_2: this.addQuestion.opcao_2.trim(),
            opcao_3: this.addQuestion.opcao_3.trim(),
            opcao_4: this.addQuestion.opcao_4.trim(),
            opcao_correta: this.addQuestion.opcao_correta
          });
          this.addQuestion.id_imdb = "";
          this.addQuestion.texto = "";
          this.addQuestion.url_conteudo = "";
          this.addQuestion.opcao_1 = "";
          this.addQuestion.opcao_2 = "";
          this.addQuestion.opcao_3 = "";
          this.addQuestion.opcao_4 = "";
          this.addQuestion.opcao_correta = "";
          this.performClick("#edit-add-question-back");
        } else {
          this.$swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Some fields were left empty or have invalid data!'
          });
        }
      },

      // Geral
      performClick(name) {
        document.querySelector(name).click();
      },
      removeQuiz(id) {
        this.$swal({
          title: 'Warning!',
          text: "Are you sure you want to remove this quiz?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.REMOVE_QUIZ(id);
            this.$swal({
              title: 'Success!',
              text: "The quiz has been successfully edited!",
              icon: 'success',
            });
          }
        });
      }
    },
    watch: {
      'editInfo.dificuldade.descricao'(newValue) {
        this.editInfo.dificuldade.pontos_pergunta = newValue == "normal" ? 10 : 15;
      },
      'editInfo.tipo.descricao'(newValue) {
        this.editInfo.tipo.num_perguntas = newValue == "curto" ? 5 : 10;
      },
      'addInfo.dificuldade.descricao'(newValue) {
        this.addInfo.dificuldade.pontos_pergunta = newValue == "normal" ? 10 : 15;
      },
      'addInfo.tipo.descricao'(newValue) {
        this.addInfo.tipo.num_perguntas = newValue == "curto" ? 5 : 10;
      }
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

