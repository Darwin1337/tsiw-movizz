<template>
  <div class="mt-3" v-if="!loading.quizzes">
      <div class="mt-3 mb-3">
        <button class="addNewQuizButton" data-bs-toggle="modal" data-bs-target="#addQuizModal">Add new quiz</button>
      </div>
      <div>
        <div class="row g-3">
          <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="i in (data.quizzes.length >= mostrar ? mostrar : data.quizzes.length)" :key="i">
            <div class="tile-custom">
              <router-link :to="{ name: 'Quiz', params: { id: data.quizzes[i - 1].quiz_id }} ">
                <div class="tile__media-custom">
                  <img class="tile__img" :src="webpSupported ? (data.quizzes[i - 1].poster_webp ? require('../assets/images/content/quiz/' + data.quizzes[i - 1].poster_webp) : data.quizzes[i - 1].poster) : data.quizzes[i - 1].poster"/>
                </div>
              </router-link>
              <div class="d-flex flex-column">
                <button class="editQuizButton" data-bs-toggle="modal" data-bs-target="#editQuiz" style="font-size: 1rem;" @click="edit.data = JSON.parse(JSON.stringify(data.quizzes[i - 1]))">Edit</button>
                <button class="removeQuizButton" style="font-size: 1rem;" @click="removeQuiz(data.quizzes[i - 1].quiz_id)">Remove</button>
              </div>
            </div>
          </div>
        </div>
      <div v-if="mostrar < data.quizzes.length" class="w-100 d-flex justify-content-center mt-4">
        <button class="rounded-btn" @click="mostrar = mostrar + 12 <= data.quizzes.length ? mostrar + 12 : data.quizzes.length">Load More</button>
      </div>
      </div>

      <!-- New quiz: main modal -->
      <!-- <div class="modal fade backgroundBlur" id="addQuizModal" ref="addQuizModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
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
                            <button class="mt-2 uploadButton" type="button" data-bs-target="#addPosterModal" data-bs-toggle="modal" @click="addControl.tempPoster = addInfo.poster.slice()">Upload</button>
                          </div>
                          <div class="col-md-8 flex-column">
                            <span>Banner</span>
                            <img class="mt-2" style="width: 100%; max-height: 100px; min-height: 100px; object-fit: cover; object-position: top; border-radius: 5px; display: block;" :src="addInfo.banner">
                            <div style="position: relative;">
                              <span style="cursor: pointer"><i v-if="addInfo.banner != 'https://i.ibb.co/6gkMXdZ/banner-New-Quiz.png'" style="right: 10px;" class="fas fa-trash removeIcon" @click="addInfo.banner='https://i.ibb.co/6gkMXdZ/banner-New-Quiz.png'"></i></span>
                            </div>
                            <button class="mt-2 uploadButton" type="button" data-bs-target="#addBannerModal" data-bs-toggle="modal" @click="addControl.tempBanner = addInfo.banner.slice()">Upload</button>
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
                        <button data-bs-toggle="modal" type="button" data-bs-target="#newQuestionNewQuiz" class="uploadButton mt-2">Add question</button>
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
      </div> -->

      <!-- New quiz: new question modal -->
      <!-- <div class="modal fade backgroundBlur" id="newQuestionNewQuiz" ref="newQuestionNewQuiz" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
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
      </div> -->

      <!-- New quiz: edit question modal -->
      <!-- <div class="modal fade backgroundBlur" id="newQuizEditQuestion" ref="newQuizEditQuestion" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
          <div class="modal-content modalrewards">
            <div class="modal-body row m-0 gy-3">
                <div class="d-flex h-100 flex-column justify-content-between">
                  <h5>Edit question</h5>
                  <form @submit.prevent="">
                    <div class="row">
                      <div class="col-lg-6">
                        <p class="m-0 colorOrange">General</p> 
                        <div class="mt-2">
                          <input type="text" class="w-100" v-model="edit.question.content" required>
                        </div>
                        <div class="mt-0 row g-2">
                          <div class="col-md-6">
                            <select id="questionType" style="height: 44px;" required>
                              <option disabled >Type</option>
                              <option selected value="texto">Text</option>
                            </select>
                          </div>
                          <div class="col-md-6">
                            <input class="w-100" type="text" v-model="edit.question.imdb_id" required>
                          </div>
                        </div>
                        <div class="mt-2 ">
                          <input type="text" class="w-100" placeholder="Content URL" v-model="edit.question.image" required>
                        </div>                     
                      </div>
                      <div class="col-lg-6">
                        <p class="m-0 colorOrange">Possible answers</p> 
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.question.options[0].content" required>
                          <input type="radio" name="correct" value="Is the correct answer" v-model="edit.question.options[0].correct">
                        </div>
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.question.options[1].content" required>
                          <input type="radio" name="correct" value="Is the correct answer" v-model="edit.question.options[1].correct">
                        </div>
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.question.options[2].content" required>
                          <input type="radio" name="correct" value="Is the correct answer" v-model="edit.question.options[2].correct">
                        </div>
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.question.options[3].content" required>
                          <input type="radio" name="correct" value="Is the correct answer" v-model="edit.question.options[3].correct">
                        </div>
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="number" placeholder="Correct answer" v-model="edit.questions.options.find(qs => qs.correct)" required>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-3" style="gap: 15px;">
                      <input class="addQuestionButton" type="submit" @click="newEditQuestion(edit.question.question_id)" value="Edit question">
                      <input class="close-btn" type="button" id="edit-add-question-back" data-bs-target="#addQuizModal" data-bs-toggle="modal" data-bs-dismiss="modal" value="Back"/>
                    </div>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- New quiz: add poster -->
      <!-- <div class="modal fade backgroundBlur" id="addPosterModal" ref="addPosterModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
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
      </div> -->

      <!-- New quiz: add banner -->
      <!-- <div class="modal fade backgroundBlur" id="addBannerModal" ref="addBannerModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
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
      </div> -->

      <!-- Edit quiz: main modal -->
      <div class="modal fade backgroundBlur" id="editQuiz" ref="editQuiz" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" style="max-width:800px;">
          <div class="modal-content modalrewards">
            <div class="modal-body row m-0 gy-3">
                <div class="d-flex h-100 flex-column justify-content-between">
                  <h5>Edit quiz</h5>
                  <form @submit.prevent="editQuizInfo()">
                    <div class="row g-2">
                      <div class="col-lg-6">
                        <p class="m-0 colorOrange">General</p> 
                        <div class="mt-2">
                          <input type="text" class="w-100" value="Prison Break" required v-model="edit.data.title">
                        </div>
                        <div class="mt-2">
                          <textarea type="text" class="w-100" required placeholder="Description" v-model.lazy="edit.data.description"></textarea>
                        </div>
                        <div class="mt-2 d-flex" style="gap: 10px;">
                          <select id="quizType" style="height: 44px;" required v-model="edit.data.type.description">
                            <option disabled>Type</option>
                            <option value="short">Short</option>
                            <option value="long">Long</option>
                          </select>
                          <select id="quizDifficulty" style="height: 44px;" required v-model="edit.data.difficulty.description">
                            <option disabled>Difficulty</option>
                            <option value="normal">Normal</option>
                            <option value="hard">Hard</option>
                          </select>
                        </div>
                        <div class="mt-2">
                          <select id="quizTheme" style="height: 44px;" required v-model="edit.data.theme_id._id">
                            <option disabled>Theme</option>
                            <option :value="theme._id" v-for="(theme, index) in themes" :key="index">{{ theme.description }}</option>
                          </select>
                        </div>
                        <div class="mt-3">
                          <label class="cbox">Is this quiz specific to a series/movie?
                            <input v-model="edit.data.is_specific" type="checkbox">
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <div class="row mt-2 g-2">
                          <div class="col-md-4 flex-column">
                            <span>Image</span>
                            <img class="mt-2" style="width: 100%; max-height: 100px; min-height: 100px; object-fit: cover;object-position: top; border-radius: 5px;" :src="edit.data.poster">
                            <div style="position: relative;">
                              <span style="cursor: pointer"><i v-if="edit.data.poster != 'https://i.ibb.co/8PmJCqD/image-New-Quiz.png'" style="right: 10px;" class="fas fa-trash removeIcon" @click="edit.data.poster='https://i.ibb.co/8PmJCqD/image-New-Quiz.png'"></i></span>
                            </div>
                            <button class="mt-2 uploadButton" type="button" data-bs-target="#editPosterModal" data-bs-toggle="modal" @click="editControl.tempPoster = edit.data.poster.slice()">Upload</button>
                          </div>
                          <div class="col-md-8 flex-column">
                            <span>Banner</span>
                            <img class="mt-2" style="width: 100%; max-height: 100px; min-height: 100px; object-fit: cover; object-position: top; border-radius: 5px; display: block;" :src="edit.data.banner">
                            <div style="position: relative;">
                              <span style="cursor: pointer"><i v-if="edit.data.banner != 'https://i.ibb.co/6gkMXdZ/banner-New-Quiz.png'" style="right: 10px;" class="fas fa-trash removeIcon" @click="edit.data.banner='https://i.ibb.co/6gkMXdZ/banner-New-Quiz.png'"></i></span>
                            </div>
                            <button class="mt-2 uploadButton" type="button" data-bs-target="#editBannerModal" data-bs-toggle="modal" @click="editControl.tempBanner = edit.data.banner.slice()">Upload</button>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <p class="m-0 colorOrange">Questions</p>
                        <div class="leaderboardBar" style="max-height: 500px; overflow-y: scroll;">
                          <div class="mt-2 me-1 d-flex justify-content-between align-items-center backgroundQuestions" v-for="i in edit.data.questions.length" :key="i">
                            <p class="m-0 padding-10">{{ edit.data.questions[i - 1].content }}</p>
                            <div class="d-flex" style="gap: 10px;">
                              <span data-bs-toggle="modal" @click="edit.question = JSON.parse(JSON.stringify(edit.data.questions[i - 1])); edit.editQuestion_selected = edit.data.questions[i - 1].options.findIndex(opt => opt.correct)" data-bs-target="#editQuestionModal"><i class="fas fa-pencil editQuestion"></i></span>
                              <span class="me-2" @click="editRemoveQuestion(edit.data.questions[i - 1].question_id)"><i class="fas fa-trash removeQuestion"></i></span>
                            </div>
                          </div>
                          <div class="mt-2 me-1 d-flex justify-content-between align-items-center backgroundQuestions" v-if="edit.data.questions.length == 0">
                            <p class="m-0 padding-10">This quiz doesn't have any questions, please add at least {{ edit.data.type.questions }}.</p>
                          </div>
                        </div>
                        <button data-bs-toggle="modal" type="button" data-bs-target="#newQuestionEditQuiz" class="uploadButton mt-2">Add question</button>
                      </div>
                    </div>
                    <div class="d-flex mt-3" style="gap: 15px;">
                      <input class="addQuestionButton" type="submit" value="Edit quiz"/>
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
                  <form @submit.prevent="editAddQuestion()">
                    <div class="row">
                      <div class="col-lg-6">
                        <p class="m-0 colorOrange">General</p> 
                        <div class="mt-2">
                          <input type="text" class="w-100" placeholder="Question" v-model="edit.newQuestion.content" required>
                        </div>
                        <div class="mt-0 row g-2">
                          <div class="col-md-6">
                            <select id="questionType" style="height: 44px;" required>
                              <option disabled>Type</option>
                              <option selected value="texto">Text</option>
                            </select>
                          </div>
                          <div class="col-md-6">
                            <input class="w-100" type="text" placeholder="IMDb ID" v-model="edit.newQuestion.imdb_id" required>
                          </div>
                        </div>
                        <div class="mt-2 ">
                          <input type="text" class="w-100" placeholder="Content URL" v-model="edit.newQuestion.image" required>
                        </div>                       
                      </div>
                      <div class="col-lg-6">
                        <p class="m-0 colorOrange">Possible answers</p> 
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.newQuestion.options[0].content" placeholder="Option #1" required>
                          <input class="me-2" type="radio" name="correct" value="0" v-model="edit.addQuestion_selected">
                        </div>
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.newQuestion.options[1].content" placeholder="Option #2" required>
                          <input class="me-2" type="radio" name="correct" value="1" v-model="edit.addQuestion_selected">
                        </div>
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.newQuestion.options[2].content" placeholder="Option #3" required>
                          <input class="me-2" type="radio" name="correct" value="2" v-model="edit.addQuestion_selected">
                        </div>
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.newQuestion.options[3].content" placeholder="Option #4" required>
                          <input class="me-2" type="radio" name="correct" value="3" v-model="edit.addQuestion_selected">
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-3" style="gap: 15px;">
                      <input class="addQuestionButton" type="submit" value="Add question">
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
                  <form @submit.prevent="editEditQuestion(edit.question.question_id)">
                    <div class="row">
                      <div class="col-lg-6">
                        <p class="m-0 colorOrange">General</p> 
                        <div class="mt-2">
                          <input type="text" class="w-100" v-model="edit.question.content" required>
                        </div>
                        <div class="mt-0 row g-2">
                          <div class="col-md-6">
                            <select id="questionType" style="height: 44px;" required>
                              <option disabled>Type</option>
                              <option selected value="texto">Text</option>
                            </select>
                          </div>
                          <div class="col-md-6">
                            <input class="w-100" type="text" v-model="edit.question.imdb_id" required>
                          </div>
                        </div>
                        <div class="mt-2 ">
                          <input type="text" class="w-100" placeholder="Content URL" v-model="edit.question.image" required>
                        </div>                     
                      </div>
                      <div class="col-lg-6">
                        <p class="m-0 colorOrange">Possible answers</p> 
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.question.options[0].content" required>
                          <input class="me-2" type="radio" name="correct" value="0" v-model="edit.editQuestion_selected">
                        </div>
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.question.options[1].content" required>
                          <input class="me-2" type="radio" name="correct" value="1" v-model="edit.editQuestion_selected">
                        </div>
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.question.options[2].content" required>
                          <input class="me-2" type="radio" name="correct" value="2" v-model="edit.editQuestion_selected">
                        </div>
                        <div class="mt-2 d-flex justify-content-between align-items-center backgroundQuestions">
                          <input class="w-100" type="text" v-model="edit.question.options[3].content" required>
                          <input class="me-2" type="radio" name="correct" value="3" v-model="edit.editQuestion_selected">
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-3" style="gap: 15px;">
                      <input class="addQuestionButton" type="submit" value="Edit question">
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
  <div v-else class="d-flex flex-column justify-content-center align-items-center text-center">
    <img src="../assets/images/loading.gif" alt="">
    <h3>We thought this would be faster as well, <span style="color: var(--laranja);">sorry</span>.</h3>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AdminQuizzes",
  data() {
    return {
      webpSupported: true,
      mostrar: 12,
      data: {
        quizzes: []
      },
      loading: {
        quizzes: true
      },
      edit: {
        data: {"_id":"627eced99d9358ef06bb485c","quiz_id":0,"type":{"description":"short","questions":5},"difficulty":{"description":"normal","question_points":10},"is_specific":true,"title":"Prison Break Quiz","description":"Contrary to the series, there's no escaping this quiz.","theme_id":{"_id":"627e98c15340d894c90f2c63","theme_id":1,"description":"Series"},"poster":"https://imdb-api.com/images/original/MV5BMTg3NTkwNzAxOF5BMl5BanBnXkFtZTcwMjM1NjI5MQ@@._V1_Ratio0.6833_AL_.jpg","poster_webp":"MV5BMTg3NTkwNzAxOF5BMl5BanBnXkFtZTcwMjM1NjI5MQ@@.webp","banner":"https://imdb-api.com/posters/original/7w165QdHmJuTHSQwEyJDBDpuDT7.jpg","banner_webp":"7w165QdHmJuTHSQwEyJDBDpuDT7.webp","questions":[{"question_id":0,"imdb_id":"tt0455275","content":"Who, from The Fox River 8, did Mahome execute?","type":"texto","image":"https://i.ytimg.com/vi/XBmqpWsUI18/maxresdefault.jpg","options":[{"content":"John 'Abruzzi' Abruzzi","correct":false},{"content":"Fernando 'Sucre' Sucre","correct":false},{"content":"David 'Tweener' Apolskis","correct":true},{"content":"Charles 'Haywire' Patoshik","correct":false}]},{"question_id":1,"imdb_id":"tt0455275","content":"Who was the first inmate out of the infirmary window on the night of the escape?","type":"texto","image":"https://i.ytimg.com/vi/aGdfn0yByx8/maxresdefault.jpg","options":[{"content":"Lincoln","correct":true},{"content":"Scofield","correct":false},{"content":"C-Note","correct":false},{"content":"Sucre","correct":false}]},{"question_id":2,"imdb_id":"tt0455275","content":"What was the name of Alex Mahone's son?","type":"texto","image":"https://static.wikia.nocookie.net/prisonbreak/images/b/b0/Vlcsnap-97057.jpg","options":[{"content":"Cameron","correct":true},{"content":"Caleb","correct":false},{"content":"Cairon","correct":false},{"content":"Colin","correct":false}]},{"question_id":3,"imdb_id":"tt0455275","content":"Where is Sona located?","type":"texto","image":"https://upload.wikimedia.org/wikipedia/commons/1/1b/Aerial_photograph_of_Penitenciar%C3%ADa_Federal_de_Sona.png","options":[{"content":"Egypt","correct":false},{"content":"Mexico","correct":false},{"content":"Panama","correct":true},{"content":"Colombia","correct":false}]},{"question_id":4,"imdb_id":"tt0455275","content":"Who is Sucre engaged to?","type":"texto","image":"https://i0.wp.com/static.fmovies.cab/images/cele/V24u1HQTX65hnjeoN1lw3MbG4TGB0Jt-Qh77FCmJOVScvik03hAGUhAsZ7l7kynWsDlLJMS6yxd2HbCP4lW0UhCfiPFi179tbfiKPzgOuNU.jpg?","options":[{"content":"Sarah","correct":false},{"content":"Sheba","correct":false},{"content":"Sofia","correct":false},{"content":"Maricruz","correct":true}]}],"comments":[{"date":"2022-06-08T11:18:55.245Z","_id":"62a0859f837ecd3eb09fbc3f","id":0,"user_id":"62a08549837ecd3eb09fbbe1","comment":"nice"}],"times_played":1,"__v":1,"quizz_rating":5},
        question: {"question_id":0,"imdb_id":"tt0455275","content":"Who, from The Fox River 8, did Mahome execute?","type":"texto","image":"https://i.ytimg.com/vi/XBmqpWsUI18/maxresdefault.jpg","options":[{"content":"John 'Abruzzi' Abruzzi","correct":false},{"content":"Fernando 'Sucre' Sucre","correct":false},{"content":"David 'Tweener' Apolskis","correct":true},{"content":"Charles 'Haywire' Patoshik","correct":false}]},
        newQuestion: {"imdb_id":"","content":"","type":"texto","image":"","options":[{"content":"","correct":true},{"content":"","correct":false},{"content":"","correct":false},{"content":"","correct":false}]},
        editQuestion_selected: "0",
        addQuestion_selected: "0",
      },
      editControl: {
        tempPoster: "",
        tempBanner: ""
      },
      themes: [],
      types: ["Normal", "Long"]
    }
  },
  mounted () {
    this.getThemes();
    this.getQuizzes();
    this.webpSupported = this.isWebpSupported();
  },
  methods: {
    ...mapActions(["getAllQuizzes", "getAllThemes", "editQuiz"]),
    isWebpSupported() {
      const elem = document.createElement("canvas");
      if (elem.getContext && elem.getContext("2d")) {
        return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
      }
      return false;
    },
    async getQuizzes() {
      try {
        this.loading.quizzes = true;
        this.data.quizzes = await this.getAllQuizzes();
        if (this.data.quizzes.success) {
          this.data.quizzes = this.data.quizzes.msg;
          this.loading.quizzes = false;
        } else {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        } 
      } catch (e) {
        this.$router.push({ name: 'Error', params: { '0': 'error' } });
      }
    },
    async getThemes() {
      try {
        this.themes = await this.getAllThemes();
        if (this.themes.success) {
          this.themes = this.themes.msg;
        } else {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        } 
      } catch (e) {
        this.$router.push({ name: 'Error', params: { '0': 'error' } });
      }
    },
    performClick(name) {
      document.querySelector(name).click();
    },
    // Edit quiz
    editEditQuestion(id) {
      // editQuestion = edit.question
      // editInfo = edit.data
      if (this.edit.question.imdb_id.trim() && this.edit.question.content.trim() && this.edit.question.image.trim() && this.edit.question.options[0].content.trim() && this.edit.question.options[1].content.trim() && this.edit.question.options[2].content.trim() && this.edit.question.options[3].content.trim()) {
        const QUESTION_IDX = this.edit.data.questions.findIndex(pergunta => pergunta.question_id == id);
        this.edit.question.options.forEach((opt, i) => { i == parseInt(this.edit.editQuestion_selected) ? this.edit.question.options[i].correct = true : this.edit.question.options[i].correct = false; });
        this.edit.data.questions[QUESTION_IDX].imdb_id = this.edit.question.imdb_id.trim();
        this.edit.data.questions[QUESTION_IDX].content = this.edit.question.content.trim();
        this.edit.data.questions[QUESTION_IDX].image = this.edit.question.image.trim();
        this.edit.data.questions[QUESTION_IDX].options[0].content = this.edit.question.options[0].content.trim()
        this.edit.data.questions[QUESTION_IDX].options[0].correct = this.edit.question.options[0].correct;
        this.edit.data.questions[QUESTION_IDX].options[1].content = this.edit.question.options[1].content.trim()
        this.edit.data.questions[QUESTION_IDX].options[1].correct = this.edit.question.options[1].correct;
        this.edit.data.questions[QUESTION_IDX].options[2].content = this.edit.question.options[2].content.trim()
        this.edit.data.questions[QUESTION_IDX].options[2].correct = this.edit.question.options[2].correct;
        this.edit.data.questions[QUESTION_IDX].options[3].content = this.edit.question.options[3].content.trim()
        this.edit.data.questions[QUESTION_IDX].options[3].correct = this.edit.question.options[3].correct;
        this.performClick("#edit-edit-question-back");
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Some fields were left empty or have invalid data!'
        });
      }
    },
    editRemoveQuestion(id) {
      // editQuestion = edit.question
      // editInfo = edit.data
      this.$swal({
        title: 'Warning!',
        text: "Are you sure you want to remove this question?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.edit.data.questions = this.edit.data.questions.filter(pergunta => pergunta.question_id != id);
        }
      });
    },
    editAddQuestion() {
      // addQuestion = edit.newQuestion
      // editInfo = edit.data
      if (this.edit.newQuestion.imdb_id.trim() && this.edit.newQuestion.content.trim() && this.edit.newQuestion.image.trim() && this.edit.newQuestion.options[0].content.trim() && this.edit.newQuestion.options[1].content.trim() && this.edit.newQuestion.options[2].content.trim() && this.edit.newQuestion.options[3].content.trim()) {
        this.edit.newQuestion.options.forEach((opt, i) => { i == parseInt(this.edit.addQuestion_selected) ? this.edit.newQuestion.options[i].correct = true : this.edit.newQuestion.options[i].correct = false; });
        this.edit.newQuestion.question_id = this.edit.data.questions.length > 0 ? Math.max.apply(null, this.edit.data.questions.map(pergunta => pergunta.question_id)) + 1 : 0;
        this.edit.data.questions.push(this.edit.newQuestion);
        this.edit.newQuestion = {"imdb_id":"","content":"","type":"texto","image":"","options":[{"content":"","correct":true},{"content":"","correct":false},{"content":"","correct":false},{"content":"","correct":false}]};
        this.performClick("#edit-add-question-back");
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Some fields were left empty or have invalid data!'
        });
      }
    },
    editChangePoster() {
      // editInfo = edit.data
      if (this.editControl.tempPoster.trim()) {
        this.edit.data.poster = this.editControl.tempPoster.slice();
        this.performClick("#edit-change-poster-back");
      }
    },
    editChangeBanner() {
      // editInfo = edit.data
      if (this.editControl.tempBanner.trim()) {
        this.edit.data.banner = this.editControl.tempBanner.slice();
        this.performClick("#edit-change-banner-back");
      }
    },
    async editQuizInfo() {
      // editInfo = edit.data
      if (parseInt(this.edit.data.questions.length) >= parseInt(this.edit.data.type.questions)) {
        if (this.edit.data.title.trim() && this.edit.data.description.trim() && this.edit.data.poster.trim() && this.edit.data.banner.trim()) {
          this.edit.data.theme_id = this.edit.data.theme_id._id;
          
          try {
            const res = await this.editQuiz({ quiz_id: this.edit.data.quiz_id, data: this.edit.data });
            if (res.success) {
              const quizIdx = this.data.quizzes.findIndex(a => a.quiz_id == this.edit.data.quiz_id);
              this.data.quizzes[quizIdx] = res.data;
              this.performClick("#edit-quiz-back");
              this.$swal({ title: 'Success!', text: "The quiz has been successfully edited!", icon: 'success' });
            } else {
              throw new Error(res.msg);
            } 
          } catch (e) {
            this.performClick("#edit-quiz-back");
            this.$swal('Error!', e.message, 'error');
          }

        } else {
          this.$swal.fire({ icon: 'error', title: 'Error!', text: 'Some fields were left empty or have invalid data!' });
        }
      } else {
        this.$swal.fire({ icon: 'error', title: 'Error!', text: 'Please add at least ' + this.edit.data.type.questions + ' questions!' });
      }
    }
  },
  watch: {
    // editInfo = edit.data
    'edit.data.difficulty.description'(newValue) {
      this.edit.data.difficulty.question_points = newValue == "normal" ? 10 : 15;
    },
    'edit.data.type.description'(newValue) {
      this.edit.data.type.questions = newValue == "short" ? 5 : 10;
    },
    'addInfo.dificuldade.descricao'(newValue) {
      this.addInfo.dificuldade.pontos_pergunta = newValue == "normal" ? 10 : 15;
    },
    'addInfo.tipo.descricao'(newValue) {
      this.addInfo.tipo.num_perguntas = newValue == "curto" ? 5 : 10;
    }
  }
};
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
