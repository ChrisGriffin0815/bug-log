<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg- shadow">
    <div class="d-flex flex-column align-items-center">
      <router-link :to="{ name: 'Home' }" class="nav-link text-dark">
        <img
          alt="logo"
          src="../assets/img/Griffin-Logo-Black.png"
          height="55"
        />
      </router-link>
    </div>
    <button
      class="navbar-toggler bg-dark"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="row collapse navbar-collapse" id="navbarText">
      <div class="col-3">
        <ul class="navbar-nav mr-auto">
          <!-- <li class="nav-item">
            Home
          </li> -->
        </ul>
      </div>
      <div class="col-6 d-flex justify-content-center">
        <h1 class="pr-5 mr-5">
          Griffin Enterprises
        </h1>
      </div>
      <div class="col-3 d-flex justify-content-end">
        <span class="navbar-text text-dark">
          <button
            class="btn btn-outline-primary text-uppercase"
            @click="login"
            v-if="!user.isAuthenticated"
          >
            Login
          </button>

          <div class="dropdown" v-else>
            <div
              class="dropdown-toggle"
              @click="state.dropOpen = !state.dropOpen"
            >
              <img
                :src="user.picture"
                alt="user photo"
                height="40"
                class="rounded"
              />
              <!-- <span class="mx-3">{{ user.name }}</span> -->
            </div>
            <div
              class="dropdown-menu p-0 list-group w-100"
              :class="{ show: state.dropOpen }"
              @click="state.dropOpen = false"
            >
              <router-link :to="{ name: 'Profile' }">
                <div class="list-group-item list-group-item-action hoverable">
                  Profile
                </div>
              </router-link>
              <div
                class="list-group-item list-group-item-action hoverable"
                @click="logout"
              >
                logout
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
