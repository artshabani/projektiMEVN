<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> FilmaUBT </v-list-item-title>
          <v-list-item-subtitle> Streaming Platform </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-subheader style="color: indigo">Categories</v-subheader>

        <v-list-item
          v-for="(item, i) in firstTwoItems"
          :key="i"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider color="red"></v-divider>
        <v-list-item-group color="primary">
          <v-subheader style="color: indigo">Actions</v-subheader>
          <v-list-item
            v-for="(item, i) in remainingItems"
            :key="i"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
  <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

  <v-toolbar-title>Application </v-toolbar-title>

  <v-row class="fill-height">
    <v-col class="d-flex align-center justify-center">
      <v-text-field
        v-model="search"
        placeholder="Search for a movie"
        class="mx-auto"
        outlined
        dense
        append-icon="mdi-magnify"
        @keyup.enter="searchMovie"
        style="max-width: 200px;"
      />
    </v-col>

    <v-col class="d-flex align-center justify-end">
      <v-btn v-if="user" @click="handleLogout">
        Hello {{ user.email }}! Logout
      </v-btn>
    </v-col>
  </v-row>

</v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { mapState, mapActions } from "vuex";

import API from "./api";

export default {
  computed: {
    firstTwoItems() {
      return this.items.slice(0, 2);
    },
    remainingItems() {
      return this.items.slice(2);
    },

    ...mapState(["user"]),
  },
  data() {
  return {
    search: "",
    drawer: null,
    label: "",
    items: [
      {
        title: "Horror",
        icon: "mdi-movie",
        link: { name: "MoviesByCategory", params: { category: "horror" } },
      },
      {
        title: "Comedy",
        icon: "mdi-movie",
        link: { name: "MoviesByCategory", params: { category: "comedy" } },
      },     

      { title: "Home", icon: "mdi-home", link: "/" },
      { title: "About", icon: "mdi-help", link: "/About" },
      {
        title: "Register",
        icon: "mdi-account-plus-outline",
        link: "/Register",
      },
      { title: "Logout", icon: "mdi-logout", click: this.handleLogout },
    ],
  };
},
created() {
  const auth = getAuth();
  onAuthStateChanged(auth, (userAuth) => {
    if (userAuth) {
      this.$store.commit("setUser", userAuth);
      const user = userAuth.toJSON();
      if (user.email === "test2023@gmail.com" || user.email === 'test31@gmail.com') {
        this.items.splice(3, 0, {
          title: "Add Movie",
          icon: "mdi-note-plus",
          link: "/CreateMovie",
        });
        this.items.splice(5, 0, {
          title: "Logs",
          icon: "mdi-file-document-outline",
          link: { name: "Logs" },
        });
      }
    }
  });
},
  methods: {
    ...mapActions(["logoutUser"]),
    async handleLogout() {
      await this.logoutUser();
      this.$router.push("/login");
    },
    handleSubmit() {
      // Do something with this.label
    },
    async searchMovie() {
      const movieName = this.search; // Get the search text
      const movie = await API.getMovieByTitle(movieName); // Find the movie
      if (movie) {
        this.$router.push({ name: "MovieSearch", params: { id: movie._id } }); // Navigate to the movie page
      } else {
        alert("Movie not found");
      }
    },
  },
};
</script>

<style scoped>
.v-text-field__append-inner {
  color: grey;
}

.v-text-field__append {
  cursor: pointer;
}

.v-text-field__slot .v-icon {
  color: grey;
}
</style>
