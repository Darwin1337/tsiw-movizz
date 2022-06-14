<template>
  <div class="container" v-if="!loading.user && !loading.badges">
    <div class="pt-5 mb-5 navigation d-flex flex-wrap">
      <p v-if="getLoggedUserData.data.id == $route.params.id || getLoggedUserData.data.is_admin" :class="{ active: selectedTab == 'profile'}" class="m-0" @click="selectedTab ='profile'">Profile</p>
      <p :class="{ active: selectedTab == 'favorites'}" class="m-0" @click="selectedTab ='favorites'">Favorites</p>
      <p :class="{ active: selectedTab == 'seen'}" class="m-0" @click="selectedTab ='seen'">Seen</p>
      <p v-if="getLoggedUserData.data.id == $route.params.id || getLoggedUserData.data.is_admin" :class="{ active: selectedTab == 'history'}" class="m-0" @click="selectedTab ='history'">History</p>
      <p :class="{ active: selectedTab == 'statistics'}" class="m-0" @click="selectedTab ='statistics'">Statistics</p>
      <button class="ms-auto logout-btn" @click="logoutUser()">Logout</button>
    </div>
    <div>
      <div class="row gy-5" v-if="selectedTab == 'profile'">
        <div class="col-lg-6">
          <div class="card-profile p-3">
            <div class="img-profile row g-3">
              <div class="col-md-2 col-lg-3 d-flex flex-column align-items-center justify-content-center">
                <div class="d-flex align-items-center position-relative">
                  <img :src="data.user.avatar"
                    style="border-radius: 50%; min-width: 50px; min-height: 50px; object-fit: cover; object-position: center top;" alt="Avatar" width="80px"
                    height="80px" />
                  <div
                    v-if="data.user.avatar != 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                    id="remove-picture" @click="changeAvatar('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')">
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
                  <img :src="require('../assets/images/badges/' + data.user.badge_id.icon)" alt="Badge" width="15px"
                    height="15px" />
                  <p class="m-0">
                    {{ data.user.first_name + ' ' + data.user.last_name }}
                  </p>
                  <p class="m-0" style="color: var(--cinza-claro); font-size: .85em;">
                    {{ data.user.badge_id.name }}</p>
                  <button class="edit-btn ms-auto"><strong>{{ data.user.points }}</strong>
                    points</button>
                </div>
                <p style="color: var(--cinza-claro)" class="m-0"><strong>Member since:</strong>
                  {{ new Date(data.user.register_date).getDate() + "/" + (parseInt(new Date(data.user.register_date).getMonth()) + 1) + "/" + new Date(data.user.register_date).getFullYear() }}
                </p>
                <div class="level-info d-flex align-items-center mt-4" style="gap: 15px;">
                  <p class="m-0 d-flex justify-content-center align-items-center"
                    style="width: 25px; height: 25px; min-width: 25px; min-height: 25px; background-color: var(--azul-claro); border-radius: 50%; font-size: .9em; color: var(--bg); font-weight: bold;">
                    {{ Math.floor(data.user.xp / 150) }}</p>
                  <div class="d-flex flex-column w-100" style="gap: 10px;">
                    <div
                      style="min-width: 100px; width: 100%; height: 10px; background-color: var(--cinza-claro); border-radius: 30px;">
                      <div
                        style="background-color: white; height: 100%; border-top-left-radius: 30px; border-bottom-left-radius: 30px;"
                        :style="{ width: parseFloat((data.user.xp - (data.user.stats.level * 150)) * 100) / (((Math.floor(data.user.xp / 150) + 1) * 150) - (data.user.stats.level * 150)).toFixed(2) + '%' }">
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p class="m-0">Current XP <strong>{{ data.user.xp }}</strong></p>
                      <p class="m-0">Next level
                        <strong>{{ (Math.floor(data.user.xp / 150) + 1) * 150 }}</strong></p>
                    </div>
                  </div>
                  <p class="m-0 d-flex justify-content-center align-items-center"
                    style="width: 25px; height: 25px; min-width: 25px; min-height: 25px; background-color: var(--azul-claro); border-radius: 50%; font-size: .9em; color: var(--bg); font-weight: bold;">
                    {{ Math.floor(data.user.xp / 150) + 1 }}</p>
                </div>
              </div>
            </div>
          </div>
          <p v-if="(getLoggedUserData.data.id != $route.params.id && getLoggedUserData.data.is_admin)" class="title mt-4 mb-4"><span style="color: #BBE1FA; font-weight: bold;">You got special privileges.</span> Edit anything</p>
          <p v-else class="title mt-4 mb-4"><span style="color: #BBE1FA; font-weight: bold;">Misspelt something?</span> Edit your profile</p>
          <form id="register" @submit.prevent="editUserInfo()">
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
              <input type="date" class="form-control bg-inputs" placeholder="Date of birth" aria-label="Date of birth" required
                v-model="edit_user.data_nascimento">
              <span class="input-group-text"><i class="fas fa-calendar"></i></span>
            </div>
            <div v-if="getLoggedUserData.data.is_admin && ($route.params.id != getLoggedUserData.data.id)">
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
              <div class="row g-3 pe-2" v-if="!loading.badges">
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6" v-for="(badge, index) in filteredBadges" :key="index">
                  <div class="badge-card d-flex flex-column align-items-center p-2">
                    <p style="color: var(--cinza-claro)">Level {{ badge.level }}</p>
                    <img :src="require('../assets/images/badges/' + badge.icon)" alt="Badge" width="50px" height="50px" />
                  </div>
                  <div style="background-color: var(--bg); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;" class="text-center p-2">
                    <p class="m-0">{{ badge.name }}</p>
                  </div>
                  <div class="mt-2">
                    <button @click="changeBadge(badge._id, badge)" :disabled="(data.user.xp < badge.xp_min)" class="logout-btn w-100" :style="{ backgroundColor: data.user.badge_id._id == badge._id ? 'var(--verde)' : (data.user.xp >= badge.xp_min ? 'var(--laranja)' : 'var(--cinza-claro)') }" style="font-size: 1rem; color: var(--bg); border-radius: 5px; font-weight: bold;">{{ (data.user.badge_id.badge_id == index) ? ('Selected') : ((data.user.xp >= badge.xp_min) ? ('Select') : ('Locked')) }}</button>
                  </div>
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
                <input type="search" class="form-control" style="height: 40px;" placeholder="Search" aria-label="Search" v-model="filtersFavourites.search">
                <button type="button"><i class="fas fa-search"></i></button>
              </div>
            </form>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="genre" style="height: 40px;" v-model="filtersFavourites.genre">
              <option disabled value="Genre">Genre</option>
              <option value="All">All</option>
              <option :value=genero v-for="(genero, index) in data.genresFav" :key="index">{{ genero }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="year" style="height: 40px;" v-model="filtersFavourites.year">
              <option disabled value="Year">Year</option>
              <option value="All">All</option>
              <option :value=ano v-for="(ano, index) in anos" :key="index">{{ ano }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="country" style="height: 40px;" v-model="filtersFavourites.country">
              <option disabled value="Country">Country</option>
              <option value="All">All</option>
              <option :value=pais v-for="(pais, index) in paises" :key="index">{{ pais }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-3 col-sm-6">
             <select id="order" style="height: 40px;" v-model="filtersFavourites.orderby">
              <option disabled value="Order by">Order by</option>
              <option value="Recently added">Recently added</option>
              <option value="Alphabetic (A-Z)">Alphabetic (A-Z)</option>
              <option value="Alphabetic (Z-A)">Alphabetic (Z-A)</option>
              <option value="Most recent">Most recent</option>
              <option value="Oldest">Oldest</option>
              <option value="Best IMDb rated">Best IMDb rated</option>
              <option value="Worst IMDb rated">Worst IMDb rated</option>
            </select>
            
          </div>
        </div>
      </div>
      <div id="likesSection">
        <div class="row g-3">
          <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="i in (filteredTitles.length >= mostrar.liked ? mostrar.liked : filteredTitles.length)" :key="i">
            <div class="tile-custom" >
              <div class="tile__media-custom" style="cursor: pointer;" @click="$router.push({ name: 'Title', params: { imdbid: filteredTitles[i - 1].imdb_id}})">
                <img class="tile__img" :src="webpSupported ? (filteredTitles[i - 1].poster_webp ? require('../assets/images/content/' + filteredTitles[i - 1].poster_webp) : filteredTitles[i - 1].poster) : filteredTitles[i - 1].poster" alt="" />
                
                <p style="cursor:pointer; padding-left:5px; padding-top:5px;">{{filteredTitles[i - 1].title}}</p>
              </div>
              <div v-if="data.user.id == $store.state.loggedUserData.data.id " class="tile__details p-2 text-center d-flex justify-content-end align-items-end" >
                <button @click="removeLike(filteredTitles[i - 1]._id)" class="blur-btn d-flex justify-content-center align-items-center" style="font-size: .85em; width: 30px; min-width: 30px; height: 30px; min-height: 30px; background-color:var(--vermelho);"><i class="fas fa-heart"></i></button>
              </div>
            </div>
          </div>
          <div v-if="filteredTitles.length==0">
            <p>{{ parseInt(this.data.user.id) == parseInt(getLoggedUserData.data.id) ? "You haven't added any movies nor series to your favorites." : "This user hasn't added any movies nor series to their favorites." }}</p> 
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
              <option :value=genero v-for="(genero, index) in data.genresSeen" :key="index">{{ genero }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="year" style="height: 40px;" v-model="filters_seen.year">
              <option disabled value="Year">Year</option>
              <option value="All">All</option>
              <option :value=ano v-for="(ano, index) in anosSeen" :key="index">{{ ano }}</option>
            </select>
          </div>

          <div class="col-md-3 col-lg-2 col-sm-6">
            <select id="country" style="height: 40px;" v-model="filters_seen.country">
              <option disabled value="Country">Country</option>
              <option value="All">All</option>
              <option :value=pais v-for="(pais, index) in paisesSeen" :key="index">{{ pais }}</option>
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
              <option value="Best IMDb rated">Best rated</option>
              <option value="Worst IMDb rated">Worst rated</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div class="row g-3">
          <div class="col-md-4 col-lg-3 col-xl-2 col-sm-4 col-6" v-for="i in (filteredTitlesSeen.length >= mostrar.seen ? mostrar.seen : filteredTitlesSeen.length)" :key="i" >
            <div class="tile-custom">
              <div class="tile__media-custom" style="cursor: pointer;" @click="$router.push({ name: 'Title', params: { imdbid: filteredTitlesSeen[i - 1].imdb_id}})">
                <img class="tile__img" :src="webpSupported ? (filteredTitlesSeen[i - 1].poster_webp ? require('../assets/images/content/' + filteredTitlesSeen[i - 1].poster_webp) : filteredTitlesSeen[i - 1].poster) : filteredTitlesSeen[i - 1].poster" />
                <p style="cursor:pointer; padding-left:5px; padding-top:5px;">{{filteredTitlesSeen[i - 1].title}}</p>
              </div>
              <div v-if="data.user.id == $store.state.loggedUserData.data.id " class="tile__details p-2 text-center d-flex justify-content-end align-items-end">
                <button @click="removeSeen1(filteredTitlesSeen[i - 1]._id)" class="blur-btn d-flex justify-content-center align-items-center" style="font-size: .85em; width: 30px; min-width: 30px; height: 30px; min-height: 30px; background-color:var(--verde)"><i class="fas fa-eye"></i></button>
              </div>
            </div>
          </div>
          <div v-if="filteredTitlesSeen.length==0">
            <p>{{ parseInt(this.data.user.id) == parseInt(getLoggedUserData.data.id) ? "You haven't added any movies nor series to your watched section." : "This user hasn't added any movies nor series to their watched section." }}</p> 
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
              <div>
                <p style="color: var(--cinza-claro);">{{ new Date(title.comment_data.date).getDate() + "/" + (parseInt(new Date(title.comment_data.date).getMonth()) + 1) + "/" + new Date(title.comment_data.date).getFullYear() + " at " + new Date(title.comment_data.date).getHours() + ":" + String(new Date(title.comment_data.date).getMinutes()).padStart(2, '0') + "h" }}</p>
                <p style="color: var(--laranja);"><span style="color: var(--cinza-claro);">{{ title.imdb_id ? (title.seasons == 0 ? 'Movie' : 'Series') : 'Quiz' }}</span>&nbsp;&nbsp;<strong>{{ title.imdb_id ? title.title  : title.title }}</strong></p>
              </div>
              <div>
                <p>{{title.comment_data.comment}}</p>
              </div>
              <div class="d-flex" style="gap: 10px;">
                <button class="edit-btn" @click="title.imdb_id ? $router.push({ name: 'Title', params: { imdbid: title.imdb_id} }) : $router.push({ name: 'Quiz', params: { id: title.quiz_id} })">See comment</button>
                <button v-if="getLoggedUserData.data.id.toString() == $route.params.id.toString() || getLoggedUserData.data.is_admin" class="custom-logout-btn" @click="title.hasOwnProperty('imdb_id') ? removeComment(title, false) : removeComment(title, true)">Delete</button>
              </div>
            </div>
            <div v-if="filteredComments.length == 0">
              <p>{{ parseInt(this.data.user.id) == parseInt(getLoggedUserData.data.id) ? "You have't commented on any title nor quiz." : "This user hasn't commented on any title nor quiz." }}</p> 
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
            <div class="card-comment p-2 me-1 mb-2" style="background-color: var(--azul-escuro); border-radius: 5px;" v-for="(title,i) in (filteredRatings.length >= mostrar.seen ? mostrar.seen : filteredRatings.length)" :key="i">
              <div class="d-flex flex-wrap w-100" style="gap: 15px;">
                <div class="col-3">
                  <div style="width: 85px; height: 125px; min-width: 85px; min-height: 125px;">
                    <img class="w-100 h-100" style="object-fit: cover; object-position: center top; border-radius: 5px;" :src="webpSupported ? (filteredRatings[i].quiz_id ? (filteredRatings[i].quiz_id.poster_webp ? require('../assets/images/content/quiz/' + filteredRatings[i].quiz_id.poster_webp) : filteredRatings[i].quiz_id.poster) : (filteredRatings[i].title_id.poster_webp ? require('../assets/images/content/' + filteredRatings[i].title_id.poster_webp) : filteredRatings[i].title_id.poster)) : filteredRatings[i].title_id.poster" />
                  </div>
                </div>
                <div class="d-flex flex-column col-8">
                  <p style="color: var(--laranja);" class="m-0"><span style="color: var(--cinza-claro);">{{ filteredRatings[i].title_id ? (filteredRatings[i].title_id.seasons == 0 ? 'Movie' : 'Series') : 'Quiz' }}</span>&nbsp;&nbsp;<strong>{{ filteredRatings[i].title_id ? filteredRatings[i].title_id.title : filteredRatings[i].quiz_id.title }}</strong></p>
                  <div class="stars d-flex" style="gap: 5px; cursor: pointer; color: var(--laranja);">
                    <i class="fas fa-star" v-for="i in filteredRatings[i].rating" :key="i"></i>
                  </div>
                  <div class="d-flex mt-auto" style="gap: 10px;">
                    <button class="edit-btn" @click="filteredRatings[i].title_id ? $router.push({ name: 'Title', params: { imdbid: filteredRatings[i].title_id.imdb_id} }) : $router.push({ name: 'Quiz', params: { id: filteredRatings[i].quiz_id.quiz_id} })">See Rating</button>
                    <button v-if="getLoggedUserData.data.id.toString() == $route.params.id.toString()" class="custom-logout-btn" @click="filteredRatings[i].title_id ? removeRate(1,filteredRatings[i].title_id.imdb_id,filteredRatings[i].title_id._id, false) : removeRate(2,filteredRatings[i].quiz_id.quiz_id,filteredRatings[i].quiz_id._id, true)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="filteredRatings.length==0">
              <p>{{ parseInt(this.data.user.id) == parseInt(getLoggedUserData.data.id) ? "You have't rated any titles nor quizzes." : "This user hasn't rated any titles nor quizzes." }}</p> 
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
            <div class="card-comment p-2 me-1 mb-2" style="background-color: var(--azul-escuro); border-radius: 5px;" v-for="(title, i) in filteredPrizes" :key="i">
              <div class="d-flex flex-wrap w-100" style="gap: 15px;">
                <div>
                  <div style="width: 125px; height: 125px; min-width: 125px; min-height: 125px;">
                    <img class="w-100 h-100" style="object-fit: cover; object-position: center top; border-radius: 5px;" :src="title.prize_id.image">
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <p style="color: var(--laranja);" class="m-0"><strong>{{title.prize_id.name}}</strong></p>
                  <p style="color: var(--cinza-claro);">{{ new Date(title.date).getDate() + "/" + (parseInt(new Date(title.date).getMonth()) + 1) + "/" + new Date(title.date).getFullYear() + " at " + new Date(title.date).getHours() + ":" + String(new Date(title.date).getMinutes()).padStart(2, '0') + "h" }}</p>
                  <p style="color: var(--cinza-claro);"><strong>{{title.prize_id.price}}</strong> points</p>
                </div>
              </div>
            </div>
            <div v-if="filteredPrizes.length == 0">
              <p>{{ parseInt(this.data.user.id) == parseInt(getLoggedUserData.data.id) ? "You have't claimed any prizes yet." : "This user hasn't claimed any prizes yet." }}</p> 
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
              <img :src="data.user.avatar"
                style="border-radius: 50%; min-width: 50px; min-height: 50px; object-fit: cover; object-position: center top;" alt="Avatar" width="80px"
                height="80px" />
            </div>
          </div>
          <div class="col-md-10 col-lg-9">
            <div class="p-info d-flex align-items-center flex-wrap" style="gap: 5px;">
              <img :src="require('../assets/images/badges/' + data.user.badge_id.icon)" alt="Badge" width="15px"
                height="15px" />
              <p class="m-0">
                {{ data.user.first_name + ' ' + data.user.last_name }}
              </p>
              <p class="m-0" style="color: var(--cinza-claro); font-size: .85em;">
                {{ data.user.badge_id.name }}</p>
            </div>
            <p style="color: var(--cinza-claro)" class="m-0"><strong>Member since:</strong>
              {{ new Date().getDate(data.user.register_date) + "/" + (parseInt(new Date(data.user.register_date).getMonth()) + 1) + "/" + new Date(data.user.register_date).getFullYear() }}
            </p>
            <div class="level-info d-flex align-items-center mt-4" style="gap: 15px;">
              <p class="m-0 d-flex justify-content-center align-items-center"
                style="width: 25px; height: 25px; min-width: 25px; min-height: 25px; background-color: var(--azul-claro); border-radius: 50%; font-size: .9em; color: var(--bg); font-weight: bold;">
                {{ Math.floor(data.user.xp / 150) }}</p>
              <div class="d-flex flex-column w-100" style="gap: 10px;">
                <div
                  style="min-width: 100px; width: 100%; height: 10px; background-color: var(--cinza-claro); border-radius: 30px;">
                  <div
                    :style="{ width: parseFloat((data.user.xp - (data.user.stats.level * 150)) * 100) / (((Math.floor(data.user.xp / 150) + 1) * 150) - (data.user.stats.level * 150)).toFixed(2) + '%' }"
                    style="background-color: white; height: 100%; border-top-left-radius: 30px; border-bottom-left-radius: 30px;">
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="m-0">Current XP <strong>{{ data.user.xp }}</strong></p>
                  <p class="m-0">Next level
                    <strong>{{ (Math.floor(data.user.xp / 150) + 1 )*150 }}</strong></p>
                </div>
              </div>
              <p class="m-0 d-flex justify-content-center align-items-center"
                style="width: 25px; height: 25px; min-width: 25px; min-height: 25px; background-color: var(--azul-claro); border-radius: 50%; font-size: .9em; color: var(--bg); font-weight: bold;">
                {{ Math.floor(data.user.xp / 150) + 1 }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="stats w-100 mt-5" style="max-width: 600px;">
        <div class="card-stats d-flex w-100 p-2 mb-3" style="background-color: var(--azul-escuro); border-radius: 5px;">
          <p class="m-0" style="font-weight: 500; color: var(--cinza-claro);"><i class="fas fa-globe" style="color: var(--azul-claro);"></i>&nbsp;&nbsp;&nbsp;Quizzes completed</p>
          <p class="m-0 ms-auto" style="color: var(--laranja); font-weight: bold;">{{ data.user.stats.quizzes_completed }}</p>
        </div>
        <div class="card-stats d-flex w-100 p-2 mb-3" style="background-color: var(--azul-escuro); border-radius: 5px;">
          <p class="m-0" style="font-weight: 500; color: var(--cinza-claro);"><i class="fas fa-question-circle" style="color: var(--azul-claro);"></i>&nbsp;&nbsp;&nbsp;Questions answered</p>
          <p class="m-0 ms-auto" style="color: var(--laranja); font-weight: bold;">{{data.user.stats.questions_wrong + data.user.stats.questions_right}}</p>
        </div>
        <div class="card-stats d-flex w-100 p-2 mb-3" style="background-color: var(--azul-escuro); border-radius: 5px;">
          <p class="m-0" style="font-weight: 500; color: var(--cinza-claro);"><i class="fas fa-check-circle" style="color: var(--azul-claro);"></i>&nbsp;&nbsp;&nbsp;Correct answers</p>
          <p class="m-0 ms-auto" style="color: var(--laranja); font-weight: bold;">{{ data.user.stats.questions_right }}</p>
        </div>
        <div class="card-stats d-flex w-100 p-2 mb-3" style="background-color: var(--azul-escuro); border-radius: 5px;">
          <p class="m-0" style="font-weight: 500; color: var(--cinza-claro);"><i class="fas fa-times-circle" style="color: var(--azul-claro);"></i>&nbsp;&nbsp;&nbsp;Incorrect answers</p>
          <p class="m-0 ms-auto" style="color: var(--laranja); font-weight: bold;">{{ data.user.stats.questions_wrong }}</p>
        </div>
       
      </div>
    </div>

    <div class="modal fade backgroundBlur" id="modal-change-picture" ref="modal-change-picture" tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="max-width: 800px;">
        <div class="modal-content" style="background-color: var(--bg);">
          <div>
            <form @submit.prevent="changeAvatar()" class="modal-body d-flex flex-column" style="gap: 20px;">
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
  <div v-else class="d-flex flex-column justify-content-center align-items-center text-center">
    <img src="../assets/images/loading.gif" alt="" />
    <h3>We thought this would be faster as well, <span style="color: var(--laranja)">sorry</span>.</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      webpSupported: true,
      anos: [],
      paises:[],
      anosSeen: [],
      paisesSeen:[],
      selectedTab: "profile",
      edit_user: {},
      mostrar: {
        liked: 12,
        seen: 12
      },
      loading: {
        user: true,
        badges: true,
        genresFav:true,
        genresSee:true
      },
      data: {
        user: {},
        titleComments:{},
        badges: {},
        genresFav:{},
        genresSeen:{},
        randomPassword: ""
      },
      filtersFavourites: {
          search: "",
          genre: "Genre",
          year: "Year",
          country: "Country",
          orderby: "Order by"
      },
      filters_badge: {
        search: "",
        orderby: "Order by"
      },
      filters_seen:{
        search: "",
        genre: "Genre",
        year: "Year",
        country: "Country",
        orderby: "Order by"
      },
      filters_comments:{
        search: "",
        orderby: "Order by"
      },
      filters_ratings:{
        search: "",
        orderby: "Order by"
      },
      filters_prizes:{
        search: "",
        orderby: "Order by"
      }
    }
  },
  mounted () {
    this.webpSupported = this.isWebpSupported();
    this.getUserInfo();
    this.getBadgesInfo();
    this.getGenresFav();
    this.getGenresSeen();
  },
  methods: {
    ...mapActions(["getAllBadges", "getUser", "changeUserBadge", "editUser", "changeUserAvatar","getAllGenres","removeFavourite","removeSeen","deleteRatings","removeQuizRating", "removeQuizComment", "removeCommentById"]),
    ...mapMutations(["LOGOUT_USER"]),
    async getUserInfo() {
      this.loading.user = true;
      try {
        this.data.user = await this.getUser({ id: this.$route.params.id });
        if (this.data.user.success) {
          this.data.user.msg[0].favourites.map(user => {
          // Pré carregar anos para o select
          if (!this.anos.some(ano => ano == user.year)) {
            this.anos.push(user.year);  
          }
          // Pré carregar países para o select
          if (!this.paises.some(pais => pais == user.country)) {
            this.paises.push(user.country);
          }
          });
          this.anos.sort();
          this.data.user.msg[0].seen.map(user => {
           // Pré carregar anos para o select
            if (!this.anosSeen.some(ano => ano == user.year)) {
              this.anosSeen.push(user.year);  
            }
            // Pré carregar países para o select
            if (!this.paisesSeen.some(pais => pais == user.country)) {
              this.paisesSeen.push(user.country);
            }
          });
          this.anosSeen.sort();
          this.data.user = this.data.user.msg[0];

          if ((this.data.user.id.toString() == this.getLoggedUserData.data.id.toString()) || (this.getLoggedUserData.data.is_admin)) {
            this.data.randomPassword = (Math.random() + 1).toString(36).substring(2);
            this.edit_user = {
              avatar: this.data.user.avatar,
              primeiro_nome: this.data.user.first_name,
              ultimo_nome: this.data.user.last_name,
              email: this.data.user.email,
              password: this.data.randomPassword,
              data_nascimento: new Date(this.data.user.dob).toISOString().split('T')[0],
              avatar: this.data.user.avatar,
              is_admin: this.data.user.is_admin
            };
          } else if (!this.getLoggedUserData.data.is_admin) {
            this.selectedTab = 'statistics';
          }

          this.loading.user = false;
        } else {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        }
      } catch(e) {
        this.$router.push({ name: 'Error', params: { '0': 'error' } });
      }
    },
    isWebpSupported() {
      const elem = document.createElement("canvas");
      if (elem.getContext && elem.getContext("2d")) {
        return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
      }
      return false;
    },
    async getBadgesInfo() {
      this.loading.badges = true;
      try {
        this.data.badges = await this.getAllBadges();
        if (this.data.badges.success) {
          this.data.badges = this.data.badges.msg;
          this.loading.badges = false;
        } else {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        }
      } catch (e) {
        this.$router.push({ name: 'Error', params: { '0': 'error' } });
      }
    },
    async getGenresFav() {
        try {
          this.loading.genresFav = true;
          this.data.genresFav = await this.getAllGenres();
          if (this.data.genresFav.success) {
            this.data.genresFav = this.data.genresFav.msg.map(genre => genre.description);
            this.loading.genresFav = false;
          } else {
            this.$router.push({ name: 'Error', params: { '0': 'error' } });
          }
        }catch (e) {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        }
    },
    async getGenresSeen() {
      try {
        this.loading.genresSeen = true;
        this.data.genresSeen = await this.getAllGenres();
        if (this.data.genresSeen.success) {
          this.data.genresSeen = this.data.genresSeen.msg.map(genre => genre.description);
          this.loading.genresSeen = false;
        } else {
          this.$router.push({ name: 'Error', params: { '0': 'error' } });
        }
      }catch (e) {
        this.$router.push({ name: 'Error', params: { '0': 'error' } });
      }
    },
    async changeBadge(badge_id, new_badge) {
      try {
        let response = await this.changeUserBadge({ id: this.$route.params.id, badge_id: badge_id});
        if (response.success) {
          this.data.user.badge_id = new_badge;
          // Atualizar o state e a localStorage caso o utilizador alterado seja igual ao logado
          if (this.getLoggedUserData.data.id == this.$route.params.id) {
            this.$store.state.loggedUserData.data.badge_id = new_badge;
            localStorage.loggedUserData = JSON.stringify({ loading: false, data: this.$store.state.loggedUserData.data });
          }
        } else {
          throw new Error(response.msg);
        }
      } catch (e) {
        this.$swal('Error!', e.message, 'error');
      }
    },
    async changeAvatar(ava) {
      try {
        let response = await this.changeUserAvatar({ id: this.$route.params.id, avatar: ava ? ava : this.edit_user.avatar });

        if (response.success) {
          this.data.user.avatar = ava ? ava : this.edit_user.avatar;
          // Atualizar o state e a localStorage caso o utilizador alterado seja igual ao logado
          if (this.getLoggedUserData.data.id == this.$route.params.id) {
            this.$store.state.loggedUserData.data.avatar = ava ? ava : this.edit_user.avatar;
            localStorage.loggedUserData = JSON.stringify({ loading: false, data: this.$store.state.loggedUserData.data });
          }
          this.edit_user.avatar = this.data.user.avatar;
        } else {
          throw new Error(response.msg);
        }
      } catch (e) {
        this.$swal('Error!', e.message, 'error');
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
          this.LOGOUT_USER();
          this.$router.push({ name: 'Authentication' });
        }
      });
    },
    async editUserInfo() {
      try {
        let response = await this.editUser({
          id: this.$route.params.id,
          first_name: this.edit_user.primeiro_nome,
          last_name: this.edit_user.ultimo_nome,
          email: this.edit_user.email,
          password: (this.edit_user.password == this.data.randomPassword) ? "" : this.edit_user.password,
          dob: String(this.edit_user.data_nascimento),
          is_admin: this.edit_user.is_admin,
          is_locked: this.data.user.is_locked
        });

        if (response.success) {
          // Atualizar o array local
          this.data.user.first_name = this.edit_user.primeiro_nome;
          this.data.user.last_name = this.edit_user.ultimo_nome;
          this.data.user.email = this.edit_user.email;
          this.data.user.password = this.edit_user.password;
          this.data.user.dob = this.edit_user.data_nascimento;
          this.data.user.is_admin = this.edit_user.is_admin;

          // Atualizar o state e a localStorage caso o utilizador alterado seja igual ao logado
          if (this.getLoggedUserData.data.id == this.$route.params.id) {
            this.$store.state.loggedUserData.data.first_name = this.data.user.first_name;
            this.$store.state.loggedUserData.data.last_name = this.data.user.last_name;
            this.$store.state.loggedUserData.data.email = this.data.user.email;
            this.$store.state.loggedUserData.data.password = this.data.user.password;
            this.$store.state.loggedUserData.data.dob = this.data.user.dob;
            this.$store.state.loggedUserData.data.is_admin = this.data.user.is_admin;
            localStorage.loggedUserData = JSON.stringify({ loading: false, data: this.$store.state.loggedUserData.data });
          }
          
          this.$swal('Success!', 'The data has been successfully updated.', 'success');
          this.edit_user.password = this.data.randomPassword;
        } else {
          throw new Error(response.msg);
        }
      } catch (e) {
        this.$swal('Error!', e.message, 'error');
      }
    },
    async removeLike(id){
      let response = await this.removeFavourite({
            id: this.data.user.id,
            imdb_id: id,
        });
        if (response.success) {
          this.data.user.favourites.splice(this.data.user.favourites.findIndex(title => title._id.toString() == id.toString()), 1);
          this.$store.state.loggedUserData.data.favourites = this.$store.state.loggedUserData.data.favourites.filter((title) => title._id != id);
          localStorage.loggedUserData = JSON.stringify({
            loading: false,
            data: this.$store.state.loggedUserData.data,
          });
          

          } else {
            throw new Error(response.msg);
          }

    },
    async removeSeen1(id){
      let response = await this.removeSeen({
            id: this.data.user.id,
            _id: id,
        });
        if (response.success) {
          this.data.user.seen.splice(this.data.user.seen.findIndex(title => title._id.toString() == id.toString()), 1);
          this.$store.state.loggedUserData.data.seen = this.$store.state.loggedUserData.data.seen.filter((title) => title._id != id);
          localStorage.loggedUserData = JSON.stringify({
            loading: false,
            data: this.$store.state.loggedUserData.data,
          });
          

          } else {
            throw new Error(response.msg);
          }

    },
    async removeRate(type,imdb_id,id){
      try {
        const check = await this.$swal({
          title: 'Warning!',
          text: "Are you sure you want to remove this rating?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
        });

        if (check.isConfirmed) {
          if (type==1) {
            let response = await this.deleteRatings({
                id_user: this.data.user._id,
                imdb_id: imdb_id,
                id_title: id,
                rating:0
            });
            if (response.success) {
              this.data.user.title_ratings.splice(this.data.user.title_ratings.findIndex(title => title.title_id._id.toString() == id.toString()), 1);
              this.$store.state.loggedUserData.data.title_ratings = this.$store.state.loggedUserData.data.title_ratings.filter((title) => title.title_id._id != id);
              localStorage.loggedUserData = JSON.stringify({
                loading: false,
                data: this.$store.state.loggedUserData.data,
              });
            } else {
              throw new Error(response.msg);
            }
          }
          else if(type==2){
            let response = await this.removeQuizRating({
                id: this.data.user.id,
                quiz_id: imdb_id,
            });
            if (response.success) {
              this.data.user.quiz_ratings.splice(this.data.user.quiz_ratings.findIndex(title => title.quiz_id._id.toString() == id.toString()), 1);
              this.$store.state.loggedUserData.data.quiz_ratings = this.$store.state.loggedUserData.data.quiz_ratings.filter((title) => title.quiz_id._id != id);
              localStorage.loggedUserData = JSON.stringify({
                loading: false,
                data: this.$store.state.loggedUserData.data,
              });
            } else {
              throw new Error(response.msg);
            }
          }
        }
      } catch (e) {
        this.$swal('Error!', e.message, 'error');
      }
    },
    resetMostrar(which) {
      if (which == "liked") this.mostrar.liked = 12;
      else if (which == "seen") this.mostrar.seen = 12;
    },
    async removeComment(content, isQuiz) {
      const check = await this.$swal({
        title: 'Warning!',
        text: "Are you sure you want to remove this rating?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (check.isConfirmed) {
        if (!isQuiz) {
          try {
            const res = await this.removeCommentById({
              imdb_id: content.imdb_id,
              _id: content.comment_data._id,
              title_id: content._id
            });

            if (res.success) {
              this.data.user.all_comments = this.data.user.all_comments.filter((comment) => comment.comment_data._id.toString() != content.comment_data._id.toString());
              this.$swal('Success!', 'Comment removed successfully!', 'success');
            } else {
              throw new Error(response.msg);
            }
          } catch (e) {
            this.$swal("Error!", e.message, "error");
          }
        } else {
          try {
            const res = await this.removeQuizComment({
              quiz_id: content.quiz_id,
              comment_id: content.comment_data.id,
            });

            if (res.success) {
              this.data.user.all_comments = this.data.user.all_comments.filter((comment) => comment.comment_data._id.toString() != content.comment_data._id.toString());
              this.$swal('Success!', 'Comment removed successfully!', 'success');
            } else {
              throw new Error(response.msg);
            }
          } catch (e) {
            this.$swal("Error!", e.message, "error");
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getLoggedUserID", "getLoggedUserData"]),
    filteredBadges() {
      if (!this.loading.badges) {
        let filterResult = [...this.data.badges];
        // Barra de pesquisa
        if (this.filters_badge.search != "") {
          filterResult = filterResult.filter(badge => badge.name.toLowerCase().includes(this.filters_badge.search.toLowerCase()));
        }
        if (this.filters_badge.orderby != "All" && this.filters_badge.orderby != "Order by") {
          if (this.filters_badge.orderby == "Unlocked") {
            filterResult.map(badge => badge.locked = this.data.user.xp < badge.xp_min)
            filterResult = filterResult.sort((a, b) => (a.locked < b.locked) ? -1 : ((a.locked > b.locked) ? 1 : 0));
          } else if (this.filters_badge.orderby == "Locked") {
            filterResult.map(badge => badge.locked = this.data.user.xp < badge.xp_min)
            filterResult = filterResult.sort((a, b) => (a.locked > b.locked) ? -1 : ((a.locked < b.locked) ? 1 : 0));
          }
        }
        return filterResult;
      }
      return null;
    },
    filteredTitles() {
      this.resetMostrar('liked');
      let filterResult = [...this.data.user.favourites];
      // Barra de pesquisa
      if (this.filtersFavourites.search != "") {
        filterResult = filterResult.filter(title => title.title.toLowerCase().includes(this.filtersFavourites.search.toLowerCase()));
      }
      // Géneros
      if (this.filtersFavourites.genre != "All" && this.filtersFavourites.genre != "Genre") {
        filterResult = filterResult.filter(title => title.genres.some(genero => genero.genre_id.description == this.filtersFavourites.genre));
      }
      // Anos
      if (this.filtersFavourites.year != "All" && this.filtersFavourites.year != "Year") {
        filterResult = filterResult.filter(title => title.year == this.filtersFavourites.year);
      }
      
      // Países
      if (this.filtersFavourites.country != "All" && this.filtersFavourites.country != "Country") {
        filterResult = filterResult.filter(title => this.filtersFavourites.country == title.country);
      }
      if (this.filtersFavourites.orderby != "Recently added" && this.filtersFavourites.orderby != "Order by") {
            if (this.filtersFavourites.orderby == "Alphabetic (A-Z)") {
              filterResult = filterResult.sort((a, b) => (a.title < b.title) ? -1 : ((a.title > b.title) ? 1 : 0));
            } else if (this.filtersFavourites.orderby == "Alphabetic (Z-A)") {
              filterResult = filterResult.sort((a, b) => (a.title > b.title) ? -1 : ((a.title < b.title) ? 1 : 0));
            } else if (this.filtersFavourites.orderby == "Most recent") {
              filterResult = filterResult.sort((a, b) => (a.year > b.year) ? -1 : ((a.year < b.year) ? 1 : 0));
            } else if (this.filtersFavourites.orderby == "Oldest") {
              filterResult = filterResult.sort((a, b) => (a.year < b.year) ? -1 : ((a.year > b.year) ? 1 : 0));
            } else if (this.filtersFavourites.orderby == "Best IMDb rated") {
              filterResult = filterResult.sort((a, b) => (a.imdb_rating > b.imdb_rating) ? -1 : ((a.imdb_rating < b.imdb_rating) ? 1 : 0));
            } else if (this.filtersFavourites.orderby == "Worst IMDb rated") {
              filterResult = filterResult.sort((a, b) => (a.imdb_rating < b.imdb_rating) ? -1 : ((a.imdb_rating > b.imdb_rating) ? 1 : 0));
            }    
          }
      
      return filterResult;
    },
    filteredTitlesSeen() {
      this.resetMostrar('seen');
      let filterResult = [...this.data.user.seen];
      // Barra de pesquisa
      if (this.filters_seen.search != "") {
        filterResult = filterResult.filter(title => title.title.toLowerCase().includes(this.filters_seen.search.toLowerCase()));
      }
      // Géneros
      if (this.filters_seen.genre != "All" && this.filters_seen.genre != "Genre") {
        filterResult = filterResult.filter(title => title.genres.some(genero => genero.genre_id.description == this.filters_seen.genre));
      }
      // Anos
      if (this.filters_seen.year != "All" && this.filters_seen.year != "Year") {
        filterResult = filterResult.filter(title => title.year == this.filters_seen.year);
      }
      
      // Países
      if (this.filters_seen.country != "All" && this.filters_seen.country != "Country") {
        filterResult = filterResult.filter(title => this.filters_seen.country == title.country);
      }
      if (this.filters_seen.orderby != "Recently added" && this.filters_seen.orderby != "Order by") {
            if (this.filters_seen.orderby == "Alphabetic (A-Z)") {
              filterResult = filterResult.sort((a, b) => (a.title < b.title) ? -1 : ((a.title > b.title) ? 1 : 0));
            } else if (this.filters_seen.orderby == "Alphabetic (Z-A)") {
              filterResult = filterResult.sort((a, b) => (a.title > b.title) ? -1 : ((a.title < b.title) ? 1 : 0));
            } else if (this.filters_seen.orderby == "Most recent") {
              filterResult = filterResult.sort((a, b) => (a.year > b.year) ? -1 : ((a.year < b.year) ? 1 : 0));
            } else if (this.filters_seen.orderby == "Oldest") {
              filterResult = filterResult.sort((a, b) => (a.year < b.year) ? -1 : ((a.year > b.year) ? 1 : 0));
            } else if (this.filters_seen.orderby == "Best IMDb rated") {
              filterResult = filterResult.sort((a, b) => (a.imdb_rating > b.imdb_rating) ? -1 : ((a.imdb_rating < b.imdb_rating) ? 1 : 0));
            } else if (this.filters_seen.orderby == "Worst IMDb rated") {
              filterResult = filterResult.sort((a, b) => (a.imdb_rating < b.imdb_rating) ? -1 : ((a.imdb_rating > b.imdb_rating) ? 1 : 0));
            }    
          }
      
      return filterResult;
    },
    filteredRatings(){
      let filterResult = [...this.data.user.title_ratings].concat([...this.data.user.quiz_ratings]);
      // Barra de pesquisa
      if (this.filters_ratings.search != "") {
        filterResult = filterResult.filter(rating => rating[rating.title_id ? 'title_id' : 'quiz_id'].title.toLowerCase().includes(this.filters_ratings.search.toLowerCase()));
      }
      if (this.filters_ratings.orderby != "Order by") {
        if (this.filters_ratings.orderby == "Best") {
          filterResult = filterResult.sort((a, b) => (a.rating > b.rating) ? -1 : ((a.rating < b.rating) ? 1 : 0));
        } else if (this.filters_ratings.orderby == "Worst") {
          filterResult = filterResult.sort((a, b) => (a.rating < b.rating) ? -1 : ((a.rating > b.rating) ? 1 : 0));
        }    
      }
      
      return filterResult;
    },
    filteredPrizes() {
      let filterResult = [...this.data.user.prizes_reedemed];
      // Barra de pesquisa

      if (this.filters_prizes.search != "") {
        filterResult = filterResult.filter(title => title.prize_id.name.toLowerCase().includes(this.filters_prizes.search.toLowerCase()));
      }

      if (this.filters_prizes.orderby != "Order by") {
        if (this.filters_prizes.orderby == "Most recent") {
          filterResult = filterResult.sort((a, b) => (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0));
        } else if (this.filters_prizes.orderby == "Oldest") {
           filterResult = filterResult.sort((a, b) => (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0));
        } else if (this.filters_prizes.orderby == "Most expensive") {
          filterResult = filterResult.sort((a, b) => (a.prize_id.price > b.prize_id.price) ? -1 : ((a.prize_id.price < b.prize_id.price) ? 1 : 0));
        } else if (this.filters_prizes.orderby == "Cheapest") {
          filterResult = filterResult.sort((a, b) => (a.prize_id.price < b.prize_id.price) ? -1 : ((a.prize_id.price > b.prize_id.price) ? 1 : 0));
        }    
      }
      
      return filterResult;
    },
    filteredComments() {
      let filterResult = [...this.data.user.all_comments];

      // Barra de pesquisa
      if (this.filters_comments.search != "") {
        filterResult = filterResult.filter(comment => comment.comment_data.comment.toLowerCase().includes(this.filters_comments.search.toLowerCase()) || comment.title.toLowerCase().includes(this.filters_comments.search.toLowerCase()));
      }

      if (this.filters_comments.orderby != "Order by") {
        if (this.filters_comments.orderby == "Most recent") {
          filterResult = filterResult.sort((a, b) => (a.comment_data.date > b.comment_data.date) ? -1 : ((a.comment_data.date < b.comment_data.date) ? 1 : 0));
        } else if (this.filters_comments.orderby == "Oldest") {
           filterResult = filterResult.sort((a, b) => (a.comment_data.date < b.comment_data.date) ? -1 : ((a.comment_data.date > b.comment_data.date) ? 1 : 0));
        }   
      }
      
      return filterResult;
    }
  },
  watch: {
    '$route.params.id'() {
      this.getUserInfo();
    },
    'selectedTab'() {
      this.mostrar.seen = 12;
      this.mostrar.liked = 12;
    }
  }
};
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