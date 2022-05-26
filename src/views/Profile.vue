<template>
  <div class="container">
    <div class="mt-5 mb-5 navigation d-flex flex-wrap">
      <p v-if="getLoggedUser.id == $route.params.id || getLoggedUser.is_admin" :class="{ active: selectedTab == 'profile'}" class="m-0" @click="selectedTab ='profile'">Profile</p>
      <p :class="{ active: selectedTab == 'favorites'}" class="m-0" @click="selectedTab ='favorites'">Favorites</p>
      <p :class="{ active: selectedTab == 'seen'}" class="m-0" @click="selectedTab ='seen'">Seen</p>
      <p v-if="getLoggedUser.id == $route.params.id || getLoggedUser.is_admin" :class="{ active: selectedTab == 'history'}" class="m-0" @click="selectedTab ='history'">History</p>
      <p :class="{ active: selectedTab == 'statistics'}" class="m-0" @click="selectedTab ='statistics'">Statistics</p>
      <button class="ms-auto logout-btn" @click="logoutUser()">Logout</button>
    </div>

    <div class="row gy-5" v-if="selectedTab == 'profile'">
      <div class="col-lg-6">
        <div class="card-profile p-3">
          <div class="img-profile row g-3">
            <div class="col-md-2 col-lg-3 d-flex flex-column align-items-center justify-content-center">
              <div class="d-flex align-items-center position-relative">
                <img :src="getAllUsers.find(user => user.id == $route.params.id).avatar"
                  style="border-radius: 50%; min-width: 50px; min-height: 50px; object-fit: cover; object-position: center top;" alt="Avatar" width="80px"
                  height="80px" />
                <div
                  v-if="getAllUsers.find(user => user.id == $route.params.id).avatar != 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                  id="remove-picture" @click="editUser($event, true)">
                  <span style="cursor: pointer;"><i class="fas fa-trash"></i></span>
                </div>
              </div>
              <div class="mt-3">
                <button class="edit-btn" data-bs-toggle="modal" data-bs-target="#modal-change-picture">Edit
                  picture</button>
              </div>
            </div>
            <div class="col-md-10 col-lg-9">
              <div class="p-info d-flex align-items-center flex-wrap" style="gap: 5px;">
                <img :src="this.getBadges[getAllUsers.find(user => user.id == $route.params.id).id_badge].icon" alt="Badge" width="15px"
                  height="15px" />
                <p class="m-0">
                  {{ getAllUsers.find(user => user.id == $route.params.id).primeiro_nome + ' ' + getAllUsers.find(user => user.id == $route.params.id).ultimo_nome }}
                </p>
                <p class="m-0" style="color: var(--cinza-claro); font-size: .85em;">
                  {{ this.getBadges[getAllUsers.find(user => user.id == $route.params.id).id_badge].name }}</p>
                <button class="edit-btn ms-auto"><strong>{{ getAllUsers.find(user => user.id == $route.params.id).pontos }}</strong>
                  points</button>
              </div>
              <p style="color: var(--cinza-claro)" class="m-0"><strong>Member since:</strong>
                {{ new Date(getAllUsers.find(user => user.id == $route.params.id).data_registo).getDate() + "/" + (parseInt(new Date(getAllUsers.find(user => user.id == $route.params.id).data_registo).getMonth()) + 1) + "/" + new Date(getAllUsers.find(user => user.id == $route.params.id).data_registo).getFullYear() }}
              </p>
              <div class="level-info d-flex align-items-center mt-4" style="gap: 15px;">
                <p class="m-0 d-flex justify-content-center align-items-center"
                  style="width: 25px; height: 25px; min-width: 25px; min-height: 25px; background-color: var(--azul-claro); border-radius: 50%; font-size: .9em; color: var(--bg); font-weight: bold;">
                  {{ Math.floor(getAllUsers.find(user => user.id == $route.params.id).xp / 150) }}</p>
                <div class="d-flex flex-column w-100" style="gap: 10px;">
                  <div
                    style="min-width: 100px; width: 100%; height: 10px; background-color: var(--cinza-claro); border-radius: 30px;">
                    <div
                      style="background-color: white; height: 100%; border-top-left-radius: 30px; border-bottom-left-radius: 30px;"
                      :style="{ width: parseFloat((getAllUsers.find(user => user.id == $route.params.id).xp - (getAllUsers.find(user => user.id == $route.params.id).nivel * 150)) * 100) / (((Math.floor(getAllUsers.find(user => user.id == $route.params.id).xp / 150) + 1) * 150) - (getAllUsers.find(user => user.id == $route.params.id).nivel * 150)).toFixed(2) + '%' }">
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="m-0">Current XP <strong>{{ getAllUsers.find(user => user.id == $route.params.id).xp }}</strong></p>
                    <p class="m-0">Next level
                      <strong>{{ (Math.floor(getAllUsers.find(user => user.id == $route.params.id).xp / 150) + 1) * 150 }}</strong></p>
                  </div>
                </div>
                <p class="m-0 d-flex justify-content-center align-items-center"
                  style="width: 25px; height: 25px; min-width: 25px; min-height: 25px; background-color: var(--azul-claro); border-radius: 50%; font-size: .9em; color: var(--bg); font-weight: bold;">
                  {{ Math.floor(getAllUsers.find(user => user.id == $route.params.id).xp / 150) + 1 }}</p>
              </div>
            </div>
          </div>
        </div>
        <p v-if="(getLoggedUser.id != $route.params.id && getLoggedUser.is_admin)" class="title mt-4 mb-4"><span style="color: #BBE1FA; font-weight: bold;">You got special privileges.</span> Edit anything</p>
        <p v-else class="title mt-4 mb-4"><span style="color: #BBE1FA; font-weight: bold;">Misspelt something?</span> Edit your profile</p>
        <form id="register" @submit.prevent="editUser($event, false)">
          <div class="row g-4">
            <div class="col-sm-6">
              <input type="text" class="form-control bg-inputs" placeholder="First name" aria-label="First name"
                required v-model="edit_user.primeiro_nome">
            </div>
            <div class="col-sm-6">
              <input type="text" class="form-control bg-inputs" placeholder="Last name" aria-label="Last name" required
                v-model="edit_user.ultimo_nome">
            </div>
          </div>
          <br>
          <div class="input-group">
            <input type="text" class="form-control bg-inputs" placeholder="E-mail" aria-label="E-mail" required
              v-model="edit_user.email">
            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
          </div>
          <br>
          <div class="input-group">
            <input type="password" class="form-control bg-inputs" placeholder="Password" aria-label="Password" required
              v-model="edit_user.password">
            <span class="input-group-text"><i class="fas fa-lock"></i></span>
          </div>
          <br>
          <div class="input-group">
            <input type="text" class="form-control bg-inputs" onmouseenter="(this.type='date')"
              onfocus="(this.type='date')" placeholder="Date of birth" aria-label="Date of birth" required
              v-model="edit_user.data_nascimento">
            <span class="input-group-text"><i class="fas fa-calendar"></i></span>
          </div>
          <div v-if="getLoggedUser.is_admin && ($route.params.id != getLoggedUser.id)">
            <br>
            <label class="cbox">Is an admin?
              <input v-model="edit_user.is_admin" type="checkbox">
              <span class="checkmark"></span>
            </label>
          </div>

          <div>
            <button type="submit" class="mt-4 orange-btn">Edit profile</button>
          </div>
        </form>
      </div>
      <div class="col-lg-6 filtros">
        <p class="m-0" style="color: var(--azul-claro); font-weight: bold; font-size: 1.25em;">Badges</p>
        <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3 mt-3 mb-3">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <form class="d-flex" @submit.prevent="">
              <div class="input-group">
                <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search" v-model="filters_badge.search">
                <button type="submit"><i class="fas fa-search"></i></button>
              </div>
            </form>
          </div>

          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <select id="order" style="height: 40px;" v-model="filters_badge.orderby">
              <option disabled value="Order by">Order by</option>
              <option value="All">All</option>
              <option value="Unlocked">Unlocked</option>
              <option value="Locked">Locked</option>
            </select>
          </div>
        </div>

        <div style="background-color: var(--azul-escuro2); border-radius: 10px;" class="p-3">
          <div class="leaderboardBar" style="max-height: 450px; overflow-y: scroll; overflow-x: hidden;">
            <div class="row g-3 pe-2">
              <div class="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6" v-for="(badge, index) in filteredBadges" :key="index">
                <div class="badge-card d-flex flex-column align-items-center p-2">
                  <p style="color: var(--cinza-claro)">Level {{ badge.level }}</p>
                  <img :src="badge.icon" alt="Badge" width="50px" height="50px" />
                </div>
                <div style="background-color: var(--bg); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;" class="text-center p-2">
                  <p class="m-0">{{ badge.name }}</p>
                </div>
                <div class="mt-2">
                  <button @click="changeBadge(badge.id_badge)" :disabled="(getAllUsers[$route.params.id].xp < badge.xp_min)" class="logout-btn w-100" :style="{ backgroundColor: getAllUsers[$route.params.id].id_badge == badge.id_badge ? 'var(--verde)' : (getAllUsers[$route.params.id].xp >= badge.xp_min ? 'var(--laranja)' : 'var(--cinza-claro)') }" style="font-size: 1rem; color: var(--bg); border-radius: 5px; font-weight: bold;">{{ (getAllUsers[$route.params.id].id_badge == index) ? ('Selected') : ((getAllUsers[$route.params.id].xp >= badge.xp_min) ? ('Select') : ('Locked')) }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="filtros row gy-5" v-if="selectedTab == 'favorites'">
      <div>
        <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3 mt-2 mb-3">
          <div class="col-md-12 col-lg-3 col-sm-12">
            <form @submit.prevent="" class="d-flex">
              <div class="input-group">
                <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search" v-model="filters_liked.search">
                <button type="button"><i class="fas fa-search"></i></button>
              </div>
            </form>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="genre" style="height: 40px;" v-model="filters_liked.genre">
              <option disabled value="Genre">Genre</option>
              <option value="All">All</option>
              <option :value=genero v-for="(genero, index) in generos" :key="index">{{ genero }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="year" style="height: 40px;" v-model="filters_liked.year">
              <option disabled value="Year">Year</option>
              <option value="All">All</option>
              <option :value=ano v-for="(ano, index) in anos" :key="index">{{ ano }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="country" style="height: 40px;" v-model="filters_liked.country">
              <option disabled value="Country">Country</option>
              <option value="All">All</option>
              <option :value=pais v-for="(pais, index) in paises" :key="index">{{ pais }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-3 col-sm-6">
            <select id="order" style="height: 40px;" v-model="filters_liked.orderby">
              <option disabled value="Order by">Order by</option>
              <option value="Recently added">Recently added</option>
              <option value="Alphabetic (A-Z)">Alphabetic (A-Z)</option>
              <option value="Alphabetic (Z-A)">Alphabetic (Z-A)</option>
              <option value="Most recent">Most recent</option>
              <option value="Oldest">Oldest</option>
              <option value="Best rated">Best rated</option>
              <option value="Worst rated">Worst rated</option>
              <option value="Most viewed">Most viewed</option>
              <option value="Least viewed">Least viewed</option>
            </select>
          </div>
        </div>
      </div>
      <div id="likesSection">
        <div class="row g-3">
          <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="i in (filteredTitles.length >= mostrar.liked ? mostrar.liked : filteredTitles.length)" :key="i">
            <div class="tile-custom" >
              <div class="tile__media-custom" style="cursor: pointer;" @click="$router.push({ name: 'Title', params: { imdbid: filteredTitles[i - 1].id_imdb}})">
                <img class="tile__img" :src="filteredTitles[i - 1].poster" alt="" />
                <p style="cursor:pointer; padding-left:5px; padding-top:5px;">{{filteredTitles[i - 1].titulo}}</p>
              </div>
              <div v-if="getLoggedUser.id == $route.params.id || getLoggedUser.is_admin" class="tile__details p-2 text-center d-flex justify-content-end align-items-end" >
                <button @click="removeLike(filteredTitles[i - 1].id_imdb)" class="blur-btn d-flex justify-content-center align-items-center" style="font-size: .85em; width: 30px; min-width: 30px; height: 30px; min-height: 30px; background-color:var(--vermelho);"><i class="fas fa-heart"></i></button>
              </div>
            </div>
            
          </div>
          <div v-if="filteredTitles.length==0">
            <p>{{ parseInt(this.getLoggedUser.id) == parseInt(this.$route.params.id) ? "You haven't added any movies nor series to your favorites." : "This user hasn't added any movies nor series to their favorites." }}</p> 
          </div>
        </div>
        <div v-if="mostrar.liked < filteredTitles.length" class="w-100 d-flex justify-content-center mt-4">
          <button class="rounded-btn" @click="mostrar.liked = mostrar.liked + 12 <= filteredTitles.length ? mostrar.liked + 12 : filteredTitles.length">Load More</button>
        </div>

      </div>
    </div>

    <div class="filtros row gy-5" v-if="selectedTab == 'seen'">
      <div>
        <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3 mt-2 mb-3">
          <div class="col-md-12 col-lg-3 col-sm-12">
            <form @submit.prevent="" class="d-flex">
              <div class="input-group">
                <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search" v-model="filters_seen.search">
                <button type="button"><i class="fas fa-search"></i></button>
              </div>
            </form>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="genre" style="height: 40px;" v-model="filters_seen.genre">
              <option disabled value="Genre">Genre</option>
              <option value="All">All</option>
              <option :value=genero v-for="(genero, index) in generos" :key="index">{{ genero }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="year" style="height: 40px;" v-model="filters_seen.year">
              <option disabled value="Year">Year</option>
              <option value="All">All</option>
              <option :value=ano v-for="(ano, index) in anos" :key="index">{{ ano }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="country" style="height: 40px;" v-model="filters_seen.country">
              <option disabled value="Country">Country</option>
              <option value="All">All</option>
              <option :value=pais v-for="(pais, index) in paises" :key="index">{{ pais }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-3 col-sm-6">
            <select id="order" style="height: 40px;" v-model="filters_seen.orderby">
              <option disabled value="Order by">Order by</option>
              <option value="Recently added">Recently added</option>
              <option value="Alphabetic (A-Z)">Alphabetic (A-Z)</option>
              <option value="Alphabetic (Z-A)">Alphabetic (Z-A)</option>
              <option value="Most recent">Most recent</option>
              <option value="Oldest">Oldest</option>
              <option value="Best rated">Best rated</option>
              <option value="Worst rated">Worst rated</option>
              <option value="Most viewed">Most viewed</option>
              <option value="Least viewed">Least viewed</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div class="row g-3">
          <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="i in (filteredTitlesSeen.length >= mostrar.seen ? mostrar.seen : filteredTitlesSeen.length)" :key="i" >
            <div class="tile-custom">
              <div class="tile__media-custom" style="cursor: pointer;" @click="$router.push({ name: 'Title', params: { imdbid: filteredTitlesSeen[i - 1].id_imdb}})">
                <img class="tile__img" :src="filteredTitlesSeen[i - 1].poster" />
                <p style="cursor:pointer; padding-left:5px; padding-top:5px;">{{filteredTitlesSeen[i - 1].titulo}}</p>
              </div>
              <div v-if="getLoggedUser.id == $route.params.id || getLoggedUser.is_admin" class="tile__details p-2 text-center d-flex justify-content-end align-items-end">
                <button @click="removeSeen(filteredTitlesSeen[i - 1].id_imdb)" class="blur-btn d-flex justify-content-center align-items-center" style="font-size: .85em; width: 30px; min-width: 30px; height: 30px; min-height: 30px; background-color:var(--verde)"><i class="fas fa-eye"></i></button>
              </div>
            </div>
          </div>
          <div v-if="filteredTitlesSeen.length==0">
            <p>{{ parseInt(this.getLoggedUser.id) == parseInt(this.$route.params.id) ? "You haven't seen any movies nor series." : "This user hasn't seen any movies nor series." }}</p> 
          </div>
        </div>
        <div v-if="mostrar.seen < filteredTitlesSeen.length" class="w-100 d-flex justify-content-center mt-4">
          <button class="rounded-btn" @click="mostrar.seen = mostrar.seen + 12 <= filteredTitlesSeen.length ? mostrar.seen + 12 : filteredTitlesSeen.length">Load More</button>
        </div>
      </div>
      
    </div>

    <div class="filtros" v-if="selectedTab == 'history'">
      <div class="row gy-2">
        <div class="col-md-12 col-lg-6 col-xl-4">
          <p style="color: var(--azul-claro); font-weight: 500;">Comments</p>
          <div>
            <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3">
            <div class="col-lg-6">
              <form @submit.prevent="" class="d-flex">
                <div class="input-group">
                  <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search" v-model="filters_comments.search">
                  <button type="button"><i class="fas fa-search"></i></button>
                </div>
              </form>
            </div>
            <div class="col-lg-6">
              <select id="orderby" style="height: 40px;" v-model="filters_comments.orderby">
                <option disabled value="Order by">Order by</option>
                <option value="Most recent">Most recent</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
            </div>
          </div>
          <div class="leaderboardBar mt-2" style="max-height: 500px; overflow-y: auto;">
            <div class="card-comment p-2 me-1 mb-2" style="background-color: var(--azul-escuro); border-radius: 5px;" v-for="(title,i) in filteredComments" :key="i">
              <div >
                <p style="color: var(--cinza-claro);">{{ new Date(title.data).getDate() + "/" + (parseInt(new Date(title.data).getMonth()) + 1) + "/" + new Date(title.data).getFullYear() + " at " + new Date(title.data).getHours() + ":" + String(new Date(title.data).getMinutes()).padStart(2, '0') + "h" }}</p>
                <p style="color: var(--laranja);"><span style="color: var(--cinza-claro);">{{ title.hasOwnProperty('id_imdb') ? (getTitleInfo(title.id_imdb).total_temporadas == 0 ? 'Movie' : 'Series') : 'Quiz' }}</span>&nbsp;&nbsp;<strong>{{ title.hasOwnProperty('id_imdb') ? getTitleInfo(title.id_imdb).titulo : getQuizByID(title.id_quiz).titulo }}</strong></p>
              </div>
              <div>
                <p>{{title.comentario}}</p>
              </div>
              <div class="d-flex" style="gap: 10px;">
                <button class="edit-btn" @click="title.hasOwnProperty('id_imdb') ? $router.push({ name: 'Title', params: { imdbid: title.id_imdb} }) : $router.push({ name: 'Quiz', params: { id: title.id_quiz} })">See comment</button>
                <button class="custom-logout-btn" @click="title.hasOwnProperty('id_imdb') ? removeComment(title.id_comentario, false) : removeComment(title.id_comentario, true)">Delete</button>
              </div>
            </div>
            <div v-if="getAllUserComments($route.params.id).length == 0">
              <p>{{ parseInt(this.getLoggedUser.id) == parseInt(this.$route.params.id) ? "You have't commented on any title nor quiz." : "This user hasn't commented on any title nor quiz." }}</p> 
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-6 col-xl-4">
          <p style="color: var(--azul-claro); font-weight: 500;">Ratings</p>
          <div>
            <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3">
              <div class="col-lg-6">
                <form @submit.prevent="" class="d-flex">
                  <div class="input-group">
                    <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search" v-model="filters_ratings.search">
                    <button type="button"><i class="fas fa-search"></i></button>
                  </div>
                </form>
              </div>

              <div class="col-lg-6">
                <select id="orderby" style="height: 40px;" v-model="filters_ratings.orderby">
                  <option disabled value="Order by">Order by</option>
                  <option value="Best">Best</option>
                  <option value="Worst">Worst</option>
                </select>
              </div>
            </div>
          </div>
          <div class="leaderboardBar mt-2" style="max-height: 500px; overflow-y: auto;">
            <div class="card-comment p-2 me-1 mb-2" style="background-color: var(--azul-escuro); border-radius: 5px;" v-for="(title,i) in filteredRatings" :key="i">
              <div class="d-flex flex-wrap w-100" style="gap: 15px;">
                <div class="col-3">
                  <div style="width: 85px; height: 125px; min-width: 85px; min-height: 125px;">
                    <img class="w-100 h-100" style="object-fit: cover; object-position: center top; border-radius: 5px;" :src="title.hasOwnProperty('id_imdb') ? getTitleInfo(title.id_imdb).poster : getQuizByID(title.id_quiz).poster">
                  </div>
                </div>
                <div class="d-flex flex-column col-8">
                  <p style="color: var(--laranja);" class="m-0"><span style="color: var(--cinza-claro);">{{ title.hasOwnProperty('id_imdb') ? (getTitleInfo(title.id_imdb).total_temporadas == 0 ? 'Movie' : 'Series') : 'Quiz' }}</span>&nbsp;&nbsp;<strong>{{ title.hasOwnProperty('id_imdb') ? getTitleInfo(title.id_imdb).titulo : getQuizByID(title.id_quiz).titulo }}</strong></p>
                  <div class="stars d-flex" style="gap: 5px; cursor: pointer; color: var(--laranja);">
                    <i class="fas fa-star" v-for="i in title.pontuacao" :key="i"></i>
                  </div>
                  <div class="d-flex mt-auto" style="gap: 10px;">
                    <button class="edit-btn" @click="title.hasOwnProperty('id_imdb') ? $router.push({ name: 'Title', params: { imdbid: title.id_imdb} }) : $router.push({ name: 'Quiz', params: { id: title.id_quiz} })">See Rating</button>
                    <button class="custom-logout-btn" @click="title.hasOwnProperty('id_imdb') ? removeRate(title.id_imdb, false) : removeRate(title.id_quiz, true)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="getAllUserRatings($route.params.id).length == 0">
              <p>{{ parseInt(this.getLoggedUser.id) == parseInt(this.$route.params.id) ? "You have't rated any titles nor quizzes." : "This user hasn't rated any titles nor quizzes." }}</p> 
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-6 col-xl-4">
          <p style="color: var(--azul-claro); font-weight: 500;">Prizes</p>
          <div>
            <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3">
              <div class="col-lg-6">
                <form @submit.prevent="" class="d-flex">
                  <div class="input-group">
                    <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search" v-model="filters_prizes.search">
                    <button type="button"><i class="fas fa-search"></i></button>
                  </div>
                </form>
              </div>

              <div class="col-lg-6">
                <select id="orderby" style="height: 40px;" v-model="filters_prizes.orderby">
                  <option disabled value="Order by">Order by</option>
                  <option value="Most recent">Most recent</option>
                  <option value="Oldest">Oldest</option>
                  <option value="Most expensive">Most expensive</option>
                  <option value="Cheapest">Cheapest</option>
                </select>
              </div>
            </div>
          </div>
          <div class="leaderboardBar mt-2" style="max-height: 500px; overflow-y: auto;">
            <div class="card-comment p-2 me-1 mb-2" style="background-color: var(--azul-escuro); border-radius: 5px;" v-for="(title,i) in filteredPrizes" :key="i">
              <div class="d-flex flex-wrap w-100" style="gap: 15px;">
                <div>
                  <div style="width: 125px; height: 125px; min-width: 125px; min-height: 125px;">
                    <img class="w-100 h-100" style="object-fit: cover; object-position: center top; border-radius: 5px;" :src="getPrizeInfo(title.id_premio).img">
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <p style="color: var(--laranja);" class="m-0"><strong>{{getPrizeInfo(title.id_premio).nome}}</strong></p>
                  <p style="color: var(--cinza-claro);">{{ new Date(title.data).getDate() + "/" + (parseInt(new Date(title.data).getMonth()) + 1) + "/" + new Date(title.data).getFullYear() + " at " + new Date(title.data).getHours() + ":" + String(new Date(title.data).getMinutes()).padStart(2, '0') + "h" }}</p>
                  <p style="color: var(--cinza-claro);"><strong>{{getPrizeInfo(title.id_premio).valor}}</strong> points</p>
                </div>
              </div>
            </div>
            <div v-if="getAllUserPrizes($route.params.id).length == 0">
              <p>{{ parseInt(this.getLoggedUser.id) == parseInt(this.$route.params.id) ? "You have't claimed any prizes yet." : "This user hasn't claimed any prizes yet." }}</p> 
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedTab == 'statistics'" class="w-100 d-flex flex-column align-items-center">
      <div class="card-profile p-3 w-100" style="max-width: 600px;">
        <div class="img-profile row g-3">
          <div class="col-md-2 col-lg-3 d-flex flex-column align-items-center justify-content-center">
            <div class="d-flex align-items-center position-relative">
              <img :src="getAllUsers.find(user => user.id == $route.params.id).avatar"
                style="border-radius: 50%; min-width: 50px; min-height: 50px; object-fit: cover; object-position: center top;" alt="Avatar" width="80px"
                height="80px" />
            </div>
          </div>
          <div class="col-md-10 col-lg-9">
            <div class="p-info d-flex align-items-center flex-wrap" style="gap: 5px;">
              <img :src="this.getBadges[getAllUsers.find(user => user.id == $route.params.id).id_badge].icon" alt="Badge" width="15px"
                height="15px" />
              <p class="m-0">
                {{ getAllUsers.find(user => user.id == $route.params.id).primeiro_nome + ' ' + getAllUsers.find(user => user.id == $route.params.id).ultimo_nome }}
              </p>
              <p class="m-0" style="color: var(--cinza-claro); font-size: .85em;">
                {{ this.getBadges[getAllUsers.find(user => user.id == $route.params.id).id_badge].name }}</p>
            </div>
            <p style="color: var(--cinza-claro)" class="m-0"><strong>Member since:</strong>
              {{ new Date(getAllUsers.find(user => user.id == $route.params.id).data_registo).getDate() + "/" + (parseInt(new Date(getAllUsers.find(user => user.id == $route.params.id).data_registo).getMonth()) + 1) + "/" + new Date(getAllUsers.find(user => user.id == $route.params.id).data_registo).getFullYear() }}
            </p>
            <div class="level-info d-flex align-items-center mt-4" style="gap: 15px;">
              <p class="m-0 d-flex justify-content-center align-items-center"
                style="width: 25px; height: 25px; min-width: 25px; min-height: 25px; background-color: var(--azul-claro); border-radius: 50%; font-size: .9em; color: var(--bg); font-weight: bold;">
                {{ Math.floor(getAllUsers.find(user => user.id == $route.params.id).xp / 150) }}</p>
              <div class="d-flex flex-column w-100" style="gap: 10px;">
                <div
                  style="min-width: 100px; width: 100%; height: 10px; background-color: var(--cinza-claro); border-radius: 30px;">
                  <div
                    :style="{ width: parseFloat((getAllUsers.find(user => user.id == $route.params.id).xp - (getAllUsers.find(user => user.id == $route.params.id).nivel * 150)) * 100) / (((Math.floor(getAllUsers.find(user => user.id == $route.params.id).xp / 150) + 1) * 150) - (getAllUsers.find(user => user.id == $route.params.id).nivel * 150)).toFixed(2) + '%' }"
                    style="background-color: white; height: 100%; border-top-left-radius: 30px; border-bottom-left-radius: 30px;">
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="m-0">Current XP <strong>{{ getAllUsers.find(user => user.id == $route.params.id).xp }}</strong></p>
                  <p class="m-0">Next level
                    <strong>{{ (Math.floor(getAllUsers.find(user => user.id == $route.params.id).xp / 150) + 1) * 150 }}</strong></p>
                </div>
              </div>
              <p class="m-0 d-flex justify-content-center align-items-center"
                style="width: 25px; height: 25px; min-width: 25px; min-height: 25px; background-color: var(--azul-claro); border-radius: 50%; font-size: .9em; color: var(--bg); font-weight: bold;">
                {{ Math.floor(getAllUsers.find(user => user.id == $route.params.id).xp / 150) + 1 }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="stats w-100 mt-5" style="max-width: 600px;">
        <div class="card-stats d-flex w-100 p-2 mb-3" style="background-color: var(--azul-escuro); border-radius: 5px;">
          <p class="m-0" style="font-weight: 500; color: var(--cinza-claro);"><i class="fas fa-globe" style="color: var(--azul-claro);"></i>&nbsp;&nbsp;&nbsp;Quizzes completed</p>
          <p class="m-0 ms-auto" style="color: var(--laranja); font-weight: bold;">{{ getAllUsers[$route.params.id].played.filter(quiz => quiz.completo).length }}</p>
        </div>
        <div class="card-stats d-flex w-100 p-2 mb-3" style="background-color: var(--azul-escuro); border-radius: 5px;">
          <p class="m-0" style="font-weight: 500; color: var(--cinza-claro);"><i class="fas fa-question-circle" style="color: var(--azul-claro);"></i>&nbsp;&nbsp;&nbsp;Questions answered</p>
          <p class="m-0 ms-auto" style="color: var(--laranja); font-weight: bold;">{{ getAllUsers[$route.params.id].played.filter(quiz => quiz.completo).reduce((acc, curr) => acc + curr.num_perguntas, 0) }}</p>
        </div>
        <div class="card-stats d-flex w-100 p-2 mb-3" style="background-color: var(--azul-escuro); border-radius: 5px;">
          <p class="m-0" style="font-weight: 500; color: var(--cinza-claro);"><i class="fas fa-check-circle" style="color: var(--azul-claro);"></i>&nbsp;&nbsp;&nbsp;Correct answers</p>
          <p class="m-0 ms-auto" style="color: var(--laranja); font-weight: bold;">{{ getAllUsers[$route.params.id].played.filter(quiz => quiz.completo).reduce((acc, curr) => acc + curr.perguntas_certas, 0) }}</p>
        </div>
        <div class="card-stats d-flex w-100 p-2 mb-3" style="background-color: var(--azul-escuro); border-radius: 5px;">
          <p class="m-0" style="font-weight: 500; color: var(--cinza-claro);"><i class="fas fa-times-circle" style="color: var(--azul-claro);"></i>&nbsp;&nbsp;&nbsp;Incorrect answers</p>
          <p class="m-0 ms-auto" style="color: var(--laranja); font-weight: bold;">{{ getAllUsers[$route.params.id].played.filter(quiz => quiz.completo).reduce((acc, curr) => acc + curr.perguntas_erradas, 0) }}</p>
        </div>
        <div class="card-stats d-flex w-100 p-2" style="background-color: var(--azul-escuro); border-radius: 5px;">
          <p class="m-0" style="font-weight: 500; color: var(--cinza-claro);"><i class="fas fa-hands-helping" style="color: var(--azul-claro);"></i>&nbsp;&nbsp;&nbsp;Times help was needed</p>
          <p class="m-0 ms-auto" style="color: var(--laranja); font-weight: bold;">{{ getAllUsers[$route.params.id].played.filter(quiz => quiz.completo).reduce((acc, curr) => acc + curr.ajudas_utilizadas, 0) }}</p>
        </div>
      </div>
    </div>

    <div class="modal fade backgroundBlur" id="modal-change-picture" ref="modal-change-picture" tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="max-width: 800px;">
        <div class="modal-content" style="background-color: var(--bg);">
          <div>
            <form @submit.prevent="editUser($event, true)" class="modal-body d-flex flex-column" style="gap: 20px;">
              <label for="url-pic">URL for your new avatar:</label>
              <div class="input-group">
                <input type="text" class="form-control bg-inputs" aria-label="URL" required v-model="edit_user.avatar">
                <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
              </div>
              <div class="d-flex" style="gap: 15px;">
                <button type="submit" class="orange-btn" data-bs-dismiss="modal">Change picture</button>
                <button class="red-btn" type="button" data-bs-dismiss="modal">Close</button>
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
export default {
  data() {
    return {
      mostrar: {
        liked: 12,
        seen: 12
      },
      selectedTab: "statistics",
      anos: [],
      generos: [],
      paises: [],
      filters_badge: {
        search: "",
        orderby: "Order by"
      },
      filters_liked: {
        search: "",
        genre: "Genre",
        year: "Year",
        country: "Country",
        orderby: "Order by"
      },
      filters_seen: {
        search: "",
        genre: "Genre",
        year: "Year",
        country: "Country",
        orderby: "Order by"
      },
      filters_comments: {
        search: "",
        orderby: "Order by"
      },
      filters_ratings: {
        search: "",
        orderby: "Order by"
      },
      filters_prizes: {
        search: "",
        orderby: "Order by"
      },
      edit_user: {
        primeiro_nome: '',
        ultimo_nome: '',
        email: '',
        password: '',
        data_nascimento: '',
        avatar: '',
        is_admin: false
      },
      infoLikes:[],
      infoViwed:[]
    }
  },
  methods: {
    ...mapMutations(["SET_LOGOUT", "SET_LOGGED_USER", "SET_EDITED_USER", "SET_NEW_BADGE","REMOVE_LIKE","REMOVE_HAS_SEEN","REMOVE_TITLE_COMMENT","REMOVE_QUIZ_COMMENT", "REMOVE_TITLE_RATING", "REMOVE_QUIZ_RATING"]),
    removeLike(id){
      this.$swal({
        title: 'Warning!',
        text: "Are you sure you want to remove this movie from favorites?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.REMOVE_LIKE({ id_imdb: id, id_user: this.$route.params.id });
          this.infoLikes=[];
          for (let i = 0; i < this.getTitleLikes(this.$route.params.id).length; i++) {
            this.infoLikes.push(this.getTitleInfo(this.getTitleLikes(this.$route.params.id)[i]))
          }
        }
      });
    },
    removeSeen(id){
      this.$swal({
        title: 'Warning!',
        text: "Are you sure you want to remove this movie from viewed?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.REMOVE_HAS_SEEN({ id_imdb: id, id_user: this.$route.params.id });
          this.infoViwed=[];
          for (let i = 0; i < this.getTitlesSeenByUser(this.$route.params.id).length; i++) {
            this.infoViwed.push(this.getTitleInfo(this.getTitlesSeenByUser(this.$route.params.id)[i]))
          }
        }
      });
    },
    editUser(event, isAvatar) {
      if (!isAvatar) {
        // Se o email foi alterado, verificar se o mesmo é igual a algum já presente
        const WAS_EMAIL_CHANGED = this.edit_user.email != this.getAllUsers[this.getAllUsers.findIndex(user => parseInt(user.id) == parseInt(this.$route.params.id))].email ? true : false;
        const CAN_CONTINUE = WAS_EMAIL_CHANGED ? (this.isEmailAvailable(this.edit_user.email) ? true : false) : true;
        if (CAN_CONTINUE) {
          this.SET_EDITED_USER({
            index: this.getAllUsers.findIndex(user => parseInt(user.id) == parseInt(this.$route.params.id)),
            isAvatar: false,
            primeiro_nome: this.edit_user.primeiro_nome,
            ultimo_nome: this.edit_user.ultimo_nome,
            email: this.edit_user.email,
            password: this.edit_user.password,
            data_nascimento: this.edit_user.data_nascimento,
            is_admin: this.edit_user.is_admin
          });

          // Se a edição do perfil é feita pelo próprio utilizador e não por um administrador, atualizar o loggedUser para mostrar informação atualizada
          if (parseInt(this.getLoggedUser.id) == parseInt(this.$route.params.id)) {
            this.SET_LOGGED_USER(this.edit_user.email);
          }
          this.$swal('Success!', 'The data has been successfully updated.', 'success');
        } else {
          this.$swal('Error!', 'The e-mail entered is already being used.', 'error');
        }
      } else {
        if (event.currentTarget.id == "remove-picture") {
          this.$swal({
            title: 'Warning!',
            text: "Are you sure you want to remove your avatar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              this.SET_EDITED_USER({
                index: this.getAllUsers.findIndex(user => parseInt(user.id) == parseInt(this.$route.params.id)),
                isAvatar: true,
                avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              });
              this.edit_user.avatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            }
          });
        } else {
          this.SET_EDITED_USER({
            index: this.getAllUsers.findIndex(user => parseInt(user.id) == parseInt(this.$route.params.id)),
            isAvatar: true,
            avatar: this.edit_user.avatar
          });
        }

        // Se a edição do perfil é feita pelo próprio utilizador e não por um administrador, atualizar o loggedUser para mostrar informação atualizada
        if (parseInt(this.getLoggedUser.id) == parseInt(this.$route.params.id)) {
          this.SET_LOGGED_USER(this.edit_user.email);
        }
      }
    },
    logoutUser() {
      this.$swal({
        title: 'Warning!',
        text: "Are you sure you want to logout?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.SET_LOGOUT();
          this.$router.push({ name: 'Authentication' });
        }
      });
    },
    changeBadge(idxBadge) {
      this.SET_NEW_BADGE({ index: this.getAllUsers.findIndex(user => parseInt(user.id) == parseInt(this.$route.params.id)), id_badge: idxBadge });
      // Se a edição do perfil é feita pelo próprio utilizador e não por um administrador, atualizar o loggedUser para mostrar informação atualizada
      if (parseInt(this.getLoggedUser.id) == parseInt(this.$route.params.id)) {
        this.SET_LOGGED_USER(this.edit_user.email);
      }
    },
    removeComment(id_comentario, tipo){
      this.$swal({
        title: 'Warning!',
        text: "Are you sure you want to remove this comment?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          !tipo ? this.REMOVE_TITLE_COMMENT({ id_comment: id_comentario, id_user: this.$route.params.id }) : this.REMOVE_QUIZ_COMMENT({ id_comment: id_comentario, id_user: this.$route.params.id });
        }
      });
    },
    removeRate(id, tipo){
      this.$swal({
        title: 'Warning!',
        text: "Are you sure you want to remove this rating?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          !tipo ? this.REMOVE_TITLE_RATING({ id_imdb: id, id_user: this.$route.params.id}) : this.REMOVE_QUIZ_RATING({ id_quiz: id, id_user: this.$route.params.id});
        }
      });
    },
    resetMostrar(which) {
      if (which == "liked") this.mostrar.liked = 12;
    }
  },
  computed: {
    ...mapGetters(["getLoggedUser", "getAllGenres", "getAllViewsByTitle", "getAllTitles", "getBadges", "getQuizByID", "getAllUsers", "isEmailAvailable","getTitleLikes","getTitleInfo","getTitlesSeenByUser","getAllUserPrizes","getAllUserComments","getAllUserRatings", "getPrizeInfo"]),
    filteredBadges() {
      let filterResult = [...this.getBadges];

      // Barra de pesquisa
      if (this.filters_badge.search != "") {
        filterResult = filterResult.filter(badge => badge.name.toLowerCase().includes(this.filters_badge.search.toLowerCase()));
      }

      if (this.filters_badge.orderby != "All" && this.filters_badge.orderby != "Order by") {
        if (this.filters_badge.orderby == "Unlocked") {
          filterResult.map(badge => badge.locked = JSON.parse(JSON.stringify(this.getAllUsers[this.$route.params.id])).xp < badge.xp_min)
          filterResult = filterResult.sort((a, b) => (a.locked < b.locked) ? -1 : ((a.locked > b.locked) ? 1 : 0));
        } else if (this.filters_badge.orderby == "Locked") {
          filterResult.map(badge => badge.locked = JSON.parse(JSON.stringify(this.getAllUsers[this.$route.params.id])).xp < badge.xp_min)
          filterResult = filterResult.sort((a, b) => (a.locked > b.locked) ? -1 : ((a.locked < b.locked) ? 1 : 0));
        }
      }

      return filterResult;
    },
    filteredTitles() {
      this.resetMostrar('liked');
      let filterResult = [...this.infoLikes];

      // Barra de pesquisa
      if (this.filters_liked.search != "") {
        filterResult = filterResult.filter(title => title.titulo.toLowerCase().includes(this.filters_liked.search.toLowerCase()));
      }

      // Géneros
      if (this.filters_liked.genre != "All" && this.filters_liked.genre != "Genre") {
        filterResult = filterResult.filter(title => title.genero.some(genero => genero == this.filters_liked.genre));
      }

      // Anos
      if (this.filters_liked.year != "All" && this.filters_liked.year != "Year") {
        filterResult = filterResult.filter(title => title.ano == this.filters_liked.year);
      }
      
      // Países
      if (this.filters_liked.country != "All" && this.filters_liked.country != "Country") {
        filterResult = filterResult.filter(title => this.filters_liked.country == title.pais);
      }

      if (this.filters_liked.orderby != "Recently added" && this.filters_liked.orderby != "Order by") {
        if (this.filters_liked.orderby == "Alphabetic (A-Z)") {
          filterResult = filterResult.sort((a, b) => (a.titulo < b.titulo) ? -1 : ((a.titulo > b.titulo) ? 1 : 0));
        } else if (this.filters_liked.orderby == "Alphabetic (Z-A)") {
          filterResult = filterResult.sort((a, b) => (a.titulo > b.titulo) ? -1 : ((a.titulo < b.titulo) ? 1 : 0));
        } else if (this.filters_liked.orderby == "Most recent") {
          filterResult = filterResult.sort((a, b) => (a.ano > b.ano) ? -1 : ((a.ano < b.ano) ? 1 : 0));
        } else if (this.filters_liked.orderby == "Oldest") {
          filterResult = filterResult.sort((a, b) => (a.ano < b.ano) ? -1 : ((a.ano > b.ano) ? 1 : 0));
        } else if (this.filters_liked.orderby == "Best rated") {
          filterResult = filterResult.sort((a, b) => (a.pontuacao_imdb > b.pontuacao_imdb) ? -1 : ((a.pontuacao_imdb < b.pontuacao_imdb) ? 1 : 0));
        } else if (this.filters_liked.orderby == "Worst rated") {
          filterResult = filterResult.sort((a, b) => (a.pontuacao_imdb < b.pontuacao_imdb) ? -1 : ((a.pontuacao_imdb > b.pontuacao_imdb) ? 1 : 0));
        } else if (this.filters_liked.orderby == "Most viewed") {
          filterResult.map(res => res.visualizacoes = [...this.getAllViewsByTitle].find(ttl => ttl.id_imdb == res.id_imdb).visualizacoes);
          filterResult = filterResult.sort((a, b) => (a.visualizacoes > b.visualizacoes) ? -1 : ((a.visualizacoes < b.visualizacoes) ? 1 : 0));
        } else if (this.filters_liked.orderby == "Least viewed") {
          filterResult.map(res => res.visualizacoes = [...this.getAllViewsByTitle].find(ttl => ttl.id_imdb == res.id_imdb).visualizacoes);
          filterResult = filterResult.sort((a, b) => (a.visualizacoes < b.visualizacoes) ? -1 : ((a.visualizacoes > b.visualizacoes) ? 1 : 0));
        }    
      }
      
      return filterResult;
    },
    filteredTitlesSeen() {
      this.resetMostrar('seen');
      let filterResult = [...this.infoViwed];

      // Barra de pesquisa
      if (this.filters_seen.search != "") {
        filterResult = filterResult.filter(title => title.titulo.toLowerCase().includes(this.filters_seen.search.toLowerCase()));
      }

      // Géneros
      if (this.filters_seen.genre != "All" && this.filters_seen.genre != "Genre") {
        filterResult = filterResult.filter(title => title.genero.some(genero => genero == this.filters_seen.genre));
      }

      // Anos
      if (this.filters_seen.year != "All" && this.filters_seen.year != "Year") {
        filterResult = filterResult.filter(title => title.ano == this.filters_seen.year);
      }
      
      // Países
      if (this.filters_seen.country != "All" && this.filters_seen.country != "Country") {
        filterResult = filterResult.filter(title => this.filters_seen.country == title.pais);
      }

      if (this.filters_seen.orderby != "Recently added" && this.filters_seen.orderby != "Order by") {
        if (this.filters_seen.orderby == "Alphabetic (A-Z)") {
          filterResult = filterResult.sort((a, b) => (a.titulo < b.titulo) ? -1 : ((a.titulo > b.titulo) ? 1 : 0));
        } else if (this.filters_seen.orderby == "Alphabetic (Z-A)") {
          filterResult = filterResult.sort((a, b) => (a.titulo > b.titulo) ? -1 : ((a.titulo < b.titulo) ? 1 : 0));
        } else if (this.filters_seen.orderby == "Most recent") {
          filterResult = filterResult.sort((a, b) => (a.ano > b.ano) ? -1 : ((a.ano < b.ano) ? 1 : 0));
        } else if (this.filters_seen.orderby == "Oldest") {
          filterResult = filterResult.sort((a, b) => (a.ano < b.ano) ? -1 : ((a.ano > b.ano) ? 1 : 0));
        } else if (this.filters_seen.orderby == "Best rated") {
          filterResult = filterResult.sort((a, b) => (a.pontuacao_imdb > b.pontuacao_imdb) ? -1 : ((a.pontuacao_imdb < b.pontuacao_imdb) ? 1 : 0));
        } else if (this.filters_seen.orderby == "Worst rated") {
          filterResult = filterResult.sort((a, b) => (a.pontuacao_imdb < b.pontuacao_imdb) ? -1 : ((a.pontuacao_imdb > b.pontuacao_imdb) ? 1 : 0));
        } else if (this.filters_seen.orderby == "Most viewed") {
          filterResult.map(res => res.visualizacoes = [...this.getAllViewsByTitle].find(ttl => ttl.id_imdb == res.id_imdb).visualizacoes);
          filterResult = filterResult.sort((a, b) => (a.visualizacoes > b.visualizacoes) ? -1 : ((a.visualizacoes < b.visualizacoes) ? 1 : 0));
        } else if (this.filters_seen.orderby == "Least viewed") {
          filterResult.map(res => res.visualizacoes = [...this.getAllViewsByTitle].find(ttl => ttl.id_imdb == res.id_imdb).visualizacoes);
          filterResult = filterResult.sort((a, b) => (a.visualizacoes < b.visualizacoes) ? -1 : ((a.visualizacoes > b.visualizacoes) ? 1 : 0));
        }    
      }
      
      return filterResult;
    },
    filteredComments() {
      let filterResult = [...this.getAllUserComments(this.$route.params.id)];

      // Barra de pesquisa
      if (this.filters_comments.search != "") {
        filterResult = filterResult.filter(comentario => comentario.comentario.toLowerCase().includes(this.filters_comments.search.toLowerCase()));
      }

      // Ordenação
      if (this.filters_comments.orderby != "Oldest" && this.filters_comments.orderby != "Order by") {
        filterResult = filterResult.sort((a, b) => (a.data > b.data) ? -1 : ((a.data < b.data) ? 1 : 0));
      }

      return filterResult;
    },
    filteredRatings() {
      let filterResult = [...this.getAllUserRatings(this.$route.params.id)];

      // Barra de pesquisa
      if (this.filters_ratings.search != "") {
        filterResult = filterResult.filter(rating => rating.hasOwnProperty('id_imdb') ? this.getTitleInfo(rating.id_imdb).titulo.toLowerCase().includes(this.filters_ratings.search.toLowerCase()) : this.getQuizByID(rating.id_quiz).titulo.toLowerCase().includes(this.filters_ratings.search.toLowerCase()));
      }

      // Ordenação
      if (this.filters_ratings.orderby != "Order by") {
        if (this.filters_ratings.orderby == "Best") {
          filterResult = filterResult.sort((a, b) => (a.pontuacao > b.pontuacao) ? -1 : ((a.pontuacao < b.pontuacao) ? 1 : 0));
        } else if (this.filters_ratings.orderby == "Worst") {
          filterResult = filterResult.sort((a, b) => (a.pontuacao < b.pontuacao) ? -1 : ((a.pontuacao > b.pontuacao) ? 1 : 0));
        }
      }

      return filterResult;
    },
    filteredPrizes() {
      let filterResult = [...this.getAllUserPrizes(this.$route.params.id)];

      // Barra de pesquisa
      if (this.filters_prizes.search != "") {
        filterResult = filterResult.filter(prize => this.getPrizeInfo(prize.id_premio).nome.toLowerCase().includes(this.filters_prizes.search.toLowerCase()));
      }

      // Ordenação
      if (this.filters_prizes.orderby != "Oldest" && this.filters_prizes.orderby != "Order by") {
        if (this.filters_prizes.orderby == "Most recent") {
          filterResult = filterResult.sort((a, b) => (a.data > b.data) ? -1 : ((a.data < b.data) ? 1 : 0));
        } else if (this.filters_prizes.orderby == "Most expensive") {
          filterResult = filterResult.sort((a, b) => (this.getPrizeInfo(a.id_premio).valor > this.getPrizeInfo(b.id_premio).valor) ? -1 : ((this.getPrizeInfo(a.id_premio).valor < this.getPrizeInfo(b.id_premio).valor) ? 1 : 0));
        } else if (this.filters_prizes.orderby == "Cheapest") {
          filterResult = filterResult.sort((a, b) => (this.getPrizeInfo(a.id_premio).valor < this.getPrizeInfo(b.id_premio).valor) ? -1 : ((this.getPrizeInfo(a.id_premio).valor > this.getPrizeInfo(b.id_premio).valor) ? 1 : 0));
        }
      }

      return filterResult;
    }
  },
  mounted () {
    this.edit_user.primeiro_nome = this.getAllUsers.find(user => user.id == this.$route.params.id).primeiro_nome;
    this.edit_user.ultimo_nome = this.getAllUsers.find(user => user.id == this.$route.params.id).ultimo_nome;
    this.edit_user.email = this.getAllUsers.find(user => user.id == this.$route.params.id).email;
    this.edit_user.password = this.getAllUsers.find(user => user.id == this.$route.params.id).password;
    this.edit_user.data_nascimento = this.getAllUsers.find(user => user.id == this.$route.params.id).data_nascimento;
    this.edit_user.avatar = this.getAllUsers.find(user => user.id == this.$route.params.id).avatar;
    this.edit_user.is_admin = this.getAllUsers.find(user => user.id == this.$route.params.id).is_admin;
    this.selectedTab = this.getLoggedUser.id == this.$route.params.id || this.getLoggedUser.is_admin ? "profile" : "statistics";

    for (let i = 0; i < this.getTitleLikes(this.$route.params.id).length; i++) {
      this.infoLikes.push(this.getTitleInfo(this.getTitleLikes(this.$route.params.id)[i]))
    }
    for (let i = 0; i < this.getTitlesSeenByUser(this.$route.params.id).length; i++) {
      this.infoViwed.push(this.getTitleInfo(this.getTitlesSeenByUser(this.$route.params.id)[i]))
    }
  },
  created () {
    this.generos = this.getAllGenres.map(genre => genre.descricao);
    this.getAllTitles.map(title => {
      // Pré carregar anos para o select
      if (!this.anos.some(ano => ano == title.ano)) {
        this.anos.push(title.ano);
      }
      // Pré carregar países para o select
      if (!this.paises.some(pais => pais == title.pais)) {
        this.paises.push(title.pais);
      }
    });
    this.anos.sort();
    this.paises.sort();
  },
}
</script>

