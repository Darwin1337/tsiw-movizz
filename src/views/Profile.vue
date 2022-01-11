<template>
  <div class="container">
    <div class="mt-5 mb-5 navigation d-flex flex-wrap">
      <p :class="{ active: selectedTab == 'profile'}" class="m-0" @click="selectedTab ='profile'">Profile</p>
      <p :class="{ active: selectedTab == 'favorites'}" class="m-0" @click="selectedTab ='favorites'">Favorites</p>
      <p :class="{ active: selectedTab == 'seen'}" class="m-0" @click="selectedTab ='seen'">Seen</p>
      <p :class="{ active: selectedTab == 'history'}" class="m-0" @click="selectedTab ='history'">History</p>
      <p :class="{ active: selectedTab == 'statistics'}" class="m-0" @click="selectedTab ='statistics'">Statistics</p>
      <button class="ms-auto logout-btn" @click="logoutUser()">Logout</button>
    </div>

    <div class="row gy-5" v-if="selectedTab == 'profile'">
      <div class="col-lg-6">
        <div class="card-profile p-3">
          <div class="img-profile row g-3">
            <div class="col-md-2 col-lg-3 d-flex flex-column align-items-center justify-content-center">
              <div class="d-flex align-items-center position-relative">
                <img :src="this.getAllUsers[$route.params.id].avatar"
                  style="border-radius: 50%; min-width: 50px; min-height: 50px; object-fit: cover; object-position: center top;" alt="Avatar" width="80px"
                  height="80px" />
                <div
                  v-if="this.getAllUsers[$route.params.id].avatar != 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
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
                <img :src="this.getBadges[this.getAllUsers[$route.params.id].id_badge].icon" alt="Badge" width="15px"
                  height="15px" />
                <p class="m-0">
                  {{ this.getAllUsers[$route.params.id].primeiro_nome + ' ' + this.getAllUsers[$route.params.id].ultimo_nome }}
                </p>
                <p class="m-0" style="color: var(--cinza-claro); font-size: .85em;">
                  {{ this.getBadges[this.getAllUsers[$route.params.id].id_badge].name }}</p>
                <button class="edit-btn ms-auto"><strong>{{ this.getAllUsers[$route.params.id].pontos }}</strong>
                  points</button>
              </div>
              <p style="color: var(--cinza-claro)" class="m-0"><strong>Member since:</strong>
                {{ new Date(this.getAllUsers[$route.params.id].data_registo).getDate() + "/" + (parseInt(new Date(this.getAllUsers[$route.params.id].data_registo).getMonth()) + 1) + "/" + new Date(this.getAllUsers[$route.params.id].data_registo).getFullYear() }}
              </p>
              <div class="level-info d-flex align-items-center mt-4" style="gap: 15px;">
                <p class="m-0 d-flex justify-content-center align-items-center"
                  style="width: 25px; height: 25px; min-width: 25px; min-height: 25px; background-color: var(--azul-claro); border-radius: 50%; font-size: .9em; color: var(--bg); font-weight: bold;">
                  {{ Math.floor(this.getAllUsers[$route.params.id].xp / 150) }}</p>
                <div class="d-flex flex-column w-100" style="gap: 10px;">
                  <div
                    style="min-width: 100px; width: 100%; height: 10px; background-color: var(--cinza-claro); border-radius: 30px;">
                    <div
                      :style="{ width: parseFloat((this.getAllUsers[$route.params.id].xp * 100) / ((Math.floor(this.getAllUsers[$route.params.id].xp / 150) + 1) * 150)).toFixed(2) + '%' }"
                      style="background-color: white; height: 100%; border-top-left-radius: 30px; border-bottom-left-radius: 30px;">
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="m-0">Current XP <strong>{{ this.getAllUsers[$route.params.id].xp }}</strong></p>
                    <p class="m-0">Next level
                      <strong>{{ (Math.floor(this.getAllUsers[$route.params.id].xp / 150) + 1) * 150 }}</strong></p>
                  </div>
                </div>
                <p class="m-0 d-flex justify-content-center align-items-center"
                  style="width: 25px; height: 25px; min-width: 25px; min-height: 25px; background-color: var(--azul-claro); border-radius: 50%; font-size: .9em; color: var(--bg); font-weight: bold;">
                  {{ Math.floor(this.getAllUsers[$route.params.id].xp / 150) + 1 }}</p>
              </div>
            </div>
          </div>
        </div>
        <p class="title mt-4 mb-4"><span style="color: #BBE1FA; font-weight: bold;">Misspelt something?</span> Edit your profile</p>
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
            <input type="email" class="form-control bg-inputs" placeholder="E-mail" aria-label="E-mail" required
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
          <div>
            <button type="submit" class="mt-4 orange-btn">Edit profile</button>
          </div>
        </form>
      </div>
      <div class="col-lg-6 filtros">
        <p class="m-0" style="color: var(--azul-claro); font-weight: bold; font-size: 1.25em;">Badges</p>
        <div style="background-color: var(--azul-escuro); border-radius: 10px;" class="row g-3 m-0 pb-3 mt-3 mb-3">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <form class="d-flex">
              <div class="input-group">
                <input type="search" class="form-control" style="height: 40px;" placeholder="Search"
                  aria-label="Search">
                <button type="submit" @submit.prevent=""><i class="fas fa-search"></i></button>
              </div>
            </form>
          </div>

          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <select id="order" style="height: 40px;">
              <option disabled selected>Order by</option>
              <option value="All">All</option>
              <option value="Unlocked">Unlocked</option>
              <option value="Locked">Locked</option>
            </select>
          </div>
        </div>

        <div style="background-color: var(--azul-escuro2); border-radius: 10px;" class="p-3">
          <div id="leaderboardBar" style="max-height: 450px; overflow-y: scroll; overflow-x: hidden;">
            <div class="row g-3 pe-2">
              <div class="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6" v-for="(badge, index) in getBadges" :key="index">
                <div class="badge-card d-flex flex-column align-items-center p-2">
                  <p style="color: var(--cinza-claro)">Level {{ badge.level }}</p>
                  <img :src="badge.icon" alt="Badge" width="50px" height="50px" />
                </div>
                <div style="background-color: var(--bg); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;" class="text-center p-2">
                  <p class="m-0">{{ badge.name }}</p>
                </div>
                <div class="mt-2">
                  <button @click="changeBadge(index)" :disabled="(getAllUsers[$route.params.id].xp < badge.xp_min)" class="logout-btn w-100" :style="{ backgroundColor: getAllUsers[$route.params.id].id_badge == index ? 'var(--verde)' : (getAllUsers[$route.params.id].xp >= badge.xp_min ? 'var(--laranja)' : 'var(--cinza-claro)') }" style="font-size: 1rem; color: var(--bg); border-radius: 5px; font-weight: bold;">{{ (getAllUsers[$route.params.id].id_badge == index) ? ('Selected') : ((getAllUsers[$route.params.id].xp >= badge.xp_min) ? ('Select') : ('Locked')) }}</button>
                </div>
              </div>
            </div>
          </div>
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
      selectedTab: "profile",
      edit_user: {
        primeiro_nome: '',
        ultimo_nome: '',
        email: '',
        password: '',
        data_nascimento: '',
        avatar: '',
      }
    }
  },
  methods: {
    ...mapMutations(["SET_LOGOUT"]),
    ...mapMutations(["SET_LOGGED_USER"]),
    ...mapMutations(["SET_EDITED_USER"]),
    ...mapMutations(["SET_NEW_BADGE"]),
    editUser(event, isAvatar) {
      console.log("lol");
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
            data_nascimento: this.edit_user.data_nascimento
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
    }
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
    ...mapGetters(["getBadges"]),
    ...mapGetters(["getAllUsers"]),
    ...mapGetters(["isEmailAvailable"])
  },
  mounted () {
    this.edit_user.primeiro_nome = this.getLoggedUser.primeiro_nome;
    this.edit_user.ultimo_nome = this.getLoggedUser.ultimo_nome;
    this.edit_user.email = this.getLoggedUser.email;
    this.edit_user.password = this.getLoggedUser.password;
    this.edit_user.data_nascimento = this.getLoggedUser.data_nascimento;
    this.edit_user.avatar = this.getLoggedUser.avatar;
  }
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

  .navigation {
    gap: 0 5em;
  }

  .navigation p {
    cursor: pointer;  
  }

  .card-profile {
    background-color: var(--azul-escuro2);
    border-radius: 10px;
  }

  #leaderboardBar::-webkit-scrollbar {
    width: 5px;
  }

  #leaderboardBar::-webkit-scrollbar-thumb {
    background: #464646;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  #leaderboardBar::-webkit-scrollbar-thumb:hover {
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
  }
</style>
