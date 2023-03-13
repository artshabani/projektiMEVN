<template>
  <v-container>
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

          <v-btn class="ml-4 mt-3" small outlined color="red">
            {{ movie.category }}
          </v-btn>

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
  name: "MoviesByCategory",
  data() {
    return {
      movies: [],
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    category() {
      return this.$route.params.category;
    },
    paginatedMovies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.movies.slice(startIndex, endIndex);
    },
  },
  async created() {
    await this.fetchMovies();
  },
  watch: {
    category() {
      this.fetchMovies();
    },
  },
  methods: {
    async fetchMovies() {
      this.movies = await API.moviesByCategory(this.category);
    },
  },
};
</script>
