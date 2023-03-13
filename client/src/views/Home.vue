<template>
  <v-container :class="{ dark: darkMode }">
    <v-btn color="primary" @click="toggleDarkMode">
      {{ darkMode ? "Light" : "Dark" }} Mode
    </v-btn>

    <v-alert
      border="left"
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissible
      v-if="this.$route.params.message"
    >
      {{ this.$route.params.message }}
    </v-alert>
    <v-row no-gutters>
      <v-col
        sm="4"
        class="pa-3"
        v-for="(movie, index) in paginatedMovies"
        :key="movie._id"
      >
        <v-card
          class="pa-1"
          :to="{ name: 'MovieDetails', params: { id: movie._id } }"
        >
          <v-img height="250" :src="`/${movie.image}`"></v-img>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn small outlined color="red">{{ movie.category }}</v-btn>
            <v-btn small outlined color="primary"
              >{{ movie.viewcount }} views</v-btn
            >
          </v-card-actions>

          <v-card-title class="headline">
            {{ movie.title }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ movie.description }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="currentPage"
      :total-visible="7"
      :length="Math.ceil(movies.length / itemsPerPage)"
      color="primary"
      class="mt-3"
    ></v-pagination>
  </v-container>
</template>

<script>
import API from "../api";

export default {
  name: "Home",
  data() {
    return {
      movies: [],
      currentPage: 1,
      itemsPerPage: 6,
      darkMode: false, // added a data property for the dark mode state
    };
  },
  computed: {
    paginatedMovies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.movies.slice(startIndex, endIndex);
    },
  },
  async created() {
    this.movies = await API.getAllMovies();
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
};
</script>

<style scoped>
.dark {
  background-color: #1a1a1a;
  color: #fff;
}

.dark v-card {
  background-color: #222;
}

.dark v-alert {
  background-color: #333;
}

.dark v-btn {
  color: #fff;
  border-color: #fff;
}

.dark v-pagination > * {
  color: #fff;
}

.dark v-pagination .v-pagination__item--active {
  background-color: #fff;
  color: #1a1a1a;
}
</style>