<style scoped>
  .title {
    font-size: 1.25em;
    font-weight: bold;
    color: white;
  }

  .navigation {
    font-size: 1.25em;
    gap: 0 5em;
  }

  .input-group-text .fas {
      color: #AFB3B7;
  }

  .input-group-text {
      border: none !important;
      background: #1D232E;
  }

  .badge-card {
    background-color: var(--cinza3);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .active {
    color: var(--laranja);
    border-bottom: 1px solid var(--laranja);
  }

  .navigation p {
    cursor: pointer;  
  }

  .card-profile {
    background-color: var(--azul-escuro2);
    border-radius: 10px;
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

  #remove-picture {
    position: absolute;
    top: 55px;
    right: -5px;
    min-width: 25px;
    min-height: 25px;
    height: 25px;
    width: 25px;
  }

  #remove-picture span {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: white;
    padding: 0;
    margin: 0;
    background-color: var(--vermelho);
    padding: 2px;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .65em;
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

  select::-ms-expand {
    display: none;
  }

  .filtros input[type="search"]::-webkit-search-decoration,
  .filtros input[type="search"]::-webkit-search-cancel-button,
  .filtros input[type="search"]::-webkit-search-results-button,
  .filtros input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .filtros form ::placeholder {
    color: var(--cinza2);
    opacity: 1;
  }

  .filtros form :-ms-input-placeholder {
    color: var(--cinza2);
  }

  .filtros form ::-ms-input-placeholder {
    color: var(--cinza2);
  }

  .filtros form input {
    border: none;
    outline: none;
    background-color: var(--cinza3);
    border-radius: 35px;
    color: white;
    padding: 10px 15px 10px 15px;
  }

  .filtros form button {
    border: none !important;
    background: var(--cinza3);
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
    padding: 0 15px 0 15px;
  }

  .filtros form i {
    color: var(--cinza-claro);
  }

  .filtros form input,
  .filtros form input:focus {
    color: white;
    outline: none !important;
    box-shadow: none;
    background-color: var(--cinza3);
  }

  @media (max-width: 991px) {
    .navigation {
      gap: 0 2em;
    }
  }

  @media (max-width: 767px) {
    .logout-btn {
      margin-top: 15px;
    }
  }

  @media (max-width: 419px) {
    .p-info button {
      margin: 0 auto;
      margin-top: 5px;
      margin-bottom: 15px;
    }

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
</style>