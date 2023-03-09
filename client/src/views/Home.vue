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
      <v-col sm="4" class="pa-3" v-for="movie in movies" :key="movie._id">
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
  </v-container>
</template>

<script>
import API from "../api";

export default {
  name: "Home",
  data() {
    return {
      movies: [],
    };
  },
  async created() {
    this.movies = await API.getAllMovies();
  },
};
</script>
